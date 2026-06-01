import React, { useState, useEffect } from "react";
import { MessageSquarePlus, Sparkles, Send, Gift, Stars, ShieldAlert, Heart } from "lucide-react";
import { CelebrationWish } from "../types";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_WISHES: CelebrationWish[] = [
  {
    id: "wish-1",
    sender: "Alex & Jordan",
    message: "Tristan, you are an absolute star! Watching you stay true to yourself is the most inspiring thing ever. Happy Pride Month! Slay all day! 🏳️‍🌈⚡✨",
    badge: { emoji: "👑", text: "Iconic King", color: "bg-amber-100 text-amber-800 border-amber-200" },
    bgColor: "from-purple-500/10 via-pink-500/10 to-transparent",
    dateAdded: "June 2026",
    isSparkly: true
  },
  {
    id: "wish-2",
    sender: "Taylor",
    message: "Happy Pride! Sending you so much love and support. You are one of the most generous, wonderful human beings I know. Keep lighting up every room you walk into!",
    badge: { emoji: "💖", text: "Purrfect Friend", color: "bg-pink-100 text-pink-800 border-pink-200" },
    bgColor: "from-blue-500/10 via-teal-500/10 to-transparent",
    dateAdded: "June 2026",
    isSparkly: false
  },
  {
    id: "wish-3",
    sender: "The Pride Fam",
    message: "Thank you for being such an beautiful part of our lives, Tristan. Happy Pride Month! Let your colors shine bright, today and every single day! 🌈🎉💖",
    badge: { emoji: "🦄", text: "Rainbow Unicorn", color: "bg-purple-100 text-purple-800 border-purple-200" },
    bgColor: "from-yellow-500/10 via-red-500/10 to-transparent",
    dateAdded: "June 2026",
    isSparkly: true
  }
];

const PRESET_MESSAGES = [
  "Tristan! You make the world a much brighter and happier place! 🏳️‍🌈✨",
  "Happy Pride Month to an absolute legend! Slay on, Tristan! 💖💅",
  "May your Pride be as iconic, sparkly, and bright as you are! 👑🦄",
  "Tristan, thank you for being unapologetically YOU. You're an inspiration! ♥️🌈",
  "So incredibly proud of you, buddy! Sending you endless warmth and love! 🥂🎉"
];

const BADGE_OPTIONS = [
  { emoji: "👑", text: "Iconic King", color: "bg-amber-150 text-amber-800 border-amber-200" },
  { emoji: "💖", text: "Golden Friend", color: "bg-pink-150 text-pink-800 border-pink-200" },
  { emoji: "🦄", text: "Rainbow Unicorn", color: "bg-purple-150 text-purple-800 border-purple-200" },
  { emoji: "💅", text: "Slay Master", color: "bg-indigo-150 text-indigo-800 border-indigo-200" },
  { emoji: "🔥", text: "Trendsetter", color: "bg-orange-150 text-orange-850 border-orange-200" },
  { emoji: "🥳", text: "Life of the Party", color: "bg-emerald-150 text-emerald-800 border-emerald-250" }
];

const CARD_THEMES = [
  { name: "Pink Sunset", bg: "from-pink-500/10 via-purple-500/10 to-transparent" },
  { name: "Ocean Breeze", bg: "from-blue-500/10 via-cyan-500/10 to-transparent" },
  { name: "Electric Emerald", bg: "from-emerald-500/10 via-teal-500/10 to-transparent" },
  { name: "Golden Glow", bg: "from-amber-400/10 via-orange-500/10 to-transparent" },
  { name: "Cosmic Lavender", bg: "from-indigo-500/10 via-purple-500/10 to-warm-pink-500/10" }
];

export default function MessageWall() {
  const [wishes, setWishes] = useState<CelebrationWish[]>([]);
  const [senderName, setSenderName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(BADGE_OPTIONS[0]);
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]);
  const [sparklyEnabled, setSparklyEnabled] = useState(true);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("tristan_pride_wishes");
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (err) {
        setWishes(INITIAL_WISHES);
      }
    } else {
      setWishes(INITIAL_WISHES);
      localStorage.setItem("tristan_pride_wishes", JSON.stringify(INITIAL_WISHES));
    }
  }, []);

  const saveWishes = (updated: CelebrationWish[]) => {
    setWishes(updated);
    localStorage.setItem("tristan_pride_wishes", JSON.stringify(updated));
  };

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newWish: CelebrationWish = {
      id: `wish-${Date.now()}`,
      sender: senderName.trim() || "Anonymous Supporter 🏳️‍🌈",
      message: messageText.trim(),
      badge: selectedBadge,
      bgColor: selectedTheme.bg,
      dateAdded: "June 2026",
      isSparkly: sparklyEnabled
    };

    const updated = [newWish, ...wishes];
    saveWishes(updated);
    setSenderName("");
    setMessageText("");
  };

  const deleteWish = (id: string) => {
    const filtered = wishes.filter((w) => w.id !== id);
    saveWishes(filtered);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Messages Submission Box */}
      <div className="lg:col-span-1 bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-xl space-y-6 h-fit sticky top-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-pink-100 rounded-xl text-pink-600">
            <MessageSquarePlus size={20} />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-slate-800">Leave a Message</h2>
            <p className="text-xs text-slate-500">Send custom pride vibes & awards</p>
          </div>
        </div>

        <form onSubmit={submitWish} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring focus:ring-pink-100 text-sm focus:outline-none transition-all placeholder:text-slate-400 text-slate-700 font-sans"
              placeholder="E.g. Jordan, Bestie, Classmate"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Your Greeting
              </label>
              <div className="text-[10px] text-pink-600 font-semibold flex items-center gap-1">
                <Stars size={10} /> select preset below if desired
              </div>
            </div>
            
            <textarea
              className="w-full h-28 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring focus:ring-pink-100 text-sm focus:outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none font-sans"
              placeholder="Type your personal tribute, funny stories, or congratulatory note celebrating Tristan..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              required
            />

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2 h-[65px] overflow-y-auto pr-1">
              {PRESET_MESSAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessageText(preset)}
                  className="text-[10px] bg-slate-50 hover:bg-pink-50 border border-slate-100 text-slate-600 hover:text-pink-700 font-semibold px-2.5 py-1 rounded-lg transition-colors text-left"
                >
                  Preset {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Choose Tristan's Super Badge
            </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
              {BADGE_OPTIONS.map((badgeOption) => (
                <button
                  key={badgeOption.text}
                  type="button"
                  onClick={() => setSelectedBadge(badgeOption)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                    selectedBadge.text === badgeOption.text
                      ? "ring-2 ring-pink-500 bg-pink-50 border-pink-300 text-pink-900"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650"
                  }`}
                >
                  <span className="text-sm">{badgeOption.emoji}</span>
                  <span className="truncate">{badgeOption.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Card Colors Palette
            </label>
            <div className="flex flex-wrap gap-2">
              {CARD_THEMES.map((theme) => (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                    selectedTheme.name === theme.name
                      ? "ring-2 ring-indigo-500 scale-105"
                      : "hover:scale-102"
                  }`}
                  style={{
                    background: `linear-gradient(to right, rgb(255 255 255), rgb(248 250 252))`
                  }}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-tr ${theme.bg.replace('/10', '/30')}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Sparkles size={13} className="text-amber-500" /> Apply Sparkle Border
            </span>
            <input
              type="checkbox"
              checked={sparklyEnabled}
              onChange={(e) => setSparklyEnabled(e.target.checked)}
              className="w-4 h-4 accent-pink-500 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <Send size={16} /> Send Pride Message
          </button>
        </form>
      </div>

      {/* Grid displays messages */}
      <div className="lg:col-span-2 space-y-6">
        <div className="border-b border-pink-100 pb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-2xl text-slate-800">
              Interactive Wishes Wall
            </h3>
            <p className="text-xs text-slate-500">Live wall showcasing customized messages and badges</p>
          </div>
          <div className="px-3 py-1 bg-pink-100 text-pink-700 font-bold rounded-full text-xs flex items-center gap-1">
            <Gift size={12} /> {wishes.length} Letters
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className={`p-6 rounded-3xl bg-white border relative shadow flex flex-col justify-between min-h-[190px] overflow-hidden ${
                  wish.isSparkly ? "border-pink-300 rainbow-glow" : "border-slate-100"
                }`}
              >
                {/* Visual Ribbon Corner background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${wish.bgColor} opacity-60 pointer-events-none -z-0`} />

                <div className="relative z-10 space-y-3 flex-1 flex flex-col justify-between">
                  {/* Top Bar with Badge and sparkles */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider flex items-center gap-1.5 ${wish.badge.color}`}>
                      <span>{wish.badge.emoji}</span>
                      <span>{wish.badge.text}</span>
                    </span>

                    {wish.isSparkly && (
                      <Stars size={16} className="text-amber-500 animate-bounce" />
                    )}
                  </div>

                  {/* Context of the greeting */}
                  <p className="text-slate-700 text-sm leading-relaxed font-sans flex-1">
                    "{wish.message}"
                  </p>

                  {/* Sender details and delete button */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs rounded-full">
                        {wish.sender.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800 leading-none">{wish.sender}</p>
                        <p className="text-[9px] text-slate-400 font-semibold">{wish.dateAdded}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteWish(wish.id)}
                      className="p-1 px-2 border border-slate-100 rounded-lg hover:bg-slate-100 text-[10px] font-bold text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {wishes.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Heart size={44} className="text-pink-300 mx-auto mb-2 animate-pulse" />
            <p className="text-slate-600 font-semibold">The Wall is quiet.</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
              Be the first to leave a sparkly note or honorary award for Tristan!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
