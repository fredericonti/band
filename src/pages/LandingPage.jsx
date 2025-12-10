
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe, Shield, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Mouse tracking for Hero Spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <div className="landing-page">
            {/* 1. HERO: Immersive Infrastructure */}
            <section className="hero-section-new" onMouseMove={handleMouseMove}>
                {/* Background Image */}
                <div className="hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1625447956229-40bad977175c?q=80&w=1080&auto=format&fit=crop"
                        alt="Infrastructure"
                        className="bg-image"
                    />
                    <div className="bg-overlay"></div>
                </div>

                {/* Mouse Spotlight Effect on Background */}
                <motion.div
                    className="hero-spotlight"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 79, 0, 0.15), transparent 80%)`
                    }}
                />

                {/* Animated Particles */}
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="particle"
                            initial={{
                                x: Math.random() * (window.innerWidth || 1000),
                                y: Math.random() * (window.innerHeight || 800),
                                opacity: 0.2
                            }}
                            animate={{
                                x: Math.random() * (window.innerWidth || 1000),
                                y: Math.random() * (window.innerHeight || 800),
                            }}
                            transition={{
                                duration: Math.random() * 10 + 20,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="hero-content-new">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="hero-badge"
                        >
                            CODA OS v1.0
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="hero-title-new"
                        >
                            A INFRAESTRUTURA
                            <br />
                            <span className="text-gradient">INVISÍVEL</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="hero-description"
                        >
                            A nova era da música ao vivo. Conexão direta, sem burocracia e com gestão financeira automatizada.
                        </motion.p>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="scroll-indicator"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="scroll-pill"
                        >
                            <div className="scroll-dot" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. NAVIGATION: Split Screen */}
            <section className="split-nav-section">
                <Link to="/find-bands" className="split-pane pane-left">
                    <div className="pane-content">
                        <h2 className="pane-title">ESTABELECIMENTOS</h2>
                        <ul className="tech-list">
                            <li>CURADORIA AUTOMATIZADA</li>
                            <li>PAGAMENTO CENTRALIZADO</li>
                            <li>NOTA FISCAL DIGITAL</li>
                        </ul>
                        <span className="pane-cta">CONTRATE ARTISTAS <ArrowUpRight /></span>
                    </div>
                    <div className="pane-overlay"></div>
                </Link>
                <Link to="/register" className="split-pane pane-right">
                    <div className="pane-content">
                        <h2 className="pane-title">ARTISTAS</h2>
                        <ul className="tech-list">
                            <li>AGENDA INTELIGENTE</li>
                            <li>CONTRATO PADRONIZADO</li>
                            <li>RECEBIMENTO GARANTIDO</li>
                        </ul>
                        <span className="pane-cta">ACHE LOCAIS PARA TOCAR <ArrowUpRight /></span>
                    </div>
                    <div className="pane-overlay"></div>
                </Link>
            </section>

            {/* 3. GRID: Bento Box with Visual Placeholders */}
            <section className="bento-grid-section">
                <div className="bento-grid">
                    <div className="bento-item text-item">
                        <h3>GESTÃO FINANCEIRA SIMPLIFICADA</h3>
                        <p>Centralize pagamentos e recebimentos em uma única plataforma. Transparência total para quem contrata e para quem toca.</p>
                        <div className="mono-tag">REF: FINANCE_001</div>
                    </div>
                    <div className="bento-item image-item img-1">
                        <div className="img-overlay">TRANSACTIONS</div>
                    </div>
                    <div className="bento-item image-item img-2">
                        <div className="img-overlay">PERFORMANCE</div>
                    </div>
                    <div className="bento-item text-item dark">
                        <h3>COMPLIANCE AUTOMÁTICO</h3>
                        <p>Segurança jurídica e fiscal em cada show. Contratos gerados automaticamente e recolhimento de impostos simplificado.</p>
                        <div className="mono-tag">STATUS: VERIFIED</div>
                    </div>
                </div>
            </section>

            {/* 4. PRODUCT: Horizontal Scroll with Visual Placeholders */}
            <section className="product-showcase">
                <div className="showcase-track">
                    <div className="showcase-card">
                        <div className="card-header">
                            <span className="step-number">01</span>
                            <h4>CONEXÃO</h4>
                        </div>
                        <div className="card-visual" data-step="01">
                            <img
                                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
                                alt="Conexão"
                                className="card-image"
                            />
                        </div>
                        <p className="card-desc">Encontre o match perfeito entre som e ambiente.</p>
                    </div>
                    <div className="showcase-card">
                        <div className="card-header">
                            <span className="step-number">02</span>
                            <h4>NEGOCIAÇÃO</h4>
                        </div>
                        <div className="card-visual" data-step="02">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                                alt="Negociação"
                                className="card-image"
                            />
                        </div>
                        <p className="card-desc">Propostas claras, datas definidas e valores justos.</p>
                    </div>
                    <div className="showcase-card">
                        <div className="card-header">
                            <span className="step-number">03</span>
                            <h4>SHOWTIME</h4>
                        </div>
                        <div className="card-visual" data-step="03">
                            <img
                                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop"
                                alt="Showtime"
                                className="card-image"
                            />
                        </div>
                        <p className="card-desc">Foco total na experiência. O resto a gente cuida.</p>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER: Manifesto */}
            <section className="manifesto-footer">
                <div className="container">
                    <h2 className="manifesto-title">LEGALIZE<br />THE STAGE</h2>
                    <div className="footer-cols">
                        <div className="footer-col">
                            <p className="manifesto-text">
                                A música ao vivo é uma indústria bilionária tratada como bico.
                                Nós estamos aqui para mudar isso. Profissionalismo não mata a vibe,
                                profissionalismo garante o próximo show.
                            </p>
                        </div>
                        <div className="footer-col input-col">
                            <label className="mono-label">JOIN THE MOVEMENT</label>
                            <div className="minimal-input-group">
                                <input type="email" placeholder="EMAIL ADDRESS" />
                                <button><ArrowRight /></button>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <span className="mono-text">© 2025 CODA FINANCIAL OS</span>
                        <span className="mono-text">SÃO PAULO — BRASIL</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
