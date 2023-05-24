const {
    SuccessResponse,
    CreatedResponse,
    NotFoundResponse,
    ConflictResponse,
    InternalServerErrorResponse,
    UnauthorizedResponse,
    ForbiddenResponse,
    NoContentResponse,
} = require('./responseController');
const jwt = require('jsonwebtoken');
const { isEmail } = require('./helpers');
const { User, Badge, Exercise, UserProgress } = require('../models');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

async function findUserById(id) {
    return await User.findByPk(id);
}

async function register(req, res) {
    const { username, email, password, firstName, lastName } = req.body;

    if (await User.findOne({ where: { username } })) {
        return new ConflictResponse({ error: 'Username already exists' }, res);
    }

    if (await User.findOne({ where: { email } })) {
        return new ConflictResponse({ error: 'Email already exists' }, res);
    }

    try {
        const newUser = await User.create({
            username,
            email,
            password,
            firstName,
            lastName,
        });

        // Give the user their first badge
        const signupBadge =
            (await Badge.findOne({ where: { name: 'Signup' } })) ||
            (await Badge.create({
                name: 'Signup',
                description: 'Earned when you create your first account',
                icon: '🥳',
            }));

        await newUser.addBadge(signupBadge);
        const token = generateToken(newUser);

        return new CreatedResponse({ token }, res);
    } catch (err) {
        const errorMessage =
            err.message || 'An error occurred during registration.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function login(req, res) {
    const { usernameOrEmail, password } = req.body;

    try {
        const where = {};

        // The user can login with either an email or a username
        if (isEmail(usernameOrEmail)) {
            where.email = usernameOrEmail;
        } else {
            where.username = usernameOrEmail;
        }

        // Default scope does not return the password hash
        const user = await User.scope('withPassword').findOne({ where });
        if (!user) {
            return new NotFoundResponse({ error: 'User not found' }, res);
        }

        // Matches the hash against the plaintext password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return new UnauthorizedResponse(
                { error: 'Incorrect password' },
                res,
            );
        }

        const token = generateToken(user);
        return new SuccessResponse({ token }, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to login.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function demoUserLogin(req, res) {
    try {
        const user = await User.findOne({
            where: { username: process.env.DEMO_USERNAME },
        });

        if (!user) {
            return new NotFoundResponse({ error: 'User not found' }, res);
        }

        const token = generateToken(user);
        return new SuccessResponse({ token }, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to login.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function getUserProfile(req, res) {
    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return new NotFoundResponse({ error: 'User not found' }, res);
        }

        user.badges = await user.getBadges();
        user.progress = await user.getProgress();

        return new SuccessResponse(user, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            "An internal server error occured while attempting to get the user's profile.";

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function updateUserProfile(req, res) {
    const { firstName, lastName, terminalTheme } = req.body;

    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return new NotFoundResponse({ error: 'User not found' }, res);
        }

        if (user.id !== req.user.id) {
            return new ForbiddenResponse({ error: 'Forbidden' }, res);
        }

        // We shouldn't try to update fields with empty or null values
        const updateObject = {};
        if (firstName) {
            updateObject.firstName = firstName;
        }
        if (lastName) {
            updateObject.lastName = lastName;
        }
        if (terminalTheme) {
            updateObject.terminalTheme = terminalTheme;
        }

        await user.update(updateObject);

        return new SuccessResponse(user, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            "An internal server error occured while attempting to update the user's profile.";

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function deleteUserAccount(req, res) {
    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return new NotFoundResponse({ error: 'User not found' }, res);
        }

        if (user.id !== req.user.id) {
            return new ForbiddenResponse({ error: 'Forbidden' }, res);
        }

        await user.destroy();

        return new SuccessResponse({ message: 'User deleted.' }, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            "An internal server error occured while attempting to delete the user's account.";

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function getUserProgress(req, res) {
    try {
        const user = await findUserById(req.user.id);
        const progress = await user.getProgress();

        return new SuccessResponse(progress, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            "An internal server error occured while attempting to get the user's progress.";

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function getUserProgressById(req, res) {
    try {
        const user = await findUserById(req.user.id);
        const progress = await user.getProgress({
            where: { id: req.params.progressId },
        });

        return new SuccessResponse(progress, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            "An internal server error occured while attempting to get the user's progress.";

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function createUserProgress(req, res) {
    try {
        const { exerciseId, completed, score, timeSpent } = req.body;
        const user = await findUserById(req.user.id);

        const progress = await user.getProgress({
            where: { exerciseId },
        });

        if (progress.length) {
            return new ConflictResponse(
                {
                    error: 'Progress for this exercise already exists',
                    progressId: progress[0].id,
                },
                res,
            );
        }

        const exercise = await Exercise.findByPk(exerciseId);
        if (!exercise) {
            return new NotFoundResponse(
                { error: 'The exercise does not exist.' },
                res,
            );
        }

        if (completed) {
            const badge = await exercise.getBadge();

            if (badge) {
                await user.addBadge(badge);
            }
        }

        const userProgress = await user.createProgress({
            exerciseId,
            completed,
            timeSpent,
            score,
            hintsUsed: 0, // todo
        });

        return new CreatedResponse(userProgress, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to create the progress.';

        console.error(errorMessage);

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function updateUserProgress(req, res) {
    try {
        const { score, hintsUsed, timeSpent, completed } = req.body;
        const { exerciseId, progressId } = req.params;

        const user = await findUserById(req.user.id);
        const userProgress = await UserProgress.findOne({
            where: { id: progressId, userId: req.user.id },
        });

        if (completed) {
            const exercise = await Exercise.findByPk(exerciseId);

            if (!exercise) {
                return new NotFoundResponse(
                    { error: 'The exercise does not exist.' },
                    res,
                );
            }

            const badge = await exercise.getBadge();

            if (!badge) {
                return new NotFoundResponse(
                    {
                        error: 'A badge for this exercise does not exist.',
                    },
                    res,
                );
            }

            await user.addBadge(badge);
        }

        await userProgress.update({
            score,
            hintsUsed,
            timeSpent,
            completed,
        });

        return new SuccessResponse(userProgress, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to update the progress.';

        console.error(errorMessage);

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

async function deleteUserProgress(req, res) {
    try {
        const user = await findUserById(req.user.id);

        const userProgress = await user.getProgress({
            where: { id: req.params.progressId },
        });

        if (!userProgress) {
            return new NotFoundResponse(
                {
                    error: 'The progress you are trying to delete does not exist.',
                },
                res,
            );
        }

        await userProgress.destroy();

        return new NoContentResponse(res);
    } catch (err) {
        const errorMessage =
            err.message || 'An error occured while deleting the progress.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

module.exports = {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount,
    demoUserLogin,
    getUserProgress,
    getUserProgressById,
    createUserProgress,
    updateUserProgress,
    deleteUserProgress,
};
