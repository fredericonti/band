import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import './LandingPage.css';

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
                    stroke="rgba(255,255,255,0.1)"
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
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

const LandingPage = () => {
    // Scroll Progress for Parallax
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

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
                <div className="hero-bg">
                    <motion.img
                        style={{ y: heroY }}
                        src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000&auto=format&fit=crop"
                        alt="Infrastructure"
                        className="bg-image"
                    />
                    <div className="bg-overlay"></div>
                </div>

                <motion.div
                    className="hero-spotlight"
                    style={{
                        background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`
                    }}
                />

                <motion.div
                    className="hero-content-new"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={fadeInUp} className="hero-badge">
                        PLATAFORMA BETA v1.0
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
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item text-item"
                            whileHover={{ scale: 1.02, rotate: 1 }}
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
                            whileHover={{ scale: 1.02, rotate: -1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <img src="https://images.unsplash.com/photo-1514525253440-b393452e2625?q=80&w=800&auto=format&fit=crop" alt="Music" className="card-image" />
                            <div className="img-overlay">LIVE</div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item image-item"
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=800&auto=format&fit=crop" alt="Stage" className="card-image" />
                            <div className="img-overlay">STAGE</div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="bento-item text-item"
                            whileHover={{ scale: 1.02, rotate: -1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div>
                                <h3>Contratos Digitais</h3>
                                <p>Segurança jurídica automática para cada show. Assinatura digital integrada e proteção para ambos os lados.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 4. PRODUCT SHOWCASE */}
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
                        { title: "Connect", desc: "Busque por gênero, localização e orçamento.", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800" },
                        { title: "Negotiate", desc: "Envie propostas e feche o contrato na hora.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800" },
                        { title: "Perform", desc: "Foque no show. O pagamento é liberado automaticamente.", img: "https://images.unsplash.com/photo-1459749411177-287ceff125da?q=80&w=800" },
                        { title: "Grow", desc: "Receba avaliações e construa sua reputação.", img: "https://images.unsplash.com/photo-1520630456184-f2597282cb41?q=80&w=800" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="showcase-card"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10, rotate: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                        >
                            <div className="card-visual">
                                <img src={item.img} alt={item.title} className="card-image" />
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
