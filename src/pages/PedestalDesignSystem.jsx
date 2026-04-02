import { useState } from "react";

const COLORS = [
  { name: "Sale Price", var: "--rb-smart-search-results-product-price-sale-color", hex: "#44be70", rgb: "rgb(68, 190, 112)" },
  { name: "Quick View Button", var: "--rb-smart-search-quick-view-button-background-color", hex: "#2491c4", rgb: "rgb(36, 145, 196)" },
  { name: "Compare Price", var: "--rb-smart-search-results-product-price-compare-at-color", hex: "#9a9a9a", rgb: "rgb(154, 154, 154)" },
  { name: "Ring Color", var: "--tw-ring-color", hex: "#3b82f6", rgb: "rgba(59, 130, 246, 0.5)" },
  { name: "Price Color", var: "--rb-smart-search-results-product-price-color", hex: "#535353", rgb: "rgb(83, 83, 83)" },
  { name: "Reviews Stars", var: "--rb-smart-search-quick-view-reviews-foreground-color", hex: "#fbca10", rgb: "rgb(251, 202, 16)" },
  { name: "Error", var: "--color-error", hex: "#de4438", rgb: "rgb(222, 68, 56)" },
  { name: "Border Light", var: "—", hex: "#e5e7eb", rgb: "rgb(229, 231, 235)" },
  { name: "Primary Dark", var: "—", hex: "#212121", rgb: "rgb(33, 33, 33)" },
  { name: "Accent Blue", var: "—", hex: "#b1ceef", rgb: "rgb(177, 206, 239)" },
];

const SPACING = [
  { px: 1 }, { px: 2 }, { px: 4 }, { px: 5 }, { px: 6 }, { px: 7 }, { px: 8 },
  { px: 10 }, { px: 11 }, { px: 12 }, { px: 15 }, { px: 16 }, { px: 20 }, { px: 24 },
];

const RADII = [
  { px: 2, usage: "div, a, button, ul" },
  { px: 4, usage: "div, button, a, li, card" },
  { px: 8, usage: "div, button" },
];

const TYPO_FK = [
  { label: "Display Hero", size: "160px", weight: 400, lh: "1.00", ls: "-6.4px", sample: "Pedestal" },
  { label: "Body", size: "15px", weight: 400, lh: "1.65", ls: "0", sample: "Crafted for everyday moments" },
  { label: "Semibold", size: "15px", weight: 600, lh: "1.10", ls: "0", sample: "Featured Collection" },
  { label: "Button / Uppercase", size: "15px", weight: 700, lh: "1.20", ls: "0", sample: "ADD TO CART", transform: "uppercase" },
];

const TYPO_SUISSE = [
  { label: "Heading Large", size: "40px", weight: 400, lh: "1.10", ls: "-1.2px", sample: "Design Tokens" },
  { label: "Heading Medium", size: "20px", weight: 400, lh: "1.40", ls: "-0.2px", sample: "Typography & Spacing" },
  { label: "Heading Small", size: "19px", weight: 500, lh: "1.20", ls: "-0.38px", sample: "Component Library" },
  { label: "Body", size: "16px", weight: 400, lh: "1.20", ls: "-0.15px", sample: "Clean and functional interfaces" },
  { label: "Body Small", size: "15px", weight: 400, lh: "1.40", ls: "-0.15px", sample: "Subtle details matter in every pixel" },
  { label: "Caption Upper", size: "13px", weight: 500, lh: "1.50", ls: "0.65px", sample: "CATEGORY LABEL", transform: "uppercase" },
  { label: "Caption", size: "13px", weight: 400, lh: "1.40", ls: "-0.13px", sample: "Additional context or metadata" },
  { label: "Micro Upper", size: "11px", weight: 600, lh: "1.40", ls: "0.55px", sample: "NEW ARRIVAL", transform: "uppercase" },
  { label: "Micro", size: "9px", weight: 600, lh: "2.00", ls: "-0.15px", sample: "Fine print details" },
];

const BUTTONS = [
  { label: "Primary Dark", bg: "#212121", text: "#ffffff", border: "none", radius: 4, padding: "4px 24px" },
  { label: "Outline", bg: "transparent", text: "#212121", border: "1px solid rgba(33,33,33,0.2)", radius: 2, padding: "4px 24px" },
  { label: "Ghost Light", bg: "rgba(255,255,255,0.1)", text: "#ffffff", border: "none", radius: 4, padding: "4px 24px", dark: true },
  { label: "White", bg: "#ffffff", text: "#212121", border: "none", radius: 4, padding: "4px 24px" },
  { label: "Gray Solid", bg: "#626262", text: "#ffffff", border: "none", radius: 8, padding: "0px 38px" },
  { label: "Gray Outline", bg: "#eaeaea", text: "#626262", border: "1px solid rgb(98,98,98)", radius: 8, padding: "0px 38px" },
];

const BREAKPOINTS = [1536, 1280, 1024, 768, 750, 640, 440];

const NAV_ITEMS = ["Colors", "Typography", "Spacing", "Borders", "Buttons", "Inputs", "Breakpoints"];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: 11, color: copied ? "#44be70" : "#9a9a9a",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        transition: "color 0.2s",
        padding: "2px 6px",
        borderRadius: 3,
      }}
      title="Copy"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function SectionTitle({ children, id }) {
  return (
    <div id={id} style={{ marginBottom: 12, paddingTop: 64 }}>
      <h2 style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.55px",
        textTransform: "uppercase", color: "#9a9a9a", marginBottom: 6,
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}>
        {children}
      </h2>
      <div style={{ width: 32, height: 2, background: "#212121" }} />
    </div>
  );
}

function ColorCard({ color }) {
  const isDark = ["#212121", "#535353"].includes(color.hex);
  return (
    <div style={{
      border: "1px solid rgba(33,33,33,0.08)",
      borderRadius: 6,
      overflow: "hidden",
      background: "#fff",
      transition: "box-shadow 0.25s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{
        height: 80,
        background: color.hex,
        display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
        padding: 8,
      }}>
        <span style={{
          fontSize: 10, fontWeight: 600, fontFamily: "monospace",
          color: isDark ? "#fff" : "rgba(0,0,0,0.5)",
          background: isDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.7)",
          padding: "2px 6px", borderRadius: 3,
        }}>
          {color.hex.toUpperCase()}
        </span>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: "#212121", marginBottom: 2,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
          {color.name}
        </div>
        <div style={{
          fontSize: 10, color: "#9a9a9a", fontFamily: "monospace",
          wordBreak: "break-all", lineHeight: 1.5,
        }}>
          {color.var !== "—" ? color.var : color.rgb}
        </div>
        <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
          <CopyButton text={color.hex} />
          {color.var !== "—" && <CopyButton text={`var(${color.var})`} />}
        </div>
      </div>
    </div>
  );
}

export default function PedestalDesignSystem() {
  const [activeSection, setActiveSection] = useState("Colors");

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fafafa",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      color: "#212121",
    }}>
      {/* Header */}
      <div style={{
        background: "#212121",
        padding: "48px 40px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -40,
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(177,206,239,0.15) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: "30%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(68,190,112,0.08) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.55px",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
            marginBottom: 12,
          }}>
            Design System
          </div>
          <h1 style={{
            fontSize: 48, fontWeight: 400, color: "#fff",
            letterSpacing: "-2px", lineHeight: 1.05, margin: 0,
          }}>
            Pedestal
          </h1>
          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.5)",
            marginTop: 12, letterSpacing: "-0.15px", lineHeight: 1.5,
            maxWidth: 420,
          }}>
            Tokens, tipografia, componentes e diretrizes visuais extraídos da interface Pedestal.
          </p>
        </div>
      </div>

      {/* Nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,250,250,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(33,33,33,0.06)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 40px",
          display: "flex", gap: 0, overflowX: "auto",
        }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "14px 16px",
                fontSize: 13, fontWeight: activeSection === item ? 600 : 400,
                color: activeSection === item ? "#212121" : "#9a9a9a",
                letterSpacing: "-0.13px",
                borderBottom: activeSection === item ? "2px solid #212121" : "2px solid transparent",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px 80px" }}>

        {/* COLORS */}
        <SectionTitle id="Colors">Colors</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}>
          {COLORS.map(c => <ColorCard key={c.hex + c.name} color={c} />)}
        </div>

        {/* TYPOGRAPHY */}
        <SectionTitle id="Typography">Typography</SectionTitle>

        {/* FK Display */}
        <div style={{
          marginBottom: 40,
          background: "#fff",
          border: "1px solid rgba(33,33,33,0.06)",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(33,33,33,0.06)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>FK Display</span>
            <span style={{
              fontSize: 10, fontWeight: 500, textTransform: "uppercase",
              letterSpacing: "0.5px", color: "#9a9a9a",
              background: "#f5f5f5", padding: "3px 8px", borderRadius: 3,
            }}>
              Fallbacks: Helvetica, Arial
            </span>
          </div>
          {TYPO_FK.map((t, i) => (
            <div key={i} style={{
              padding: "20px 20px",
              borderBottom: i < TYPO_FK.length - 1 ? "1px solid rgba(33,33,33,0.04)" : "none",
              display: "flex", alignItems: "baseline", gap: 24,
              flexWrap: "wrap",
            }}>
              <div style={{ minWidth: 140, flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 10, color: "#bbb", fontFamily: "monospace", marginTop: 3 }}>
                  {t.size} · {t.weight} · {t.lh}
                  {t.ls !== "0" ? ` · ls ${t.ls}` : ""}
                </div>
              </div>
              <div style={{
                fontSize: Math.min(parseInt(t.size), 64),
                fontWeight: t.weight,
                lineHeight: t.lh,
                letterSpacing: t.ls === "0" ? undefined : t.ls,
                textTransform: t.transform || "none",
                color: "#212121",
                flex: 1,
              }}>
                {t.sample}
              </div>
            </div>
          ))}
        </div>

        {/* Suisse Intl */}
        <div style={{
          background: "#fff",
          border: "1px solid rgba(33,33,33,0.06)",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(33,33,33,0.06)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Suisse Intl</span>
            <span style={{
              fontSize: 10, fontWeight: 500, textTransform: "uppercase",
              letterSpacing: "0.5px", color: "#9a9a9a",
              background: "#f5f5f5", padding: "3px 8px", borderRadius: 3,
            }}>
              Fallbacks: Helvetica, Arial
            </span>
          </div>
          {TYPO_SUISSE.map((t, i) => (
            <div key={i} style={{
              padding: "16px 20px",
              borderBottom: i < TYPO_SUISSE.length - 1 ? "1px solid rgba(33,33,33,0.04)" : "none",
              display: "flex", alignItems: "baseline", gap: 24,
              flexWrap: "wrap",
            }}>
              <div style={{ minWidth: 140, flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 10, color: "#bbb", fontFamily: "monospace", marginTop: 3 }}>
                  {t.size} · {t.weight} · {t.lh}
                  {t.ls !== "0" ? ` · ls ${t.ls}` : ""}
                </div>
              </div>
              <div style={{
                fontSize: parseInt(t.size),
                fontWeight: t.weight,
                lineHeight: t.lh,
                letterSpacing: t.ls === "0" ? undefined : t.ls,
                textTransform: t.transform || "none",
                color: "#212121",
                flex: 1,
              }}>
                {t.sample}
              </div>
            </div>
          ))}
        </div>

        {/* SPACING */}
        <SectionTitle id="Spacing">Spacing</SectionTitle>
        <div style={{
          background: "#fff",
          border: "1px solid rgba(33,33,33,0.06)",
          borderRadius: 8,
          padding: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 500, color: "#9a9a9a",
            textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 20,
          }}>
            Base unit: 8px
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SPACING.map(s => (
              <div key={s.px} style={{
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <div style={{
                  width: 56, fontSize: 12, fontFamily: "monospace",
                  color: "#535353", textAlign: "right", flexShrink: 0,
                }}>
                  {s.px}px
                </div>
                <div style={{
                  width: s.px * 3,
                  minWidth: 3,
                  height: 20,
                  background: `linear-gradient(135deg, #b1ceef, #2491c4)`,
                  borderRadius: 2,
                  transition: "width 0.3s ease",
                }} />
                <div style={{
                  fontSize: 10, fontFamily: "monospace", color: "#bbb",
                }}>
                  {(s.px / 16).toFixed(2)}rem
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BORDERS */}
        <SectionTitle id="Borders">Borders & Radii</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Radii */}
          <div style={{
            background: "#fff",
            border: "1px solid rgba(33,33,33,0.06)",
            borderRadius: 8, padding: 24,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: "#9a9a9a",
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 20,
            }}>
              Border Radius
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
              {RADII.map(r => (
                <div key={r.px} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56,
                    border: "2px solid #212121",
                    borderRadius: r.px,
                    marginBottom: 10,
                  }} />
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.px}px</div>
                  <div style={{ fontSize: 9, color: "#9a9a9a", marginTop: 3 }}>{r.usage}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Border Styles */}
          <div style={{
            background: "#fff",
            border: "1px solid rgba(33,33,33,0.06)",
            borderRadius: 8, padding: 24,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: "#9a9a9a",
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 20,
            }}>
              Border Styles
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Divider", border: "1px solid rgba(33,33,33,0.1)" },
                { label: "Interactive", border: "1px solid rgba(33,33,33,0.2)" },
                { label: "Strong", border: "2px solid #202020" },
                { label: "Subtle Light", border: "1px solid rgba(189,189,189,1)" },
              ].map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 64, height: 0,
                    borderTop: b.border,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 12, color: "#535353" }}>{b.label}</span>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "#bbb" }}>
                    {b.border}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <SectionTitle id="Buttons">Buttons</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {BUTTONS.map(btn => (
            <div key={btn.label} style={{
              background: btn.dark ? "#212121" : "#fff",
              border: "1px solid rgba(33,33,33,0.06)",
              borderRadius: 8, padding: 24,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 600,
                color: btn.dark ? "rgba(255,255,255,0.4)" : "#9a9a9a",
                textTransform: "uppercase", letterSpacing: "0.5px",
              }}>
                {btn.label}
              </div>
              <button style={{
                background: btn.bg,
                color: btn.text,
                border: btn.border,
                borderRadius: btn.radius,
                padding: btn.padding,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                height: 44,
                transition: "all 0.2s",
              }}>
                Button Label
              </button>
              <div style={{
                fontSize: 10, fontFamily: "monospace",
                color: btn.dark ? "rgba(255,255,255,0.3)" : "#bbb",
                lineHeight: 1.6,
              }}>
                bg: {btn.bg}<br/>
                radius: {btn.radius}px · padding: {btn.padding}
                {btn.border !== "none" && <><br/>border: {btn.border}</>}
              </div>
            </div>
          ))}
        </div>

        {/* INPUTS */}
        <SectionTitle id="Inputs">Inputs</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
        }}>
          <div style={{
            background: "#fff",
            border: "1px solid rgba(33,33,33,0.06)",
            borderRadius: 8, padding: 24,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: "#9a9a9a",
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14,
            }}>
              Text Input
            </div>
            <input
              type="email"
              placeholder="email@example.com"
              readOnly
              style={{
                width: "100%", height: 40, padding: "0 12px",
                borderRadius: 4, border: "1px solid rgba(33,33,33,0.2)",
                fontSize: 14, color: "#212121", background: "#fff",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#bbb", marginTop: 8 }}>
              radius: 4px · padding: 0 12px
            </div>
          </div>

          <div style={{
            background: "#fff",
            border: "1px solid rgba(33,33,33,0.06)",
            borderRadius: 8, padding: 24,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: "#9a9a9a",
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14,
            }}>
              Checkbox
            </div>
            <label style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 14, color: "#202020", cursor: "pointer",
            }}>
              <input type="checkbox" readOnly style={{ width: 16, height: 16, accentColor: "#212121" }} />
              Agree to terms
            </label>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#bbb", marginTop: 12 }}>
              text: #202020
            </div>
          </div>

          <div style={{
            background: "#fff",
            border: "1px solid rgba(33,33,33,0.06)",
            borderRadius: 8, padding: 24,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: "#9a9a9a",
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14,
            }}>
              Select
            </div>
            <select
              style={{
                width: "100%", height: 40, padding: "4px 24px 4px 12px",
                borderRadius: 4, border: "1px solid rgba(33,33,33,0.2)",
                fontSize: 14, color: "#212121", background: "#fff",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                appearance: "auto",
                outline: "none",
              }}
            >
              <option>Option A</option>
              <option>Option B</option>
            </select>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#bbb", marginTop: 8 }}>
              padding: 4px 24px 4px 40px
            </div>
          </div>
        </div>

        {/* BREAKPOINTS */}
        <SectionTitle id="Breakpoints">Breakpoints</SectionTitle>
        <div style={{
          background: "#fff",
          border: "1px solid rgba(33,33,33,0.06)",
          borderRadius: 8, padding: 24,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {BREAKPOINTS.map((bp, i) => {
              const maxW = BREAKPOINTS[0];
              const pct = (bp / maxW) * 100;
              return (
                <div key={bp} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 60, fontSize: 13, fontFamily: "monospace",
                    fontWeight: 600, color: "#212121", textAlign: "right", flexShrink: 0,
                  }}>
                    {bp}px
                  </div>
                  <div style={{
                    width: `${pct}%`,
                    height: 28,
                    background: i === 0
                      ? "linear-gradient(135deg, #212121, #535353)"
                      : `linear-gradient(135deg, rgba(33,33,33,${0.9 - i * 0.1}), rgba(33,33,33,${0.7 - i * 0.08}))`,
                    borderRadius: 4,
                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                    paddingRight: 10,
                    minWidth: 40,
                    transition: "width 0.5s ease",
                  }}>
                    <span style={{
                      fontSize: 9, fontWeight: 600, color: "#fff",
                      fontFamily: "monospace", opacity: 0.7,
                    }}>
                      {bp >= 1024 ? "Desktop" : bp >= 768 ? "Tablet" : "Mobile"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frameworks */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: "#9a9a9a",
            textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14,
          }}>
            Frameworks Detected
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { name: "Tailwind CSS", detail: "Arbitrary values, responsive modifiers" },
              { name: "PrimeReact/Vue/NG", detail: "425 components" },
              { name: "Fluent UI", detail: "228 components" },
              { name: "Element Plus/UI", detail: "19 components" },
            ].map(fw => (
              <div key={fw.name} style={{
                background: "#fff",
                border: "1px solid rgba(33,33,33,0.08)",
                borderRadius: 6, padding: "12px 16px",
                display: "flex", flexDirection: "column", gap: 3,
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#212121" }}>{fw.name}</span>
                <span style={{ fontSize: 10, color: "#9a9a9a" }}>{fw.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
