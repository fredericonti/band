import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                const x = e.clientX;
                const y = e.clientY;
                // Usando left/top em vez de translate para evitar criação de camada compositora
                // que às vezes impede o mix-blend-mode de interagir com o que está atrás.
                cursorRef.current.style.left = `${x}px`;
                cursorRef.current.style.top = `${y}px`;
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.classList.add('hide-default-cursor');

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.classList.remove('hide-default-cursor');
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            <div
                ref={cursorRef}
                className="custom-cursor-dot-difference"
            />
        </div>
    );
};

export default CustomCursor;
