import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Music, DollarSign } from 'lucide-react';
import BookingSheet from '../components/BookingSheet';
import './FindBands.css';

const MOCK_BANDS = [
    {
        id: 1,
        name: 'Neon Pulse',
        genre: 'Eletrônica',
        members: 3,
        cost: 'R$ 800 - R$ 1200',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
        tags: ['Synthwave', 'Upbeat']
    },
    {
        id: 2,
        name: 'The Midnight Jazz',
        genre: 'Jazz',
        members: 4,
        cost: 'R$ 1000 - R$ 1500',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000',
        tags: ['Smooth', 'Lounge']
    },
    {
        id: 3,
        name: 'Crimson Rock',
        genre: 'Rock',
        members: 5,
        cost: 'R$ 1200 - R$ 2000',
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1000',
        tags: ['Classic Rock', 'High Energy']
    },
    {
        id: 4,
        name: 'Acoustic Vibes',
        genre: 'Acústico',
        members: 2,
        cost: 'R$ 400 - R$ 600',
        image: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?auto=format&fit=crop&q=80&w=1000',
        tags: ['Chill', 'Covers']
    }
];

const FindBands = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('Todos');
    const [selectedBand, setSelectedBand] = useState(null);

    const genres = ['Todos', 'Eletrônica', 'Jazz', 'Rock', 'Acústico'];

    const filteredBands = MOCK_BANDS.filter(band => {
        const matchesSearch = band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            band.genre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'Todos' || band.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    const handleBookingRequest = (band) => {
        setSelectedBand(band);
    };

    const handleContactOption = (option) => {
        // Here we would implement the actual logic
        alert(`Iniciando contato via ${option.toUpperCase()} com ${selectedBand.name}`);
        setSelectedBand(null);
    };

    return (
        <div className="find-bands-page container">
            <div className="search-header">
                <h2>Encontre a Banda Perfeita</h2>
                <p>Descubra artistas talentosos para o seu estabelecimento.</p>

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

            <div className="bands-grid">
                {filteredBands.map(band => (
                    <div key={band.id} className="band-card">
                        <div className="band-image" style={{ backgroundImage: `url(${band.image})` }}>
                            <div className="band-overlay">
                                <span className="genre-badge">{band.genre}</span>
                            </div>
                        </div>
                        <div className="band-info">
                            <h3>{band.name}</h3>
                            <div className="band-meta">
                                <div className="meta-item">
                                    <Music size={16} />
                                    <span>{band.members} Membros</span>
                                </div>
                                <div className="meta-item">
                                    <DollarSign size={16} />
                                    <span>{band.cost}</span>
                                </div>
                            </div>
                            <div className="band-tags">
                                {band.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            <button
                                className="btn btn-primary btn-block btn-sm"
                                onClick={() => navigate(`/band/${band.id}`)}
                            >
                                Ver Perfil Completo
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <BookingSheet
                band={selectedBand}
                onClose={() => setSelectedBand(null)}
                onSelectOption={handleContactOption}
            />
        </div>
    );
};

export default FindBands;
