import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Music } from 'lucide-react';
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
        tags: ['Synthwave', 'Upbeat']
    },
    {
        id: 2,
        name: 'The Midnight Jazz',
        genre: 'Jazz',
        members: 4,
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Bourbon Street Music Club',
        lastVenueLocation: 'Moema, SP',
        tags: ['Smooth', 'Lounge']
    },
    {
        id: 3,
        name: 'Crimson Rock',
        genre: 'Rock',
        members: 5,
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Cine Joia',
        lastVenueLocation: 'Liberdade, SP',
        tags: ['Classic Rock', 'High Energy']
    },
    {
        id: 4,
        name: 'Acoustic Vibes',
        genre: 'Acústico',
        members: 2,
        image: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Casa Natura Musical',
        lastVenueLocation: 'Pinheiros, SP',
        tags: ['Chill', 'Covers']
    },
    {
        id: 5,
        name: 'Samba de Raiz',
        genre: 'Samba',
        members: 6,
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Bar Brahma',
        lastVenueLocation: 'Centro, SP',
        tags: ['Tradicional', 'Pagode']
    },
    {
        id: 6,
        name: 'Indie Souls',
        genre: 'Indie',
        members: 4,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1000',
        lastVenue: 'Audio',
        lastVenueLocation: 'Água Branca, SP',
        tags: ['Alternative', 'Experimental']
    }
];

const FindArtists = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('Todos');

    const genres = ['Todos', 'Eletrônica', 'Jazz', 'Rock', 'Acústico', 'Samba', 'Indie'];

    const filteredArtists = MOCK_ARTISTS.filter(artist => {
        const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.genre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'Todos' || artist.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    return (
        <div className="find-artists-page container">
            <div className="search-header">
                <h2>Descubra Artistas</h2>
                <p>Encontre os melhores músicos para o seu evento.</p>

                <div className="search-controls">
                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou estilo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="genre-filters">
                        {genres.map(genre => (
                            <button
                                key={genre}
                                className={`filter-chip ${selectedGenre === genre ? 'active' : ''}`}
                                onClick={() => setSelectedGenre(genre)}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="artists-grid">
                {filteredArtists.map(artist => (
                    <div key={artist.id} className="artist-card" onClick={() => navigate(`/band/${artist.id}`)}>
                        <div className="artist-image" style={{ backgroundImage: `url(${artist.image})` }}>
                            <div className="artist-overlay">
                                <span className="genre-badge">{artist.genre}</span>
                            </div>
                        </div>
                        <div className="artist-info">
                            <h3>{artist.name}</h3>
                            <div className="artist-meta">
                                <div className="meta-item">
                                    <Music size={16} />
                                    <span>{artist.members} Integrantes</span>
                                </div>
                                <div className="meta-item last-venue">
                                    <MapPin size={16} />
                                    <div className="venue-info">
                                        <span className="venue-name">{artist.lastVenue}</span>
                                        <span className="venue-location">{artist.lastVenueLocation}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="artist-tags">
                                {artist.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindArtists;
