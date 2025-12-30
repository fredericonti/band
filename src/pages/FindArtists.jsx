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
        tags: ['Synthwave', 'Upbeat'],
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
        tags: ['Smooth', 'Lounge'],
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
        tags: ['Classic Rock', 'High Energy'],
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
        tags: ['Chill', 'Covers'],
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
                            <span>{artist.members} Members</span>
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

    return (
        <div ref={container} className="find-artists-page-new">
            <div className="search-header-sticky">
                <h2>Talent Hub</h2>
                <div className="search-bar-modern">
                    <Search size={18} />
                    <input type="text" placeholder="Search for artists..." />
                </div>
            </div>

            <div className="stack-list">
                {MOCK_ARTISTS.map((artist, i) => {
                    const targetScale = 1 - ((MOCK_ARTISTS.length - i) * 0.05);
                    return (
                        <Card
                            key={i}
                            i={i}
                            artist={artist}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                            navigate={navigate}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FindArtists;
