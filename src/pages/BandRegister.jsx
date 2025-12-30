import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, DollarSign, Mic2, CreditCard, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './BandRegister.css';

const BandRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'The Midnight Echo',
        genre: 'Indie Rock',
        bio: 'We are a 4-piece indie rock band from Seattle, known for our high-energy performances and catchy riffs.',
        cost: '1200',
        members: [
            { name: 'Alex Turner', role: 'Vocals/Guitar', cpf: '', pix: '', split: 50 },
            { name: 'Jamie Cook', role: 'Guitar', cpf: '', pix: '', split: 50 }
        ]
    });

    const [totalSplit, setTotalSplit] = useState(100);

    useEffect(() => {
        const total = formData.members.reduce((acc, member) => acc + Number(member.split), 0);
        setTotalSplit(total);
    }, [formData.members]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...formData.members];
        newMembers[index][field] = value;
        setFormData(prev => ({ ...prev, members: newMembers }));
    };

    const addMember = () => {
        setFormData(prev => ({
            ...prev,
            members: [...prev.members, { name: '', role: '', cpf: '', pix: '', split: 0 }]
        }));
    };

    const removeMember = (index) => {
        if (formData.members.length > 1) {
            setFormData(prev => ({
                ...prev,
                members: prev.members.filter((_, i) => i !== index)
            }));
        }
    };

    const autoBalanceSplit = () => {
        const count = formData.members.length;
        const split = Math.floor(100 / count);
        const remainder = 100 % count;

        const newMembers = formData.members.map((m, i) => ({
            ...m,
            split: i === 0 ? split + remainder : split
        }));
        setFormData(prev => ({ ...prev, members: newMembers }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (totalSplit !== 100) {
            alert('Total split percentage must equal 100%');
            return;
        }
        console.log('Form Submitted:', formData);
        // Simulate API call
        setTimeout(() => {
            navigate('/profile');
        }, 500);
    };

    return (
        <motion.div
            className="register-page container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="register-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Crie o Perfil da Sua Banda
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Configure seus splits, membros e prepare-se para os shows.
                </motion.p>
            </div>

            <motion.form
                onSubmit={handleSubmit}
                className="register-form card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
            >
                {/* Band Details */}
                <div className="form-group-container">
                    <div className="section-title">
                        <h3><Mic2 size={20} /> Detalhes da Banda</h3>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label className="label">Nome da Banda</label>
                            <input
                                type="text"
                                name="name"
                                className="input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ex: The Neon Lights"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="label">Gênero / Estilo</label>
                            <input
                                type="text"
                                name="genre"
                                className="input"
                                value={formData.genre}
                                onChange={handleChange}
                                placeholder="ex: Rock, Jazz, Eletrônica"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">Biografia</label>
                        <textarea
                            name="bio"
                            className="input"
                            rows="3"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Conte um pouco sobre sua banda..."
                        />
                    </div>

                    <div className="divider"></div>

                    {/* Financial Split Mixer */}
                    <div className="section-header">
                        <div>
                            <h3><DollarSign size={20} /> Mixer de Split Financeiro</h3>
                            <p style={{ color: totalSplit === 100 ? '#4ade80' : '#ef4444', fontSize: '0.9rem', marginTop: '4px' }}>
                                Alocação Total: {totalSplit}%
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="button" onClick={autoBalanceSplit} className="btn btn-outline btn-sm" style={{ borderColor: '#333' }}>
                                Auto-Balancear
                            </button>
                            <button type="button" onClick={addMember} className="btn btn-primary btn-sm">
                                <Plus size={16} /> Add Membro
                            </button>
                        </div>
                    </div>

                    <div className="members-list">
                        {formData.members.map((member, index) => (
                            <motion.div
                                key={index}
                                className="member-card"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (index * 0.1) }}
                            >
                                <div className="member-header">
                                    <div className="member-info-inputs">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Nome"
                                            value={member.name}
                                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Função"
                                            value={member.role}
                                            onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {formData.members.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMember(index)}
                                            className="btn-icon-danger"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="member-financials">
                                    <div className="input-group">
                                        <label className="label">CPF / CNPJ</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="000.000.000-00"
                                            value={member.cpf}
                                            onChange={(e) => handleMemberChange(index, 'cpf', e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="label">Chave Pix</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="email@exemplo.com"
                                            value={member.pix}
                                            onChange={(e) => handleMemberChange(index, 'pix', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="split-slider-container">
                                    <div className="split-header">
                                        <span className="label">Split de Receita</span>
                                        <span className="split-value">{member.split}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={member.split}
                                        onChange={(e) => handleMemberChange(index, 'split', Number(e.target.value))}
                                        className="range-slider"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="divider"></div>

                    <div className="section-title">
                        <h3><CreditCard size={20} /> Configurações de Cachê</h3>
                    </div>

                    <div className="input-group">
                        <label className="label">Cachê Padrão (R$)</label>
                        <input
                            type="number"
                            name="cost"
                            className="input"
                            value={formData.cost}
                            onChange={handleChange}
                            placeholder="1200"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary btn-block" disabled={totalSplit !== 100}>
                        <Save size={18} style={{ marginRight: '8px' }} />
                        {totalSplit !== 100 ? `Corrigir Split (${totalSplit}%)` : 'Criar Perfil da Banda'}
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default BandRegister;
