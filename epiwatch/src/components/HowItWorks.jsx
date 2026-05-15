import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75" />
      </svg>
    ),
    label: "DATA INGESTION",
    title: "Global Surveillance Feeds",
    description:"EpiWatch aggregates real-time data from Johns Hopkins CSSE, Google Mobility Reports, and Our World in Data — processing vaccination rates, mobility indexes, and case trajectories across 194 regions.",
    accent: "#ff4d4d",
    glow: "rgba(255,77,77,0.15)",
  },
  {
    number: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    label: "AI TRIFECTA",
    title: "Three-Model Intelligence Engine",
    description:
      "A trio of ML models run in parallel: Facebook Prophet forecasts case curves 7–30 days ahead (94.2% accuracy), RandomForest classifies regional risk into 🟢🟡🔴 zones (91.2% precision), and a Regression model estimates live R₀ transmission rates.",
    accent: "#ff8c00",
    glow: "rgba(255,140,0,0.15)",
  },
  {
    number: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "GEOGRAPHIC INTEL",
    title: "Hotspot Detection & Risk Mapping",
    description:
      "Geographic risk intelligence is rendered live on an interactive Leaflet.js map — pulsing markers highlight critical zones, bounding-box stats update in real time, and outbreak corridors are isolated before traditional systems react.",
    accent: "#ffd700",
    glow: "rgba(255,215,0,0.12)",
  },
  {
    number: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    label: "EARLY WARNING",
    title: "Proactive Alerts — 5 Days Ahead",
    description:
      "When model outputs cross critical thresholds, EpiWatch fires early-warning alerts up to 5 days before conventional surveillance systems detect the same signal — giving health authorities a decisive response window.",
    accent: "#ff4d4d",
    glow: "rgba(255,77,77,0.15)",
  },
  {
    number: "05",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    label: "AI INSIGHTS",
    title: "Human-Readable Intelligence Reports",
    description:
      "Raw model outputs are translated by an integrated NLP engine into plain-language briefings. An AI chatbot lets analysts query epidemiological data conversationally, while SHAP explainability charts reveal exactly which signals drove each prediction.",
    accent: "#00e5ff",
    glow: "rgba(0,229,255,0.12)",
  },
];

const connector = (accent) => (
  <div className="hidden md:flex flex-col items-center" style={{ width: 48 }}>
    <div
      className="w-px flex-1 mt-2"
      style={{
        background: `linear-gradient(to bottom, ${accent}88, transparent)`,
        minHeight: 48,
      }}
    />
    <div
      className="w-2 h-2 rounded-full my-1"
      style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
    />
    <div
      className="w-px flex-1 mb-2"
      style={{
        background: `linear-gradient(to bottom, transparent, ${accent}44)`,
        minHeight: 48,
      }}
    />
  </div>
);

function StepCard({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="flex gap-5 md:gap-8 items-start group"
    >
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <div
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
          style={{
            background: step.glow,
            borderColor: step.accent + "55",
            boxShadow: "0 0 24px ${step.glow}, inset 0 0 12px ${step.glow}",
            color: step.accent,
          }}
        >
          {step.icon}
          <span
            className="absolute -top-2 -right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
            style={{ background: step.accent, color: "#0a0d12", letterSpacing: "0.05em" }}
          >
            {step.number}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-10 md:pb-14">
        <span
          className="text-[10px] font-mono font-bold tracking-widest mb-1.5 block"
          style={{ color: step.accent }}
        >
          {step.label}
        </span>
        <h3 className="text-white text-lg md:text-xl font-bold mb-2 leading-snug">
          {step.title}
        </h3>
        <p className="text-white text-sm md:text-base leading-relaxed opacity-90">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-28 px-4 overflow-hidden"
      style={{ background: "#0a0d12" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,77,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,77,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,77,77,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-3xl mx-auto">
        {/* header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <div
              className="w-2 h-2 rounded-full transition-all duration-700"
              style={{
                background: "#ff4d4d",
                boxShadow: pulse ? "0 0 12px #ff4d4d, 0 0 24px #ff4d4d88" : "0 0 4px #ff4d4d",
              }}
            />
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-white uppercase">
              Intelligence Pipeline
            </span>
            <div
              className="w-2 h-2 rounded-full transition-all duration-700"
              style={{
                background: "#ff4d4d",
                boxShadow: pulse ? "0 0 12px #ff4d4d, 0 0 24px #ff4d4d88" : "0 0 4px #ff4d4d",
              }}
            />
          </div>

          <h2
            className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            How{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ff4d4d, #ff8c00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              EpiWatch
            </span>{" "}
            Works
          </h2>
          <p className="text-white text-base md:text-lg max-w-xl mx-auto leading-relaxed opacity-85">
            From raw global health data to actionable outbreak intelligence - a five-stage AI pipeline
            that detects threats before they become crises.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #ff4d4d66)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d]" />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #ff4d4d66)" }} />
          </div>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-7 md:left-8 top-0 bottom-0 w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #ff4d4d44 10%, #ff8c0033 50%, #ffd70022 80%, transparent)",
            }}
          />

          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 flex justify-center"
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-full border text-sm font-mono"
            style={{
              borderColor: "#ff4d4d33",
              background: "rgba(255,77,77,0.06)",
              color: "#ff4d4d",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-ping inline-block"
              style={{ background: "#ff4d4d" }}
            />
            Detecting outbreaks up to 5 days before traditional systems
          </div>
        </motion.div>
      </div>
    </section>
  );
}
