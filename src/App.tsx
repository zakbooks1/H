/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sparkles, 
  Heart, 
  Image as ImageIcon, 
  MessageSquare, 
  Flame, 
  Flag,
  Award,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PrideGallery from "./components/PrideGallery";
import MessageWall from "./components/MessageWall";
import CelebrationCanvas from "./components/CelebrationCanvas";
import TristanStats from "./components/TristanStats";
import TuffGuyZone from "./components/TuffGuyZone";

export default function App() {
  const [activeTab, setActiveTab] = useState<"gallery" | "messages" | "interactive" | "stats" | "tuff">("gallery");

  return (
    <div className="min-h-screen rainbow-active-bg flex flex-col justify-between font-sans selection:bg-pink-200 text-slate-800 transition-all duration-1000">
      
      {/* Pride Top Rainbow Ribbon Accent */}
      <div className="h-2 w-full bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-600 sticky top-0 z-50 shadow-sm" />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        
        {/* Glamour Hero Branding Block */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 bg-white border border-pink-100 shadow-sm rounded-full text-xs font-black uppercase tracking-widest text-pink-600 bg-gradient-to-r from-white to-pink-50/30"
          >
            <Sparkles size={13} className="text-pink-500 animate-spin" />
            Pride Month Tribute 2026
            <Sparkles size={13} className="text-purple-500 animate-bounce" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-5xl sm:text-7xl leading-tight inline-block bg-gradient-to-r from-red-500 via-pink-500 via-purple-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent transform hover:scale-[1.01] transition-transform duration-300"
          >
            Celebrating Tristan!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-slate-500 text-base sm:text-lg font-medium leading-relaxed"
          >
            A digital celebration space crafted exclusively for <strong>Tristan</strong> to honor his incredible friendship, confidence, pride, and unapologetic self during Pride Month. Add your favorite pictures, sound boards, and custom badges below! 🏳️‍🌈💅✨
          </motion.p>
        </div>

        {/* Extra Pride Slay Power interactive booster */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-600 rounded-3xl p-0.5 shadow-xl max-w-4xl mx-auto"
        >
          <div className="bg-white/95 rounded-[22px] p-6 text-center space-y-4">
            <h2 className="font-display font-black text-xl bg-gradient-to-r from-red-500 via-pink-500 via-purple-600 via-indigo-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              🏳️‍🌈 Tristan's Pride Slay Power Board! 🏳️‍🌈
            </h2>
            <p className="text-sm text-slate-600 font-medium max-w-xl mx-auto italic">
              "Never be bullied into silence. Never allow yourself to be made a victim. Accept no one's definition of your life; define yourself." — Harvey Milk 💖
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {[
                { text: "Love Is Love ♥️", style: "border-red-200 text-red-650 bg-red-50" },
                { text: "Slay All Day ✨", style: "border-orange-200 text-orange-650 bg-orange-50" },
                { text: "Stay Proud 👑", style: "border-yellow-300 text-yellow-800 bg-yellow-50" },
                { text: "Rainbow Power 🌈", style: "border-green-200 text-green-700 bg-green-50" },
                { text: "Iconic King 💅", style: "border-indigo-200 text-indigo-700 bg-indigo-50" },
                { text: "Unapologetically Me 🦄", style: "border-purple-200 text-purple-700 bg-purple-50" }
              ].map((pill, idx) => (
                <span
                  key={idx}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${pill.style} animate-bounce`}
                  style={{ animationDelay: `${idx * 0.12}s`, animationDuration: "2.8s" }}
                >
                  {pill.text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Controls Navigation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="inline-flex flex-wrap items-center bg-white/90 backdrop-blur-md border border-slate-100 p-1.5 rounded-2xl shadow-lg relative z-10 gap-1 justify-center max-w-full">
            {[
              { id: "gallery", label: "Slay Gallery", icon: ImageIcon, color: "text-pink-600", activeBg: "bg-pink-50 text-pink-700 border-pink-100" },
              { id: "messages", label: "Appreciation Wall", icon: MessageSquare, color: "text-purple-600", activeBg: "bg-purple-50 text-purple-700 border-purple-100" },
              { id: "interactive", label: "Celebration Stage", icon: Sparkles, color: "text-indigo-600", activeBg: "bg-indigo-50 text-indigo-700 border-indigo-100" },
              { id: "stats", label: "Traits & Trivia", icon: Award, color: "text-amber-500", activeBg: "bg-amber-50 text-amber-900 border-amber-100" },
              { id: "tuff", label: "Tuff Guy Zone 🦾", icon: Flame, color: "text-red-500", activeBg: "bg-red-50 text-red-900 border-red-100" }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive 
                      ? `${tab.activeBg} font-extrabold shadow-sm scale-102` 
                      : "text-slate-550 hover:bg-slate-50 hover:text-slate-900 border-transparent"
                  }`}
                >
                  <Icon size={15} className={tab.color} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Outer Visual Frame surrounding module for extra polish */}
        <div className="relative">
          {/* Subtle Decorative Background Circles */}
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Staggered Animated Content Window */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              {activeTab === "gallery" && <PrideGallery />}
              {activeTab === "messages" && <MessageWall />}
              {activeTab === "interactive" && <CelebrationCanvas />}
              {activeTab === "stats" && <TristanStats />}
              {activeTab === "tuff" && <TuffGuyZone />}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Pride Humility Elegant Footer */}
      <footer className="border-t border-slate-100 py-8 bg-white/70 backdrop-blur text-center space-y-3 relative z-10">
        <div className="inline-flex gap-2.5 justify-center items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-bounce" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" />
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
        </div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">
          Love Always Wins • Crafted with Pride for Tristan
        </p>
        <p className="text-[10px] text-slate-400">
          Make today spectacular. Support LGBTQ+ history and your beautiful chosen families! ♥️🏳️‍🌈
        </p>
        <div className="flex flex-col items-center justify-center space-y-1 mt-4 opacity-30 select-none pointer-events-none">
          <p className="font-sans text-slate-500 font-bold" style={{ fontSize: "16px" }}>it’s a joke</p>
          <p className="font-sans text-slate-400 font-medium" style={{ fontSize: "4px" }}>it’s a joke</p>
          <p className="font-sans text-slate-350" style={{ fontSize: "1px" }}>it’s a joke</p>
          <p className="font-sans text-slate-300 pointer-events-none select-none" style={{ fontSize: "0.25px" }}>it’s a joke</p>
        </div>
      </footer>
    </div>
  );
}
