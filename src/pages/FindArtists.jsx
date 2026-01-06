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

const Card = ({ artist, navigate }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="artist-card-simple"
            onClick={() => navigate(`/band/${artist.id}`)}
        >
            <div className="artist-image-container">
                <div className="artist-image" style={{ backgroundImage: `url(${artist.image})` }} />
                <div className="artist-overlay">
                    <span className="artist-genre-pill" style={{ backgroundColor: artist.color }}>{artist.genre}</span>
                </div>
            </div>

            <div className="artist-info-simple">
                <h3 className="artist-name-simple">{artist.name}</h3>
                <div className="artist-meta-simple">
                    <span>{artist.lastVenueLocation}</span>
                    <span className="dot-divider">•</span>
                    <span>{artist.members} Integrantes</span>
                </div>
                <div className="artist-rating-simple">
                    <Star size={14} fill="currentColor" />
                    <span>4.9</span>
                </div>
            </div>
        </motion.div>
    );
}

const FindArtists = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = React.useState('Todos');
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredArtists = MOCK_ARTISTS.filter(artist => {
        const matchesFilter = filter === 'Todos' || artist.genre === filter;
        const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="find-artists-page-simple">
            {/* HERÓI SIMPLES */}
            <section className="artists-simple-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mega-title-simple"
                    >
                        ARTISTAS<br />SELECIONADOS
                    </motion.h1>

                    <div className="filter-simple-row">
                        {['Todos', 'Rock', 'Jazz', 'Samba', 'Eletrônica'].map(cat => (
                            <button
                                key={cat}
                                className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                                style={{ borderRadius: '99px', padding: '10px 24px' }}
                                onClick={() => setFilter(cat)}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* BUSCA E RESULTADOS */}
            <div className="container artists-grid-wrapper">
                <div className="search-minimal-grid">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="BUSCAR ARTISTA PELO NOME..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="artists-grid-simple">
                    {filteredArtists.map((artist) => (
                        <Card
                            key={artist.id}
                            artist={artist}
                            navigate={navigate}
                        />
                    ))}
                </div>

                {filteredArtists.length === 0 && (
                    <div className="no-results-simple">
                        Nenhum artista encontrado para sua busca.
                    </div>
                )}
            </div>

            {/* RODAPÉ CTA */}
            <section className="artists-footer-cta-simple">
                <div className="container">
                    <h2>NÃO ENCONTROU O QUE PROCURAVA?</h2>
                    <p>Temos uma curadoria personalizada para eventos exclusivos.</p>
                    <button className="btn btn-primary btn-giant">FALAR COM ESPECIALISTA</button>
                </div>
            </section>
        </div>
    );
};

export default FindArtists;
