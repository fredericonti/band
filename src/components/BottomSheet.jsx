import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, onSubmit, title = "Adicionar Integrante" }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: ''
    });

    useEffect(() => {
        if (isOpen) {
            // Reset form when opened
            setFormData({ name: '', role: '' });
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim() && formData.role.trim()) {
            onSubmit(formData);
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="bottomsheet-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        className="bottomsheet-container"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        {/* Handle */}
                        <div className="bottomsheet-handle" />

                        {/* Header */}
                        <div className="bottomsheet-header">
                            <h2 className="bottomsheet-title">{title}</h2>
                            <button
                                type="button"
                                className="bottomsheet-close"
                                onClick={onClose}
                                aria-label="Fechar"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <form onSubmit={handleSubmit} className="bottomsheet-content">
                            <div className="bottomsheet-form-group">
                                <label htmlFor="member-name" className="bottomsheet-label">
                                    Nome do Integrante
                                </label>
                                <input
                                    id="member-name"
                                    type="text"
                                    name="name"
                                    className="bottomsheet-input"
                                    placeholder="Digite o nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className="bottomsheet-form-group">
                                <label htmlFor="member-role" className="bottomsheet-label">
                                    Instrumento / Função
                                </label>
                                <input
                                    id="member-role"
                                    type="text"
                                    name="role"
                                    className="bottomsheet-input"
                                    placeholder="Ex: Guitarra, Vocal, Bateria"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="bottomsheet-actions">
                                <button
                                    type="button"
                                    className="btn btn-outline btn-block"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={!formData.name.trim() || !formData.role.trim()}
                                >
                                    Adicionar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet;
