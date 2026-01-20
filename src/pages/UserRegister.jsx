
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ArrowUpRight, MapPin, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_CONFIG, SAO_PAULO_BOUNDS } from '../config/googleMaps';
import { createVenue, createArtist } from '../utils/database';
import BottomSheet from '../components/BottomSheet';
import SideSheet from '../components/SideSheet';
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
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '', type: 'info' });

    // Venue data
    const [venueData, setVenueData] = useState({
        name: '',
        cnpj: '',
        type: 'Bar', // Bar, Restaurante, Casa de shows, Hotel, Evento corporativo
        address: '',
        googlePlaceId: '',
        coordinates: null,
        capacity: 100,
        genres: [],
        operatingDays: [],
        budgetMin: 300,
        budgetMax: 1500,
        paymentType: 'Por noite', // Por noite, Por hora, Por set
        negotiable: true,
        preferredFormats: ['Banda'], // Solo, Duo, Trio, Banda, Todos
        techRider: {
            hasStage: false,
            stageSize: '',
            hasSoundSystem: false,
            mixerChannels: 0,
            micsCount: 0,
            hasReturns: false,
            hasLighting: false,
            hasDressingRoom: false,
            notes: ''
        },
        benefits: [], // Alimentação, Bebidas, Estacionamento, Hospedagem, Couvert, Porcentagem
        photos: []
    });

    // Artist data
    const [artistData, setArtistData] = useState({
        name: '',
        projectType: 'Banda', // Solo, Duo, Trio, Banda
        lineup: [],
        location: '',
        radius: 'Apenas minha cidade',
        instagram: '',
        video: null,
        videoUrl: '', // For links
        genres: [],
        cacheMin: 800,
        cacheMax: 3000,
        cacheType: 'Noite completa',
        negotiable: true,
        techNeeds: {
            type: 'Preciso de som da casa', // Trago todo equipamento, Preciso de som da casa, Parcial
            details: '',
            checklist: []
        },
        availability: []
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
        } else if (userType === 'artist' && step === 4 && artistData.projectType === 'Solo') {
            setStep(2);
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
            setNotification({
                isOpen: true,
                title: 'ERRO NO CADASTRO',
                message: 'Houve um erro ao salvar seus dados. Por favor, verifique sua conexão e tente novamente.',
                type: 'error'
            });
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
    const maxSteps = userType === 'venue' ? 10 : 10;
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="role-selection-grid"
                    >
                        {/* LEFT: VENUE */}
                        <div
                            className="role-card"
                            onClick={() => { setUserType('venue'); setStep(1); }}
                        >
                            <div className="pane-content">
                                <span className="role-label">PARA ESTABELECIMENTOS</span>
                                <h1 className="pane-title">Encontre o artista ideal para sua noite</h1>
                                <p className="pane-desc">Quero contratar bandas, organizar minha agenda e gerenciar pagamentos com segurança.</p>
                                <div className="pane-footer">
                                    <span className="pane-cta">CRIAR CONTA</span>
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: ARTIST */}
                        <div
                            className="role-card"
                            onClick={() => { setUserType('artist'); setStep(1); }}
                        >
                            <div className="pane-content">
                                <span className="role-label">PARA ARTISTAS</span>
                                <h1 className="pane-title">Transforme sua paixão em carreira sólida</h1>
                                <p className="pane-desc">Quero tocar mais, receber cachê antecipado e profissionalizar meu perfil musical.</p>
                                <div className="pane-footer">
                                    <span className="pane-cta">CRIAR PERFIL</span>
                                    <ArrowUpRight size={24} />
                                </div>
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
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">DADOS DO<br />ESTABELECIMENTO</h1>

                        <div className="input-group-vertical">
                            <div className="autocomplete-wrapper">
                                <input
                                    ref={venueInputRef}
                                    type="text"
                                    className="headline-input-small"
                                    placeholder="NOME DO LOCAL"
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
                            </div>

                            <input
                                type="text"
                                className="headline-input-small"
                                placeholder="CNPJ"
                                value={venueData.cnpj}
                                onChange={(e) => setVenueData({ ...venueData, cnpj: e.target.value })}
                            />

                            <div className="type-selector shadow-none">
                                <h3 className="section-label">TIPO DE LOCAL</h3>
                                <div className="floating-chips small-chips">
                                    {['Bar', 'Restaurante', 'Casa de Shows', 'Hotel', 'Evento Corporativo'].map(t => (
                                        <button
                                            key={t}
                                            className={`chip ${venueData.type === t ? 'chip-selected' : ''}`}
                                            onClick={() => setVenueData({ ...venueData, type: t })}
                                        >
                                            {t.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="button-group">
                            <button className="btn btn-outline" onClick={handleCancel}>
                                CANCELAR
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleNext}
                                disabled={!venueData.name || !venueData.cnpj}
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
                            <button className="btn btn-outline" onClick={handleBack}>
                                NÃO, VOLTAR
                            </button>
                            <button className="btn btn-primary" onClick={handleNext}>
                                SIM, CONFIRMAR <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* VENUE STEP 3: CAPACITY & DAYS (US-02) */}
                {userType === 'venue' && step === 3 && (
                    <motion.div
                        key="venue-step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">CAPACIDADE<br />E DIAS</h1>

                        <div className="capacity-selector">
                            <h3 className="section-label">CAPACIDADE (PESSOAS)</h3>
                            <div className="cache-display">
                                <span className="cache-value">{venueData.capacity}</span>
                            </div>
                            <input
                                type="range"
                                className="cache-slider"
                                min="10"
                                max="5000"
                                step="10"
                                value={venueData.capacity}
                                onChange={(e) => setVenueData({ ...venueData, capacity: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="days-toggle-group">
                            {DAYS.map((day, idx) => (
                                <button
                                    key={idx}
                                    className={`day-toggle ${venueData.operatingDays.includes(day.full) ? 'day-active' : ''}`}
                                    onClick={() => toggleDay(day.full)}
                                >
                                    {day.short}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={venueData.operatingDays.length === 0}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* VENUE STEP 4: INFRASTRUCTURE (US-03) */}
                {userType === 'venue' && step === 4 && (
                    <motion.div
                        key="venue-step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">INFRAESTRUTURA<br />TÉCNICA</h1>

                        <div className="infrastructure-checklist">
                            {[
                                { key: 'hasStage', label: 'POSSUI PALCO' },
                                { key: 'hasSoundSystem', label: 'SISTEMA DE SOM PRÓPRIO' },
                                { key: 'hasReturns', label: 'RETORNOS DE PALCO' },
                                { key: 'hasLighting', label: 'ILUMINAÇÃO DE PALCO' },
                                { key: 'hasDressingRoom', label: 'CAMARIM' }
                            ].map(item => (
                                <div
                                    key={item.key}
                                    className={`tech-chip-item ${venueData.techRider[item.key] ? 'active' : ''}`}
                                    onClick={() => setVenueData({
                                        ...venueData,
                                        techRider: { ...venueData.techRider, [item.key]: !venueData.techRider[item.key] }
                                    })}
                                >
                                    <div className="toggle-box-small"></div>
                                    <span className="mono-text">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="tech-details-row">
                            <div className="input-field">
                                <label className="mono-label">CANAIS NA MESA</label>
                                <input
                                    type="number"
                                    className="headline-input-small"
                                    value={venueData.techRider.mixerChannels}
                                    onChange={(e) => setVenueData({
                                        ...venueData,
                                        techRider: { ...venueData.techRider, mixerChannels: parseInt(e.target.value) }
                                    })}
                                />
                            </div>
                            <div className="input-field">
                                <label className="mono-label">MICROFONES</label>
                                <input
                                    type="number"
                                    className="headline-input-small"
                                    value={venueData.techRider.micsCount}
                                    onChange={(e) => setVenueData({
                                        ...venueData,
                                        techRider: { ...venueData.techRider, micsCount: parseInt(e.target.value) }
                                    })}
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* VENUE STEP 5: PHOTOS (US-04) */}
                {userType === 'venue' && step === 5 && (
                    <motion.div
                        key="venue-step5"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">FOTOS DO<br />LOCAL</h1>

                        <div className="photo-upload-placeholder">
                            <div className="photo-grid-simulated">
                                <div className="photo-box-sim add-photo">
                                    <span>+ ADICIONAR FOTO</span>
                                </div>
                                <div className="photo-box-sim"></div>
                                <div className="photo-box-sim"></div>
                            </div>
                            <p className="mono-text muted-text" style={{ marginTop: '2rem' }}>MÍNIMO 1 FOTO PARA CONTINUAR</p>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            CONTINUAR <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* VENUE STEP 6: GENRES (US-06) */}
                {userType === 'venue' && step === 6 && (
                    <motion.div
                        key="venue-step6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">O QUE TOCA<br />NA CASA?</h1>

                        <div className="floating-chips">
                            {GENRES.map(genre => (
                                <button
                                    key={genre}
                                    className={`chip ${venueData.genres.includes(genre) ? 'chip-selected' : ''}`}
                                    onClick={() => toggleGenre(genre, 'venue')}
                                >
                                    {genre.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={venueData.genres.length === 0}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* VENUE STEP 7: BUDGET (US-05) */}
                {userType === 'venue' && step === 7 && (
                    <motion.div
                        key="venue-step7"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">BUDGET PARA<br />ARTISTAS</h1>

                        <div className="cache-range-inputs">
                            <div className="range-field">
                                <label className="mono-label">MÍNIMO (R$)</label>
                                <input
                                    type="number"
                                    className="headline-input-small"
                                    value={venueData.budgetMin}
                                    onChange={(e) => setVenueData({ ...venueData, budgetMin: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="range-field">
                                <label className="mono-label">MÁXIMO (R$)</label>
                                <input
                                    type="number"
                                    className="headline-input-small"
                                    value={venueData.budgetMax}
                                    onChange={(e) => setVenueData({ ...venueData, budgetMax: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="cache-type-selector">
                            <h3 className="section-label">TIPO DE PAGAMENTO</h3>
                            <div className="floating-chips small-chips">
                                {['Por noite', 'Por hora', 'Por set'].map(t => (
                                    <button
                                        key={t}
                                        className={`chip ${venueData.paymentType === t ? 'chip-selected' : ''}`}
                                        onClick={() => setVenueData({ ...venueData, paymentType: t })}
                                    >
                                        {t.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="negotiable-toggle" onClick={() => setVenueData({ ...venueData, negotiable: !venueData.negotiable })}>
                            <div className={`toggle-box ${venueData.negotiable ? 'active' : ''}`}></div>
                            <span className="mono-text">VALOR NEGOCIÁVEL</span>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* VENUE STEP 8: FORMATS (US-07) */}
                {userType === 'venue' && step === 8 && (
                    <motion.div
                        key="venue-step8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">FORMATOS<br />PREFERIDOS</h1>

                        <div className="floating-chips">
                            {['Solo', 'Duo', 'Trio', 'Banda', 'Todos os formatos'].map(format => (
                                <button
                                    key={format}
                                    className={`chip ${venueData.preferredFormats.includes(format) ? 'chip-selected' : ''}`}
                                    onClick={() => {
                                        const current = venueData.preferredFormats;
                                        const updated = current.includes(format)
                                            ? current.filter(f => f !== format)
                                            : [...current, format];
                                        setVenueData({ ...venueData, preferredFormats: updated });
                                    }}
                                >
                                    {format.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={venueData.preferredFormats.length === 0}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* VENUE STEP 9: BENEFITS (US-08) */}
                {userType === 'venue' && step === 9 && (
                    <motion.div
                        key="venue-step9"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">BENEFÍCIOS PARA<br />OS ARTISTAS</h1>

                        <div className="floating-chips">
                            {['Alimentação inclusa', 'Bebidas inclusas', 'Estacionamento', 'Hospedagem', 'Couvert artístico', 'Porcentagem bilheteria'].map(benefit => (
                                <button
                                    key={benefit}
                                    className={`chip ${venueData.benefits.includes(benefit) ? 'chip-selected' : ''}`}
                                    onClick={() => {
                                        const current = venueData.benefits;
                                        const updated = current.includes(benefit)
                                            ? current.filter(b => b !== benefit)
                                            : [...current, benefit];
                                        setVenueData({ ...venueData, benefits: updated });
                                    }}
                                >
                                    {benefit.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            REVISAR DADOS <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* VENUE STEP 10: SUMMARY */}
                {userType === 'venue' && step === 10 && (
                    <motion.div
                        key="venue-step10"
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
                                <span className="summary-label">CAPACIDADE</span>
                                <span className="summary-value">{venueData.capacity} PESSOAS</span>
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
                                <span className="summary-label">ORÇAMENTO</span>
                                <span className="summary-value">R$ {venueData.budgetMin.toLocaleString('pt-BR')} - R$ {venueData.budgetMax.toLocaleString('pt-BR')} / {venueData.paymentType.toUpperCase()}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">FORMATOS</span>
                                <span className="summary-value">{venueData.preferredFormats.join(', ')}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">BENEFÍCIOS</span>
                                <span className="summary-value">{venueData.benefits.join(', ') || '-'}</span>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
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
                                className="btn btn-primary"
                                onClick={handleNext}
                                disabled={!artistData.name.trim()}
                            >
                                PRÓXIMO <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ARTIST STEP 2: PROJECT TYPE (US-02) */}
                {userType === 'artist' && step === 2 && (
                    <motion.div
                        key="artist-step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUAL O FORMATO<br />DO SEU PROJETO?</h1>

                        <div className="floating-chips">
                            {['Solo', 'Duo', 'Trio', 'Banda'].map(type => (
                                <button
                                    key={type}
                                    className={`chip ${artistData.projectType === type ? 'chip-selected' : ''}`}
                                    onClick={() => setArtistData({ ...artistData, projectType: type })}
                                >
                                    {type.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                // If Solo, skip Step 3 (Lineup)
                                if (artistData.projectType === 'Solo') {
                                    setStep(4);
                                } else {
                                    handleNext();
                                }
                            }}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 3: LINEUP (US-03) */}
                {userType === 'artist' && step === 3 && (
                    <motion.div
                        key="artist-step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUEM SÃO OS<br />INTEGRANTES?</h1>

                        <div className="lineup-container">
                            {(artistData.lineup || []).map((member, idx) => (
                                <div key={idx} className="lineup-item">
                                    <div className="member-info">
                                        <span className="member-name">{member.name || 'Novo Integrante'}</span>
                                        <span className="member-role">{member.role || 'Instrumento'}</span>
                                    </div>
                                    <div className="member-actions">
                                        <button
                                            className="btn-text-danger"
                                            onClick={() => {
                                                const updated = artistData.lineup.filter((_, i) => i !== idx);
                                                setArtistData({ ...artistData, lineup: updated });
                                            }}
                                        >
                                            REMOVER
                                        </button>
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
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={!artistData.lineup || artistData.lineup.length < (artistData.projectType === 'Duo' ? 1 : artistData.projectType === 'Trio' ? 2 : 3)}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 4: LOCATION & RADIUS (US-04) */}
                {userType === 'artist' && step === 4 && (
                    <motion.div
                        key="artist-step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">ONDE VOCÊS<br />ESTÃO BASEADOS?</h1>

                        <div className="location-inputs">
                            <div className="autocomplete-wrapper">
                                <input
                                    type="text"
                                    className="headline-input"
                                    placeholder="SUA CIDADE/BAIRRO"
                                    value={artistData.location}
                                    onChange={(e) => setArtistData({ ...artistData, location: e.target.value })}
                                />
                            </div>

                            <div className="radius-selector">
                                <h3 className="section-label">ATÉ ONDE ACEITAM TOCAR?</h3>
                                <div className="floating-chips small-chips">
                                    {['Apenas minha cidade', 'Até 30km', 'Até 50km', 'Até 100km', 'Todo o estado', 'Nacional'].map(r => (
                                        <button
                                            key={r}
                                            className={`chip ${artistData.radius === r ? 'chip-selected' : ''}`}
                                            onClick={() => setArtistData({ ...artistData, radius: r })}
                                        >
                                            {r.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={!artistData.location.trim()}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 5: MATERIAL (US-05) */}
                {userType === 'artist' && step === 5 && (
                    <motion.div
                        key="artist-step5"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">MOSTRE O<br />SEU TRABALHO</h1>

                        <div className="material-inputs">
                            <div className="input-field">
                                <label className="mono-label">LINK DO INSTAGRAM</label>
                                <input
                                    type="text"
                                    className="headline-input-small"
                                    placeholder="@seu_perfil"
                                    value={artistData.instagram}
                                    onChange={(e) => setArtistData({ ...artistData, instagram: e.target.value })}
                                />
                            </div>

                            <div className="divider-minimal">OU</div>

                            <div className="input-field">
                                <label className="mono-label">LINK DE VÍDEO (YouTube/Vimeo)</label>
                                <input
                                    type="text"
                                    className="headline-input-small"
                                    placeholder="https://youtube.com/..."
                                    value={artistData.videoUrl}
                                    onChange={(e) => setArtistData({ ...artistData, videoUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={!artistData.instagram && !artistData.videoUrl}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 6: STYLE (US-06) */}
                {userType === 'artist' && step === 6 && (
                    <motion.div
                        key="artist-step6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUAL O SEU<br />ESTILO MUSICAL?</h1>

                        <div className="floating-chips">
                            {GENRES.map(genre => (
                                <button
                                    key={genre}
                                    className={`chip ${artistData.genres.includes(genre) ? 'chip-selected' : ''}`}
                                    onClick={() => toggleGenre(genre, 'artist')}
                                >
                                    {genre.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={artistData.genres.length === 0}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 7: CACHE RANGE (US-07) */}
                {userType === 'artist' && step === 7 && (
                    <motion.div
                        key="artist-step7"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUAL O SEU<br />CACHÊ PRETENDIDO?</h1>

                        <div className="cache-range-inputs">
                            <div className="range-field">
                                <label className="mono-label">MÍNIMO (R$)</label>
                                <input
                                    type="number"
                                    className="headline-input-small"
                                    value={artistData.cacheMin}
                                    onChange={(e) => setArtistData({ ...artistData, cacheMin: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="range-field">
                                <label className="mono-label">MÁXIMO (R$)</label>
                                <input
                                    type="number"
                                    className="headline-input-small"
                                    value={artistData.cacheMax}
                                    onChange={(e) => setArtistData({ ...artistData, cacheMax: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="cache-type-selector">
                            <h3 className="section-label">TIPO DE CACHÊ</h3>
                            <div className="floating-chips small-chips">
                                {['Noite completa', 'Por hora', 'Por set'].map(t => (
                                    <button
                                        key={t}
                                        className={`chip ${artistData.cacheType === t ? 'chip-selected' : ''}`}
                                        onClick={() => setArtistData({ ...artistData, cacheType: t })}
                                    >
                                        {t.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="negotiable-toggle" onClick={() => setArtistData({ ...artistData, negotiable: !artistData.negotiable })}>
                            <div className={`toggle-box ${artistData.negotiable ? 'active' : ''}`}></div>
                            <span className="mono-text">VALOR NEGOCIÁVEL</span>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 8: TECH NEEDS (US-08) */}
                {userType === 'artist' && step === 8 && (
                    <motion.div
                        key="artist-step8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">O QUE VOCÊS<br />PRECISAM?</h1>

                        <div className="tech-needs-selector">
                            {['Trago todo equipamento', 'Preciso de som da casa', 'Parcial'].map(t => (
                                <button
                                    key={t}
                                    className={`chip ${artistData.techNeeds.type === t ? 'chip-selected' : ''}`}
                                    onClick={() => setArtistData({ ...artistData, techNeeds: { ...artistData.techNeeds, type: t } })}
                                >
                                    {t.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {artistData.techNeeds.type === 'Parcial' && (
                            <textarea
                                className="headline-input-small"
                                style={{ width: '100%', marginTop: '2rem', minHeight: '100px', textAlign: 'left' }}
                                placeholder="DETALHE O QUE PRECISA (EX: MESA DE SOM, MICROFONES...)"
                                value={artistData.techNeeds.details}
                                onChange={(e) => setArtistData({ ...artistData, techNeeds: { ...artistData.techNeeds, details: e.target.value } })}
                            />
                        )}

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            style={{ marginTop: '3rem' }}
                        >
                            PRÓXIMO <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 9: AVAILABILITY (US-10) */}
                {userType === 'artist' && step === 9 && (
                    <motion.div
                        key="artist-step9"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">QUANDO VOCÊS<br />ESTÃO LIVRES?</h1>

                        <div className="days-toggle-group">
                            {DAYS.map((day, idx) => (
                                <button
                                    key={idx}
                                    className={`day-toggle ${artistData.availability.includes(day.full) ? 'day-active' : ''}`}
                                    onClick={() => {
                                        const current = artistData.availability;
                                        const updated = current.includes(day.full) ? current.filter(d => d !== day.full) : [...current, day.full];
                                        setArtistData({ ...artistData, availability: updated });
                                    }}
                                >
                                    {day.short}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            REVISAR DADOS <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {/* ARTIST STEP 10: SUMMARY */}
                {userType === 'artist' && step === 10 && (
                    <motion.div
                        key="artist-step10"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="step-screen"
                    >
                        <h1 className="mega-title">RESUMO DO<br />PERFIL</h1>

                        <div className="summary-card">
                            <div className="summary-item">
                                <span className="summary-label">NOME</span>
                                <span className="summary-value">{artistData.name}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">FORMATO</span>
                                <span className="summary-value">{artistData.projectType}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">LOCALIZAÇÃO</span>
                                <span className="summary-value">{artistData.location} ({artistData.radius})</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">ESTILOS</span>
                                <span className="summary-value">{artistData.genres.join(', ')}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">CACHÊ</span>
                                <span className="summary-value">R$ {artistData.cacheMin.toLocaleString('pt-BR')} - R$ {artistData.cacheMax.toLocaleString('pt-BR')} / {artistData.cacheType.toUpperCase()} {artistData.negotiable ? '(NEGOCIÁVEL)' : ''}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">TIPO DE SOM</span>
                                <span className="summary-value">{artistData.techNeeds.type.toUpperCase()}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">DISPONIBILIDADE</span>
                                <span className="summary-value">{artistData.availability.join(', ')}</span>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={isSaving}
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

            <SideSheet
                isOpen={notification.isOpen}
                onClose={() => setNotification({ ...notification, isOpen: false })}
                title={notification.title}
                type={notification.type}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{notification.message}</p>
                </div>
                <button
                    className="btn btn-primary btn-block"
                    onClick={() => setNotification({ ...notification, isOpen: false })}
                >
                    ENTENDI
                </button>
            </SideSheet>
        </div>
    );
};

export default UserRegister;
