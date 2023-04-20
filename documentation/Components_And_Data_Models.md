# Application Components and Data Models

This section describes the key components and data models in Terminal Trainer, outlining their structure, relationships, and functionalities.

## 4.1 Components

### 4.1.1 User Profiles

User profiles store essential information about each user, including their progress, achievements, and preferred terminal environment. The User component will have the following attributes:

- `id`: Unique identifier for the user
- `username`: Unique username chosen by the user
- `email`: User's email address
- `password`: User's encrypted password
- `firstName`: User's first name
- `lastName`: User's last name
- `terminalTheme`: User's preferred terminal theme or color scheme
- `achievements`: A list of badges or achievements earned by the user
- `progress`: A list of user progress data, including scores, hints used, and time spent on exercises
- `role`: The user's role, either "admin" or "user" (default: "user")
- `createdAt`: Timestamp indicating when the user account was created
- `updatedAt`: Timestamp indicating when the user account was last updated

### 4.1.2 Exercises

Exercises are the interactive challenges that users complete to improve their command-line skills. The Exercise component will have the following attributes:

- `id`: Unique identifier for the exercise
- `title`: A descriptive title for the exercise
- `description`: A brief explanation of the exercise's purpose and objectives
- `category`: The command-line skill category to which the exercise belongs (e.g., navigation, file management, scripting)
- `difficulty`: The difficulty level of the exercise (e.g., beginner, intermediate, advanced)
- `prerequisites`: A list of prerequisite exercises or concepts that the user should complete before attempting the exercise
- `hints`: A list of hints or suggestions to help users if they get stuck on the exercise
- `solution`: The correct command or sequence of commands to complete the exercise
- `createdAt`: Timestamp indicating when the exercise was created
- `updatedAt`: Timestamp indicating when the exercise was last updated

### 4.1.3 User Progress

User progress data tracks each user's performance and completion status for each exercise. The UserProgress component will have the following attributes:

- `id`: Unique identifier for the user progress entry
- `userId`: Unique identifier of the associated user
- `exerciseId`: Unique identifier of the associated exercise
- `score`: The user's score for the exercise
- `hintsUsed`: The number of hints used by the user during the exercise
- `timeSpent`: The amount of time the user spent on the exercise
- `completed`: A boolean value indicating whether the user has completed the exercise
- `createdAt`: Timestamp indicating when the user progress entry was created
- `updatedAt`: Timestamp indicating when the user progress entry was last updated

### 4.1.4 Badges

Badges are awarded to users upon completing specific tasks or reaching milestones. The Badge component will have the following attributes:

- `id`: Unique identifier for the badge
- `name`: A descriptive name for the badge
- `description`: A brief explanation of the badge's purpose and the criteria for earning it
- `icon`: A visual representation of the badge, such as an image or emoji
- `criteria`: A list of conditions or milestones that must be met for the user to earn the badge
- `createdAt`: Timestamp indicating when the badge was created
- `updatedAt`: Timestamp indicating when the badge was last updated

### 4.2 Data Models and Relationships

The following data models and relationships are crucial for managing the various components of Terminal Trainer:

- `User`: Represents a user account, with a one-to-many relationship to UserProgress (each user can have multiple progress entries) and a many-to-many relationship to Badges (each user can earn multiple badges, and each badge can be earned by multiple users).

- `Exercise`: Represents an interactive challenge, with a one-to-many relationship to UserProgress (each exercise can have multiple progress entries from different users).

- `UserProgress`: Represents a user's performance and completion status for a specific exercise. This data model has a many-to-one relationship with both User (each progress entry belongs to one user) and Exercise (each progress entry corresponds to one exercise).

- `Badge`: Represents an achievement or milestone, with a many-to-many relationship to User (each badge can be earned by multiple users, and each user can earn multiple badges).

By establishing these data models and relationships, Terminal Trainer can effectively manage user accounts, exercises, progress data, and achievements. This structure also allows for easy querying and updating of data, as well as the potential for future expansion and the addition of new features or components.
