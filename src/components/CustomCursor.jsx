import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        // Hide default cursor globally for a consistent experience if we want the custom one everywhere
        document.body.classList.add('hide-default-cursor');

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.classList.remove('hide-default-cursor');
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            <motion.div
                className="custom-cursor-dot-contrast"
                style={{
                    left: cursorX,
                    top: cursorY,
                }}
            />
        </div>
    );
};

export default CustomCursor;
