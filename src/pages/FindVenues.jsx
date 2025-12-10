import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Star, TrendingUp } from 'lucide-react';
import './FindVenues.css';

const MOCK_VENUES = [
    {
        id: 1,
        name: 'Blue Note São Paulo',
        location: 'Bela Vista, SP',
        images: [
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 156,
        availableForShows: true,
        rating: 4.9,
        topBands: ['Neon Pulse', 'The Midnight Jazz', 'Indie Souls'],
        capacity: 300,
        genres: ['Jazz', 'Blues', 'Soul']
    },
    {
        id: 2,
        name: 'Bourbon Street Music Club',
        location: 'Moema, SP',
        images: [
            'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 203,
        availableForShows: true,
        rating: 4.8,
        topBands: ['Crimson Rock', 'Acoustic Vibes', 'Samba de Raiz'],
        capacity: 450,
        genres: ['Rock', 'MPB', 'Samba']
    },
    {
        id: 3,
        name: 'Cine Joia',
        location: 'Liberdade, SP',
        images: [
            'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 89,
        availableForShows: false,
        rating: 4.7,
        topBands: ['Neon Pulse', 'Indie Souls'],
        capacity: 600,
        genres: ['Eletrônica', 'Indie', 'Experimental']
    },
    {
        id: 4,
        name: 'Casa Natura Musical',
        location: 'Pinheiros, SP',
        images: [
            'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 124,
        availableForShows: true,
        rating: 4.9,
        topBands: ['Acoustic Vibes', 'The Midnight Jazz'],
        capacity: 200,
        genres: ['Acústico', 'MPB', 'Jazz']
    },
    {
        id: 5,
        name: 'Audio',
        location: 'Água Branca, SP',
        images: [
            'https://images.unsplash.com/photo-1571266028243-d220c6e2e2e5?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 267,
        availableForShows: true,
        rating: 4.8,
        topBands: ['Crimson Rock', 'Neon Pulse', 'Indie Souls'],
        capacity: 800,
        genres: ['Rock', 'Eletrônica', 'Metal']
    },
    {
        id: 6,
        name: 'Bar Brahma',
        location: 'Centro, SP',
        images: [
            'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000'
        ],
        totalShows: 412,
        availableForShows: true,
        rating: 4.9,
        topBands: ['Samba de Raiz', 'Acoustic Vibes', 'The Midnight Jazz'],
        capacity: 150,
        genres: ['Samba', 'MPB', 'Choro']
    }
];

const FindVenues = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);

    const filteredVenues = MOCK_VENUES.filter(venue => {
        const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            venue.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAvailability = !showAvailableOnly || venue.availableForShows;
        return matchesSearch && matchesAvailability;
    });

    return (
        <div className="find-venues-page">
            <div className="venues-hero">
                <div className="container">
                    <h1>Encontre o Local Perfeito</h1>
                    <p>Descubra estabelecimentos incríveis para apresentações ao vivo</p>

                    <div className="hero-search">
                        <div className="search-input-wrapper">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou localização..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <label className="availability-toggle">
                            <input
                                type="checkbox"
                                checked={showAvailableOnly}
                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                            />
                            <span>Apenas disponíveis</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="venues-content container">
                <div className="venues-grid">
                    {filteredVenues.map(venue => (
                        <div key={venue.id} className="venue-card" onClick={() => navigate(`/venue/${venue.id}`)}>
                            <div className="venue-images">
                                <div className="main-image" style={{ backgroundImage: `url(${venue.images[0]})` }}>
                                    {venue.availableForShows && (
                                        <div className="availability-badge">
                                            <Calendar size={14} />
                                            Disponível
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="venue-details">
                                <div className="venue-header">
                                    <h3>{venue.name}</h3>
                                    <div className="venue-rating">
                                        <Star size={14} fill="currentColor" />
                                        <span>{venue.rating}</span>
                                    </div>
                                </div>

                                <div className="venue-location">
                                    <MapPin size={14} />
                                    <span>{venue.location}</span>
                                </div>

                                <div className="venue-stats">
                                    <div className="stat">
                                        <TrendingUp size={14} />
                                        <span>{venue.totalShows} shows realizados</span>
                                    </div>
                                    <div className="stat">
                                        <span className="capacity">{venue.capacity} pessoas</span>
                                    </div>
                                </div>

                                <div className="venue-bands">
                                    <span className="bands-label">Bandas principais:</span>
                                    <div className="bands-list">
                                        {venue.topBands.slice(0, 3).map((band, idx) => (
                                            <span key={idx} className="band-tag">{band}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="venue-genres">
                                    {venue.genres.map(genre => (
                                        <span key={genre} className="genre-tag">{genre}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FindVenues;
