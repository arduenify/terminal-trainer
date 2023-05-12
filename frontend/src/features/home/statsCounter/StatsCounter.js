import React, { useEffect, useState } from 'react';
import './StatsCounter.css';

const StatsCounter = ({ title, value }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState(circumference);
    const radiusBackground = 62;
    const radiusProgress = 50;

    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        if (start === end) return;

        let totalMilSecDur = 75;
        let minInterval = 3; // minimum interval time

        const updateProgress = () => {
            start += 1;
            setCount(start);
            // decrease progress from circumference to 0
            setProgress(circumference - (start / end) * circumference);

            if (start < end) {
                let progressRatio = start / end;
                let incrementTime = totalMilSecDur * Math.pow(progressRatio, 2);
                incrementTime = Math.max(incrementTime, minInterval);
                setTimeout(updateProgress, incrementTime);
            }
        };

        setTimeout(updateProgress, minInterval);
    }, [value]);

    return (
        <div className='stats-container'>
            <div className='stats-title'>{title}</div>
            <div className='circle-container'>
                <svg className='progress-ring' width='130' height='130'>
                    <defs>
                        <linearGradient
                            id='gradient'
                            x1='0%'
                            y1='0%'
                            x2='100%'
                            y2='0%'
                        >
                            <stop
                                offset='0%'
                                style={{ stopColor: '#ff00cc', stopOpacity: 1 }}
                            />
                            <stop
                                offset='100%'
                                style={{ stopColor: '#333399', stopOpacity: 1 }}
                            />
                        </linearGradient>
                    </defs>
                    <circle
                        className='progress-ring__circle'
                        stroke='white'
                        strokeWidth='4'
                        fill='transparent'
                        r={radiusBackground}
                        cx='65'
                        cy='65'
                    />
                    <circle
                        className='progress-ring__circle-progress'
                        stroke='lightgreen'
                        strokeWidth='8'
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={progress}
                        fill='transparent'
                        r={radiusProgress}
                        cx='65'
                        cy='65'
                    />
                </svg>
                <div className='stats-counter'>{count}</div>
            </div>
        </div>
    );
};

export default StatsCounter;
