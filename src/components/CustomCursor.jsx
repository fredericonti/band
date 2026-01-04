import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const delayedPos = useRef({ x: 0, y: 0 });
    const scale = useRef(1);
    const targetScale = useRef(1);
    const rafId = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseDown = () => (targetScale.current = 0.75);
        const onMouseUp = () => (targetScale.current = 1);

        const updateAnimation = () => {
            const lerpFactor = 0.4;

            // Smooth position
            delayedPos.current.x += (mousePos.current.x - delayedPos.current.x) * lerpFactor;
            delayedPos.current.y += (mousePos.current.y - delayedPos.current.y) * lerpFactor;

            // Smooth scale
            scale.current += (targetScale.current - scale.current) * lerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${delayedPos.current.x}px, ${delayedPos.current.y}px, 0) translate(-50%, -50%) scale(${scale.current})`;
            }

            rafId.current = requestAnimationFrame(updateAnimation);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        rafId.current = requestAnimationFrame(updateAnimation);
        document.body.classList.add('hide-default-cursor');

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(rafId.current);
            document.body.classList.remove('hide-default-cursor');
        };
    }, []);

    // Create a Portal to render the cursor outside of the main app container
    // to avoid any container-level CSS that might create an isolation context.
    return ReactDOM.createPortal(
        <div ref={cursorRef} className="custom-cursor-dot-difference" />,
        document.body
    );
};

export default CustomCursor;
