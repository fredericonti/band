import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Zap, Shield, Globe } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion';
import './LandingPage.css';

// --- ANIMATION COMPONENTS ---

const Hero3DBackground = () => {
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
        mouseX.set(x);
        mouseY.set(y);
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
    const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);

    return (
        <div className="hero-bg" style={{ perspective: 1000, overflow: 'hidden' }}>
            <motion.div
                style={{
                    width: '100%',
                    height: '100%',
                    rotateX,
                    rotateY,
                    scale: 1.1,
                    background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #000 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* 3D Grid/Matrix Effect */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10, 1fr)',
                    gap: '1rem',
                    width: '120vw',
                    height: '120vh',
                    transform: 'rotateX(60deg) translateY(-100px) translateZ(-200px)',
                    opacity: 0.2
                }}>
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            width: '100%',
                            height: '100%'
                        }} />
                    ))}
                </div>
            </motion.div>
            <div className="bg-overlay"></div>
        </div>
    );
};

const ScrollPath = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="scroll-path-container">
            <svg viewBox="0 0 100 400" preserveAspectRatio="none" className="scroll-path-svg">
                <motion.path
                    d="M 50 0 C 50 50, 20 100, 50 150 C 80 200, 50 250, 50 300 C 50 350, 80 400, 50 450"
                    fill="none"
                    strokeWidth="1"
                    stroke="rgba(194, 63, 56, 0.2)"
                />
                <motion.path
                    d="M 50 0 C 50 50, 20 100, 50 150 C 80 200, 50 250, 50 300 C 50 350, 80 400, 50 450"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="url(#gradient)"
                    style={{ pathLength: scaleY }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D85951" />
                        <stop offset="100%" stopColor="#C23F38" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

// --- ANIMATION ILLUSTRATIONS ---

const AnimManagement = () => (
    <div className="anim-container">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ width: 100, height: 100, border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '50%', position: 'absolute' }}
        />
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ width: 60, height: 60, border: '2px solid rgba(194, 63, 56, 0.5)', borderRadius: '50%', position: 'absolute' }}
        />
        <div style={{ zIndex: 10 }}>
            <Globe size={32} color="#C23F38" />
        </div>
    </div>
);

const AnimContract = () => (
    <div className="anim-container">
        <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#D85951' }}>
                <rect x="10" y="10" width="60" height="80" rx="4" />
                <line x1="20" y1="30" x2="60" y2="30" />
                <line x1="20" y1="50" x2="60" y2="50" />
                <path d="M 20 70 Q 30 65, 40 70 T 60 70" />
            </svg>
        </motion.div>
    </div>
);

const AnimEarlyPayment = () => (
    <div className="anim-container" style={{ justifyContent: 'flex-start', paddingLeft: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#aaa' }}>
                <span>Transferindo...</span>
                <span>100%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    style={{ height: '100%', background: '#10B981' }}
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontSize: '0.8rem' }}
            >
                <Check size={14} /> Pagamento Confirmado
            </motion.div>
        </div>
    </div>
);

// --- MAIN PAGE ---

const LandingPage = () => {
    // Mouse Spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // Stagger Variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        }
    };

    return (
        <div className="landing-page">
            <ScrollPath />

            {/* 1. HERO SECTION */}
            <section className="hero-section-new" onMouseMove={handleMouseMove}>
                <Hero3DBackground />

                <motion.div
                    className="hero-spotlight"
                    style={{
                        background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.1), transparent 80%)`
                    }}
                />

                <motion.div
                    className="hero-content-new"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={fadeInUp} className="hero-badge">
                        PLATAFORMA BETA
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="hero-title-new">
                        A NOVA ERA DA<br />
                        MÚSICA AO VIVO
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="hero-description">
                        Conectando artistas e estabelecimentos de forma inteligente.
                        Sem intermediários, sem burocracia, apenas música e negócios.
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="scroll-indicator"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="scroll-pill"
                    >
                        <div className="scroll-dot" />
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. NAVIGATION SPLIT */}
            <motion.section
                className="split-nav-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                variants={staggerContainer}
            >
                <Link to="/find-bands" className="split-pane pane-left">
                    <motion.div
                        variants={fadeInUp}
                        className="pane-content"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="pane-title">PARA BARES</h2>
                        <ul className="tech-list">
                            <li>Encontre a banda perfeita</li>
                            <li>Pagamento automatizado</li>
                            <li>Avaliações reais</li>
                        </ul>
                        <span className="pane-cta">Começar Agora <ArrowUpRight size={20} /></span>
                    </motion.div>
                </Link>
                <Link to="/register" className="split-pane pane-right">
                    <motion.div
                        variants={fadeInUp}
                        className="pane-content"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="pane-title">PARA ARTISTAS</h2>
                        <ul className="tech-list">
                            <li>Agenda cheia</li>
                            <li>Cachê garantido</li>
                            <li>Perfil profissional</li>
                        </ul>
                        <span className="pane-cta">Criar Perfil <ArrowUpRight size={20} /></span>
                    </motion.div>
                </Link>
            </motion.section>

            {/* 3. BENTO GRID */}
            <section className="bento-grid-section">
                <div className="container">
                    <motion.div
                        className="bento-grid"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                    >
                        {/* Gestão Completa */}
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item text-item"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div>
                                <h3>Gestão Completa</h3>
                                <p>Tudo o que você precisa em um só lugar. Do contrato ao pagamento, nossa infraestrutura cuida de tudo.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item image-item"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <AnimManagement />
                        </motion.div>

                        {/* Contratos Digitais */}
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item image-item"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <AnimContract />
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item text-item"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div>
                                <h3>Contratos Digitais</h3>
                                <p>Segurança jurídica automática para cada show. Assinatura digital integrada e proteção para ambos os lados.</p>
                            </div>
                        </motion.div>

                        {/* Pagamento Antecipado (NEW) */}
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item col-span-2 payment-block"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div style={{ flex: 1 }}>
                                <h3>Pagamento Antecipado</h3>
                                <p style={{ maxWidth: '90%' }}>Receba seu cachê com segurança e previsibilidade. Garantia de recebimento 24h antes do show.</p>
                            </div>
                            <div style={{ flex: 1, minHeight: '150px' }}>
                                <AnimEarlyPayment />
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* 4. HOW IT WORKS (Localized & Animated) */}
            <section className="product-showcase">
                <div className="container" style={{ marginBottom: '2rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: '2.5rem', fontWeight: '700' }}
                    >
                        COMO FUNCIONA
                    </motion.h2>
                </div>

                <div className="showcase-track">
                    {[
                        {
                            title: "Conecte",
                            desc: "Encontre oportunidades reais baseadas no seu perfil e localização.",
                            icon: <Globe size={48} color="#D85951" />
                        },
                        {
                            title: "Negocie",
                            desc: "Envie propostas, discuta valores e feche datas em tempo real.",
                            icon: <Zap size={48} color="#C23F38" />
                        },
                        {
                            title: "Toque",
                            desc: "Foque apenas na música. A parte burocrática é com a gente.",
                            icon: <Shield size={48} color="#9B2C26" />
                        },
                        {
                            title: "Cresça",
                            desc: "Receba avaliações, suba de nível e consiga cachês melhores.",
                            icon: <ArrowUpRight size={48} color="#D85951" />
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="showcase-card"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                        >
                            <div className="icon-anim-box">
                                {item.icon}
                            </div>
                            <h3>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. FOOTER */}
            <footer className="manifesto-footer">
                <div className="container">
                    <div className="footer-cols">
                        <div style={{ maxWidth: '500px' }}>
                            <h2 className="manifesto-title">VAMOS FAZER<br />BARULHO.</h2>
                            <p className="manifesto-text">
                                A revolução do mercado da música ao vivo começa aqui. Junte-se a nós.
                            </p>
                        </div>
                        <div className="minimal-input-group">
                            <input type="email" placeholder="Seu melhor e-mail" />
                            <button><ArrowRight size={20} /></button>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem' }}>
                        <span>© 2025 Band App Inc.</span>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <a href="#">Instagram</a>
                            <a href="#">Twitter</a>
                            <a href="#">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
