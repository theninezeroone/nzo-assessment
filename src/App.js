import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  {
    id: 1,
    category: "Confidence",
    text: "I believe in my ability to perform well even when things get tough.",
  },
  {
    id: 2,
    category: "Confidence",
    text: "After making a mistake, I quickly regain my confidence and composure.",
  },
  {
    id: 3,
    category: "Confidence",
    text: "I trust my athletic instincts during competition without second-guessing.",
  },
  {
    id: 4,
    category: "Confidence",
    text: "I feel genuinely prepared and capable heading into high-stakes moments.",
  },
  {
    id: 5,
    category: "Focus",
    text: "I can block out crowd noise, opponents, and other distractions during play.",
  },
  {
    id: 6,
    category: "Focus",
    text: "I stay mentally present and engaged for a full game or training session.",
  },
  {
    id: 7,
    category: "Focus",
    text: "When I lose concentration, I can bring my attention back quickly on my own.",
  },
  {
    id: 8,
    category: "Focus",
    text: "I automatically direct my attention to what matters most in the moment.",
  },
  {
    id: 9,
    category: "Emotional Control",
    text: "I manage frustration effectively without letting it disrupt my performance.",
  },
  {
    id: 10,
    category: "Emotional Control",
    text: "I stay calm and composed even when things go wrong on the field or court.",
  },
  {
    id: 11,
    category: "Emotional Control",
    text: "I prevent pre-competition nerves or anxiety from overwhelming me.",
  },
  {
    id: 12,
    category: "Emotional Control",
    text: "I control my emotional reactions during high-pressure situations.",
  },
  {
    id: 13,
    category: "Motivation",
    text: "I push myself hard in practice even when I'm tired or it doesn't feel fun.",
  },
  {
    id: 14,
    category: "Motivation",
    text: "I set clear goals for myself and work consistently toward achieving them.",
  },
  {
    id: 15,
    category: "Motivation",
    text: "After a poor performance, I stay driven and motivated to improve.",
  },
  {
    id: 16,
    category: "Motivation",
    text: "I find genuine purpose and meaning in my daily training — not just the games.",
  },
  {
    id: 17,
    category: "Resilience",
    text: "I treat failures and setbacks as fuel to come back stronger.",
  },
  {
    id: 18,
    category: "Resilience",
    text: "I keep working hard even when facing major obstacles or adversity.",
  },
  {
    id: 19,
    category: "Resilience",
    text: "I recover mentally after tough losses, injuries, or difficult stretches.",
  },
  {
    id: 20,
    category: "Resilience",
    text: "I maintain a positive, solution-focused outlook even after repeated setbacks.",
  },
  {
    id: 21,
    category: "Mental Toughness",
    text: "I perform at my best when the game is on the line and stakes are highest.",
  },
  {
    id: 22,
    category: "Mental Toughness",
    text: "I stay locked in and composed when everything depends on my next action.",
  },
  {
    id: 23,
    category: "Mental Toughness",
    text: "I don't let opponents, coaches' reactions, or outside noise get in my head.",
  },
  {
    id: 24,
    category: "Mental Toughness",
    text: "I push through physical and mental fatigue when it truly counts.",
  },
  {
    id: 25,
    category: "Mental Toughness",
    text: "I stay focused and composed even after unfair calls, errors, or bad breaks.",
  },
];

const CATEGORIES = [
  "Confidence",
  "Focus",
  "Emotional Control",
  "Motivation",
  "Resilience",
  "Mental Toughness",
];

const CAT_META = {
  Confidence: {
    icon: "◆",
    accent: "#4A9EFF",
    glow: "#4A9EFF20",
    border: "#4A9EFF40",
    light: "#A8CBFF",
  },
  Focus: {
    icon: "◎",
    accent: "#00D4AA",
    glow: "#00D4AA20",
    border: "#00D4AA40",
    light: "#7FFFD4",
  },
  "Emotional Control": {
    icon: "◐",
    accent: "#C77DFF",
    glow: "#C77DFF20",
    border: "#C77DFF40",
    light: "#E0BAFF",
  },
  Motivation: {
    icon: "▲",
    accent: "#FFB830",
    glow: "#FFB83020",
    border: "#FFB83040",
    light: "#FFD980",
  },
  Resilience: {
    icon: "⬡",
    accent: "#5FD75F",
    glow: "#5FD75F20",
    border: "#5FD75F40",
    light: "#AAEAAA",
  },
  "Mental Toughness": {
    icon: "★",
    accent: "#FF6B6B",
    glow: "#FF6B6B20",
    border: "#FF6B6B40",
    light: "#FFB4B4",
  },
};

const RECS = {
  Confidence: {
    low: [
      {
        t: "Daily Success Journal",
        d: "After every practice, record 3 specific things you executed well. Evidence beats empty affirmations — your brain needs proof of competence to build real confidence.",
      },
      {
        t: "Pre-Performance Affirmations",
        d: "Develop 5 skill-based statements (e.g., 'My first step is explosive'). Repeat them during warm-up to prime your confidence state before you compete.",
      },
      {
        t: "Mistake Reset Protocol",
        d: "Create a physical cue (snap fingers, tap chest) you use immediately after errors to signal your brain to move on. Rehearse it in practice so it's automatic in games.",
      },
      {
        t: "Success Visualization",
        d: "Spend 5 minutes before sleep vividly imagining a great performance — sights, sounds, feelings. Mental reps build the same neural pathways as physical ones.",
      },
    ],
    mid: [
      {
        t: "Build Your Mental Highlight Reel",
        d: "Keep a vivid mental replay of your 5 best performances. Recall one before competing to anchor your confidence state.",
      },
      {
        t: "Self-Talk Audit",
        d: "Catch 'I can't' language and replace it with 'I'm developing' or 'I've done this before.' The shift is subtle but compounds dramatically over time.",
      },
    ],
    high: [
      {
        t: "Protect What You've Built",
        d: "Your confidence is a genuine asset. Keep your pre-game routines consistent — confidence erodes when preparation becomes inconsistent.",
      },
    ],
  },
  Focus: {
    low: [
      {
        t: "Daily Attention Training (10 min)",
        d: "Set a timer. Breathe slowly and focus only on the breath. Each time your mind wanders, gently return without judgment. This is the rep that trains your focus muscle.",
      },
      {
        t: "Personal Focus Cue Word",
        d: "Choose one word ('Lock', 'Now', 'Sharp') as your attention anchor. Use it consistently to signal your brain to return to the present moment during play.",
      },
      {
        t: "Practice Zone Rules",
        d: "No phones during training. No chatting between reps about unrelated topics. Treat every practice as a performance lab — focus standards in training set your ceiling in games.",
      },
      {
        t: "Pre-Performance Ritual",
        d: "Develop a 3-5 step sequence before competing (warm-up, breathing, cue word). Rituals are reliable on-ramps to focused states.",
      },
    ],
    mid: [
      {
        t: "Attention Switching Drills",
        d: "Practice shifting focus intentionally — broad (whole field awareness) to narrow (one target) and back. It's a trainable skill.",
      },
      {
        t: "Refocus Reset Routine",
        d: "Design a 3-second reset: physical cue + deep breath + cue word. Use it in every practice so it's automatic when games are tight.",
      },
    ],
    high: [
      {
        t: "Elite Focus — Teach It",
        d: "Your concentration is a real edge. Articulating your focus methods to teammates will deepen your own mastery and develop your leadership.",
      },
    ],
  },
  "Emotional Control": {
    low: [
      {
        t: "Box Breathing Protocol",
        d: "Inhale 4 counts, hold 4, exhale 4, hold 4. Use during timeouts, between points, or before free throws. This activates the parasympathetic nervous system directly.",
      },
      {
        t: "Emotional Reset Ritual",
        d: "After any setback: 3 deep breaths + reset phrase ('Flush it. Next play.'). Design yours and rehearse it until it's second-nature.",
      },
      {
        t: "Trigger Mapping Exercise",
        d: "Identify your top 3 emotional triggers (bad calls, teammate mistakes, own errors) and write your exact planned response to each. Having a plan removes the emotional surprise.",
      },
      {
        t: "Post-Game Emotion Log",
        d: "Rate your emotional control 1-10 after each game and log what triggered your best and worst moments. Visible patterns can be changed.",
      },
    ],
    mid: [
      {
        t: "Downregulation Breathing",
        d: "2-count inhale, 4-count exhale activates your body's natural calm response. Use it in the 30 seconds before high-pressure moments.",
      },
      {
        t: "Emotion-Performance Tracker",
        d: "Track emotional state alongside performance stats for 4 weeks. The correlation between composure and output will be the most motivating data you've seen.",
      },
    ],
    high: [
      {
        t: "Composure as Team Capital",
        d: "Your emotional control is a collective asset. Model calm under fire — athletes around you unconsciously regulate to whoever is most composed on the team.",
      },
    ],
  },
  Motivation: {
    low: [
      {
        t: "WHY Excavation Exercise",
        d: "Write why you compete. Then ask 'But why does that matter?' five more times. The answer at level 5 or 6 is your real driver. Post it where you'll see it every morning.",
      },
      {
        t: "3-Tier Goal Framework",
        d: "Set 1 outcome goal (season), 3 performance goals (measurable metrics), and 5 process goals (daily actions). Focus 90% of your attention on process — it's the only tier you fully control.",
      },
      {
        t: "Vision Board Creation",
        d: "Create a vivid visual of your athletic future — photos, words, performance benchmarks. Place it where it's the first thing you see. Vision pulls motivation; willpower just pushes.",
      },
      {
        t: "Accountability Architecture",
        d: "Partner with a coach or teammate to share weekly goals every Sunday night. External accountability bridges the gap when internal drive dips.",
      },
    ],
    mid: [
      {
        t: "Progress Measurement Ritual",
        d: "Track one key metric per week and graph it. Seeing measurable progress is consistently the most reliable fuel source for sustained motivation.",
      },
      {
        t: "Milestone Rewards",
        d: "Set specific performance milestones with pre-decided rewards attached. Short-term incentives bridge the gap between daily effort and long-term outcomes.",
      },
    ],
    high: [
      {
        t: "Purpose-Driven Leadership",
        d: "Your drive is rare — and contagious. Channel it by helping a teammate raise their standards. Teaching effort and purpose multiplies your own.",
      },
    ],
  },
  Resilience: {
    low: [
      {
        t: "Growth Mindset Journal (Weekly)",
        d: "Take 3 things that went poorly each week and rewrite them as lessons: 'What did this teach me? What one thing will I do differently?' This rewires how your brain processes adversity.",
      },
      {
        t: "Adversity Visualization",
        d: "Before competitions, mentally rehearse going down early, performing badly, then working through your comeback. Athletes who practice adversity adapt faster to it.",
      },
      {
        t: "Post-Setback Reset Ritual",
        d: "Design a specific sequence after poor performances: physical release, mental reset (breathe + cue phrase), re-engagement (one thing to work on tomorrow).",
      },
      {
        t: "Adversity Case Studies",
        d: "Study 3 elite athletes who overcame serious setbacks. Read their actual stories. Your brain builds resilience by expanding its model of what's recoverable.",
      },
    ],
    mid: [
      {
        t: "Reframe Practice",
        d: "Catch catastrophic thinking ('I'm done') and rehearse the reframe: 'This is hard right now. I've pushed through hard before. What's my next action?'",
      },
      {
        t: "Overcome Evidence Log",
        d: "Record challenges you pushed through each week. Re-reading your own track record of overcoming builds the evidence base your resilience draws from.",
      },
    ],
    high: [
      {
        t: "Bounce-Back Anchor for the Team",
        d: "Your resilience is elite-level. Use it to be the steady presence when teammates spiral after setbacks — it's one of the rarest leadership qualities in sport.",
      },
    ],
  },
  "Mental Toughness": {
    low: [
      {
        t: "Pressure Simulation in Practice",
        d: "Ask your coach to run high-stakes scenarios: last 2 minutes, tied game, one chance left. Pressure in practice is the only real preparation for pressure in games.",
      },
      {
        t: "Clutch Moment Visualization",
        d: "Daily, spend 5 minutes visualizing yourself executing in the highest-pressure scenario of your sport — make it vivid. Athletes who mentally rehearse pressure perform measurably better in it.",
      },
      {
        t: "Compete Against Yourself Daily",
        d: "Set internal performance targets in every practice. This builds the competition mindset independent of opponents — and it transfers when external stakes are highest.",
      },
      {
        t: "Mental Performance Review",
        d: "After each competition, score yourself 1-10 on focus, composure, and effort. Make mental performance a measured, coachable variable. You improve what you track.",
      },
    ],
    mid: [
      {
        t: "Personal Clutch Challenges",
        d: "Create pressure moments in practice for yourself (e.g., 'Make 5 in a row or restart'). Build a history of clutch executions — your confidence in high-stakes moments runs on that evidence.",
      },
      {
        t: "Competition Mode Trigger",
        d: "Develop a physical or verbal cue that activates your competition mindset. Use it at the start of every practice to condition the association.",
      },
    ],
    high: [
      {
        t: "Elite Clutch Performer",
        d: "Performing under pressure is genuinely rare. Stay intentional about the habits (visualization, competition mindset training) that got you here.",
      },
    ],
  },
};

function getLevel(pct) {
  if (pct >= 80)
    return {
      label: "Strength",
      color: "#5FD75F",
      bg: "rgba(95,215,95,0.12)",
      border: "rgba(95,215,95,0.25)",
    };
  if (pct >= 65)
    return {
      label: "Building",
      color: "#4A9EFF",
      bg: "rgba(74,158,255,0.12)",
      border: "rgba(74,158,255,0.25)",
    };
  if (pct >= 50)
    return {
      label: "Developing",
      color: "#FFB830",
      bg: "rgba(255,184,48,0.12)",
      border: "rgba(255,184,48,0.25)",
    };
  return {
    label: "Growth Area",
    color: "#FF6B6B",
    bg: "rgba(255,107,107,0.12)",
    border: "rgba(255,107,107,0.25)",
  };
}

function getRecs(cat, pct) {
  const r = RECS[cat];
  if (pct >= 75) return r.high;
  if (pct >= 50) return r.mid;
  return r.low;
}

function computeScores(answers) {
  const out = {};
  CATEGORIES.forEach((cat) => {
    const qs = QUESTIONS.filter((q) => q.category === cat);
    const sum = qs.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
    out[cat] = Math.round((sum / (qs.length * 5)) * 100);
  });
  return out;
}

const PRINT_CSS = `
@media print {
  @page { margin: 15mm 14mm; size: A4 portrait; }
  body, html { background: #fff !important; color: #111 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .no-print { display: none !important; }
  .print-show { display: block !important; }
  .print-flex { display: flex !important; }
  .results-wrap { background: #fff !important; color: #111 !important; padding: 0 !important; min-height: unset !important; }
  .results-inner { padding: 0 !important; max-width: 100% !important; }
  .overall-card { background: #f4f4f4 !important; border: 1px solid #ddd !important; border-radius: 10px !important; }
  .overall-score { color: #111 !important; }
  .overall-tag-text { color: #222 !important; }
  .overall-tag-wrap { background: #e8e8e8 !important; border: 1px solid #bbb !important; }
  .overall-note { color: #555 !important; }
  .breakdown-card { background: #fafafa !important; border: 1px solid #ddd !important; }
  .cat-label { color: #222 !important; }
  .bar-track { background: #e0e0e0 !important; }
  .bar-fill { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .lv-label { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .grid-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
  .str-box { background: #f0faf0 !important; border: 1px solid #99cc99 !important; color: #111 !important; }
  .str-label { color: #2a6e2a !important; }
  .str-val { color: #2a6e2a !important; }
  .gap-box { background: #fff5f5 !important; border: 1px solid #ffaaaa !important; color: #111 !important; }
  .gap-label { color: #aa2222 !important; }
  .gap-val { color: #aa2222 !important; }
  .cat-card { background: #fff !important; border: 1px solid #ddd !important; page-break-inside: avoid; margin-bottom: 12px !important; }
  .cat-name { color: #111 !important; }
  .rec-block { background: #f8f8f8 !important; }
  .rec-title { color: #222 !important; }
  .rec-body { color: #444 !important; }
  .rec-note { color: #888 !important; }
  .section-label { color: #666 !important; }
  .footer-screen { display: none !important; }
}
`;

const dark = "#07090F";

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hover, setHover] = useState(null);
  const [barsReady, setBarsReady] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = PRINT_CSS;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  useEffect(() => {
    if (screen === "results") {
      const t = setTimeout(() => setBarsReady(true), 400);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [screen, qIdx]);

  const q = QUESTIONS[qIdx];
  const progress = Math.round((qIdx / QUESTIONS.length) * 100);

  function answer(score) {
    const next = { ...answers, [q.id]: score };
    setAnswers(next);
    setHover(null);
    if (qIdx + 1 < QUESTIONS.length) setQIdx(qIdx + 1);
    else setScreen("results");
  }

  function restart() {
    setScreen("intro");
    setAnswers({});
    setQIdx(0);
    setBarsReady(false);
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (screen === "intro")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: dark,
          color: "#E8EDF5",
          fontFamily: "system-ui, sans-serif",
        }}
        ref={topRef}
      >
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(173,255,47,0.08)",
                border: "1px solid rgba(173,255,47,0.2)",
                borderRadius: 24,
                padding: "6px 18px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "#ADFF2F",
                  textTransform: "uppercase",
                }}
              >
                NZO Sports Mindset
              </span>
            </div>
            <h1
              style={{
                margin: "0 0 6px",
                fontSize: 42,
                fontWeight: 900,
                letterSpacing: -1,
                lineHeight: 1.1,
                color: "#FFF",
              }}
            >
              Mental Skills
              <br />
              <span style={{ color: "#ADFF2F" }}>Assessment</span>
            </h1>
            <p
              style={{
                color: "#6A7A90",
                fontSize: 15,
                lineHeight: 1.7,
                margin: "20px auto 0",
                maxWidth: 420,
              }}
            >
              25 questions · 6 core skills · Personalized training plan in under
              5 minutes.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 40,
            }}
          >
            {CATEGORIES.map((cat) => {
              const m = CAT_META[cat];
              return (
                <div
                  key={cat}
                  style={{
                    background: m.glow,
                    border: `1px solid ${m.border}`,
                    borderRadius: 12,
                    padding: "14px 10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{ fontSize: 18, color: m.accent, marginBottom: 5 }}
                  >
                    {m.icon}
                  </div>
                  <div
                    style={{ fontSize: 11, color: m.light, lineHeight: 1.3 }}
                  >
                    {cat}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 18,
              padding: "28px 28px 32px",
              marginBottom: 20,
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  letterSpacing: 3,
                  color: "#ADFF2F",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Athlete Name *
              </label>
              <input
                type="text"
                placeholder="Your first name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && name.trim() && setScreen("questions")
                }
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 10,
                  color: "#E8EDF5",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  letterSpacing: 3,
                  color: "#ADFF2F",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Sport (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Hockey, Basketball, Soccer..."
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 10,
                  color: "#E8EDF5",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              if (name.trim()) setScreen("questions");
            }}
            disabled={!name.trim()}
            style={{
              width: "100%",
              padding: "17px",
              background: name.trim() ? "#ADFF2F" : "rgba(255,255,255,0.05)",
              border: "none",
              borderRadius: 12,
              color: name.trim() ? dark : "#3A4455",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 2,
              cursor: name.trim() ? "pointer" : "not-allowed",
              textTransform: "uppercase",
            }}
          >
            Begin Assessment →
          </button>
          <p
            style={{
              textAlign: "center",
              color: "#3A4455",
              fontSize: 12,
              marginTop: 14,
            }}
          >
            ~5 minutes · Reassess every 6–8 weeks to track progress
          </p>
        </div>
      </div>
    );

  // ── QUESTIONS ─────────────────────────────────────────────────────────────
  if (screen === "questions") {
    const m = CAT_META[q.category];
    const catQs = QUESTIONS.filter((x) => x.category === q.category);
    const qInCat = catQs.indexOf(q) + 1;
    const labels = [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ];
    const scoreColors = ["#FF6B6B", "#FF9F4A", "#FFB830", "#7BC900", "#ADFF2F"];
    return (
      <div
        style={{
          minHeight: "100vh",
          background: dark,
          color: "#E8EDF5",
          fontFamily: "system-ui, sans-serif",
        }}
        ref={topRef}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: dark,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "12px 24px",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: m.accent,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {m.icon} {q.category}
              </span>
              <span style={{ fontSize: 11, color: "#3A4455" }}>
                {qIdx + 1} / {QUESTIONS.length}
              </span>
            </div>
            <div
              style={{
                height: 3,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "#ADFF2F",
                  transition: "width 0.4s ease",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "inline-block",
                background: m.glow,
                border: `1px solid ${m.border}`,
                borderRadius: 20,
                padding: "5px 14px",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: m.light,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {q.category} · {qInCat} of {catQs.length}
              </span>
            </div>
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#EDF2FA",
              margin: "0 0 48px",
              letterSpacing: -0.3,
            }}
          >
            {q.text}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#3A4455",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Strongly Disagree
            </span>
            <span
              style={{
                fontSize: 10,
                color: "#3A4455",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Strongly Agree
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 10,
              marginBottom: 52,
            }}
          >
            {[1, 2, 3, 4, 5].map((s) => {
              const isH = hover === s;
              const c = scoreColors[s - 1];
              return (
                <button
                  key={s}
                  onClick={() => answer(s)}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(null)}
                  title={labels[s - 1]}
                  style={{
                    padding: "18px 0",
                    background: isH ? `${c}18` : "rgba(255,255,255,0.03)",
                    border: isH
                      ? `1px solid ${c}60`
                      : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    transform: isH ? "translateY(-5px) scale(1.05)" : "none",
                    transition: "all 0.18s ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: isH ? c : "#4A5568",
                    }}
                  >
                    {s}
                  </span>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((d) => (
                      <div
                        key={d}
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background:
                            d <= s && isH ? c : d <= s ? "#2A3040" : "#141824",
                        }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ textAlign: "center", height: 18, marginBottom: 24 }}>
            {hover && (
              <span
                style={{
                  fontSize: 12,
                  color: scoreColors[hover - 1],
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {labels[hover - 1]}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {CATEGORIES.map((cat) => {
              const catAllQs = QUESTIONS.filter((x) => x.category === cat);
              const done = catAllQs.filter((x) => answers[x.id]).length;
              const isCur = cat === q.category;
              const cm = CAT_META[cat];
              return (
                <div key={cat} style={{ flex: 1 }}>
                  <div
                    style={{
                      height: 3,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.05)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(done / catAllQs.length) * 100}%`,
                        background: isCur ? "#ADFF2F" : cm.accent,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: isCur ? "#ADFF2F" : "#2A3040",
                      marginTop: 4,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.split(" ")[0]}
                  </div>
                </div>
              );
            })}
          </div>
          {qIdx > 0 && (
            <button
              onClick={() => setQIdx(qIdx - 1)}
              style={{
                background: "transparent",
                border: "none",
                color: "#3A4455",
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (screen === "results") {
    const scores = computeScores(answers);
    const overall = Math.round(
      Object.values(scores).reduce((a, b) => a + b, 0) / CATEGORIES.length
    );
    const sorted = [...CATEGORIES].sort((a, b) => scores[b] - scores[a]);
    const strengths = sorted.filter((c) => scores[c] >= 70);
    const gaps = sorted.filter((c) => scores[c] < 50);
    const dateStr = new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    function overallTag(pct) {
      if (pct >= 80) return { label: "Elite Mindset", color: "#ADFF2F" };
      if (pct >= 65) return { label: "Strong Foundation", color: "#5FD75F" };
      if (pct >= 50) return { label: "Building Athlete", color: "#FFB830" };
      return { label: "Growth Mindset Ahead", color: "#FF9F4A" };
    }

    const tag = overallTag(overall);

    return (
      <div
        className="results-wrap"
        style={{
          minHeight: "100vh",
          background: dark,
          color: "#E8EDF5",
          fontFamily: "system-ui, sans-serif",
        }}
        ref={topRef}
      >
        {/* ── PRINT-ONLY HEADER ── */}
        <div
          className="print-flex"
          style={{
            display: "none",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderBottom: "2px solid #111",
            paddingBottom: 14,
            marginBottom: 22,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#111",
                letterSpacing: -0.5,
              }}
            >
              NZO Sports Mindset
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#666",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginTop: 3,
              }}
            >
              Mental Skills Assessment Report
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>
              {name}
            </div>
            {sport && (
              <div
                style={{
                  fontSize: 11,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {sport}
              </div>
            )}
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
              {dateStr}
            </div>
          </div>
        </div>

        {/* ── PRINT-ONLY DISCLAIMER ── */}
        <div
          className="print-show"
          style={{
            display: "none",
            background: "#fffbe6",
            border: "1px solid #e8cc00",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: 11,
            color: "#555",
            lineHeight: 1.55,
          }}
        >
          <strong>For parents and coaches:</strong> These results reflect the
          athlete's self-reported mental skills at a single point in time.
          Scores on confidence and motivation may be elevated due to social
          desirability bias — common in competitive youth athletes. Use this
          report as a conversation starter alongside your own observations, not
          as a clinical diagnosis. NZO recommends reassessing every 6–8 weeks.
        </div>

        {/* ── SCREEN HEADER ── */}
        <div
          className="no-print"
          style={{ textAlign: "center", padding: "52px 24px 0" }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 4,
              color: "#ADFF2F",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            NZO Sports Mindset · Mental Profile
          </div>
          <h1
            style={{
              margin: "0 0 4px",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: -0.5,
              color: "#FFF",
            }}
          >
            {name ? name + "'s" : "Your"} Mental Profile
          </h1>
          {sport && (
            <div
              style={{
                fontSize: 12,
                color: "#3A4455",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              {sport}
            </div>
          )}
          <div style={{ color: "#3A4455", fontSize: 12, marginTop: 6 }}>
            {dateStr}
          </div>
        </div>

        <div
          className="results-inner"
          style={{ maxWidth: 680, margin: "0 auto", padding: "28px 24px 80px" }}
        >
          {/* ── PRINT BUTTON ── */}
          <div
            className="no-print"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 28,
            }}
          >
            <button
              onClick={() => window.print()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "12px 24px",
                background: "#ADFF2F",
                border: "none",
                borderRadius: 10,
                color: dark,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1.5,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Save PDF
            </button>
          </div>

          {/* ── OVERALL SCORE ── */}
          <div
            className="overall-card"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
              marginBottom: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at center, ${tag.color}08 0%, transparent 65%)`,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                className="overall-score"
                style={{
                  fontSize: 88,
                  fontWeight: 900,
                  color: tag.color,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {overall}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#4A5568",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Overall Mental Score / 100
              </div>
              <div
                className="overall-tag-wrap"
                style={{
                  display: "inline-block",
                  background: `${tag.color}18`,
                  border: `1px solid ${tag.color}40`,
                  borderRadius: 20,
                  padding: "6px 22px",
                }}
              >
                <span
                  className="overall-tag-text"
                  style={{
                    color: tag.color,
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {tag.label}
                </span>
              </div>
              <p
                className="overall-note"
                style={{
                  color: "#4A5568",
                  fontSize: 12,
                  marginTop: 18,
                  maxWidth: 420,
                  marginLeft: "auto",
                  marginRight: "auto",
                  lineHeight: 1.6,
                }}
              >
                This is a self-reported baseline — a starting point, not a
                verdict. Mental skills are highly trainable. Retest every 6–8
                weeks to track real progress.
              </p>
            </div>
          </div>

          {/* ── CATEGORY BARS ── */}
          <div
            className="breakdown-card"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: "28px 28px 24px",
              marginBottom: 24,
            }}
          >
            <h3
              className="section-label"
              style={{
                margin: "0 0 22px",
                fontSize: 10,
                letterSpacing: 3,
                color: "#4A5568",
                textTransform: "uppercase",
              }}
            >
              Category Breakdown
            </h3>
            {CATEGORIES.map((cat) => {
              const pct = scores[cat];
              const lv = getLevel(pct);
              const m = CAT_META[cat];
              return (
                <div key={cat} style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 7,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span style={{ color: m.accent, fontSize: 13 }}>
                        {m.icon}
                      </span>
                      <span
                        className="cat-label"
                        style={{ fontSize: 14, color: "#C8D4E5" }}
                      >
                        {cat}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <span
                        className="lv-label"
                        style={{
                          fontSize: 10,
                          color: lv.color,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        {lv.label}
                      </span>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: m.accent,
                          minWidth: 32,
                          textAlign: "right",
                        }}
                      >
                        {pct}
                      </span>
                    </div>
                  </div>
                  <div
                    className="bar-track"
                    style={{
                      height: 7,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="bar-fill"
                      style={{
                        height: "100%",
                        borderRadius: 4,
                        width: barsReady ? `${pct}%` : "0%",
                        background: m.accent,
                        transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── STRENGTHS & GAPS ── */}
          <div
            className="grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div
              className="str-box"
              style={{
                background: "rgba(95,215,95,0.05)",
                border: "1px solid rgba(95,215,95,0.15)",
                borderRadius: 16,
                padding: "22px 20px",
              }}
            >
              <div
                className="str-label"
                style={{
                  fontSize: 10,
                  letterSpacing: 2,
                  color: "#5FD75F",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                ↑ Strengths
              </div>
              {strengths.length > 0 ? (
                strengths.map((cat) => (
                  <div
                    key={cat}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 9,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#C8D4E5" }}>
                      {cat}
                    </span>
                    <span
                      className="str-val"
                      style={{
                        fontSize: 13,
                        color: "#5FD75F",
                        fontWeight: 700,
                      }}
                    >
                      {scores[cat]}%
                    </span>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    color: "#3A4455",
                    fontSize: 13,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Keep pushing — strengths are built through reps.
                </p>
              )}
            </div>
            <div
              className="gap-box"
              style={{
                background: "rgba(255,107,107,0.05)",
                border: "1px solid rgba(255,107,107,0.15)",
                borderRadius: 16,
                padding: "22px 20px",
              }}
            >
              <div
                className="gap-label"
                style={{
                  fontSize: 10,
                  letterSpacing: 2,
                  color: "#FF6B6B",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                ↓ Priority Areas
              </div>
              {gaps.length > 0 ? (
                gaps.map((cat) => (
                  <div
                    key={cat}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 9,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#C8D4E5" }}>
                      {cat}
                    </span>
                    <span
                      className="gap-val"
                      style={{
                        fontSize: 13,
                        color: "#FF6B6B",
                        fontWeight: 700,
                      }}
                    >
                      {scores[cat]}%
                    </span>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    color: "#3A4455",
                    fontSize: 13,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  No critical gaps — solid baseline across all areas.
                </p>
              )}
            </div>
          </div>

          {/* ── TRAINING PLAN ── */}
          <h2
            className="section-label"
            style={{
              fontSize: 12,
              letterSpacing: 3,
              color: "#4A5568",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Personalized Training Plan
          </h2>

          {sorted.map((cat) => {
            const pct = scores[cat];
            const m = CAT_META[cat];
            const lv = getLevel(pct);
            const recs = getRecs(cat, pct);
            return (
              <div
                key={cat}
                className="cat-card"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${m.border}`,
                  borderRadius: 16,
                  marginBottom: 14,
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span style={{ color: m.accent, fontSize: 16 }}>
                      {m.icon}
                    </span>
                    <span
                      className="cat-name"
                      style={{
                        fontSize: 15,
                        color: "#E8EDF5",
                        fontWeight: 700,
                      }}
                    >
                      {cat}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        background: lv.bg,
                        border: `1px solid ${lv.border}`,
                        borderRadius: 12,
                        padding: "3px 12px",
                      }}
                    >
                      <span
                        className="lv-label"
                        style={{
                          fontSize: 10,
                          color: lv.color,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        {lv.label}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: 15, fontWeight: 800, color: m.accent }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                {recs.map((r, i) => (
                  <div
                    key={i}
                    className="rec-block"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderLeft: `3px solid ${m.accent}`,
                      borderRadius: "0 10px 10px 0",
                      padding: "12px 16px",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      className="rec-title"
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: m.light,
                        marginBottom: 5,
                      }}
                    >
                      {r.t}
                    </div>
                    <div
                      className="rec-body"
                      style={{
                        fontSize: 13,
                        color: "#6A7A90",
                        lineHeight: 1.65,
                      }}
                    >
                      {r.d}
                    </div>
                  </div>
                ))}
                {recs.length > 1 && (
                  <div
                    className="rec-note"
                    style={{
                      fontSize: 11,
                      color: "#2A3040",
                      marginTop: 6,
                      fontStyle: "italic",
                    }}
                  >
                    Start with one. Consistency beats volume every time.
                  </div>
                )}
              </div>
            );
          })}

          {/* ── PRINT FOOTER ── */}
          <div
            className="print-show"
            style={{
              display: "none",
              marginTop: 32,
              paddingTop: 14,
              borderTop: "1px solid #ccc",
              fontSize: 10,
              color: "#999",
              textAlign: "center",
            }}
          >
            NZO Sports Mindset · Build the Mind Behind the Athlete · Certified
            Mental Performance Mastery Coach · Reassess every 6–8 weeks
          </div>

          {/* ── SCREEN FOOTER ── */}
          <div
            className="footer-screen"
            style={{
              textAlign: "center",
              marginTop: 52,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#2A3040",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              NZO Sports Mindset · Build the Mind Behind the Athlete
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => window.print()}
                style={{
                  padding: "13px 28px",
                  background: "#ADFF2F",
                  border: "none",
                  borderRadius: 10,
                  color: dark,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Print / Save PDF
              </button>
              <button
                onClick={restart}
                style={{
                  padding: "13px 28px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 10,
                  color: "#4A5568",
                  fontSize: 12,
                  cursor: "pointer",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Retake
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
