import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isOverCard, setIsOverCard] = useState(false);

    const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
    const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const card = target.closest('.showcase-card, .bento-item, .split-pane, .band-card, .venue-card, .artist-card, .card');

            if (card) {
                setIsOverCard(true);
                document.body.classList.add('hide-default-cursor');
            } else {
                setIsOverCard(false);
                document.body.classList.remove('hide-default-cursor');
            }

            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.classList.remove('hide-default-cursor');
        };
    }, [cursorX, cursorY]);

    if (!isOverCard) return null;

    return (
        <div className="custom-cursor-container">
            <motion.div
                className="custom-cursor-dot"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
            />
            <motion.div
                className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1.2,
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)',
                }}
            />
        </div>
    );
};

export default CustomCursor;
