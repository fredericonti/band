
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Share2, Heart, MessageCircle } from 'lucide-react';
import './BandPublicProfile.css';

// Mock data - in a real app this would come from an API/Database based on ID
const MOCK_BAND_DETAILS = {
    1: {
        name: 'Neon Pulse',
        genre: 'Eletrônica',
        location: 'São Paulo, SP',
        bio: 'Neon Pulse traz a energia do Synthwave dos anos 80 com uma roupagem moderna. Nossa performance é uma experiência audiovisual imersiva, perfeita para festas noturnas e eventos corporativos que buscam inovação.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
        members: [
            { name: 'Alex', role: 'Sintetizadores', image: 'https://i.pravatar.cc/150?u=alex' },
            { name: 'Sarah', role: 'Vocal', image: 'https://i.pravatar.cc/150?u=sarah' },
            { name: 'Mike', role: 'Bateria Eletrônica', image: 'https://i.pravatar.cc/150?u=mike' }
        ],
        topTracks: [
            { title: 'Midnight City Lights', duration: '3:45' },
            { title: 'Cyber Heart', duration: '4:12' },
            { title: 'Retro Future', duration: '3:30' }
        ],
        social: {
            instagram: '@neonpulse',
            spotify: 'Neon Pulse'
        }
    },
    2: {
        name: 'The Midnight Jazz',
        genre: 'Jazz',
        location: 'Rio de Janeiro, RJ',
        bio: 'Jazz sofisticado para ambientes elegantes. Reinterpretamos clássicos com um toque contemporâneo.',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000',
        members: [
            { name: 'John', role: 'Saxofone', image: 'https://i.pravatar.cc/150?u=john' },
            { name: 'Paul', role: 'Piano', image: 'https://i.pravatar.cc/150?u=paul' },
            { name: 'George', role: 'Baixo', image: 'https://i.pravatar.cc/150?u=george' },
            { name: 'Ringo', role: 'Bateria', image: 'https://i.pravatar.cc/150?u=ringo' }
        ],
        topTracks: [
            { title: 'Blue Train', duration: '5:20' },
            { title: 'So What', duration: '4:45' },
            { title: 'Take Five', duration: '3:50' }
        ],
        social: {
            instagram: '@midnightjazz',
            spotify: 'The Midnight Jazz'
        }
    },
    3: {
        name: 'Crimson Rock',
        genre: 'Rock',
        location: 'Belo Horizonte, MG',
        bio: 'Rock n Roll puro e visceral. Trazemos os clássicos e autorais com muita energia.',
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1000',
        members: [
            { name: 'Dave', role: 'Vocal/Guitarra', image: 'https://i.pravatar.cc/150?u=dave' },
            { name: 'Kurt', role: 'Guitarra', image: 'https://i.pravatar.cc/150?u=kurt' },
            { name: 'Krist', role: 'Baixo', image: 'https://i.pravatar.cc/150?u=krist' },
            { name: 'Taylor', role: 'Bateria', image: 'https://i.pravatar.cc/150?u=taylor' },
            { name: 'Pat', role: 'Teclado', image: 'https://i.pravatar.cc/150?u=pat' }
        ],
        topTracks: [
            { title: 'Highway Star', duration: '4:10' },
            { title: 'Born to be Wild', duration: '3:55' },
            { title: 'Smoke on the Water', duration: '5:00' }
        ],
        social: {
            instagram: '@crimsonrock',
            spotify: 'Crimson Rock'
        }
    },
    4: {
        name: 'Acoustic Vibes',
        genre: 'Acústico',
        location: 'Curitiba, PR',
        bio: 'Voz e violão para momentos intimistas e descontraídos.',
        image: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?auto=format&fit=crop&q=80&w=1000',
        members: [
            { name: 'Ana', role: 'Vocal', image: 'https://i.pravatar.cc/150?u=ana' },
            { name: 'Beto', role: 'Violão', image: 'https://i.pravatar.cc/150?u=beto' }
        ],
        topTracks: [
            { title: 'Wonderwall', duration: '3:15' },
            { title: 'Fast Car', duration: '4:05' },
            { title: 'Iris', duration: '3:40' }
        ],
        social: {
            instagram: '@acousticvibes',
            spotify: 'Acoustic Vibes'
        }
    }
};

const BandPublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const band = MOCK_BAND_DETAILS[id] || MOCK_BAND_DETAILS[1]; // Fallback to first band if ID not found

    return (
        <div className="band-public-profile">
            <button className="back-btn-floating" onClick={() => navigate(-1)}>
                <ArrowLeft size={24} /> VOLTAR
            </button>

            <div className="profile-header">
                <div className="cover-image" style={{ backgroundImage: `url(${band.image})` }}>
                    <div className="cover-overlay"></div>
                </div>
                <div className="profile-intro container">
                    <div className="profile-main-info">
                        <img src={band.image} alt={band.name} className="profile-avatar" />
                        <div className="profile-text">
                            <h1 className="band-name">{band.name}</h1>
                            <p className="band-genre">{band.genre} • {band.location}</p>
                            <div className="profile-stats">
                                <span><strong>{band.members.length}</strong> Integrantes</span>
                                <span><strong>1.2k</strong> Shows</span>
                                <span><strong>4.9</strong> Avaliação</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="btn btn-primary">CONTRATAR AGORA</button>
                        <button className="btn btn-outline btn-icon"><MessageCircle size={20} /></button>
                        <button className="btn btn-outline btn-icon"><Heart size={20} /></button>
                        <button className="btn btn-outline btn-icon"><Share2 size={20} /></button>
                    </div>
                </div>
            </div>

            <div className="profile-content container">
                <div className="content-grid">
                    <div className="left-column">
                        <section className="bio-section">
                            <h3>SOBRE</h3>
                            <p>{band.bio}</p>
                            <div className="social-links">
                                <a href="#" className="social-link">Instagram: {band.social.instagram}</a>
                                <a href="#" className="social-link">Spotify: {band.social.spotify}</a>
                            </div>
                        </section>

                        <section className="music-section">
                            <h3>TOP MÚSICAS</h3>
                            <div className="track-list">
                                {band.topTracks.map((track, index) => (
                                    <div key={index} className="track-item">
                                        <button className="play-btn"><Play size={16} /></button>
                                        <span className="track-number">{index + 1}</span>
                                        <span className="track-title">{track.title}</span>
                                        <span className="track-duration">{track.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="right-column">
                        <section className="lineup-section">
                            <h3>INTEGRANTES</h3>
                            <div className="members-grid">
                                {band.members.map((member, index) => (
                                    <div key={index} className="member-card">
                                        <img src={member.image} alt={member.name} />
                                        <div className="member-info">
                                            <strong>{member.name}</strong>
                                            <span>{member.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BandPublicProfile;
