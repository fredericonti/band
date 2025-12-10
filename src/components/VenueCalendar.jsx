import React, { useState } from 'react';
import { Plus, Calendar, Music, DollarSign, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './VenueCalendar.css';

const VenueCalendar = ({ venueId }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCreateSlot, setShowCreateSlot] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Mock data - replace with real data from database
    const [gigs, setGigs] = useState([
        {
            id: 1,
            date: '2025-12-05',
            artistName: 'Neon Pulse',
            status: 'booked',
            budget: 1500
        },
        {
            id: 2,
            date: '2025-12-12',
            status: 'open_slot',
            genre: 'Rock',
            budget: 2000,
            applicants: 3
        }
    ]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    const getGigForDate = (date) => {
        if (!date) return null;
        const dateStr = formatDate(date);
        return gigs.find(gig => gig.date === dateStr);
    };

    const handleDayClick = (date) => {
        if (!date) return;
        const gig = getGigForDate(date);

        if (gig) {
            // Open gig details/applicants
            setSelectedDate(date);
        } else {
            // Open create slot modal
            setSelectedDate(date);
            setShowCreateSlot(true);
        }
    };

    const handleCreateSlot = (slotData) => {
        const newGig = {
            id: Date.now(),
            date: formatDate(selectedDate),
            status: 'open_slot',
            ...slotData,
            applicants: 0
        };
        setGigs([...gigs, newGig]);
        setShowCreateSlot(false);
        setSelectedDate(null);
    };

    const days = getDaysInMonth(currentMonth);
    const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

    return (
        <div className="venue-calendar-container">
            <div className="calendar-header">
                <h2>AGENDA DO ESTABELECIMENTO</h2>
                <div className="month-navigation">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
                        ←
                    </button>
                    <span>{currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}</span>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
                        →
                    </button>
                </div>
            </div>

            <div className="calendar-grid">
                {/* Week day headers */}
                {weekDays.map(day => (
                    <div key={day} className="calendar-header-cell">
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {days.map((date, index) => {
                    const gig = getGigForDate(date);
                    const isEmpty = !gig;
                    const isBooked = gig?.status === 'booked';
                    const isOpenSlot = gig?.status === 'open_slot';

                    return (
                        <motion.div
                            key={index}
                            className={`calendar-day ${isEmpty ? 'empty' : ''} ${isBooked ? 'booked' : ''} ${isOpenSlot ? 'open-slot' : ''}`}
                            onClick={() => handleDayClick(date)}
                            whileHover={date ? { scale: 1.02 } : {}}
                            whileTap={date ? { scale: 0.98 } : {}}
                        >
                            {date && (
                                <>
                                    <span className="day-number">{date.getDate()}</span>

                                    {isBooked && (
                                        <div className="gig-info">
                                            <Music size={16} />
                                            <span className="artist-name">{gig.artistName}</span>
                                        </div>
                                    )}

                                    {isOpenSlot && (
                                        <div className="slot-info">
                                            <Calendar size={14} />
                                            <span className="slot-genre">{gig.genre}</span>
                                            {gig.applicants > 0 && (
                                                <span className="applicants-badge">{gig.applicants} candidatos</span>
                                            )}
                                        </div>
                                    )}

                                    {isEmpty && (
                                        <div className="add-slot">
                                            <Plus size={24} />
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Create Slot Modal */}
            <AnimatePresence>
                {showCreateSlot && (
                    <CreateSlotModal
                        date={selectedDate}
                        onClose={() => {
                            setShowCreateSlot(false);
                            setSelectedDate(null);
                        }}
                        onCreate={handleCreateSlot}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Create Slot Modal Component
const CreateSlotModal = ({ date, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        genre: '',
        budget: '',
        startTime: '20:00',
        endTime: '23:00',
        notes: ''
    });

    const genres = ['Rock', 'Jazz', 'Samba', 'Eletrônica', 'MPB', 'Acústico', 'Indie'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
    };

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="create-slot-modal"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3>CRIAR VAGA ABERTA</h3>
                    <p className="selected-date">
                        {date?.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="slot-form">
                    <div className="form-group">
                        <label>GÊNERO NECESSÁRIO</label>
                        <div className="genre-chips">
                            {genres.map(genre => (
                                <button
                                    key={genre}
                                    type="button"
                                    className={`chip ${formData.genre === genre ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, genre })}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>VALOR OFERECIDO</label>
                        <div className="budget-input">
                            <DollarSign size={20} />
                            <input
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                placeholder="1500"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>HORÁRIO INÍCIO</label>
                            <div className="time-input">
                                <Clock size={18} />
                                <input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>HORÁRIO FIM</label>
                            <div className="time-input">
                                <Clock size={18} />
                                <input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>OBSERVAÇÕES (OPCIONAL)</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Informações adicionais sobre o evento..."
                            rows={3}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-outline" onClick={onClose}>
                            CANCELAR
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={!formData.genre || !formData.budget}>
                            PUBLICAR VAGA
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default VenueCalendar;
