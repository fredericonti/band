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
    const [particles, setParticles] = React.useState([]);

    React.useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.2
        }));
        setParticles(newParticles);
    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const rotateX = useTransform(mouseY, [-1, 1], [5, -5]);
    const rotateY = useTransform(mouseX, [-1, 1], [-5, 5]);

    return (
        <div className="hero-bg" style={{ perspective: 1000, overflow: 'hidden' }} onMouseMove={handleMouseMove}>
            <motion.div
                style={{
                    width: '100%',
                    height: '100%',
                    rotateX,
                    rotateY,
                    scale: 1.05,
                    background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f5f5f5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Floating Particles - Very subtle */}
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        style={{
                            position: 'absolute',
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            borderRadius: '50%',
                            background: `rgba(0, 0, 0, ${0.05 + Math.random() * 0.1})`,
                        }}
                        animate={{
                            x: [0, particle.speed * 30, 0, -particle.speed * 30, 0],
                            y: [0, -particle.speed * 20, 0, particle.speed * 20, 0],
                        }}
                        transition={{
                            duration: 10 + particle.speed * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
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
                    strokeWidth="0.5"
                    stroke="rgba(0, 0, 0, 0.05)"
                />
                <motion.path
                    d="M 50 0 C 50 50, 20 100, 50 150 C 80 200, 50 250, 50 300 C 50 350, 80 400, 50 450"
                    fill="none"
                    strokeWidth="1"
                    stroke="#000000"
                    style={{ pathLength: scaleY }}
                />
            </svg>
        </div>
    );
};

// --- ANIMATION ILLUSTRATIONS ---

const AnimManagement = () => (
    <div className="anim-container">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: 140, height: 140, border: '1px solid rgba(0,0,0,0.05)', borderRadius: '50%', position: 'absolute' }}
        />
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ width: 100, height: 100, border: '1px solid rgba(0,0,0,0.1)', borderRadius: '50%', position: 'absolute' }}
        />
        <div style={{ zIndex: 10 }}>
            <Globe size={40} color="#000" strokeWidth={1} />
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
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#000' }}>
                <rect x="10" y="10" width="60" height="80" rx="2" />
                <line x1="25" y1="35" x2="55" y2="35" />
                <line x1="25" y1="50" x2="55" y2="50" />
                <path d="M 25 70 Q 35 65, 45 70 T 55 70" />
            </svg>
        </motion.div>
    </div>
);

const AnimEarlyPayment = () => (
    <div className="anim-container" style={{ justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '280px', background: '#f9f9f9', padding: '2rem', borderRadius: '12px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.75rem', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <span>Status Bancário</span>
                <span style={{ color: '#000' }}>Processando</span>
            </div>
            <div style={{ height: '4px', background: '#eee', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    style={{ height: '100%', background: '#000', borderRadius: '999px' }}
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#000', fontSize: '0.875rem', fontWeight: '700' }}
            >
                <div style={{ border: '1px solid #000', padding: '4px', borderRadius: '50%' }}><Check size={12} strokeWidth={3} /></div>
                PAGAMENTO REALIZADO
            </motion.div>
        </div>
    </div>
);

const HowItWorks = () => {
    const cards = [
        {
            title: "CONECTE",
            desc: "Encontre oportunidades reais baseadas no seu perfil e localização.",
            icon: <Globe size={40} color="#000" strokeWidth={1} />
        },
        {
            title: "NEGOCIE",
            desc: "Envie propostas, discuta valores e feche datas em tempo real.",
            icon: <Zap size={40} color="#000" strokeWidth={1} />
        },
        {
            title: "TOQUE",
            desc: "Foque apenas na música. A parte burocrática é com a gente.",
            icon: <Shield size={40} color="#000" strokeWidth={1} />
        },
    ];

    return (
        <section className="product-showcase vertical-section" style={{ padding: '10rem 0' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '6rem', letterSpacing: '-2px' }}
                >
                    COMO FUNCIONA
                </motion.h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                    }}
                >
                    {cards.map((item, i) => (
                        <motion.div
                            key={i}
                            className="showcase-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="icon-anim-box">
                                {item.icon}
                            </div>
                            <h3 style={{ textTransform: 'uppercase', fontSize: '1.25rem', letterSpacing: '1px' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', fontSize: '1rem', lineHeight: '1.5' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- MAIN PAGE ---

const LandingPage = () => {
    // Mouse Spotlight - Subtle white light
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
                        background: useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(0, 0, 0, 0.02), transparent 80%)`
                    }}
                />

                <motion.div
                    className="hero-content-new"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h1 variants={fadeInUp} className="hero-title-new">
                        CONECTAMOS MÚSICA<br />
                        AO VIVO E NEGÓCIOS
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="hero-description">
                        Tonare é o marketplace bilateral que une artistas e estabelecimentos.
                        Pagamento antecipado com garantia, split automático e gestão completa.
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="scroll-indicator"
                >
                    <div className="scroll-pill">
                        <motion.div
                            animate={{ y: [0, 40, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="scroll-dot"
                        />
                    </div>
                </motion.div>
            </section>

            {/* 2. NAVIGATION CARDS */}
            <section className="nav-cards-section">
                <div className="container">
                    <motion.div
                        className="nav-cards-grid"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                    >
                        <Link to="/find-bands" className="nav-card-item">
                            <motion.div
                                variants={fadeInUp}
                                className="nav-card-inner"
                            >
                                <span className="nav-card-label">PARA ESTABELECIMENTOS</span>
                                <h2 className="nav-card-title">Encontre o artista ideal para sua noite</h2>
                                <ul className="nav-card-features">
                                    <li>Curadoria Inteligente</li>
                                    <li>Gestão de Pagamentos</li>
                                    <li>Avaliações Verificadas</li>
                                </ul>
                                <div className="nav-card-footer">
                                    <span className="nav-card-cta">VER PORTFÓLIO</span>
                                    <ArrowUpRight size={18} />
                                </div>
                            </motion.div>
                        </Link>

                        <Link to="/register" className="nav-card-item">
                            <motion.div
                                variants={fadeInUp}
                                className="nav-card-inner"
                            >
                                <span className="nav-card-label">PARA ARTISTAS</span>
                                <h2 className="nav-card-title">Transforme sua paixão em carreira sólida</h2>
                                <ul className="nav-card-features">
                                    <li>Agenda Centralizada</li>
                                    <li>Cachê Antecipado</li>
                                    <li>Perfil Profissional</li>
                                </ul>
                                <div className="nav-card-footer">
                                    <span className="nav-card-cta">CRIAR PERFIL</span>
                                    <ArrowUpRight size={18} />
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </section>

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
                        >
                            <div>
                                <h3>Gestão Completa</h3>
                                <p>Tudo o que você precisa em um só lugar. Do contrato ao pagamento, nossa infraestrutura cuida de tudo.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item image-item"
                            style={{ background: '#fff' }}
                        >
                            <AnimManagement />
                        </motion.div>

                        {/* Contratos Digitais */}
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item image-item"
                            style={{ background: '#fff' }}
                        >
                            <AnimContract />
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item text-item"
                        >
                            <div>
                                <h3>Contratos Digitais</h3>
                                <p>Segurança jurídica automática para cada show. Assinatura digital integrada e proteção para ambos os lados.</p>
                            </div>
                        </motion.div>

                        {/* Pagamento Antecipado */}
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item col-span-2 payment-block"
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

            {/* 4. HOW IT WORKS */}
            <HowItWorks />

            {/* 5. FOOTER */}
            <footer className="manifesto-footer">
                <div className="container">
                    <div className="footer-cols">
                        <div style={{ maxWidth: '600px' }}>
                            <h2 className="manifesto-title">VAMOS FAZER<br />BARULHO.</h2>
                            <p className="manifesto-text">
                                A revolução do mercado da música ao vivo começa aqui. Junte-se a nós.
                            </p>
                        </div>
                        <div className="minimal-input-group">
                            <input type="email" placeholder="Seu melhor e-mail" />
                            <button className="btn btn-primary"><ArrowRight size={20} /></button>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '3rem', display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px' }}>
                        <span>© 2026 TONARE. ALL RIGHTS RESERVED.</span>
                        <div style={{ display: 'flex', gap: '2.5rem' }}>
                            <a href="#" className="nav-link">INSTAGRAM</a>
                            <a href="#" className="nav-link">TWITTER</a>
                            <a href="#" className="nav-link">LINKEDIN</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default LandingPage;
