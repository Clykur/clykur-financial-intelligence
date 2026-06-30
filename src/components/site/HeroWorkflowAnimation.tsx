"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Palettes (Mapped directly to CSS Custom Properties) ────────────────────────
const P = {
  bg: "var(--wf-bg)",
  titleBar: "var(--wf-titlebar)",
  sidebar: "var(--wf-sidebar)",
  panel: "var(--wf-panel)",
  card: "var(--wf-card)",
  cardActive: "var(--wf-card-active)",
  border: "var(--wf-border)",
  cardBorder: "var(--wf-card-border)",
  activeBorder: "var(--wf-active-border)",
  accent: "var(--wf-accent)",
  accentLt: "var(--wf-accent-lt)",
  green: "var(--wf-green)",
  amber: "var(--wf-amber)",
  text: "var(--wf-text)",
  textSub: "var(--wf-text-sub)",
  track: "var(--wf-track)",
  grid: "var(--wf-grid)",
  inputBg: "var(--wf-input-bg)",
  metricBg: "var(--wf-metric-bg)",
  dot: "var(--wf-dot)",
  dotY: "var(--wf-dot-y)",
  dotG: "var(--wf-dot-g)",
};

type Palette = typeof P;

// ── SVG Icon helpers ───────────────────────────────────────────────────────────
type IP = { cx: number; cy: number; r?: number; col: string };
const Ic = ({ children, cx, cy, r = 7, col }: IP & { children: React.ReactNode }) => (
  <g
    transform={`translate(${cx},${cy}) scale(${r / 8})`}
    stroke={col}
    strokeWidth="1.7"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </g>
);
const IcWebhook = (p: IP) => (
  <Ic {...p}>
    <path d="M-5 0h6M-1-3.5l3.5 3.5-3.5 3.5M5 0h2" />
    <rect x="-7" y="-4.5" width="4" height="9" rx="1" fill={p.col} stroke="none" />
  </Ic>
);
const IcJson = (p: IP) => (
  <Ic {...p}>
    <path d="M-4.5-6H-6a1 1 0 0 0-1 1v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h1.5" />
    <path d="M4.5-6H6a1 1 0 0 1 1 1v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a1 1 0 0 1-1 1H4.5" />
  </Ic>
);
const IcCondition = (p: IP) => (
  <Ic {...p}>
    <circle cx="0" cy="-6" r="2" fill={p.col} stroke="none" />
    <path d="M0-4v4M-3 0h-3l2 4M3 0h3l-2 4" />
    <circle cx="-4" cy="7" r="2" fill={p.col} stroke="none" />
    <circle cx="4" cy="7" r="2" fill={p.col} stroke="none" />
  </Ic>
);
const IcStripe = (p: IP) => (
  <Ic {...p}>
    <rect x="-7" y="-5" width="14" height="10" rx="2" />
    <path d="M-2.5-1.5c0-.8.6-1.5 2-1.5s2 .7 2 1.5-.6 1-2 1-2 .7-2 1.5.6 1.5 2 1.5 2-.7 2-1.5" />
  </Ic>
);
const IcMail = (p: IP) => (
  <Ic {...p}>
    <rect x="-7" y="-5" width="14" height="10" rx="2" />
    <path d="M-7-3l7 4 7-4" />
  </Ic>
);
const IcClock = (p: IP) => (
  <Ic {...p}>
    <circle cx="0" cy="0" r="7" />
    <path d="M0-4v4l2.5 2" />
  </Ic>
);
const IcDB = (p: IP) => (
  <Ic {...p}>
    <ellipse cx="0" cy="-4.5" rx="6" ry="2.5" />
    <path d="M-6-4.5v9c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-9" />
    <path d="M-6 0c0 1.4 2.7 2.5 6 2.5S6 1.4 6 0" />
  </Ic>
);
const IcApi = (p: IP) => (
  <Ic {...p}>
    <path d="M-4.5-3.5l-3 3.5 3 3.5M4.5-3.5l3 3.5-3 3.5M1-5.5l-2 11" />
  </Ic>
);
const IcForm = (p: IP) => (
  <Ic {...p}>
    <rect x="-6" y="-6" width="12" height="12" rx="1.5" />
    <path d="M-3.5-2.5h7M-3.5.5h7M-3.5 3.5h4" />
  </Ic>
);
const IcFilter = (p: IP) => (
  <Ic {...p}>
    <path d="M-7-5h14l-5 6v6l-4-2v-4Z" />
  </Ic>
);

// ── Node definitions ──────────────────────────────────────────────────────────
const NW = 195; // Node width
const NH = 86; // Node height

type ND = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  Ic: (p: IP) => React.ReactElement;
  active?: boolean;
  delay: number;
  w?: number;
  badge?: string;
  badgeCol?: string;
};

// SVG canvas is 580 wide. Position nodes to fit.
const NODES: ND[] = [
  {
    id: "webhook",
    x: 192,
    y: 18,
    label: "WEBHOOK TRIGGER",
    sub: "Receives incoming HTTP events",
    Ic: IcWebhook,
    delay: 0,
    badge: "TRIGGER",
    badgeCol: "#6366f1",
  },
  {
    id: "parse",
    x: 192,
    y: 156,
    label: "PARSE DATA (JSON)",
    sub: "Extracts structured payload data",
    Ic: IcJson,
    delay: 0.45,
  },
  {
    id: "condition",
    x: 20,
    y: 300,
    label: "CONDITION",
    sub: "Status == 'Paid'",
    Ic: IcCondition,
    delay: 0.9,
    w: 172,
  },
  {
    id: "stripe",
    x: 360,
    y: 300,
    label: "CREATE CUSTOMER",
    sub: "Creates new Stripe customer",
    Ic: IcStripe,
    delay: 1.35,
    active: true,
    badge: "STRIPE",
    badgeCol: "#8b5cf6",
  },
  {
    id: "email",
    x: 360,
    y: 448,
    label: "SEND EMAIL",
    sub: "Dispatches confirmation message",
    Ic: IcMail,
    delay: 1.8,
    badge: "DONE",
    badgeCol: "#22c55e",
  },
];
// stripe right edge: 360+195=555 < 580 ✓  email same ✓  condition: 20+172=192 ✓

const EDGES = [
  { from: "webhook", to: "parse", d: 0.25 },
  { from: "parse", to: "condition", d: 0.7 },
  { from: "parse", to: "stripe", d: 0.75 },
  { from: "stripe", to: "email", d: 1.6 },
] as const;

const NM = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, ND>;
const ncx = (n: ND) => n.x + (n.w ?? NW) / 2;

// ── Edge ──────────────────────────────────────────────────────────────────────
function Edge({ from, to, d, P }: { from: string; to: string; d: number; P: Palette }) {
  const f = NM[from],
    t = NM[to];
  const x1 = ncx(f),
    y1 = f.y + NH,
    x2 = ncx(t),
    y2 = t.y;
  const my = (y1 + y2) / 2;
  const path = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
  return (
    <g>
      <path d={path} fill="none" stroke={P.track} strokeWidth={1.5} strokeDasharray="3 5" />
      <motion.path
        d={path}
        fill="none"
        stroke={P.accent}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeDasharray="14 130"
        strokeDashoffset={144}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, strokeDashoffset: [144, -300] }}
        transition={{
          opacity: { delay: d, duration: 0.3 },
          strokeDashoffset: {
            delay: d,
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: "linear",
          },
        }}
      />
      <motion.path
        d={`M${x2 - 3.5},${y2 - 6} L${x2},${y2 + 1} L${x2 + 3.5},${y2 - 6}`}
        fill="none"
        stroke={P.accent}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 0.3 }}
      />
    </g>
  );
}

// ── Node ──────────────────────────────────────────────────────────────────────
function Node({ n, P }: { n: ND; P: Palette }) {
  const w = n.w ?? NW;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: n.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow halo */}
      {n.active && (
        <motion.rect
          x={n.x - 4}
          y={n.y - 4}
          width={w + 8}
          height={NH + 8}
          rx={10}
          fill={P.accent}
          stroke="none"
          fillOpacity={0.12}
          animate={{ fillOpacity: [0.12, 0.04, 0.12] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      {/* Card */}
      <rect x={n.x + 1} y={n.y + 2} width={w} height={NH} rx={7} fill="rgba(0,0,0,0.08)" />
      <rect
        x={n.x}
        y={n.y}
        width={w}
        height={NH}
        rx={7}
        fill={n.active ? P.cardActive : P.card}
        stroke={n.active ? P.activeBorder : P.cardBorder}
        strokeWidth={n.active ? 1.5 : 1}
      />

      {/* Top accent line */}
      <rect
        x={n.x + 8}
        y={n.y}
        width={n.active ? w - 16 : 28}
        height={3}
        rx={1.5}
        fill={P.accent}
        fillOpacity={n.active ? 1 : 0.35}
      />

      {/* Icon bubble */}
      <rect
        x={n.x + 12}
        y={n.y + 17}
        width={33}
        height={33}
        rx={7}
        fill={n.active ? P.accent : "rgba(99,102,241,0.13)"}
      />
      <n.Ic cx={n.x + 28.5} cy={n.y + 33.5} r={7.5} col={n.active ? "#fff" : P.accent} />

      {/* Texts */}
      <text
        x={n.x + 55}
        y={n.y + 28}
        fontSize={8.5}
        fontWeight="700"
        letterSpacing="0.06em"
        fontFamily="'Space Grotesk',sans-serif"
        fill={n.active ? P.accentLt : P.text}
      >
        {n.label}
      </text>
      <text
        x={n.x + 55}
        y={n.y + 42}
        fontSize={7.5}
        fontFamily="'Inter',sans-serif"
        fill={P.textSub}
      >
        {n.sub.length > 29 ? n.sub.slice(0, 29) + "…" : n.sub}
      </text>

      {/* Badge */}
      {n.badge && n.badgeCol && (
        <>
          <rect
            x={n.x + w - 50}
            y={n.y + 15}
            width={38}
            height={13}
            rx={3.5}
            fill={n.badgeCol + "1f"}
            stroke={n.badgeCol}
            strokeWidth={0.75}
          />
          <text
            x={n.x + w - 31}
            y={n.y + 24.5}
            fontSize={6}
            fontWeight="800"
            letterSpacing="0.1em"
            fontFamily="monospace"
            textAnchor="middle"
            fill={n.badgeCol}
          >
            {n.badge}
          </text>
        </>
      )}

      {/* Status dot */}
      <motion.circle
        cx={n.x + w - 11}
        cy={n.y + NH - 11}
        r={3.5}
        fill={n.active ? P.green : "rgba(150,150,180,0.25)"}
        animate={n.active ? { opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </motion.g>
  );
}

// ── Sidebar items ─────────────────────────────────────────────────────────────
const SIDEBAR = [
  {
    g: "Triggers",
    c: "#6366f1",
    items: [
      { n: "Webhook", I: IcWebhook },
      { n: "Schedule", I: IcClock },
      { n: "Form", I: IcForm },
    ],
  },
  {
    g: "Actions",
    c: "#f59e0b",
    items: [
      { n: "API Request", I: IcApi },
      { n: "Database", I: IcDB },
      { n: "Send Email", I: IcMail },
    ],
  },
  {
    g: "Controls",
    c: "#ec4899",
    items: [
      { n: "Condition", I: IcCondition },
      { n: "Delay", I: IcClock },
      { n: "Filter", I: IcFilter },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function HeroWorkflowAnimation() {
  const W = 580,
    H = 580;
  const DESIGN_WIDTH = 580;
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      setScale(available > 0 ? Math.min(1, available / DESIGN_WIDTH) : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const frameHeight = 520 + 44;
  const scaledHeight = Math.ceil(frameHeight * scale);

  return (
    <div
      ref={shellRef}
      className="relative mx-auto w-full max-w-[580px] min-w-0"
      style={{ height: scaledHeight }}
    >
      <div
        className="relative origin-top-left overflow-hidden rounded-2xl"
        style={{
          width: DESIGN_WIDTH,
          height: frameHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-2xl"
          style={{
            background: P.bg,
            border: `1.5px solid ${P.border}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.14)",
          }}
        >
          {/* Title bar */}
          <div
            className="grid h-11 grid-cols-[auto_1fr_auto] items-center gap-1 px-2 sm:px-4"
            style={{ borderBottom: `1px solid ${P.border}`, background: P.titleBar }}
          >
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              {[P.dot, P.dotY, P.dotG].map((c, i) => (
                <div
                  key={i}
                  className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full shrink-0"
                  style={{ background: c }}
                />
              ))}
              <span
                className="hidden font-mono text-[10.5px] font-semibold sm:inline truncate"
                style={{ color: P.textSub }}
              >
                New Workflow
              </span>
            </div>
            <span
              className="truncate text-center font-bold text-[11px] sm:text-[12px] tracking-tight px-1"
              style={{ color: P.text, fontFamily: "'Space Grotesk',sans-serif" }}
            >
              Workflow Builder
            </span>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <span
                className="hidden text-[9.5px] px-2 py-1 rounded-lg font-mono sm:inline"
                style={{ border: `1px solid ${P.border}`, color: P.textSub, background: P.inputBg }}
              >
                Save
              </span>
              <span
                className="text-[9px] sm:text-[9.5px] px-2 sm:px-3 py-1 rounded-lg font-mono font-bold text-white whitespace-nowrap"
                style={{ background: P.accent }}
              >
                ▶ Run
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex h-[520px] min-h-0">
            {/* Sidebar */}
            <div
              className="flex-shrink-0 overflow-y-auto overflow-x-hidden py-2 px-1.5 sm:py-3 sm:px-2 w-[88px] sm:w-[144px]"
              style={{ borderRight: `1px solid ${P.border}`, background: P.sidebar }}
            >
              {SIDEBAR.map((g, gi) => (
                <div key={g.g} className="mb-3">
                  <p
                    className="mb-1.5 px-1 font-mono text-[7px] font-bold uppercase tracking-widest"
                    style={{ color: P.textSub }}
                  >
                    {g.g}
                  </p>
                  {g.items.map((it, ii) => (
                    <motion.div
                      key={it.n}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + gi * 0.1 + ii * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-1 flex items-center gap-2 rounded-lg px-2 py-1.5 cursor-default"
                      style={{ border: `1px solid ${P.cardBorder}`, background: P.card }}
                    >
                      <svg width="14" height="14" viewBox="-8 -8 16 16" overflow="visible">
                        <it.I cx={0} cy={0} r={6.5} col={g.c} />
                      </svg>
                      <span
                        style={{ fontSize: "8px", fontFamily: "'Inter',sans-serif", color: P.text }}
                      >
                        {it.n}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Canvas */}
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle,${P.grid} 1px,transparent 1px)`,
                backgroundSize: "22px 22px",
                backgroundColor: P.bg,
              }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                style={{ position: "absolute", inset: 0 }}
              >
                {EDGES.map((e) => (
                  <Edge key={`${e.from}-${e.to}`} from={e.from} to={e.to} d={e.d} P={P} />
                ))}
                {NODES.map((n) => (
                  <Node key={n.id} n={n} P={P} />
                ))}

                {/* Branch labels
            <motion.text x={127} y={385} fontSize={7.5} fontFamily="monospace" fill={P.textSub}
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>TRUE ›</motion.text>
            <motion.text x={127} y={400} fontSize={7.5} fontFamily="monospace" fill={P.textSub}
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>FALSE ›</motion.text> */}
              </svg>
            </div>

            {/* Right panel */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-w-0 flex-col flex-shrink-0 overflow-hidden p-2 sm:p-3 w-[108px] sm:w-[160px] lg:w-[192px]"
              style={{ borderLeft: `1px solid ${P.border}`, background: P.panel }}
            >
              <div
                className="flex items-center justify-between mb-3 pb-2.5"
                style={{ borderBottom: `1px solid ${P.border}` }}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded text-[7.5px] font-bold text-white"
                    style={{ background: "#8b5cf6" }}
                  >
                    S
                  </div>
                  <span className="font-mono text-[8px] font-bold" style={{ color: P.text }}>
                    CREATE CUSTOMER
                  </span>
                </div>
                <span style={{ color: P.textSub, fontSize: 11 }}>✕</span>
              </div>

              {[
                { l: "Name", v: "CREATE CUSTOMER (Stripe)" },
                { l: "Integration", v: "⚡ Stripe" },
                { l: "Settings", v: "Create Customer" },
                { l: "Amount", v: "0" },
              ].map((f) => (
                <div key={f.l} className="mb-2.5">
                  <p
                    className="mb-1 font-mono text-[6.5px] font-semibold uppercase tracking-widest"
                    style={{ color: P.textSub }}
                  >
                    {f.l}
                  </p>
                  <div
                    className="rounded-lg px-2.5 py-1.5 font-mono text-[7.5px] truncate"
                    style={{
                      border: `1px solid ${P.cardBorder}`,
                      background: P.inputBg,
                      color: P.text,
                    }}
                  >
                    {f.v}
                  </div>
                </div>
              ))}

              <div
                className="rounded-xl p-2.5 mb-2.5"
                style={{ background: P.metricBg, border: `1px solid ${P.accent}33` }}
              >
                <p
                  className="font-mono text-[6.5px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: P.accent }}
                >
                  Live Metrics
                </p>
                {[
                  { k: "Latency", v: "42ms", c: P.green },
                  { k: "Status", v: "200 OK", c: P.green },
                  { k: "Rate", v: "124/min", c: P.amber },
                ].map(({ k, v, c }) => (
                  <div key={k} className="flex justify-between mb-1">
                    <span style={{ fontSize: 7, color: P.textSub, fontFamily: "monospace" }}>
                      {k}
                    </span>
                    <motion.span
                      style={{ fontSize: 7, color: c, fontFamily: "monospace", fontWeight: 700 }}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    >
                      {v}
                    </motion.span>
                  </div>
                ))}
              </div>

              <motion.div
                className="rounded-lg py-1.5 text-center text-[8.5px] font-bold text-white mb-3 cursor-pointer"
                style={{ background: P.accent }}
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ✓ Update Node
              </motion.div>

              <div className="space-y-1">
                {[
                  { t: "13:42:01", m: "Webhook received", c: P.textSub },
                  { t: "13:42:01", m: "JSON parsed OK", c: P.green },
                  { t: "13:42:02", m: "Customer created", c: P.accent },
                  { t: "13:42:02", m: "Email dispatched", c: P.amber },
                ].map(({ t, m, c }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 + i * 0.25 }}
                    className="flex gap-1.5"
                    style={{ fontSize: 6.5, fontFamily: "monospace" }}
                  >
                    <span style={{ color: P.textSub, flexShrink: 0 }}>{t}</span>
                    <span style={{ color: c }}>{m}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
