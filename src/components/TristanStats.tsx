import React, { useState, useEffect } from "react";
import { Award, Check, Search, ThumbsUp, HelpCircle, RefreshCw, Star, Info } from "lucide-react";
import { TristanQuality } from "../types";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_QUALITIES: TristanQuality[] = [
  { id: "q-1", title: "Slay Factor & Confidence", description: "Taking up space, serving gorgeous looks, and radiating confidence everywhere.", votes: 42, iconName: "✨", color: "from-pink-500 to-rose-500" },
  { id: "q-2", title: "Humor, Wit & Banter", description: "Instantly lifting the vibe with legendary comebacks and hilarious observations.", votes: 31, iconName: "👑", color: "from-amber-400 to-orange-500" },
  { id: "q-3", title: "Chosen Family Support", description: "The ultimate bestie who stands up for friends and is always there to listen.", votes: 29, iconName: "💖", color: "from-purple-500 to-indigo-600" },
  { id: "q-4", title: "Vibe & Playlist Selection", description: "Bringing unmatched playlist curatorships, dance floor magnetism, and pure energy.", votes: 24, iconName: "🔥", color: "from-teal-400 to-emerald-600" }
];

const TRIVIA_QUESTIONS = [
  {
    question: "When and where did the modern LGBTQ+ Pride liberation movement begin?",
    options: [
      "The Stonewall Riots in Greenwich Village, NY (1969)",
      "The March on Washington (1963)",
      "The San Francisco Castro District Rally (1974)",
      "Paris Freedom Parade (1981)"
    ],
    answerIdx: 0,
    explanation: "The Stonewall Riots of late June 1969 are widely regarded as the catalyst for the modern LGBTQ+ rights movement, inspiring Pride Parades every June!"
  },
  {
    question: "Who designed the iconic Rainbow Pride Flag first flown in 1978?",
    options: [
      "Harvey Milk",
      "Gilbert Baker",
      "Marsha P. Johnson",
      "Sylvia Rivera"
    ],
    answerIdx: 1,
    explanation: "Gilbert Baker designed the original rainbow flag in 1978 in San Francisco as a symbol of hope and pride for the LGBTQ+ community."
  },
  {
    question: "What do the stripes on the Progress Pride Flag (designed by Daniel Quasar in 2018) represent?",
    options: [
      "The original rainbow plus trans identity, BIPOC communities, and those living with HIV/AIDS",
      "Different decades of pride history",
      "The global partner countries of LGBTQ+ solidarity",
      "Just aesthetic pastel decorations"
    ],
    answerIdx: 0,
    explanation: "The Progress Pride flag includes chevron stripes representing transgender individuals, marginalized communities of color, and individuals fighting HIV/AIDS."
  }
];

const PRIDE_FLAGS = [
  { name: "Rainbow Flag", colors: "bg-gradient-to-r from-red-500 via-yellow-400 to-purple-600", meaning: "Life, Healing, Sunlight, Nature, Serenity, Spirit" },
  { name: "Progress Pride Flag", colors: "bg-gradient-to-r from-teal-400 via-pink-300 to-indigo-500", meaning: "Inclusion of BIPOC & transgender communities" },
  { name: "Transgender flag", colors: "bg-gradient-to-r from-blue-300 via-pink-200 via-white via-pink-200 to-blue-300", meaning: "Traditional baby colors representing transitions" },
  { name: "Bisexual flag", colors: "bg-gradient-to-r from-pink-500 via-indigo-600 to-blue-500", meaning: "Attraction to same sex, opposite sex, or multiple genders" }
];

export default function TristanStats() {
  const [qualities, setQualities] = useState<TristanQuality[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [votedIds, setVotedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tristan_pride_qualities");
    if (saved) {
      try {
        setQualities(JSON.parse(saved));
      } catch (err) {
        setQualities(INITIAL_QUALITIES);
      }
    } else {
      setQualities(INITIAL_QUALITIES);
      localStorage.setItem("tristan_pride_qualities", JSON.stringify(INITIAL_QUALITIES));
    }
  }, []);

  const voteQuality = (id: string) => {
    if (votedIds.includes(id)) return; // Allow voting once per session to keep integrity fun!
    
    const updated = qualities.map((q) => {
      if (q.id === id) {
        return { ...q, votes: q.votes + 1 };
      }
      return q;
    });

    setQualities(updated);
    setVotedIds([...votedIds, id]);
    localStorage.setItem("tristan_pride_qualities", JSON.stringify(updated));
  };

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
  };

  const resetTrivia = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setActiveQuestion((prev) => (prev + 1) % TRIVIA_QUESTIONS.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Qualities card section */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="p-1.5 bg-yellow-100 text-yellow-700 rounded-lg">
              <Award size={18} />
            </span>
            <h3 className="font-display font-extrabold text-xl text-slate-800">
              Tristan's Superpower Radar 📈
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tap the button to boost Tristan's official superpower stats. Let's see which quality gets the crown!
          </p>
        </div>

        <div className="space-y-4">
          {qualities.map((quality) => {
            const hasVoted = votedIds.includes(quality.id);
            return (
              <div
                key={quality.id}
                className="p-4 rounded-2xl border border-slate-100 hover:border-pink-200 bg-slate-50/50 hover:bg-white transition-all duration-300 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span className="text-2xl pt-0.5">{quality.iconName}</span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-800">
                        {quality.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-sans">
                        {quality.description}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => voteQuality(quality.id)}
                    disabled={hasVoted}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer ${
                      hasVoted
                        ? "bg-emerald-500 text-white cursor-default"
                        : "bg-white hover:bg-pink-50 border border-slate-200 text-slate-700 hover:text-pink-600 active:scale-95"
                    }`}
                  >
                    {hasVoted ? <Check size={12} /> : <ThumbsUp size={12} />}
                    {hasVoted ? "Voted!" : "Boost"}
                  </button>
                </div>

                {/* Progress bar container */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${quality.color} transition-all duration-500 ease-out`}
                      style={{
                        width: `${Math.min(100, Math.max(15, (quality.votes / 75) * 100))}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">
                    <span>Power Rank</span>
                    <span className="text-slate-600">{quality.votes} Points</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pride Month Trivia & Flags guide */}
      <div className="space-y-6">
        {/* Trivia container */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl space-y-5">
          <div className="flex items-center gap-1.5">
            <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <HelpCircle size={18} />
            </span>
            <h3 className="font-display font-extrabold text-xl text-slate-800">
              Pride Month Trivia Quest 🧠
            </h3>
          </div>

          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 space-y-3">
            <span className="text-[10px] bg-indigo-100 text-indigo-700 font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Question {activeQuestion + 1} of {TRIVIA_QUESTIONS.length}
            </span>
            <p className="font-display font-semibold text-slate-800 text-sm leading-relaxed">
              {TRIVIA_QUESTIONS[activeQuestion].question}
            </p>
          </div>

          {/* Options list */}
          <div className="grid grid-cols-1 gap-2.5">
            {TRIVIA_QUESTIONS[activeQuestion].options.map((option, idx) => {
              const isCorrect = idx === TRIVIA_QUESTIONS[activeQuestion].answerIdx;
              const isSelected = selectedAnswer === idx;
              
              let btnClass = "bg-slate-50/50 border-slate-150 hover:bg-slate-50 text-slate-700 hover:border-slate-350";
              if (showExplanation) {
                if (isCorrect) {
                  btnClass = "bg-emerald-500/10 border-emerald-400 text-emerald-950 font-semibold";
                } else if (isSelected) {
                  btnClass = "bg-red-500/10 border-red-400 text-red-950";
                } else {
                  btnClass = "opacity-40 bg-slate-50 border-slate-150 text-slate-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showExplanation && handleAnswer(idx)}
                  disabled={showExplanation}
                  className={`p-3 rounded-xl border text-xs text-left transition-all ${btnClass} ${!showExplanation && "cursor-pointer active:scale-[0.99]"}`}
                >
                  <div className="flex items-center gap-2">
                    {showExplanation && isCorrect && <span className="text-emerald-600 font-bold">✓</span>}
                    {showExplanation && isSelected && !isCorrect && <span className="text-red-600 font-bold">✗</span>}
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-sans space-y-3"
              >
                <div className="flex items-center gap-1 h-3 font-semibold text-slate-850">
                  <Info size={11} className="text-indigo-500" /> Did You Know?
                </div>
                <p>
                  {TRIVIA_QUESTIONS[activeQuestion].explanation}
                </p>
                <button
                  onClick={resetTrivia}
                  className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw size={11} /> Next Question
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Flag Meaning Quick Guide */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl space-y-4">
          <h4 className="font-display font-extrabold text-sm text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            📍 Pride Flags Meaning Quick Guide
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRIDE_FLAGS.map((flag) => (
              <div key={flag.name} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-4 rounded-sm ${flag.colors}`} />
                  <span className="font-semibold text-xs text-slate-800 leading-none">{flag.name}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">{flag.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
