import React, { useEffect, useRef } from 'react';
import './Slogan.css';

const Slogan = () => {
    const sloganAccentRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Get the dimensions of the container and the coordinates of the mouse in the container
            const rectangle = containerRef.current.getBoundingClientRect();
            const xPosition = e.clientX - rectangle.left;
            const yPosition = e.clientY - rectangle.top;

            // Find the center of the container
            const xCenter = rectangle.width / 2;
            const yCenter = rectangle.height / 2;

            // Find the offset of the mouse from the center of the container
            const xOffset = (xPosition - xCenter) / 20;
            const yOffset = (yPosition - yCenter) / 20;

            // Dynamic text shadow offset and transform to create the effect
            const textShadow = `${xOffset}px ${yOffset}px 5px #1c1e26`;
            const transform = `translate(${xOffset * 0.2}px, ${
                yOffset * 0.2
            }px)`;

            // Update the styles
            sloganAccentRef.current.style.textShadow = textShadow;
            sloganAccentRef.current.style.transform = transform;
        };

        // Reset the styles when the mouse leaves the container
        const handleMouseLeave = () => {
            sloganAccentRef.current.style.textShadow = 'none';
        };

        // Event listeners
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners
        return () => {
            containerRef?.current?.removeEventListener(
                'mousemove',
                handleMouseMove,
            );
            containerRef?.current?.removeEventListener(
                'mouseleave',
                handleMouseLeave,
            );
        };
    }, []);

    return (
        <div className='slogan-container' ref={containerRef}>
            <div className='slogan'>Unleash Your Inner</div>
            <div className='slogan slogan-accent' ref={sloganAccentRef}>
                Terminal Pro
            </div>
        </div>
    );
};

export default Slogan;
