import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Calendar,
    Clock,
    DollarSign,
    ArrowUpRight,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Music,
    Users,
    Download
} from 'lucide-react';
import AnticipationModal from '../components/AnticipationModal';
import './ArtistDashboard.css';

const ArtistDashboard = () => {
    const [isAnticipationModalOpen, setIsAnticipationModalOpen] = React.useState(false);
    const [selectedShow, setSelectedShow] = React.useState(null);

    const handleOpenAnticipation = (show) => {
        setSelectedShow(show);
        setIsAnticipationModalOpen(true);
    };

    // Mock data for MVP
    const stats = {
        nextPayment: {
            date: '12 Jan 2026',
            venue: 'Bar do João',
            amount: 1200,
            status: 'advance_available',
            daysLeft: 6
        },
        monthTotal: {
            received: 4800,
            pending: 2400,
            change: '+15%'
        },
        advances: {
            count: 2,
            total: 2400
        }
    };

    const upcomingShows = [
        {
            id: 1,
            date: '12 Jan',
            venue: 'Bar do João',
            amount: 1200,
            status: 'Elegível para Antecipação',
            canAdvance: true
        },
        {
            id: 2,
            date: '18 Jan',
            venue: 'Blue Note SP',
            amount: 3500,
            status: 'Aguardando Show',
            canAdvance: false
        }
    ];

    const history = [
        { id: 101, date: '05 Jan', venue: 'The Pub', net: 980, type: 'Antecipado' },
        { id: 102, date: '28 Dec', venue: 'Jazz Mansion', net: 1500, type: 'Pós-Show' }
    ];

    return (
        <div className="dashboard-page container">
            <header className="dashboard-header">
                <div>
                    <h1 className="editorial-title">DASHBOARD</h1>
                    <p className="text-muted">Bem-vindo de volta, The Midnight Echo</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-outline btn-sm">CONFIGURAR SPLIT</button>
                    <button className="btn btn-primary btn-sm">EDITAR PERFIL</button>
                </div>
            </header>

            {/* QUICK STATS */}
            <div className="stats-grid">
                <motion.div
                    className="stat-card next-payment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="stat-label">PRÓXIMO RECEBIMENTO</div>
                    <div className="stat-value">R$ {stats.nextPayment.amount.toLocaleString()}</div>
                    <div className="stat-meta">
                        <Calendar size={14} /> {stats.nextPayment.date} • {stats.nextPayment.venue}
                    </div>
                    <div className="stat-footer">
                        <span className="badge-available">ANTECIPAÇÃO DISPONÍVEL</span>
                        <button
                            className="btn-text"
                            onClick={() => handleOpenAnticipation(stats.nextPayment)}
                        >
                            ANTECIPAR <ArrowUpRight size={16} />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="stat-label">TOTAL DO MÊS</div>
                    <div className="stat-value">R$ {stats.monthTotal.received.toLocaleString()}</div>
                    <div className="stat-meta success">
                        <TrendingUp size={14} /> {stats.monthTotal.change} vs mês anterior
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="stat-label">ANTECIPAÇÕES EM ABERTO</div>
                    <div className="stat-value">{stats.advances.count}</div>
                    <div className="stat-meta">
                        Total de R$ {stats.advances.total.toLocaleString()}
                    </div>
                </motion.div>
            </div>

            <div className="dashboard-content-grid">
                {/* UPCOMING SHOWS */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2>PRÓXIMOS SHOWS</h2>
                        <button className="btn-link">VER TUDO</button>
                    </div>
                    <div className="shows-list">
                        {upcomingShows.map(show => (
                            <div key={show.id} className="show-item-card">
                                <div className="show-date-box">
                                    <span className="day">{show.date.split(' ')[0]}</span>
                                    <span className="month">{show.date.split(' ')[1]}</span>
                                </div>
                                <div className="show-info">
                                    <h4>{show.venue}</h4>
                                    <p>R$ {show.amount.toLocaleString()}</p>
                                </div>
                                <div className="show-status">
                                    <span className={`status-badge ${show.canAdvance ? 'active' : ''}`}>
                                        {show.status}
                                    </span>
                                </div>
                                <div className="show-actions">
                                    {show.canAdvance ? (
                                        <button
                                            className="btn btn-primary btn-xs"
                                            onClick={() => handleOpenAnticipation(show)}
                                        >
                                            ANTECIPAR
                                        </button>
                                    ) : (
                                        <button className="btn btn-outline btn-xs">DETALHES</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RECENT HISTORY */}
                <section className="dashboard-section secondary">
                    <div className="section-header">
                        <h2>HISTÓRICO RECENTE</h2>
                    </div>
                    <div className="history-table">
                        {history.map(item => (
                            <div key={item.id} className="history-row">
                                <div className="history-main">
                                    <span className="history-date">{item.date}</span>
                                    <span className="history-venue">{item.venue}</span>
                                </div>
                                <div className="history-meta">
                                    <span className="history-type">{item.type}</span>
                                    <span className="history-amount">R$ {item.net.toLocaleString()}</span>
                                    <button className="btn-icon"><Download size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-outline btn-full mt-4">IR PARA PAGAMENTOS</button>
                </section>
            </div>

            {/* SPLIT CONFIG PREVIEW */}
            <section className="split-preview-section">
                <div className="split-card">
                    <div className="split-info">
                        <h3>Gestão de Split</h3>
                        <p>Configure como o cachê será distribuído automaticamente entre os membros.</p>
                        <div className="member-bubbles">
                            <div className="member-bubble">AT 40%</div>
                            <div className="member-bubble">JC 30%</div>
                            <div className="member-bubble">NH 15%</div>
                            <div className="member-bubble">MW 15%</div>
                        </div>
                    </div>
                    <button className="btn btn-outline">ACESSAR CONFIGURAÇÕES</button>
                </div>
            </section>

            <AnticipationModal
                isOpen={isAnticipationModalOpen}
                onClose={() => setIsAnticipationModalOpen(false)}
                showData={selectedShow}
            />
        </div>
    );
};

export default ArtistDashboard;
