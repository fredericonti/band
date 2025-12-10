import React from 'react';
import { X, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import './BookingSheet.css';

const BookingSheet = ({ band, onClose, onSelectOption }) => {
    if (!band) return null;

    return (
        <div className="sheet-overlay" onClick={onClose}>
            <div className="sheet-content" onClick={e => e.stopPropagation()}>
                <div className="sheet-header">
                    <h3>Contratar {band.name}</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="sheet-body">
                    <p className="sheet-subtitle">Como você prefere iniciar a conversa?</p>

                    <div className="contact-options">
                        <button className="contact-option" onClick={() => onSelectOption('email')}>
                            <div className="icon-box">
                                <Mail size={24} />
                            </div>
                            <div className="option-info">
                                <span className="option-title">Via E-mail</span>
                                <span className="option-desc">Proposta formal enviada para o contato da banda.</span>
                            </div>
                        </button>

                        <button className="contact-option" onClick={() => onSelectOption('whatsapp')}>
                            <div className="icon-box">
                                <MessageCircle size={24} />
                            </div>
                            <div className="option-info">
                                <span className="option-title">WhatsApp da Banda</span>
                                <span className="option-desc">Mensagem automática para o grupo da banda.</span>
                            </div>
                        </button>

                        <button className="contact-option" onClick={() => onSelectOption('sms')}>
                            <div className="icon-box">
                                <MessageSquare size={24} />
                            </div>
                            <div className="option-info">
                                <span className="option-title">SMS Broadcast</span>
                                <span className="option-desc">Alerta urgente via SMS para todos os membros.</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSheet;
