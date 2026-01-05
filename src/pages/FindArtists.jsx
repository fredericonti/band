import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Music, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './FindArtists.css';

const MOCK_ARTISTS = [
    {
        id: 1,
        name: 'Neon Pulse',
        genre: 'Eletrônica',
        members: 3,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Blue Note São Paulo',
        lastVenueLocation: 'Bela Vista, SP',
        tags: ['Synthwave', 'Eletrizante'],
        color: '#FF0055'
    },
    {
        id: 2,
        name: 'The Midnight Jazz',
        genre: 'Jazz',
        members: 4,
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Bourbon Street Music Club',
        lastVenueLocation: 'Moema, SP',
        tags: ['Suave', 'Sofisticado'],
        color: '#7B61FF'
    },
    {
        id: 3,
        name: 'Crimson Rock',
        genre: 'Rock',
        members: 5,
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Cine Joia',
        lastVenueLocation: 'Liberdade, SP',
        tags: ['Rock Clássico', 'Alta Energia'],
        color: '#FF9900'
    },
    {
        id: 4,
        name: 'Acoustic Vibes',
        genre: 'Acústico',
        members: 2,
        image: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Casa Natura Musical',
        lastVenueLocation: 'Pinheiros, SP',
        tags: ['Intimista', 'Acústico'],
        color: '#00CC88'
    },
    {
        id: 5,
        name: 'Samba de Raiz',
        genre: 'Samba',
        members: 6,
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Bar Brahma',
        lastVenueLocation: 'Centro, SP',
        tags: ['Tradicional', 'Pagode'],
        color: '#0099FF'
    }
];

const Card = ({ i, artist, progress, range, targetScale, navigate }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="cardContainer">
            <motion.div
                className="stack-card"
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                onClick={() => navigate(`/band/${artist.id}`)}
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="card-body">
                    <div className="card-header-new">
                        <span className="genre-pill" style={{ backgroundColor: artist.color }}>{artist.genre}</span>
                        <div className="card-rating">
                            <Star size={16} fill="currentColor" /> 4.9
                        </div>
                    </div>

                    <h2 className="card-title-new">{artist.name}</h2>

                    <div className="card-tags-cloud">
                        {artist.tags.map(tag => (
                            <span key={tag} className="cloud-tag">#{tag}</span>
                        ))}
                    </div>

                    <div className="card-footer-new">
                        <div className="venue-detail">
                            <MapPin size={16} style={{ color: artist.color }} />
                            <span>{artist.lastVenueLocation}</span>
                        </div>
                        <div className="venue-detail">
                            <Music size={16} />
                            <span>{artist.members} Integrantes</span>
                        </div>
                    </div>
                </div>

                <div className="card-image-wrapper">
                    <motion.div
                        className="card-inner-image"
                        style={{ scale: imageScale, backgroundImage: `url(${artist.image})` }}
                    />
                </div>
            </motion.div>
        </div>
    )
}

const FindArtists = () => {
    const navigate = useNavigate();
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const [filter, setFilter] = React.useState('Todos');

    return (
        <div ref={container} className="find-artists-page-new">
            {/* 1. HERO SECTION (Mirroring Home) */}
            <section className="hero-section-artists">
                <div className="hero-bg-dimmed">
                    <div className="bg-overlay-light"></div>
                </div>

                <div className="container hero-content-artists">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mega-title-editorial"
                    >
                        DESCUBRA<br />O PRÓXIMO<br />GRANDE SHOW
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="filter-editorial-group"
                    >
                        {['Todos', 'Rock', 'Jazz', 'Samba', 'Eletrônica'].map(cat => (
                            <button
                                key={cat}
                                className={`filter-text-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 2. STICKY SEARCH (Minimized) */}
            <div className="search-header-contextual">
                <div className="container search-flex">
                    <div className="search-bar-minimal">
                        <Search size={18} />
                        <input type="text" placeholder="BUSCAR POR NOME OU ESTILO..." />
                    </div>
                    <div className="active-filters-pill">
                        <MapPin size={14} /> <span>SÃO PAULO, SP</span>
                    </div>
                </div>
            </div>

            {/* 3. STACK LIST (Bento Style) */}
            <div className="stack-list-bento">
                {MOCK_ARTISTS
                    .filter(a => filter === 'Todos' || a.genre === filter)
                    .map((artist, i) => {
                        const targetScale = 1 - ((MOCK_ARTISTS.length - i) * 0.03);
                        return (
                            <Card
                                key={artist.id}
                                i={i}
                                artist={artist}
                                progress={scrollYProgress}
                                range={[i * (1 / MOCK_ARTISTS.length), 1]}
                                targetScale={targetScale}
                                navigate={navigate}
                            />
                        );
                    })}
            </div>

            {/* 4. FOOTER CALL TO ACTION */}
            <section className="artists-footer-cta">
                <div className="container">
                    <h2 className="cta-title">NÃO ENCONTROU O QUE PROCURAVA?</h2>
                    <p className="cta-text">Temos uma curadoria personalizada para eventos exclusivos.</p>
                    <button className="btn btn-primary btn-large">FALAR COM ESPECIALISTA</button>
                </div>
            </section>
        </div>
    );
};

export default FindArtists;
