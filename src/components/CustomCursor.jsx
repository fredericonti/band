import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e) => {
            // Centraliza o cursor (ponto de 20px -> subtrai 10px)
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
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
                className="custom-cursor-dot-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
        </div>
    );
};

export default CustomCursor;
