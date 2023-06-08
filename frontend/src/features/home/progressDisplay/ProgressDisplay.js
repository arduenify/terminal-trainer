import React, { useEffect, useState } from 'react';
import { useFetchHomepageStatsQuery } from '../../../store/api';

const ProgressDisplay = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalExercisesCompleted, setTotalExercisesCompleted] = useState(0);
    const [totalBadgesEarned, setTotalBadgesEarned] = useState(0);

    const {
        data: fetchedStats,
        isLoading,
        isFetching,
    } = useFetchHomepageStatsQuery();

    const animateValue = (setter, targetValue, duration) => {
        const startTime = Date.now();

        const updateValue = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            setter(Math.round(progress * targetValue));

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        requestAnimationFrame(updateValue);
    };

    useEffect(() => {
        if (isLoading || isFetching) return;

        const {
            totalUsers: fetchedUsers,
            totalExercises: fetchedExercises,
            totalBadges: fetchedBadges,
        } = fetchedStats || {};

        animateValue(setTotalUsers, fetchedUsers, 1200);
        animateValue(setTotalExercisesCompleted, fetchedExercises, 1550);
        animateValue(setTotalBadgesEarned, fetchedBadges, 1900);
    }, [fetchedStats, isLoading, isFetching]);

    return (
        <div className='progress-container'>
            <div className='progress-item'>
                <div className='progress-circle users'>
                    <span className='progress-number'>{totalUsers}</span>
                </div>
                <p>Future Terminal Pros</p>
            </div>
            <div className='progress-item'>
                <div className='progress-circle posts'>
                    <span className='progress-number'>
                        {totalExercisesCompleted}
                    </span>
                </div>
                <p>Total Exercises Completions</p>
            </div>
            <div className='progress-item'>
                <div className='progress-circle comments'>
                    <span className='progress-number'>{totalBadgesEarned}</span>
                </div>
                <p>Total Badges Earned</p>
            </div>
        </div>
    );
};

export default ProgressDisplay;
