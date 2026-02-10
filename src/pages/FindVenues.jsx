import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Star, TrendingUp, X, Users, Music, ArrowRight, Instagram, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FindVenues.css';

const MOCK_VENUES = [
    {
        id: 1,
        name: 'Blue Note São Paulo',
        location: 'Bela Vista, SP',
        description: 'Um dos clubes de jazz mais icônicos do mundo, agora em São Paulo. Oferecemos uma experiência intimista com acústica impecável e culinária de alta classe.',
        images: [
            // Modern jazz club vibe
            'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 156,
        availableForShows: true,
        rating: 4.9,
        topBands: ['Neon Pulse', 'The Midnight Jazz', 'Indie Souls'],
        capacity: 300,
        genres: ['Jazz', 'Blues', 'Soul'],
        tech: 'Sistema L-Acoustics, Mesa Yamaha CL5, 12 Auxiliares.',
        address: 'Av. Paulista, 2073 - 2º Andar - Conjunto Nacional'
    },
    {
        id: 2,
        name: 'Bourbon Street Music Club',
        location: 'Moema, SP',
        description: 'Inaugurado por B.B. King, o Bourbon Street é a casa do Blues e do Jazz no Brasil. Um ambiente que remete aos clássicos clubes de New Orleans.',
        images: [
            // New Orleans style
            'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 203,
        availableForShows: true,
        rating: 4.8,
        topBands: ['Crimson Rock', 'Acoustic Vibes', 'Samba de Raiz'],
        capacity: 450,
        genres: ['Rock', 'MPB', 'Samba'],
        tech: 'PA Completo, 4 Monitores, Iluminação DMX.',
        address: 'R. dos Chanés, 127 - Moema'
    },
    {
        id: 3,
        name: 'Cine Joia',
        location: 'Liberdade, SP',
        description: 'Um antigo cinema de rua transformado em uma das casas de show mais descoladas de SP. Projeções mapeadas e palco em formato de concha.',
        images: [
            // Old cinema look
            'https://images.unsplash.com/photo-1596356453261-0d265ae2520d?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 89,
        availableForShows: false,
        rating: 4.7,
        topBands: ['Neon Pulse', 'Indie Souls'],
        capacity: 600,
        genres: ['Eletrônica', 'Indie', 'Experimental'],
        tech: 'Mapping 3D, PA Digital, Camarim Completo.',
        address: 'Praça Carlos Gomes, 82 - Liberdade'
    },
    {
        id: 4,
        name: 'Casa Natura Musical',
        location: 'Pinheiros, SP',
        description: 'Um espaço dedicado à música brasileira em toda a sua diversidade. Sustentabilidade e conforto para artistas e público.',
        images: [
            // Intimate concert
            'https://images.unsplash.com/photo-1583795490981-d5ef5a5b5464?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 124,
        availableForShows: true,
        rating: 4.9,
        topBands: ['Acoustic Vibes', 'The Midnight Jazz'],
        capacity: 200,
        genres: ['Acústico', 'MPB', 'Jazz'],
        tech: 'Acústica Variável, Backline Premium.',
        address: 'R. Artur de Azevedo, 2134 - Pinheiros'
    },
    {
        id: 5,
        name: 'Audio',
        location: 'Água Branca, SP',
        description: 'Espaço multiuso para grandes shows e eventos. Infraestrutura de ponta e localização privilegiada no coração da Barra Funda.',
        images: [
            // Big stage
            'https://images.unsplash.com/photo-1506157786151-b8491531f436?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 267,
        availableForShows: true,
        rating: 4.8,
        topBands: ['Crimson Rock', 'Neon Pulse', 'Indie Souls'],
        capacity: 800,
        genres: ['Rock', 'Eletrônica', 'Metal'],
        tech: 'Line Array, Ground Stack, LED Wall.',
        address: 'Av. Francisco Matarazzo, 694 - Água Branca'
    },
    {
        id: 6,
        name: 'Bar Brahma',
        location: 'Centro, SP',
        description: 'O cruzamento mais famoso de São Paulo. História, boemia e o melhor do Samba e MPB todos os dias.',
        images: [
            // Bar vibe
            'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 412,
        availableForShows: true,
        rating: 4.9,
        topBands: ['Samba de Raiz', 'Acoustic Vibes', 'The Midnight Jazz'],
        capacity: 150,
        genres: ['Samba', 'MPB', 'Choro'],
        tech: 'Sistema Compacto, Perfeito para Acústicos.',
        address: 'Av. São João, 677 - Centro Histórico'
    }
];

const SideSheet = ({ venue, onClose }) => {
    if (!venue) return null;

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="venue-sidesheet"
        >
            <button className="close-sheet" onClick={onClose}><X size={28} /></button>

            <div className="sheet-image-hero" style={{ backgroundImage: `url(${venue.images[0]})` }}>
                <div className="sheet-rating-pill">
                    <Star size={18} fill="currentColor" /> {venue.rating}
                </div>
            </div>

            <div className="sheet-body-modern">
                <div className="sheet-header-sticky">
                    <span className="sheet-location-vertical">{venue.location.toUpperCase()}</span>
                    <h2 className="sheet-title-mega">{venue.name}</h2>
                </div>

                <div className="info-grid-premium">
                    <div className="info-item-box">
                        <span className="info-item-label">CAPACIDADE</span>
                        <div className="info-item-value">
                            <Users size={22} strokeWidth={1.5} />
                            <span>{venue.capacity} PESSOAS</span>
                        </div>
                    </div>
                    <div className="info-item-box">
                        <span className="info-item-label">EXPERIÊNCIA</span>
                        <div className="info-item-value">
                            <TrendingUp size={22} strokeWidth={1.5} />
                            <span>{venue.totalShows} SHOWS</span>
                        </div>
                    </div>
                </div>

                <p className="sheet-description-pro">{venue.description}</p>

                <div className="sheet-section">
                    <span className="section-label-minimal">ESTILOS PREFERIDOS</span>
                    <div className="tags-modern-flex">
                        {venue.genres.map(g => <span key={g} className="tag-modern-item">{g}</span>)}
                    </div>
                </div>

                <div className="sheet-section">
                    <span className="section-label-minimal">INFRAESTRUTURA TÉCNICA</span>
                    <div className="tech-grid-list">
                        <p className="tech-pro-text">{venue.tech}</p>
                    </div>
                </div>

                <div className="sheet-section">
                    <span className="section-label-minimal">ONDE ESTAMOS</span>
                    <p className="tech-pro-text" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <MapPin size={18} color="var(--brand-accent)" /> {venue.address}
                    </p>
                </div>

                <div className="footer-action-sticky">
                    <button className="btn btn-primary btn-block" style={{ margin: 0 }}>
                        SOLICITAR ORÇAMENTO <ArrowRight size={18} />
                    </button>
                    <div className="social-links-minimal">
                        <Instagram className="social-icon-btn" size={24} />
                        <Globe className="social-icon-btn" size={24} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FindVenues = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [filter, setFilter] = useState('Todos');

    const filteredVenues = MOCK_VENUES.filter(venue => {
        const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'Todos' || venue.genres.includes(filter);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="find-venues-page-reborn">
            {/* 1. EDITORIAL HERO (Home-style) */}
            <section className="venues-hero-editorial">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mega-title-editorial"
                    >
                        PALCOS QUE<br />FAZEM HISTÓRIA
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="hero-subtitle"
                    >
                        Conecte-se com os melhores estabelecimentos e produtores.
                    </motion.p>

                    <div className="hero-filter-bar">
                        <div className="minimal-input-group">
                            <input
                                type="text"
                                placeholder="BUSCAR POR NOME OU BAIRRO..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-icon">
                                <ArrowRight size={20} color="#000" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. MASONRY CONTENT */}
            <div className="venues-masonry-content container">
                <div className="masonry-grid">
                    {filteredVenues.map(venue => (
                        <motion.div
                            key={venue.id}
                            className="venue-card-masonry"
                            layoutId={`venue-${venue.id}`}
                            onClick={() => setSelectedVenue(venue)}
                            whileHover={{ y: -10 }}
                        >
                            <div className="card-image-masonry" style={{ backgroundImage: `url(${venue.images[0]})` }}>
                                {venue.availableForShows && <div className="available-indicator">ABERTO PARA SHOWS</div>}
                            </div>
                            <div className="card-content-masonry">
                                <span className="card-location-hint">{venue.location.toUpperCase()}</span>
                                <h3 className="card-title-masonry">{venue.name}</h3>
                                <div className="card-meta-masonry">
                                    <div className="rating-mini">
                                        <Star size={14} fill="currentColor" /> {venue.rating}
                                    </div>
                                    <div className="capacity-mini">
                                        <Users size={14} /> {venue.capacity}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 3. SIDE SHEET OVERLAY */}
            <AnimatePresence>
                {selectedVenue && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="sheet-backdrop"
                            onClick={() => setSelectedVenue(null)}
                        />
                        <SideSheet
                            venue={selectedVenue}
                            onClose={() => setSelectedVenue(null)}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FindVenues;
