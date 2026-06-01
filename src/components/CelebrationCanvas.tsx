import React, { useRef, useEffect, useState } from "react";
import { Sparkles, Play, Music, Volume2, HelpCircle } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  gravity: number;
}

const PRIDE_COLORS = [
  "#FF0018", // Red
  "#FFA52C", // Orange
  "#FFEE00", // Yellow
  "#008018", // Green
  "#0000F9", // Blue
  "#86007D", // Violet
  "#FF69B4"  // Pink
];

export default function CelebrationCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  
  // Audio state
  const [volume, setVolume] = useState(0.3);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
      return ctx;
    }
    return audioContext;
  };

  // Canvas particle logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ResizeObserver ensures correct sizing without pixelation/stretching
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    });

    resizeObserver.observe(container);

    // Particle render loop
    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        // Sparkle glow trail
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const createExplosion = (x: number, y: number) => {
    const particleCount = 45 + Math.floor(Math.random() * 25);
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 6_000_000_000_000 * 0.000000000001; // Scale speed nicely: 1.5 to 7.5
      // Distribute pride colors
      const color = PRIDE_COLORS[Math.floor(Math.random() * PRIDE_COLORS.length)];

      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * (1.5 + Math.random() * 5),
        vy: Math.sin(angle) * (1.5 + Math.random() * 5) - 1.5, // slightly upward force
        color,
        size: 2.5 + Math.random() * 4,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.015,
        gravity: 0.08
      });
    }

    particlesRef.current.push(...newParticles);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createExplosion(x, y);
    playSynthBeep("sparkle");
  };

  // Synthesize beautiful sounds natively using the Web Audio API!
  const playSynthBeep = (type: "sparkle" | "clap" | "chords") => {
    const ctx = initAudio();
    if (!ctx) return;

    // Resume audio context if suspended (browser security policy)
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const destination = ctx.destination;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gainNode.connect(destination);

    if (type === "sparkle") {
      // Arpeggiated sparkle synth notes cascade
      const baseFreq = 440 + Math.random() * 320;
      const notes = [1, 1.25, 1.5, 1.875, 2]; // Major scale multiplier

      notes.forEach((mult, index) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq * mult, ctx.currentTime + index * 0.06);
        
        noteGain.gain.setValueAtTime(0, ctx.currentTime + index * 0.06);
        noteGain.gain.linearRampToValueAtTime(volume * 0.6, ctx.currentTime + index * 0.06 + 0.01);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.06 + 0.25);
        
        osc.connect(noteGain);
        noteGain.connect(destination);
        
        osc.start(ctx.currentTime + index * 0.06);
        osc.stop(ctx.currentTime + index * 0.06 + 0.3);
      });
    } 
    else if (type === "clap") {
      // White noise happy clap/synth snare sound
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      
      // Bandpass filter to make noise sound punchy and retro
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);
      
      const clapGain = ctx.createGain();
      clapGain.gain.setValueAtTime(volume, ctx.currentTime);
      clapGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      
      noiseNode.connect(filter);
      filter.connect(clapGain);
      clapGain.connect(destination);
      
      noiseNode.start();
      noiseNode.stop(ctx.currentTime + 0.2);
    } 
    else if (type === "chords") {
      // Uplifting multi-osc pride chord celebration
      const notes = [261.63, 329.63, 392.00, 523.25]; // C major triad chord
      const duration = 0.5;

      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const chordGain = ctx.createGain();
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);
        
        chordGain.gain.setValueAtTime(0, ctx.currentTime);
        chordGain.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 0.05);
        chordGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        
        osc.connect(chordGain);
        chordGain.connect(destination);
        
        osc.start();
        osc.stop(ctx.currentTime + duration);
      });
    }
  };

  const triggerAutoFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const randX = 100 + Math.random() * (w - 200);
        const randY = 100 + Math.random() * (h - 200);
        createExplosion(randX, randY);
        playSynthBeep(i % 2 === 0 ? "sparkle" : "chords");
      }, i * 250);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-pink-100 text-pink-600 rounded-lg animate-bounce">
              <Sparkles size={16} />
            </span>
            <h2 className="font-display font-extrabold text-xl text-slate-800">
              Interactive Celebration Stage
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tap inside the velvet field below to shoot physics-based pride colored rainbow stars!
          </p>
        </div>

        {/* Preset synthesizer board */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Volume dial */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
            <Volume2 size={13} className="text-slate-400" />
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              title="Beep Volume"
            />
          </div>

          <button
            onClick={triggerAutoFireworks}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 hover:from-pink-600 to-purple-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
          >
            🎆 Launch Grand Gala
          </button>
        </div>
      </div>

      {/* Actual canvas container */}
      <div 
        ref={containerRef}
        className="relative h-[280px] w-full rounded-2xl bg-slate-900 overflow-hidden group shadow-inner border border-slate-950 backdrop-blur"
      >
        <span className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-md text-[10px] font-mono text-slate-300 px-2 py-1 rounded-md pointer-events-none tracking-widest uppercase">
          Taps registered: Multi-Blast
        </span>

        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-slate-500 pointer-events-none group-hover:opacity-0 transition-opacity duration-300 select-none">
          <Sparkles size={32} className="mx-auto mb-2 text-pink-500/40 animate-pulse" />
          <p className="text-sm font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Tap anywhere to ignite sparks
          </p>
          <p className="text-[10px] text-slate-600 italic">With synchronized synthesized beeps</p>
        </span>
        
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 w-full h-full cursor-pointer-celebrate z-10"
        />
      </div>

      {/* Custom noise synthesizer board */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-1">
          <Music size={13} className="text-pink-500" />
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Slay Sfx Synthesizer Soundboard
          </h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              createExplosion(100 + Math.random() * 400, 100);
              playSynthBeep("sparkle");
            }}
            className="p-3 bg-white hover:bg-pink-50 border border-slate-150 rounded-xl transition-all cursor-pointer shadow-sm text-left hover:border-pink-300"
          >
            <div className="font-bold text-xs text-slate-800 flex items-center gap-1">
              ⭐ Sparkle Synthesizer
            </div>
            <p className="text-[10px] text-slate-400 mt-1">High-pitched cascading scale synth</p>
          </button>

          <button
            onClick={() => {
              createExplosion(200 + Math.random() * 300, 150);
              playSynthBeep("chords");
            }}
            className="p-3 bg-white hover:bg-purple-50 border border-slate-150 rounded-xl transition-all cursor-pointer shadow-sm text-left hover:border-purple-300"
          >
            <div className="font-bold text-xs text-slate-800 flex items-center gap-1">
              🏳️‍🌈 Pride Chords Trio
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Uplifting triangle-wave harmonic triad</p>
          </button>

          <button
            onClick={() => {
              createExplosion(300 + Math.random() * 300, 200);
              playSynthBeep("clap");
            }}
            className="p-3 bg-white hover:bg-indigo-50 border border-slate-150 rounded-xl transition-all cursor-pointer shadow-sm text-left hover:border-indigo-300"
          >
            <div className="font-bold text-xs text-slate-800 flex items-center gap-1">
              👏 Retro Noise Clap
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Crispy white-noise audio handclap</p>
          </button>
        </div>
      </div>
    </div>
  );
}
