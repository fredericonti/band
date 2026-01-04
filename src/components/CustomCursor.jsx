import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 }); // Onde o mouse está
    const delayedPos = useRef({ x: 0, y: 0 }); // Onde o cursor está (suavizado)
    const scale = useRef(1); // Escala atual
    const targetScale = useRef(1); // Escala desejada (clique)
    const rafId = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseDown = () => targetScale.current = 0.75;
        const onMouseUp = () => targetScale.current = 1;

        const updateAnimation = () => {
            const lerpFactor = 0.15;

            // Suavização da posição
            delayedPos.current.x += (mousePos.current.x - delayedPos.current.x) * lerpFactor;
            delayedPos.current.y += (mousePos.current.y - delayedPos.current.y) * lerpFactor;

            // Suavização da escala (clique)
            scale.current += (targetScale.current - scale.current) * lerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.transform =
                    `translate3d(${delayedPos.current.x}px, ${delayedPos.current.y}px, 0) 
                     translate(-50%, -50%) 
                     scale(${scale.current})`;
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

    // Renderizado sem container para não isolar o mix-blend-mode
    return <div ref={cursorRef} className="custom-cursor-dot-difference" />;
};

export default CustomCursor;
