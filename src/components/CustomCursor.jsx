import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e) => {
            // Subtract half of the dot size (10px / 2 = 5px) to center it
            cursorX.set(e.clientX - 5);
            cursorY.set(e.clientY - 5);
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.classList.add('hide-default-cursor');

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.classList.remove('hide-default-cursor');
        };
    }, [cursorX, cursorY]);

    return (
        <div className="custom-cursor-container">
            <motion.div
                className="custom-cursor-dot-contrast"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
        </div>
    );
};

export default CustomCursor;
