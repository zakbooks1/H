import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Shield, HelpCircle, Sparkles, Star, Trophy, RefreshCw, Layers } from "lucide-react";

export default function TuffGuyZone() {
  // Swag accessories toggles
  const [hasGlasses, setHasGlasses] = useState(true);
  const [hasChain, setHasChain] = useState(false);
  const [hasCrown, setHasCrown] = useState(false);
  const [hasLasers, setHasLasers] = useState(false);
  const [hasIcedCoffee, setHasIcedCoffee] = useState(false);

  // Meter sliders state
  const [tuffness, setTuffness] = useState(85);
  const [classroomSlouch, setClassroomSlouch] = useState(70);
  const [unbotheredRating, setUnbotheredRating] = useState(99);

  // Sound play helper (using synthesized beeps!)
  const playSound = (freq: number, type: OscillatorType = "sine", duration: number = 0.2) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context block by browser is fine
    }
  };

  const getTuffStatus = (val: number) => {
    if (val < 40) return { title: "Mildly Unbothered", desc: "A respectable slouch, but needs more focus." };
    if (val < 70) return { title: "High-Class Rebel", desc: "Arms crossed. Intimidation aura is expanding." };
    if (val < 90) return { title: "Impenetrable Cinderblock Guard", desc: "Legends speak of this level of unbothered swagger." };
    return { title: "Cosmic GigaChad Overlord", desc: "Absolute perfection. Classmates are in awe. Homework does itself." };
  };

  const currentTuff = getTuffStatus(tuffness);

  return (
    <div className="space-y-12">
      {/* Hero Header Card */}
      <div className="bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-600 rounded-3xl p-0.5 shadow-xl">
        <div className="bg-white/95 rounded-[22px] p-6 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-wider">
            <Flame size={12} className="animate-pulse text-red-500" />
            Hall of Swagger
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl bg-gradient-to-r from-red-650 to-orange-650 bg-clip-text text-transparent">
            🦾 Tristan's Official Tuff Guy Zone!
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Based on the legendary classroom submission. Analyze Tristan's flawless recline posture, customize his swag accessories, and monitor his GigaChad state!
          </p>
        </div>
      </div>

      {/* Main Interactive Showcase Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Interactive SVG Avatar Re-creation of school photo) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-950 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-pink-500/10 via-slate-900 to-black/80 -z-10 pointer-events-none" />
          
          {/* Top Info Strip */}
          <div className="flex justify-between items-center bg-slate-800/60 backdrop-blur-md rounded-xl p-3 border border-slate-700/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-black">
                Subject profile: Tristan
              </p>
            </div>
            <p className="text-[10px] font-mono text-slate-400">
              POSE: RECLINED_CINDERBLOCK
            </p>
          </div>

          {/* Core SVG Workspace Canvas */}
          <div className="relative aspect-[4/3] w-full rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-800 p-4 shadow-inner flex items-center justify-center">
            
            {/* Cinderblock pattern lines background */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-20">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border border-slate-600 border-dashed" />
              ))}
            </div>

            {/* Glowing spotlight overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* HIGH-CRAFT SVG PORTRAIT COMPOSER */}
            <svg viewBox="0 0 400 300" className="w-full h-full max-h-[340px]" xmlns="http://www.w3.org/2000/svg">
              {/* Cinderblock wall backplate */}
              <rect x="0" y="0" width="400" height="300" fill="transparent" />
              
              {/* Classroom backpack on desk */}
              <g transform="translate(40, 160)">
                <rect x="0" y="0" width="100" height="70" rx="15" fill="#2d3748" stroke="#00b4d8" strokeWidth="2.5" />
                <rect x="15" y="-10" width="70" height="15" rx="5" fill="#4a5568" />
                <circle cx="50" cy="35" r="12" fill="#00b4d8" opacity="0.3" />
                <line x1="30" y1="35" x2="70" y2="35" stroke="#00b4d8" strokeWidth="4" />
                {/* Backpack badge */}
                <path d="M 45,28 L 55,28 L 50,42 Z" fill="#ff007f" />
                <text x="15" y="60" fill="#a0aec0" fontSize="8" fontFamily="monospace" fontWeight="bold">TUFF PACK</text>
              </g>

              {/* Scholar Chair frame */}
              <path d="M 120,150 L 110,250 M 110,250 L 80,290 M 170,180 L 180,290" stroke="#101827" strokeWidth="8" strokeLinecap="round" />
              <path d="M 105,140 Q 150,150 165,190" fill="none" stroke="#2b6cb0" strokeWidth="12" strokeLinecap="round" />

              {/* TRISTAN POSE BODY */}
              {/* Legs/pant (sweatpants) */}
              <path d="M 195,195 Q 260,195 290,260 L 250,290" fill="none" stroke="#718096" strokeWidth="26" strokeLinecap="round" />
              <path d="M 180,185 Q 220,165 260,240 L 220,290" fill="none" stroke="#4a5568" strokeWidth="22" strokeLinecap="round" />

              {/* School desk top cut-out */}
              <path d="M 10,210 L 160,210 L 160,295 L 10,295 Z" fill="#e2e8f0" stroke="#cbd5e0" strokeWidth="2" opacity="0.9" />
              <text x="35" y="250" fill="#718096" fontSize="11" fontFamily="sans-serif" fontWeight="900" opacity="0.4">DESK SHIELD</text>

              {/* Dark Hoodie Torso */}
              <rect x="130" y="100" width="75" height="95" rx="20" fill="#1a202c" stroke="#2d3748" strokeWidth="3" />
              
              {/* Crossed arms structure */}
              <g transform="translate(115, 115)">
                {/* Arm left */}
                <path d="M 15,25 Q 50,5 85,25" fill="none" stroke="#1a202c" strokeWidth="20" strokeLinecap="round" />
                {/* Arm right */}
                <path d="M 20,38 Q 50,48 80,38" fill="none" stroke="#2d3748" strokeWidth="18" strokeLinecap="round" />
                {/* Hands tucked */}
                <circle cx="50" cy="30" r="10" fill="#1a202c" opacity="0.9" />
                <circle cx="50" cy="30" r="6" fill="#e2e8f0" opacity="0.1" />
              </g>

              {/* Neck and realistic face contour */}
              <rect x="155" y="80" width="22" height="25" fill="#fbd38d" rx="5" />
              
              {/* Tristan curly/wavy brown hair background bundle */}
              <circle cx="150" cy="72" r="18" fill="#4a3728" />
              <circle cx="182" cy="72" r="18" fill="#4a3728" />
              <circle cx="166" cy="55" r="16" fill="#4a3728" />

              {/* Face sphere */}
              <circle cx="166" cy="72" r="17" fill="#fbd38d" />

              {/* Tristan wavy head features */}
              <path d="M 150,62 Q 166,50 182,62" fill="none" stroke="#4a3728" strokeWidth="5" />
              <circle cx="151" cy="72" r="8" fill="#4a3728" />
              <circle cx="181" cy="72" r="8" fill="#4a3728" />

              {/* Eyes looking unbothered (half-shut sleek eyelids) */}
              <line x1="158" y1="71" x2="163" y2="71" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="169" y1="71" x2="174" y2="71" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" />
              {/* Brows */}
              <line x1="156" y1="67" x2="164" y2="66" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
              <line x1="168" y1="66" x2="176" y2="67" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
              
              {/* Smug / Skeptical smile contour */}
              <path d="M 160,82 Q 166,84 172,82" fill="none" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" />

              {/* ACCESSORIES - ANIMATED OVERLAYS */}
              {/* Chain overlay */}
              {hasChain && (
                <path d="M 153,96 Q 166,112 179,96" fill="none" stroke="#d69e2e" strokeWidth="4.5" strokeDasharray="3,1" className="animate-pulse" />
              )}

              {/* Glasses overlay */}
              {hasGlasses && (
                <g>
                  {/* Thug glasses */}
                  <rect x="154" y="68" width="11" height="6" fill="#000" rx="1" />
                  <rect x="167" y="68" width="11" height="6" fill="#000" rx="1" />
                  <line x1="164" y1="70" x2="168" y2="70" stroke="#000" strokeWidth="2" />
                  <line x1="151" y1="70" x2="155" y2="70" stroke="#000" strokeWidth="1.5" />
                  <line x1="177" y1="70" x2="181" y2="70" stroke="#000" strokeWidth="1.5" />
                </g>
              )}

              {/* Crown overlay */}
              {hasCrown && (
                <polygon points="152,50 157,36 166,45 175,36 180,50" fill="#ecc94b" stroke="#744210" strokeWidth="1" />
              )}

              {/* Laser eyes overlay */}
              {hasLasers && (
                <g>
                  <line x1="160" y1="71" x2="0" y2="40" stroke="#f56565" strokeWidth="3" opacity="0.9" strokeLinecap="round" className="animate-pulse" />
                  <line x1="171" y1="71" x2="0" y2="40" stroke="#f56565" strokeWidth="3" opacity="0.9" strokeLinecap="round" className="animate-pulse" />
                  <circle cx="160" cy="71" r="5" fill="#fff" />
                  <circle cx="171" cy="71" r="5" fill="#fff" />
                </g>
              )}

              {/* Iced Coffee overlay */}
              {hasIcedCoffee && (
                <g transform="translate(230, 115)">
                  <rect x="0" y="0" width="20" height="30" rx="3" fill="#cbd5e0" opacity="0.7" />
                  <path d="M 0,0 L 20,0 L 16,30 L 4,30 Z" fill="#ed8936" />
                  <line x1="10" y1="5" x2="15" y2="-12" stroke="#e53e3e" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="10" cy="15" r="5" fill="#fff" opacity="0.4" />
                </g>
              )}
            </svg>

            {/* Pointers to funny aspects of the original classroom image */}
            <div className="absolute left-4 top-8 bg-slate-900/90 border border-slate-700/50 p-2 rounded-xl text-[10px] space-y-0.5 max-w-[130px] hidden md:block">
              <span className="font-bold text-pink-400 block">🪨 Cinderblock Base</span>
              <p className="text-slate-350 leading-snug">The primal school wall of absolute zero emotion.</p>
            </div>

            <div className="absolute right-4 bottom-8 bg-slate-900/90 border border-slate-700/50 p-2 rounded-xl text-[10px] space-y-0.5 max-w-[140px] hidden md:block">
              <span className="font-bold text-yellow-400 block">🦾 Crossed-Arm Armor</span>
              <p className="text-slate-350 leading-snug">Saves energy so he can slay hard right after class.</p>
            </div>
          </div>

          {/* Footer Swagger Badge */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block">Current Swagger Rank</span>
              <span className="text-base font-extrabold text-white">{currentTuff.title}</span>
            </div>
            <div className="px-3.5 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-mono text-xs font-black rounded-lg">
              {tuffness}% POWER
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-sans italic text-center text-slate-500">
            "{currentTuff.desc}"
          </div>
        </div>

        {/* Right Column (Controls/Swag customizer & meter sliders) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Swag Customiser accessories panel */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl space-y-4">
            <h3 className="font-display font-extrabold text-lg text-slate-800 flex items-center gap-1.5">
              👑 Tristan's Swag Customizer
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Toggle special overlay items on Tristan's pose above to amplify his raw classroom swagger!
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "🕶️ Thug Glasses", active: hasGlasses, toggle: () => { setHasGlasses(!hasGlasses); playSound(440, "sine"); } },
                { label: "🔗 Giga Gold Chain", active: hasChain, toggle: () => { setHasChain(!hasChain); playSound(554, "triangle"); } },
                { label: "👑 Slay Crown", active: hasCrown, toggle: () => { setHasCrown(!hasCrown); playSound(659, "triangle"); } },
                { label: "🔥 Laser Eyes", active: hasLasers, toggle: () => { setHasLasers(!hasLasers); playSound(880, "sawtooth", 0.3); } },
                { label: "🥤 Boba Coffee", active: hasIcedCoffee, toggle: () => { setHasIcedCoffee(!hasIcedCoffee); playSound(349, "sine"); } }
              ].map((swag, idx) => (
                <button
                  key={idx}
                  onClick={swag.toggle}
                  className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border flex items-center justify-between cursor-pointer ${
                    swag.active
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <span>{swag.label}</span>
                  <span className={`w-2 h-2 rounded-full ${swag.active ? "bg-white animate-ping" : "bg-slate-300"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Posture diagnostics slider board */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl space-y-6">
            <h3 className="font-display font-extrabold text-lg text-slate-800 flex items-center gap-1.5">
              📏 Swagger Metrics Lab
            </h3>

            <div className="space-y-4">
              {/* Slouch rating */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Recline Slouch Angle</span>
                  <span className="text-pink-600">{classroomSlouch}° (Extreme)</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="120"
                  value={classroomSlouch}
                  onChange={(e) => {
                    setClassroomSlouch(parseInt(e.target.value));
                    // Calculate based on slouch
                    setUnbotheredRating(Math.min(99, Math.floor(parseInt(e.target.value) * 1.1)));
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <span className="text-[10px] text-slate-400 block font-sans">
                  The posture of true royalty. Standard chairs buckle under this caliber.
                </span>
              </div>

              {/* Tuffness level */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Primal Tuffness Multiplier</span>
                  <span className="text-purple-600">{tuffness}% Max</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={tuffness}
                  onChange={(e) => {
                    setTuffness(parseInt(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-[10px] text-slate-400 block font-sans">
                  Controls GigaChad particle level & visual unbotheredness status.
                </span>
              </div>

              {/* Unbothered output metrics */}
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-150 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-purple-950 uppercase tracking-widest">Unbothered Index</span>
                  <span className="px-2 py-0.5 bg-purple-200 text-purple-800 font-mono text-[10px] font-black rounded-full">IMPERVIOUS</span>
                </div>
                <p className="text-2xl font-black text-purple-700 font-mono">
                  {unbotheredRating}.4% RATING
                </p>
                <div className="text-[10px] text-slate-550 leading-relaxed font-sans">
                  Tristan's defense shield is actively protecting this classroom block from standard boring lectures and low energy vibes. Status is green.
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic quick action badges */}
          <div className="p-4 bg-slate-900 text-white rounded-3xl border border-slate-950 shadow-inner flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-1.5 font-sans"><Trophy size={14} className="text-yellow-400" /> Tuff Award 2026</span>
            <button
              onClick={() => {
                setHasGlasses(true);
                setHasChain(true);
                setHasCrown(true);
                setHasIcedCoffee(true);
                setTuffness(98);
                setClassroomSlouch(115);
                setUnbotheredRating(99);
                playSound(523, "sine", 0.05);
                setTimeout(() => playSound(659, "sine", 0.05), 100);
                setTimeout(() => playSound(783, "sine", 0.05), 200);
                setTimeout(() => playSound(1046, "sine", 0.3), 300);
              }}
              className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-slate-950 uppercase font-black tracking-widest text-[10px] rounded-lg shadow cursor-pointer transition-transform active:translate-y-0.5"
            >
              Activate Boss Mode
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
