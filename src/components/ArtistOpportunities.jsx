import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Music, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import SideSheet from './SideSheet';
import './ArtistOpportunities.css';

const ArtistOpportunities = ({ artistId, artistGenre, artistBaseCache }) => {
    const [opportunities, setOpportunities] = useState([]);
    const [invites, setInvites] = useState([]);
    const [filter, setFilter] = useState('all'); // all, opportunities, invites
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '', type: 'info' });

    // Mock data - replace with real database queries
    useEffect(() => {
        // Fetch opportunities that match artist profile
        const mockOpportunities = [
            {
                id: 1,
                venueId: 1,
                venueName: 'Blue Note São Paulo',
                venueLocation: 'Bela Vista, SP',
                date: '2025-12-15',
                genre: 'Jazz',
                budget: 1500,
                startTime: '20:00',
                applicants: 2,
                venueRating: 4.9
            },
            {
                id: 2,
                venueId: 2,
                venueName: 'Bourbon Street Music Club',
                venueLocation: 'Moema, SP',
                date: '2025-12-20',
                genre: 'Rock',
                budget: 2000,
                startTime: '21:00',
                applicants: 5,
                venueRating: 4.8
            }
        ];

        // Filter: only show if genre matches AND budget >= base cache
        const filtered = mockOpportunities.filter(
            opp => opp.genre === artistGenre && opp.budget >= artistBaseCache
        );
        setOpportunities(filtered);

        // Mock direct invites
        const mockInvites = [
            {
                id: 3,
                venueId: 3,
                venueName: 'Cine Joia',
                venueLocation: 'Liberdade, SP',
                date: '2025-12-18',
                budget: 1800,
                startTime: '22:00',
                message: 'Adoramos seu trabalho! Gostaríamos de ter vocês aqui.',
                status: 'pending'
            }
        ];
        setInvites(mockInvites);
    }, [artistGenre, artistBaseCache]);

    const handleApply = (opportunityId) => {
        console.log('Applying to opportunity:', opportunityId);
        setNotification({
            isOpen: true,
            title: 'CANDIDATURA REALIZADA',
            message: 'Sua candidatura foi enviada com sucesso! O estabelecimento será notificado e você receberá uma resposta em breve.',
            type: 'success'
        });
    };

    const handleAcceptInvite = (inviteId) => {
        console.log('Accepting invite:', inviteId);
        setNotification({
            isOpen: true,
            title: 'CONVITE ACEITO',
            message: 'Você aceitou o convite! O show foi adicionado à sua agenda. Aguardando confirmação de pagamento pelo estabelecimento.',
            type: 'success'
        });
    };

    const handleDeclineInvite = (inviteId) => {
        console.log('Declining invite:', inviteId);
        setNotification({
            isOpen: true,
            title: 'CONVITE RECUSADO',
            message: 'O convite foi recusado. O estabelecimento será notificado.',
            type: 'warning'
        });
    };

    const filteredData = filter === 'invites' ? [] : opportunities;
    const showInvites = filter === 'invites' || filter === 'all';

    return (
        <div className="artist-opportunities-container">
            <div className="opportunities-header">
                <h2>OPORTUNIDADES</h2>
                <div className="filter-tabs">
                    <button
                        className={`tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        TODAS
                    </button>
                    <button
                        className={`tab ${filter === 'opportunities' ? 'active' : ''}`}
                        onClick={() => setFilter('opportunities')}
                    >
                        VAGAS ABERTAS ({opportunities.length})
                    </button>
                    <button
                        className={`tab ${filter === 'invites' ? 'active' : ''}`}
                        onClick={() => setFilter('invites')}
                    >
                        CONVITES ({invites.length})
                    </button>
                </div>
            </div>

            {/* Direct Invites Section */}
            {showInvites && invites.length > 0 && (
                <div className="invites-section">
                    <h3 className="section-title">
                        <TrendingUp size={20} />
                        CONVITES DIRETOS
                    </h3>
                    {invites.map(invite => (
                        <motion.div
                            key={invite.id}
                            className="invite-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="invite-header">
                                <div className="invite-venue">
                                    <h4>{invite.venueName}</h4>
                                    <div className="invite-meta">
                                        <MapPin size={14} />
                                        <span>{invite.venueLocation}</span>
                                    </div>
                                </div>
                                <div className="invite-value">
                                    R$ {invite.budget.toLocaleString()}
                                </div>
                            </div>

                            <div className="invite-details">
                                <div className="detail-item">
                                    <Calendar size={16} />
                                    <span>{new Date(invite.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                </div>
                                <div className="detail-item">
                                    <Clock size={16} />
                                    <span>{invite.startTime}</span>
                                </div>
                            </div>

                            {invite.message && (
                                <div className="invite-message">
                                    <p>"{invite.message}"</p>
                                </div>
                            )}

                            <div className="invite-actions">
                                <button
                                    className="btn btn-outline"
                                    onClick={() => handleDeclineInvite(invite.id)}
                                >
                                    RECUSAR
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAcceptInvite(invite.id)}
                                >
                                    ACEITAR CONVITE
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Open Opportunities Section */}
            {(filter === 'all' || filter === 'opportunities') && (
                <div className="opportunities-section">
                    {filter !== 'all' && (
                        <h3 className="section-title">
                            <Music size={20} />
                            VAGAS QUE COMBINAM COM VOCÊ
                        </h3>
                    )}

                    {opportunities.length === 0 ? (
                        <div className="empty-state">
                            <Music size={48} />
                            <p>Nenhuma oportunidade disponível no momento.</p>
                            <small>Novas vagas que combinam com seu perfil aparecerão aqui.</small>
                        </div>
                    ) : (
                        <div className="opportunities-list">
                            {opportunities.map((opp, index) => (
                                <motion.div
                                    key={opp.id}
                                    className="opportunity-row"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <div className="opp-date">
                                        <span className="date-day">
                                            {new Date(opp.date).getDate()}
                                        </span>
                                        <span className="date-month">
                                            {new Date(opp.date).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="opp-venue">
                                        <h4>{opp.venueName}</h4>
                                        <div className="opp-meta">
                                            <span className="location">
                                                <MapPin size={12} />
                                                {opp.venueLocation}
                                            </span>
                                            <span className="genre-tag">{opp.genre}</span>
                                        </div>
                                    </div>

                                    <div className="opp-details">
                                        <div className="opp-time">
                                            <Clock size={14} />
                                            {opp.startTime}
                                        </div>
                                        {opp.applicants > 0 && (
                                            <div className="opp-applicants">
                                                {opp.applicants} candidatos
                                            </div>
                                        )}
                                    </div>

                                    <div className="opp-value">
                                        <DollarSign size={18} />
                                        <span className="value-amount">
                                            {opp.budget.toLocaleString()}
                                        </span>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-apply"
                                        onClick={() => handleApply(opp.id)}
                                    >
                                        APLICAR
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <SideSheet
                isOpen={notification.isOpen}
                onClose={() => setNotification({ ...notification, isOpen: false })}
                title={notification.title}
                type={notification.type}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{notification.message}</p>
                </div>
                <button
                    className="btn btn-primary btn-block"
                    onClick={() => setNotification({ ...notification, isOpen: false })}
                >
                    OK
                </button>
            </SideSheet>
        </div>
    );
};

export default ArtistOpportunities;
