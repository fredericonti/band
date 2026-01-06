import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ShieldAlert, DollarSign, Info } from 'lucide-react';
import './AnticipationModal.css';

const AnticipationModal = ({ isOpen, onClose, showData }) => {
    const [step, setStep] = useState(1); // 1: Calculation, 2: Terms, 3: Confirmation
    const [agreed, setAgreed] = useState(false);
    const [awareOfPenalty, setAwareOfPenalty] = useState(false);

    if (!showData) return null;

    const gross = showData.amount;
    const platformFee = gross * 0.15;
    const anticipationFee = gross * 0.02;
    const net = gross - platformFee - anticipationFee;

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = () => {
        // Mock submission
        setStep(3);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="modal-container"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    >
                        <button className="modal-close" onClick={onClose}><X size={20} /></button>

                        {step === 1 && (
                            <div className="modal-step">
                                <h2 className="modal-title">ANTECIPAR CACHÊ</h2>
                                <p className="modal-subtitle">Receba seu pagamento 24h antes do show no {showData.venue}.</p>

                                <div className="calculation-box">
                                    <div className="calc-row">
                                        <span>Valor Bruto</span>
                                        <span>R$ {gross.toLocaleString()}</span>
                                    </div>
                                    <div className="calc-row text-muted">
                                        <span>Taxa Tonare (15%)</span>
                                        <span>- R$ {platformFee.toLocaleString()}</span>
                                    </div>
                                    <div className="calc-row text-muted">
                                        <span>Taxa Antecipação (2%)</span>
                                        <span>- R$ {anticipationFee.toLocaleString()}</span>
                                    </div>
                                    <div className="calc-divider" />
                                    <div className="calc-row net-row">
                                        <span>VALOR LÍQUIDO</span>
                                        <span className="net-value">R$ {net.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <Info size={18} />
                                    <p>O depósito será realizado em sua conta verificada em até D+1 útil após a confirmação.</p>
                                </div>

                                <button className="btn btn-primary btn-full mt-4" onClick={handleNext}>
                                    CONTINUAR PARA TERMOS <ArrowRight size={18} />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="modal-step">
                                <div className="terms-header">
                                    <ShieldAlert size={32} className="warning-icon" />
                                    <h2 className="modal-title">TERMOS DE COMPROMISSO</h2>
                                </div>

                                <div className="terms-content">
                                    <h4>1. Obrigatoriedade de Comparecimento</h4>
                                    <p>Ao antecipar o cachê, você se compromete irrevogavelmente a comparecer e realizar a apresentação na data e hora marcadas.</p>

                                    <h4>2. Penalidades por Não Comparecimento</h4>
                                    <p>O não comparecimento sem justificativa médica comprovada resultará em:</p>
                                    <ul>
                                        <li>Devolução imediata do valor integral (R$ {gross.toLocaleString()})</li>
                                        <li>Multa de 50% sobre o valor do cachê</li>
                                        <li>Suspensão ou banimento permanente da plataforma</li>
                                    </ul>

                                    <h4>3. Justificativas Aceitas</h4>
                                    <p>Apenas emergências médicas com atestado, acidentes graves ou falecimento em família próxima.</p>
                                </div>

                                <div className="terms-check-list">
                                    <label className="checkbox-item">
                                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                                        <span>Li e compreendo todos os termos e obrigações.</span>
                                    </label>
                                    <label className="checkbox-item">
                                        <input type="checkbox" checked={awareOfPenalty} onChange={(e) => setAwareOfPenalty(e.target.checked)} />
                                        <span>Estou ciente das penalidades por não comparecimento.</span>
                                    </label>
                                </div>

                                <div className="modal-footer-actions">
                                    <button className="btn btn-outline" onClick={handleBack}>VOLTAR</button>
                                    <button
                                        className="btn btn-primary"
                                        disabled={!agreed || !awareOfPenalty}
                                        onClick={handleSubmit}
                                    >
                                        CONFIRMAR ANTECIPAÇÃO
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="modal-step text-center">
                                <div className="success-icon-box">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 12 }}
                                    >
                                        <Check size={48} color="#10b981" />
                                    </motion.div>
                                </div>
                                <h2 className="modal-title">SOLICITAÇÃO REALIZADA!</h2>
                                <p className="modal-subtitle">
                                    O valor de <strong>R$ {net.toLocaleString()}</strong> está sendo processado e será enviado para sua conta em breve.
                                </p>
                                <button className="btn btn-primary btn-full mt-4" onClick={onClose}>
                                    FECHAR
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AnticipationModal;
