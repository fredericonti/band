import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, AlertCircle, CheckCircle } from 'lucide-react';
import './SideSheet.css';

const SideSheet = ({
    isOpen,
    onClose,
    title,
    children,
    type = 'info', // 'info', 'success', 'warning', 'error'
    footer
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle className="text-success" size={24} />;
            case 'warning': return <AlertCircle className="text-warning" size={24} />;
            case 'error': return <AlertCircle className="text-error" size={24} />;
            default: return <Info className="text-info" size={24} />;
        }
    };

    const variants = {
        hidden: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 },
        visible: isMobile ? { y: 0, x: 0 } : { x: 0, y: 0 },
        exit: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="sidesheet-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={`sidesheet-container ${isMobile ? 'bottom-sheet' : 'side-sheet'}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="sidesheet-header">
                            <div className="title-group">
                                {type !== 'info' && <span className="type-icon">{getIcon()}</span>}
                                <h2>{title}</h2>
                            </div>
                            <button className="sidesheet-close" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="sidesheet-content">
                            {children}
                        </div>

                        {footer && (
                            <div className="sidesheet-footer">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SideSheet;
