
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_CONFIG, SAO_PAULO_BOUNDS } from '../config/googleMaps';
import { createVenue, createArtist } from '../utils/database';
import BottomSheet from '../components/BottomSheet';
import './UserRegister.css';

const GENRES = [
    "Rock", "Samba", "MPB", "Sertanejo", "Jazz", "Eletrônico", "Funk", "Forró",
    "Pop", "Reggae", "Blues", "Metal", "Indie", "Rap"
];

const DAYS = [
    { short: "Dom", full: "Domingo" },
    { short: "Seg", full: "Segunda" },
    { short: "Ter", full: "Terça" },
    { short: "Qua", full: "Quarta" },
    { short: "Qui", full: "Quinta" },
    { short: "Sex", full: "Sexta" },
    { short: "Sáb", full: "Sábado" }
];

const SP_VENUES = [
    { name: "Blue Note São Paulo", address: "Av. Paulista, 2073 - Bela Vista, São Paulo - SP", lat: -23.5583, lng: -46.6587 },
    { name: "Bourbon Street Music Club", address: "R. dos Chanés, 127 - Moema, São Paulo - SP", lat: -23.6105, lng: -46.6664 },
    { name: "Cine Joia", address: "Praça Carlos Gomes, 82 - Liberdade, São Paulo - SP", lat: -23.5559, lng: -46.6366 },
    { name: "Casa Natura Musical", address: "R. Artur de Azevedo, 2134 - Pinheiros, São Paulo - SP", lat: -23.5672, lng: -46.6944 },
    { name: "Audio", address: "Av. Francisco Matarazzo, 694 - Água Branca, São Paulo - SP", lat: -23.5286, lng: -46.6692 },
    { name: "Espaço Unimed", address: "R. Tagipuru, 795 - Barra Funda, São Paulo - SP", lat: -23.5264, lng: -46.6636 },
    { name: "Villa Country", address: "Av. Francisco Matarazzo, 774 - Água Branca, São Paulo - SP", lat: -23.5278, lng: -46.6689 },
    { name: "Bar Brahma", address: "Av. São João, 677 - Centro Histórico de São Paulo, São Paulo - SP", lat: -23.5434, lng: -46.6394 },
    { name: "Riviera Bar", address: "Av. Paulista, 2584 - Consolação, São Paulo - SP", lat: -23.5554, lng: -46.6617 },
    { name: "Skye Bar", address: "Av. Brigadeiro Luís Antônio, 4700 - Jardim Paulista, São Paulo - SP", lat: -23.5794, lng: -46.6667 }
];

const UserRegister = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null); // 'venue' | 'artist'
    const [step, setStep] = useState(0); // 0 = Role selection, then 1,2,3...
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Venue data
    const [venueData, setVenueData] = useState({
        name: '',
        address: '',
        googlePlaceId: '',
        coordinates: null,
        genres: [],
        operatingDays: []
    });

    // Artist data
    const [artistData, setArtistData] = useState({
        name: '',
        genres: [],
        cache: 1500 // Default cache value
    });

    // Autocomplete State
    const [showVenueSuggestions, setShowVenueSuggestions] = useState(false);
    const [filteredVenues, setFilteredVenues] = useState([]);

    // Google Maps Integration
    const venueInputRef = useRef(null);
    const [isMapsLoaded, setIsMapsLoaded] = useState(false);
    const SIMULATION_MODE = true; // Toggle this to false when you have a real API Key

    useEffect(() => {
        if (userType === 'venue' && step === 1) {
            if (SIMULATION_MODE) {
                console.log("Running in Google Maps SIMULATION MODE");
                setIsMapsLoaded(true);
                return;
            }

            const loader = new Loader({
                apiKey: GOOGLE_MAPS_CONFIG.apiKey,
                version: "weekly",
                libraries: ["places"]
            });

            loader.load().then(() => {
                setIsMapsLoaded(true);
                initAutocomplete();
            }).catch(e => {
                console.error("Error loading Google Maps API:", e);
                // Fallback to simulation if API fails
                setIsMapsLoaded(true);
            });
        }
    }, [userType, step]);

    const initAutocomplete = () => {
        if (!venueInputRef.current || SIMULATION_MODE) return;

        const autocomplete = new google.maps.places.Autocomplete(venueInputRef.current, {
            types: ['establishment'],
            componentRestrictions: { country: 'br' },
            fields: ['name', 'place_id', 'formatted_address', 'geometry'],
            bounds: SAO_PAULO_BOUNDS,
            strictBounds: false
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry || !place.geometry.location) {
                return;
            }

            setVenueData(prev => ({
                ...prev,
                name: place.name,
                address: place.formatted_address,
                googlePlaceId: place.place_id,
                coordinates: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
            }));
        });
    };

    // Simulation Handler
    const handleSimulationInput = (e) => {
        const value = e.target.value;
        setVenueData(prev => ({ ...prev, name: value }));

        if (value.length >= 3) {
            const matches = SP_VENUES.filter(v => v.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredVenues(matches);
            setShowVenueSuggestions(true);
        } else {
            setShowVenueSuggestions(false);
        }
    };

    const selectVenue = (venue) => {
        setVenueData(prev => ({
            ...prev,
            name: venue.name,
            address: venue.address,
            googlePlaceId: 'simulated_' + Math.random(),
            coordinates: {
                lat: venue.lat,
                lng: venue.lng
            }
        }));
        setShowVenueSuggestions(false);
    };

    const handleCancel = () => {
        navigate('/'); // Or wherever the home is
    };

    const toggleGenre = (genre, type) => {
        if (type === 'venue') {
            const updated = venueData.genres.includes(genre)
                ? venueData.genres.filter(g => g !== genre)
                : [...venueData.genres, genre];
            setVenueData({ ...venueData, genres: updated });
        } else {
            const updated = artistData.genres.includes(genre)
                ? artistData.genres.filter(g => g !== genre)
                : [...artistData.genres, genre];
            setArtistData({ ...artistData, genres: updated });
        }
    };

    const toggleDay = (dayFull) => {
        const updated = venueData.operatingDays.includes(dayFull)
            ? venueData.operatingDays.filter(d => d !== dayFull)
            : [...venueData.operatingDays, dayFull];
        setVenueData({ ...venueData, operatingDays: updated });
    };

    const toggleAllDays = () => {
        if (venueData.operatingDays.length === DAYS.length) {
            setVenueData({ ...venueData, operatingDays: [] });
        } else {
            setVenueData({ ...venueData, operatingDays: DAYS.map(d => d.full) });
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        if (step === 1) {
            setUserType(null);
            setStep(0);
        } else {
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        const data = userType === 'venue' ? venueData : artistData;
        console.log(`${userType} Registration: `, data);

        setIsSaving(true);

        try {
            if (userType === 'venue') {
                await createVenue(data);
                console.log('Venue saved to database');
            } else {
                await createArtist(data);
                console.log('Artist saved to database');
            }

            // Navigate after successful save
            setTimeout(() => {
                navigate(userType === 'venue' ? '/find-bands' : '/profile');
            }, 500);
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Erro ao salvar dados. Por favor, tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddMember = (memberData) => {
        setArtistData({
            ...artistData,
            lineup: [...(artistData.lineup || []), { ...memberData, isLeader: false }]
        });
    };

    // Determine max steps based on user type
    const maxSteps = userType === 'venue' ? 8 : 6;
    const progress = step === 0 ? 0 : (step / maxSteps) * 100;

    return (
        <div className="onboarding-container">
            {/* Progress Bar */}
            {step > 0 && (
                <div className="progress-bar-top">
                    <div className="progress-fill" style={{ width: `${progress}% ` }}></div>
                </div>
            )}

            {/* Back Button */}
            {step > 0 && (
                <button className="back-button" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>
            )}

            <AnimatePresence mode="wait">
                {/* STEP 0: ROLE SELECTION - SPLIT SCREEN */}
                {step === 0 && (
                    <motion.div
                        key="role-select"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="split-screen-container"
                    >
                        {/* LEFT: VENUE */}
                        <div
                            className="split-pane pane-venue"
                            onClick={() => { setUserType('venue'); setStep(1); }}
                        >
                            <div className="pane-content">
                                <MapPin size={64} className="pane-icon" />
                                <h1 className="pane-title">SOU<br />ESTABELECIMENTO</h1>
                                <p className="pane-desc">Quero contratar bandas e organizar minha agenda.</p>
                                <span className="pane-cta">CRIAR CONTA <ArrowRight /></span>
                            </div>
                        </div>

                        {/* RIGHT: ARTIST */}
                        <div
                            className="split-pane pane-artist"
                            onClick={() => { setUserType('artist'); setStep(1); }}
                        >
                            <div className="pane-content">
                                <Music size={64} className="pane-icon" />
                                <h1 className="pane-title">SOU<br />ARTISTA</h1>
                                <p className="pane-desc">Quero tocar mais e receber sem dor de cabeça.</p>
                                <span className="pane-cta">CRIAR PERFIL <ArrowRight /></span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ========== VENUE FLOW ========== */}
                {userType === 'venue' && step === 1 && (
                    <motion.div
                        key="venue-step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUAL O NOME<br />DO SEU ESTABELECIMENTO?</h1>

                        <div className="autocomplete-wrapper">
                            <input
                                ref={venueInputRef}
                                type="text"
                                className="headline-input"
                                placeholder="DIGITE O NOME DO LOCAL"
                                value={venueData.name}
                                onChange={handleSimulationInput}
                            />
                            {showVenueSuggestions && filteredVenues.length > 0 && (
                                <div className="autocomplete-dropdown">
                                    {filteredVenues.map((venue, idx) => (
                                        <div key={idx} className="autocomplete-item" onClick={() => selectVenue(venue)}>
                                            <strong>{venue.name}</strong>
                                            <small>{venue.address}</small>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {!isMapsLoaded && <p className="mono-text">CARREGANDO MAPS...</p>}
                        </div>

                        <div className="button-group">
                            <button className="btn btn-outline" onClick={handleCancel}>
                                CANCELAR
                            </button>
                            <button
                                className="btn btn-primary btn-large"
                                onClick={handleNext}
                                disabled={!venueData.name}
                            >
                                CONTINUAR <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* NEW STEP 2: MAP CONFIRMATION */}
                {userType === 'venue' && step === 2 && (
                    <motion.div
                        key="venue-step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">É AQUI MESMO?</h1>

                        <div className="map-confirmation-container">
                            {venueData.coordinates ? (
                                <div className="static-map-preview">
                                    {/* Simulation Mode Map or Real Static Map */}
                                    <div
                                        className="map-placeholder"
                                        style={{
                                            backgroundImage: SIMULATION_MODE
                                                ? `url(https://placehold.co/600x400/1a1a1a/FFF?text=MAPA+SIMULADO+(${venueData.coordinates.lat},+${venueData.coordinates.lng}))`
                                                : `url(https://maps.googleapis.com/maps/api/staticmap?center=${venueData.coordinates.lat},${venueData.coordinates.lng}&zoom=15&size=600x400&maptype=roadmap&markers=color:black%7C${venueData.coordinates.lat},${venueData.coordinates.lng}&style=feature:all|element:all|saturation:-100&key=${GOOGLE_MAPS_CONFIG.apiKey})`
                                        }}
                                    ></div>
                                    <div className="address-overlay">
                                        <p className="mono-text">{venueData.address}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="map-error">
                                    <p>Localização não encontrada.</p>
                                </div>
                            )}
                        </div>

                        <div className="button-group">
                            <button className="btn btn-outline" style={{ height: '100%' }} onClick={handleBack}>
                                NÃO, VOLTAR
                            </button>
                            <button className="btn btn-primary btn-large" style={{ height: '100%' }} onClick={handleNext}>
                                SIM, CONFIRMAR <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {userType === 'venue' && step === 3 && (
                    <motion.div
                        key="venue-step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <motion.h1
                            className="mega-title"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                        >
                            O QUE TOCA<br />NA {venueData.name.split(' ')[0].toUpperCase()}?
                        </motion.h1>

                        <motion.div
                            className="floating-chips"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.03
                                    }
                                }
                            }}
                        >
                            {GENRES.map(genre => (
                                <motion.button
                                    key={genre}
                                    className={`chip ${venueData.genres.includes(genre) ? 'chip-selected' : ''}`}
                                    onClick={() => toggleGenre(genre, 'venue')}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                >
                                    {genre.toUpperCase()}
                                </motion.button>
                            ))}
                        </motion.div>

                        <motion.button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                            disabled={venueData.genres.length === 0}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}

                {userType === 'venue' && step === 4 && (
                    <motion.div
                        key="venue-step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <motion.h1
                            className="mega-title"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                        >
                            QUAIS DIAS<br />VOCÊ TEM SHOWS?
                        </motion.h1>

                        <motion.div
                            className="days-toggle-group"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.04
                                    }
                                }
                            }}
                        >
                            {DAYS.map((day, idx) => (
                                <motion.button
                                    key={idx}
                                    className={`day-toggle ${venueData.operatingDays.includes(day.full) ? 'day-active' : ''}`}
                                    onClick={() => toggleDay(day.full)}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    {day.short}
                                </motion.button>
                            ))}
                        </motion.div>

                        <button
                            className={`btn btn-outline btn-block ${venueData.operatingDays.length === DAYS.length ? 'btn-accent' : ''}`}
                            onClick={toggleAllDays}
                            style={{ marginBottom: '1rem' }}
                        >
                            {venueData.operatingDays.length === DAYS.length ? 'REMOVER TODOS' : 'TODOS OS DIAS'}
                        </button>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                            disabled={venueData.operatingDays.length === 0}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* STEP 5: BUDGET */}
                {userType === 'venue' && step === 5 && (
                    <motion.div
                        key="venue-step5"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUAL SEU ORÇAMENTO<br />MÉDIO POR BANDA?</h1>

                        <div className="cache-display">
                            <span className="cache-value">R$ {venueData.budget ? venueData.budget.toLocaleString('pt-BR') : '1.500'}</span>
                        </div>

                        <input
                            type="range"
                            className="cache-slider"
                            min="300"
                            max="5000"
                            step="100"
                            value={venueData.budget || 1500}
                            onChange={(e) => setVenueData({ ...venueData, budget: parseInt(e.target.value) })}
                        />

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* STEP 6: TECH RIDER */}
                {userType === 'venue' && step === 6 && (
                    <motion.div
                        key="venue-step6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">TECH RIDER<br />DA CASA</h1>

                        <div className="tech-rider-section">
                            <h3 className="section-label">O QUE A CASA OFERECE?</h3>
                            <div className="floating-chips small-chips">
                                {['PA COM MESA DE SOM', 'MICROFONES', 'BATERIA COMPLETA', 'AMPLIFICADORES', 'RETORNO', 'ILUMINAÇÃO DE PALCO', 'PAINEL DE LED'].map(item => (
                                    <button
                                        key={item}
                                        className={`chip ${venueData.techRider?.offered?.includes(item) ? 'chip-selected' : ''}`}
                                        onClick={() => {
                                            const current = venueData.techRider?.offered || [];
                                            const updated = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
                                            setVenueData({ ...venueData, techRider: { ...venueData.techRider, offered: updated } });
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="tech-rider-section">
                            <h3 className="section-label">O QUE A BANDA DEVE TRAZER?</h3>
                            <div className="floating-chips small-chips">
                                {['INSTRUMENTOS', 'PRATOS DE BATERIA', 'CABOS', 'PEDAIS', 'CUBOS'].map(item => (
                                    <button
                                        key={item}
                                        className={`chip ${venueData.techRider?.needed?.includes(item) ? 'chip-selected' : ''}`}
                                        onClick={() => {
                                            const current = venueData.techRider?.needed || [];
                                            const updated = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
                                            setVenueData({ ...venueData, techRider: { ...venueData.techRider, needed: updated } });
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                        >
                            REVISAR DADOS <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* STEP 7: SUMMARY */}
                {userType === 'venue' && step === 7 && (
                    <motion.div
                        key="venue-step7"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">RESUMO DO<br />CADASTRO</h1>

                        <div className="summary-card">
                            <div className="summary-item">
                                <span className="summary-label">NOME</span>
                                <span className="summary-value">{venueData.name}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">ENDEREÇO</span>
                                <span className="summary-value">{venueData.address}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">GÊNEROS</span>
                                <span className="summary-value">{venueData.genres.join(', ')}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">DIAS DE SHOW</span>
                                <span className="summary-value">{venueData.operatingDays.join(', ')}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">ORÇAMENTO MÉDIO</span>
                                <span className="summary-value">R$ {venueData.budget ? venueData.budget.toLocaleString('pt-BR') : '1.500'}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">OFERECE</span>
                                <span className="summary-value">{venueData.techRider?.offered?.join(', ') || '-'}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">NECESSITA</span>
                                <span className="summary-value">{venueData.techRider?.needed?.join(', ') || '-'}</span>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleSubmit}
                            disabled={isSaving}
                        >
                            {isSaving ? 'SALVANDO...' : 'FINALIZAR CADASTRO'} <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ========== ARTIST FLOW ========== */}
                {userType === 'artist' && step === 1 && (
                    <motion.div
                        key="artist-step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">NOME DA<br />BANDA OU ARTISTA</h1>

                        <input
                            type="text"
                            className="headline-input"
                            placeholder="DIGITE O NOME"
                            value={artistData.name}
                            onChange={(e) => setArtistData({ ...artistData, name: e.target.value })}
                            autoFocus
                        />

                        <div className="button-group">
                            <button className="btn btn-outline" onClick={handleCancel}>
                                CANCELAR
                            </button>
                            <button
                                className="btn btn-primary btn-large"
                                onClick={handleNext}
                                disabled={!artistData.name.trim()}
                            >
                                PRÓXIMO <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {userType === 'artist' && step === 2 && (
                    <motion.div
                        key="artist-step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUAL É A SUA<br />PEGADA PRINCIPAL?</h1>

                        <motion.div
                            className="floating-chips"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.03
                                    }
                                }
                            }}
                        >
                            {GENRES.map(genre => (
                                <motion.button
                                    key={genre}
                                    className={`chip ${artistData.genres.includes(genre) ? 'chip-selected' : ''}`}
                                    onClick={() => toggleGenre(genre, 'artist')}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                >
                                    {genre.toUpperCase()}
                                </motion.button>
                            ))}
                        </motion.div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                            disabled={artistData.genres.length === 0}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* STEP 3: AVAILABILITY */}
                {userType === 'artist' && step === 3 && (
                    <motion.div
                        key="artist-step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUANDO VOCÊS<br />PODEM TOCAR?</h1>

                        <div className="days-toggle-group">
                            {DAYS.map((day, idx) => (
                                <button
                                    key={idx}
                                    className={`day-toggle ${artistData.availability?.includes(day.full) ? 'day-active' : ''}`}
                                    onClick={() => {
                                        const current = artistData.availability || [];
                                        const updated = current.includes(day.full) ? current.filter(d => d !== day.full) : [...current, day.full];
                                        setArtistData({ ...artistData, availability: updated });
                                    }}
                                >
                                    {day.short}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                            disabled={!artistData.availability || artistData.availability.length === 0}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* STEP 4: CACHE */}
                {userType === 'artist' && step === 4 && (
                    <motion.div
                        key="artist-step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUAL O SEU<br />CACHÊ MÉDIO?</h1>

                        <div className="cache-display">
                            {artistData.cache === 0 ? (
                                <span className="cache-value">A COMBINAR</span>
                            ) : artistData.cache >= 10000 ? (
                                <span className="cache-value">R$ 10.000+</span>
                            ) : (
                                <span className="cache-value">R$ {artistData.cache.toLocaleString('pt-BR')}</span>
                            )}
                        </div>

                        <input
                            type="range"
                            className="cache-slider"
                            min="0"
                            max="10000"
                            step="50"
                            value={artistData.cache}
                            onChange={(e) => setArtistData({ ...artistData, cache: parseInt(e.target.value) })}
                        />

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* STEP 5: LINEUP */}
                {userType === 'artist' && step === 5 && (
                    <motion.div
                        key="artist-step5"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUEM TOCA<br />COM VOCÊ?</h1>

                        <div className="lineup-container">
                            {(artistData.lineup || []).map((member, idx) => (
                                <div key={idx} className="lineup-item">
                                    <div className="member-info">
                                        <span className="member-name">{member.name || 'Novo Integrante'}</span>
                                        <span className="member-role">{member.role || 'Instrumento'}</span>
                                    </div>
                                    <div className="member-actions">
                                        <label className="leader-toggle">
                                            <input
                                                type="radio"
                                                name="leader"
                                                checked={member.isLeader}
                                                onChange={() => {
                                                    const updated = (artistData.lineup || []).map((m, i) => ({
                                                        ...m,
                                                        isLeader: i === idx
                                                    }));
                                                    setArtistData({ ...artistData, lineup: updated });
                                                }}
                                            />
                                            <span className="leader-label">LÍDER</span>
                                        </label>
                                    </div>
                                </div>
                            ))}

                            <button
                                className="btn btn-outline btn-block"
                                onClick={() => setIsBottomSheetOpen(true)}
                            >
                                + ADICIONAR INTEGRANTE
                            </button>
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleNext}
                            disabled={!artistData.lineup || artistData.lineup.length === 0}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* STEP 6: VIDEO */}
                {userType === 'artist' && step === 6 && (
                    <motion.div
                        key="artist-step6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">MOSTRE SEU<br />TRABALHO</h1>

                        <div className="video-input-wrapper">
                            <input
                                type="text"
                                className="headline-input"
                                placeholder="LINK DO YOUTUBE"
                                value={artistData.videoUrl || ''}
                                onChange={(e) => setArtistData({ ...artistData, videoUrl: e.target.value })}
                            />
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleSubmit}
                            disabled={!artistData.videoUrl || isSaving}
                        >
                            {isSaving ? 'SALVANDO...' : 'FINALIZAR PERFIL'} <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Sheet for Adding Members */}
            <BottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
                onSubmit={handleAddMember}
                title="Adicionar Integrante"
            />
        </div>
    );
};

export default UserRegister;
