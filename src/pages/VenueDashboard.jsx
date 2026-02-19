import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingDown,
    Calendar,
    FileText,
    DollarSign,
    ArrowUpRight,
    Users,
    Download,
    Plus,
    Clock,
    AlertCircle
} from 'lucide-react';
import './VenueDashboard.css';

const VenueDashboard = () => {
    // Mock data for MVP
    const stats = {
        totalShows: 14,
        totalSpent: 16800,
        avgPerShow: 1200,
        pendingPayments: 3
    };

    const nextShows = [
        {
            id: 1,
            date: '12 Jan',
            artist: 'The Midnight Echo',
            amount: 1200,
            status: 'Confirmado',
            time: '20:00'
        },
        {
            id: 2,
            date: '14 Jan',
            artist: 'Jazz Trio',
            amount: 1500,
            status: 'Pendente',
            time: '19:30'
        }
    ];

    const invoices = [
        { id: 1001, month: 'Dezembro 2025', amount: 14200, status: 'Paga' },
        { id: 1002, month: 'Janeiro 2026', amount: 16800, status: 'A vencer (10/02)' }
    ];

    return (
        <div className="dashboard-page container">
            <header className="dashboard-header">
                <div>
                    <h1 className="editorial-title">ESTABELECIMENTO</h1>
                    <p className="text-muted">Acompanhe seus eventos e finanças no Tonare.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-outline btn-sm">CONTRATADOS</button>
                    <button className="btn btn-primary btn-sm"><Plus size={18} /> NOVO SHOW</button>
                </div>
            </header>

            {/* QUICK STATS */}
            <div className="stats-grid">
                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="stat-label">INVESTIMENTO TOTAL (MÊS)</div>
                    <div className="stat-value">R$ {stats.totalSpent.toLocaleString()}</div>
                    <div className="stat-meta">
                        <FileText size={14} /> Fatura única em 10/02
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="stat-label">SHOWS NO PERÍODO</div>
                    <div className="stat-value">{stats.totalShows}</div>
                    <div className="stat-meta">
                        Média de R$ {stats.avgPerShow.toLocaleString()} por show
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="stat-label">PENDÊNCIAS</div>
                    <div className="stat-value">{stats.pendingPayments}</div>
                    <div className="stat-meta warning">
                        Aguardando confirmação de artista
                    </div>
                </motion.div>
            </div>

            <div className="dashboard-content-grid">
                {/* UPCOMING SHOWS */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2>AGENDA DE SHOWS</h2>
                        <button className="btn-black-outline">VER CALENDÁRIO</button>
                    </div>
                    <div className="shows-list">
                        {nextShows.map(show => (
                            <div key={show.id} className="show-item-card">
                                <div className="show-date-box">
                                    <span className="day">{show.date.split(' ')[0]}</span>
                                    <span className="month">{show.date.split(' ')[1]}</span>
                                </div>
                                <div className="show-info">
                                    <h4>{show.artist}</h4>
                                    <p><Clock size={12} /> {show.time} • R$ {show.amount.toLocaleString()}</p>
                                </div>
                                <div className="show-status">
                                    <span className={`status-badge ${show.status === 'Confirmado' ? 'active' : ''}`}>
                                        {show.status}
                                    </span>
                                </div>
                                <div className="show-actions">
                                    <button className="btn-black-outline">MENSAGEM</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* INVOICES */}
                <section className="dashboard-section secondary">
                    <div className="section-header">
                        <h2>FATURAMENTO CONSOLIDADO</h2>
                    </div>
                    <div className="history-table">
                        {invoices.map(inv => (
                            <div key={inv.id} className="history-row">
                                <div className="history-main">
                                    <span className="history-date">FATURA #{inv.id}</span>
                                    <span className="history-venue">{inv.month}</span>
                                </div>
                                <div className="history-meta">
                                    <span className="history-type" style={{ color: inv.status.includes('Paga') ? '#10b981' : '#f59e0b' }}>
                                        {inv.status}
                                    </span>
                                    <span className="history-amount">R$ {inv.amount.toLocaleString()}</span>
                                    <button className="btn-icon"><Download size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="billing-info-box mt-4">
                        <AlertCircle size={20} />
                        <p>O Tonare consolida todos os shows do mês em uma única fatura mensal, simplificando sua contabilidade.</p>
                    </div>
                </section>
            </div>

            {/* INFRASTRUCTURE PREVIEW */}
            <section className="split-preview-section">
                <div className="split-card venue-infra">
                    <div className="split-info">
                        <h3>Gestão de Infraestrutura</h3>
                        <p>Mantenha sua lista de equipamentos atualizada para atrair os melhores artistas.</p>
                        <div className="member-bubbles">
                            <div className="member-bubble">SOM PA ✓</div>
                            <div className="member-bubble">MESA DIGITAL ✓</div>
                            <div className="member-bubble">ILUMINAÇÃO ✓</div>
                            <div className="member-bubble">PALCO 4x3m</div>
                        </div>
                    </div>
                    <button className="btn-black-outline">EDITAR EQUIPAMENTOS</button>
                </div>
            </section>
        </div>
    );
};

export default VenueDashboard;
