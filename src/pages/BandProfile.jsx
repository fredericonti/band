import React from 'react';
import { MapPin, Music, Users, Star, Settings, Edit } from 'lucide-react';
import './BandProfile.css';

const BandProfile = () => {
    // Mock data - in a real app this would come from context/backend
    const bandData = {
        name: 'The Midnight Echo',
        genre: 'Indie Rock',
        rating: 4.9,
        reviews: 24,
        bio: 'We are a 4-piece indie rock band from Seattle, known for our high-energy performances and catchy riffs.',
        members: [
            { name: 'Alex Turner', role: 'Vocals/Guitar' },
            { name: 'Jamie Cook', role: 'Guitar' }
        ],
        nextGig: 'Oct 24 - The Blue Lounge'
    };

    return (
        <div className="profile-page container">
            <div className="profile-header">
                <div className="profile-cover">
                    <div className="profile-avatar">
                        <Music size={40} />
                    </div>
                </div>
                <div className="profile-info">
                    <div className="info-main">
                        <h1>{bandData.name}</h1>
                        <div className="badges">
                            <span className="badge-genre">{bandData.genre}</span>
                            <span className="badge-rating">
                                <Star size={14} fill="currentColor" /> {bandData.rating} ({bandData.reviews} reviews)
                            </span>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="btn btn-outline btn-sm">
                            <Settings size={18} /> Settings
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Edit size={18} style={{ marginRight: '8px' }} /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="profile-grid">
                <div className="profile-section card">
                    <h3>About</h3>
                    <p className="bio-text">{bandData.bio}</p>

                    <div className="stats-row">
                        <div className="stat-item">
                            <Users size={20} className="stat-icon" />
                            <div>
                                <span className="stat-value">{bandData.members.length}</span>
                                <span className="stat-label">Members</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <MapPin size={20} className="stat-icon" />
                            <div>
                                <span className="stat-value">Seattle</span>
                                <span className="stat-label">Based in</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-section card">
                    <h3>Upcoming Gigs</h3>
                    <div className="gig-card">
                        <div className="gig-date">
                            <span className="day">24</span>
                            <span className="month">OCT</span>
                        </div>
                        <div className="gig-details">
                            <h4>The Blue Lounge</h4>
                            <p>20:00 - 23:00</p>
                        </div>
                        <div className="gig-status confirmed">Confirmed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BandProfile;
