import React from 'react';

export function TokenShowcase() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <header className="mb-16">
                <h1 className="mb-4 text-4xl font-bold">Codaband Design Tokens</h1>
                <p className="text-muted-foreground max-w-3xl">
                    Sistema completo de design tokens baseado no site Codaband.
                    Este guia demonstra todas as cores, tipografia, espaçamentos, bordas, sombras e outros tokens disponíveis.
                </p>
            </header>

            {/* Brand Colors */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Cores da Marca</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ColorCard
                        name="Brand Primary"
                        value="#2C2C2C"
                        variable="--brand-primary"
                        description="Cinza escuro - usado para texto decorativo, ícones e detalhes"
                        bgClass="bg-[var(--brand-primary)]"
                    />
                    <ColorCard
                        name="Brand Accent"
                        value="#A0522D"
                        variable="--brand-accent"
                        description="Vermelho queimado (sienna) - usado para destaques e CTAs elegantes"
                        bgClass="bg-[var(--brand-accent)]"
                    />
                </div>
            </section>

            {/* Neutral Colors */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Escala de Neutros</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {[
                        { name: "0", value: "#FFFFFF", var: "--neutral-0" },
                        { name: "10", value: "#F7F7F7", var: "--neutral-10" },
                        { name: "20", value: "#EFEFEF", var: "--neutral-20" },
                        { name: "40", value: "#D9D9D9", var: "--neutral-40" },
                        { name: "60", value: "#A6A6A6", var: "--neutral-60" },
                        { name: "80", value: "#4D4D4D", var: "--neutral-80" },
                        { name: "100", value: "#111111", var: "--neutral-100" },
                    ].map((color) => (
                        <div key={color.name} className="flex flex-col gap-3">
                            <div
                                className="h-24 rounded-lg border border-gray-200"
                                style={{ backgroundColor: `var(${color.var})` }}
                            />
                            <div className="text-sm">
                                <div className="font-medium">Neutral {color.name}</div>
                                <div className="text-muted-foreground text-xs">{color.value}</div>
                                <code className="text-xs text-brand-primary">{color.var}</code>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Semantic Colors */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Cores Semânticas</h2>

                <div className="mb-8">
                    <h3 className="mb-4 text-xl font-medium">Texto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SemanticColorCard
                            name="Text Default"
                            variable="--text-default"
                            bgClass="bg-[var(--text-default)]"
                        />
                        <SemanticColorCard
                            name="Text Muted"
                            variable="--text-muted"
                            bgClass="bg-[var(--text-muted)]"
                        />
                        <SemanticColorCard
                            name="Text Inverse"
                            variable="--text-inverse"
                            bgClass="bg-[var(--text-inverse)]"
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="mb-4 text-xl font-medium">Background</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SemanticColorCard
                            name="BG Canvas"
                            variable="--bg-canvas"
                            bgClass="bg-[var(--bg-canvas)]"
                            showBorder
                        />
                        <SemanticColorCard
                            name="BG Surface"
                            variable="--bg-surface"
                            bgClass="bg-[var(--bg-surface)]"
                            showBorder
                        />
                        <SemanticColorCard
                            name="BG Overlay"
                            variable="--bg-overlay"
                            bgClass="bg-[var(--bg-overlay)]"
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="mb-4 text-xl font-medium">Estados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SemanticColorCard
                            name="Focus"
                            variable="--state-focus"
                            bgClass="bg-[var(--state-focus)]"
                        />
                        <SemanticColorCard
                            name="Active"
                            variable="--state-active"
                            bgClass="bg-[var(--state-active)]"
                        />
                        <SemanticColorCard
                            name="Disabled"
                            variable="--state-disabled"
                            bgClass="bg-[var(--state-disabled)]"
                        />
                    </div>
                </div>
            </section>

            {/* Typography Scale */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Escala Tipográfica</h2>
                <div className="space-y-6 bg-gray-50 rounded-lg p-6">
                    {[
                        { name: "7xl", size: "4.5rem / 72px", var: "--font-size-7xl" },
                        { name: "6xl", size: "3.75rem / 60px", var: "--font-size-6xl" },
                        { name: "5xl", size: "3rem / 48px", var: "--font-size-5xl" },
                        { name: "4xl", size: "2.25rem / 36px", var: "--font-size-4xl" },
                        { name: "3xl", size: "1.875rem / 30px", var: "--font-size-3xl" },
                        { name: "2xl", size: "1.5rem / 24px", var: "--font-size-2xl" },
                        { name: "xl", size: "1.25rem / 20px", var: "--font-size-xl" },
                        { name: "lg", size: "1.125rem / 18px", var: "--font-size-lg" },
                        { name: "base", size: "1rem / 16px", var: "--font-size-base" },
                        { name: "sm", size: "0.875rem / 14px", var: "--font-size-sm" },
                        { name: "xs", size: "0.75rem / 12px", var: "--font-size-xs" },
                    ].map((type) => (
                        <div key={type.name} className="flex items-baseline gap-6 border-b border-gray-200 pb-4 last:border-b-0">
                            <div className="w-16 text-sm text-gray-500 font-mono">{type.name}</div>
                            <div className="flex-1">
                                <div style={{ fontSize: `var(${type.var})` }}>
                                    The quick brown fox jumps over the lazy dog
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 font-mono w-32 text-right">
                                {type.size}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Font Weights */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Pesos de Fonte</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: "Light", weight: "300", var: "--font-weight-light" },
                        { name: "Normal", weight: "400", var: "--font-weight-normal" },
                        { name: "Medium", weight: "500", var: "--font-weight-medium" },
                        { name: "Semibold", weight: "600", var: "--font-weight-semibold" },
                        { name: "Bold", weight: "700", var: "--font-weight-bold" },
                        { name: "Black", weight: "900", var: "--font-weight-black" },
                    ].map((fw) => (
                        <div key={fw.name} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="text-sm text-gray-500 mb-2">
                                {fw.name} ({fw.weight})
                            </div>
                            <div style={{ fontWeight: `var(${fw.var})` }} className="text-2xl">
                                The quick brown fox
                            </div>
                            <code className="text-xs text-brand-primary">{fw.var}</code>
                        </div>
                    ))}
                </div>
            </section>

            {/* Line Heights */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Alturas de Linha</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { name: "Tight", value: "1.2", var: "--line-height-tight" },
                        { name: "Snug", value: "1.375", var: "--line-height-snug" },
                        { name: "Normal", value: "1.5", var: "--line-height-normal" },
                        { name: "Relaxed", value: "1.625", var: "--line-height-relaxed" },
                        { name: "Loose", value: "2", var: "--line-height-loose" },
                    ].map((lh) => (
                        <div key={lh.name} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="text-sm text-gray-500 mb-3">
                                {lh.name} ({lh.value})
                            </div>
                            <p style={{ lineHeight: `var(${lh.var})` }} className="text-base">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <code className="text-xs text-brand-primary mt-2 block">{lh.var}</code>
                        </div>
                    ))}
                </div>
            </section>

            {/* Spacing Scale */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Escala de Espaçamento</h2>
                <div className="space-y-4 bg-gray-50 rounded-lg p-6">
                    {[
                        { name: "1", size: "4px", var: "--space-1" },
                        { name: "2", size: "8px", var: "--space-2" },
                        { name: "3", size: "12px", var: "--space-3" },
                        { name: "4", size: "16px", var: "--space-4" },
                        { name: "5", size: "20px", var: "--space-5" },
                        { name: "6", size: "24px", var: "--space-6" },
                        { name: "8", size: "32px", var: "--space-8" },
                        { name: "10", size: "40px", var: "--space-10" },
                        { name: "12", size: "48px", var: "--space-12" },
                        { name: "16", size: "64px", var: "--space-16" },
                        { name: "20", size: "80px", var: "--space-20" },
                        { name: "24", size: "96px", var: "--space-24" },
                        { name: "32", size: "128px", var: "--space-32" },
                    ].map((space) => (
                        <div key={space.name} className="flex items-center gap-4">
                            <div className="w-20 text-sm text-gray-500 font-mono">
                                space-{space.name}
                            </div>
                            <div className="h-8 bg-brand-primary rounded" style={{ width: `var(${space.var})` }} />
                            <div className="text-xs text-gray-500">
                                {space.size}
                            </div>
                            <code className="text-xs text-brand-accent">{space.var}</code>
                        </div>
                    ))}
                </div>
            </section>

            {/* Border Radius */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Raios de Borda</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: "None", var: "--radius-none" },
                        { name: "SM", var: "--radius-sm" },
                        { name: "MD", var: "--radius-md" },
                        { name: "LG", var: "--radius-lg" },
                        { name: "XL", var: "--radius-xl" },
                        { name: "2XL", var: "--radius-2xl" },
                        { name: "Full", var: "--radius-full" },
                    ].map((radius) => (
                        <div key={radius.name} className="flex flex-col items-center gap-3">
                            <div
                                className="w-24 h-24 bg-brand-accent"
                                style={{ borderRadius: `var(${radius.var})` }}
                            />
                            <div className="text-center">
                                <div className="text-sm font-medium">{radius.name}</div>
                                <code className="text-xs text-brand-primary">{radius.var}</code>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Shadows */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Sombras</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "XS", var: "--shadow-xs" },
                        { name: "SM", var: "--shadow-sm" },
                        { name: "MD", var: "--shadow-md" },
                        { name: "LG", var: "--shadow-lg" },
                        { name: "XL", var: "--shadow-xl" },
                        { name: "2XL", var: "--shadow-2xl" },
                    ].map((shadow) => (
                        <div key={shadow.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div
                                className="w-full h-24 bg-white rounded-lg"
                                style={{ boxShadow: `var(${shadow.var})` }}
                            />
                            <div className="mt-4 text-center">
                                <div className="text-sm font-medium">{shadow.name}</div>
                                <code className="text-xs text-brand-primary">{shadow.var}</code>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Transitions */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Transições</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: "Fast", value: "150ms", var: "--transition-fast" },
                        { name: "Base", value: "250ms", var: "--transition-base" },
                        { name: "Slow", value: "350ms", var: "--transition-slow" },
                    ].map((transition) => (
                        <div key={transition.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="text-sm text-gray-500 mb-4">
                                {transition.name} ({transition.value})
                            </div>
                            <div className="flex gap-4 items-center">
                                <div
                                    className="w-16 h-16 bg-brand-accent rounded-lg hover:bg-brand-primary hover:scale-110"
                                    style={{ transition: `all var(${transition.var})` }}
                                />
                                <div className="text-xs text-gray-400">Hover para ver</div>
                            </div>
                            <code className="text-xs text-brand-primary mt-4 block">{transition.var}</code>
                        </div>
                    ))}
                </div>
            </section>

            {/* Z-Index */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Camadas Z-Index</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    {[
                        { name: "Base", value: "0", var: "--z-base" },
                        { name: "Dropdown", value: "1000", var: "--z-dropdown" },
                        { name: "Sticky", value: "1020", var: "--z-sticky" },
                        { name: "Fixed", value: "1030", var: "--z-fixed" },
                        { name: "Modal Backdrop", value: "1040", var: "--z-modal-backdrop" },
                        { name: "Modal", value: "1050", var: "--z-modal" },
                        { name: "Popover", value: "1060", var: "--z-popover" },
                        { name: "Tooltip", value: "1070", var: "--z-tooltip" },
                    ].map((z) => (
                        <div key={z.name} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <div className="text-sm">{z.name}</div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 font-mono">{z.value}</span>
                                <code className="text-xs text-brand-primary">{z.var}</code>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Typography Examples */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Exemplos Tipográficos</h2>
                <div className="bg-gray-50 rounded-lg p-8 space-y-6">
                    <h1 className="text-4xl font-bold">Heading 1 - The quick brown fox</h1>
                    <h2 className="text-3xl font-bold">Heading 2 - The quick brown fox</h2>
                    <h3 className="text-2xl font-bold">Heading 3 - The quick brown fox</h3>
                    <h4 className="text-xl font-bold">Heading 4 - The quick brown fox</h4>
                    <h5 className="text-lg font-bold">Heading 5 - The quick brown fox</h5>
                    <h6 className="text-base font-bold">Heading 6 - The quick brown fox</h6>
                    <p className="text-base">
                        Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                    <label className="text-sm font-medium">Label - Form label example</label>
                </div>
            </section>

            {/* Usage Examples */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Exemplos de Uso</h2>
                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="mb-4 text-xl font-medium">Botões</h3>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:opacity-90 transition-all duration-[var(--transition-base)]">
                                Primary Button
                            </button>
                            <button className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:opacity-90 transition-all duration-[var(--transition-base)]">
                                Accent Button
                            </button>
                            <button className="px-6 py-3 bg-transparent text-gray-900 border-2 border-gray-200 rounded-lg hover:border-brand-primary transition-all duration-[var(--transition-base)]">
                                Outline Button
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="mb-4 text-xl font-medium">Cards</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-[var(--transition-base)]">
                                <h4 className="mb-2 text-brand-primary font-bold">Card Title</h4>
                                <p className="text-sm text-gray-500">
                                    Este é um exemplo de card usando os tokens do sistema.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-[var(--transition-base)]">
                                <h4 className="mb-2 text-brand-accent font-bold">Card com Sombra</h4>
                                <p className="text-sm text-gray-500">
                                    Hover para ver a transição de sombra.
                                </p>
                            </div>
                            <div className="bg-brand-primary rounded-2xl p-6 text-white shadow-[var(--shadow-lg)]">
                                <h4 className="mb-2 font-bold">Card Colorido</h4>
                                <p className="text-sm opacity-90">
                                    Card usando cor da marca como background.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-24 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>Design Tokens System - Codaband © 2026</p>
                <p className="mt-2">Baseado em https://codaband.onrender.com/</p>
            </footer>
        </div>
    );
}

// Helper Components
function ColorCard({
    name,
    value,
    variable,
    description,
    bgClass,
}) {
    return (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className={`h-32 rounded-lg mb-4 ${bgClass}`} />
            <div>
                <h3 className="mb-1 font-semibold">{name}</h3>
                <p className="text-sm text-gray-500 mb-3">{description}</p>
                <div className="space-y-1">
                    <div className="text-sm font-mono">{value}</div>
                    <code className="text-xs text-brand-primary">{variable}</code>
                </div>
            </div>
        </div>
    );
}

function SemanticColorCard({
    name,
    variable,
    bgClass,
    showBorder = false,
}) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className={`h-20 rounded-lg mb-3 ${bgClass} ${showBorder ? 'border border-gray-200' : ''}`} />
            <div className="text-sm font-medium mb-1">{name}</div>
            <code className="text-xs text-brand-primary">{variable}</code>
        </div>
    );
}

export default TokenShowcase;
