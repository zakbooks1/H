import React, { useState, useEffect } from "react";
import { Camera, Trash2, Plus, Image as ImageIcon, Heart, Compass, Sparkles, Flame, Eye, Star } from "lucide-react";
import { GalleryPhoto } from "../types";
import { motion, AnimatePresence } from "motion/react";

// Use the dynamically generated pride illustration asset
const DEFAULT_PRIDE_ILLUSTRATION = "/src/assets/images/pride_illustration_1780317324384.png";

const PRELOADED_PHOTOS: GalleryPhoto[] = [
  {
    id: "featured-tuff-guy",
    url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan reclining like absolute royalty against the gray cinderblock classroom wall with total unbothered posture. 🦾📚🕶️",
    dateAdded: "June 2026",
    tags: ["Tuff Guy 🦾", "Classroom Legend", "Unbothered Boss"]
  },
  {
    id: "preloaded-gigachad",
    url: "https://i.imgflip.com/2v3gmg.jpg",
    caption: "Tristan walking into any room knowing he's the absolute blueprint of perfection and GigaChad confidence. 👑💅✨",
    dateAdded: "June 2026",
    tags: ["GigaChad", "Certified Slay", "Pride ✨"]
  },
  {
    id: "preloaded-tutu",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan embarking on his Arctic Slay Expedition in a gorgeous yellow bumblebee tutu and custom safety goggles! 🐝❄️",
    dateAdded: "June 2026",
    tags: ["Arctic Explorer", "Iconic", "Fabulous"]
  },
  {
    id: "preloaded-stickman",
    url: "https://images.unsplash.com/photo-1544045560-7297be64d718?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan keeping the bad vibes away with his legendary wooden Slay Bat. Speak softly and carry a big stick! 🪵💪",
    dateAdded: "June 2026",
    tags: ["Vibe Defender", "Legendary"]
  },
  {
    id: "preloaded-chin",
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan's face when someone says they don't love Pride Month. Unmatched chin and jawline confidence! 😤💎",
    dateAdded: "June 2026",
    tags: ["Jawline God", "Fabulous"]
  },
  {
    id: "preloaded-dino",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nigersaurus_r6.jpg/480px-Nigersaurus_r6.jpg",
    caption: "Tristan (Nigersaurus edition) hyping up the crowd at the absolute front of the local Pride Parade. Loud and proud! 🦖📢🌈",
    dateAdded: "June 2026",
    tags: ["Nigersaurus", "Pride Parade", "Slay"]
  },
  {
    id: "preloaded-spongebob",
    url: "https://i.imgflip.com/39tb80.jpg",
    caption: "Tristan explaining the exhaustive 500-page history of why he is the most iconic best friend in the group. 🤓📚",
    dateAdded: "June 2026",
    tags: ["Intellectual", "Legendary"]
  },
  {
    id: "preloaded-minion",
    url: "https://images.unsplash.com/photo-1603575448878-868a20723f5d?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan trying to look corporate and professional at his 9-to-5 job while secretly planning his next pride outfit. 👔💼",
    dateAdded: "June 2026",
    tags: ["Chosen Family", "Minion Core"]
  },
  {
    id: "preloaded-obama",
    url: "https://i.imgflip.com/2/vpx5.jpg",
    caption: "Tristan's skeptical look when the DJ plays a terrible EDM remix of a classic Lady Gaga anthem. 🤨🎶",
    dateAdded: "June 2026",
    tags: ["Skeptical King", "Iconic"]
  },
  {
    id: "preloaded-duck",
    url: "https://images.unsplash.com/photo-1555848962-6e79363ec18f?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan when the local iced coffee machine is out of order during a heatwave. Do not test him! 😡☕",
    dateAdded: "June 2026",
    tags: ["Angry Duck", "Slay"]
  },
  {
    id: "preloaded-lebron",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan's average post-parade recovery feast with 4 double cheeseburgers, standard fries, and massive sodas. 🍔🥤",
    dateAdded: "June 2026",
    tags: ["Feast Mode", "Legendary"]
  },
  {
    id: "preloaded-owl",
    url: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80",
    caption: "Tristan waking up at 2:00 PM the afternoon after the grand pride nightclub gala. Wet, shocked, but victorious! 🦉💤",
    dateAdded: "June 2026",
    tags: ["Sunday Morning", "Fabulous"]
  }
];

const MEME_TEXTS: Record<string, { top: string; bottom: string }> = {
  "featured-tuff-guy": { top: "Absolute Regal Reclining", bottom: "Tuff Classroom Posture" },
  "preloaded-gigachad": { top: "Slay Blueprint", bottom: "GigaChad Perfection" },
  "preloaded-tutu": { top: "Polar Slay Explorer", bottom: "Yellow Tutu Expedition" },
  "preloaded-stickman": { top: "Defending the Vibe", bottom: "Strategic Slay Bat Action" },
  "preloaded-chin": { top: "Did someone say...", bottom: "They don't support Pride?!" },
  "preloaded-dino": { top: "Loud And Proud", bottom: "🦖 Nigersaurus Edition 🦖" },
  "preloaded-spongebob": { top: "Me explaining why...", bottom: "Tristan is a living legend" },
  "preloaded-minion": { top: "Corporate Minion by day", bottom: "Rainbow Slay Queen by night" },
  "preloaded-obama": { top: "Hearing terrible remix...", bottom: "Of classic Lady Gaga song" },
  "preloaded-duck": { top: "Iced Coffee Out", bottom: "DO NOT TEST ME TODAY" },
  "preloaded-lebron": { top: "Post-Parade Recovery", bottom: "4 Double Cheeseburger Feast" },
  "preloaded-owl": { top: "Sunday at 2:00 PM", bottom: "Waking up wet and victorious" }
};

const getAutoMemeText = (id: string, caption: string) => {
  if (MEME_TEXTS[id]) return MEME_TEXTS[id];
  
  // Clean up e.g. outer quotes
  const cleaned = caption.trim().replace(/^["']|["']$/g, '');
  const words = cleaned.split(/\s+/);
  if (words.length <= 3) {
    return { top: "SLAY INTENSIFIES", bottom: cleaned.toUpperCase() };
  }
  const mid = Math.ceil(words.length / 2);
  return {
    top: words.slice(0, mid).join(" ").toUpperCase(),
    bottom: words.slice(mid).join(" ").toUpperCase()
  };
};

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-red-400 via-pink-500 via-purple-500 to-indigo-600 flex flex-col items-center justify-center p-6 text-center text-white relative">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" />
        <div className="relative z-10 space-y-2">
          <Sparkles className="mx-auto text-yellow-300 animate-bounce" size={28} />
          <p className="text-[9px] font-black uppercase tracking-widest text-yellow-200">Tristan Slay Image</p>
          <p className="text-[10px] leading-snug font-sans truncate px-4">"{alt.substring(0, 30)}..."</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setError(true)}
    />
  );
}

export default function PrideGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [captionText, setCaptionText] = useState("");
  const [selectedTag, setSelectedTag] = useState("Iconic");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isMemeMode, setIsMemeMode] = useState(true);

  // Load photos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tristan_pride_photos");
    if (saved) {
      try {
        setPhotos(JSON.parse(saved));
      } catch (e) {
        setPhotos(PRELOADED_PHOTOS);
      }
    } else {
      setPhotos(PRELOADED_PHOTOS);
      localStorage.setItem("tristan_pride_photos", JSON.stringify(PRELOADED_PHOTOS));
    }
  }, []);

  const savePhotos = (updated: GalleryPhoto[]) => {
    setPhotos(updated);
    try {
      localStorage.setItem("tristan_pride_photos", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
      setUploadError("Database limit reached! Try deleting some older photos first.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Oops! Please select an image file (PNG, JPG, WEBP).");
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High craft image compression to fit local storage safely!
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress quality to 75% for massive space savings but remaining super crystal clean
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
          
          const newPhoto: GalleryPhoto = {
            id: `photo-${Date.now()}`,
            url: compressedBase64,
            caption: captionText.trim() || "Tristan looking absolutely fabulous and radiant! ✨💖",
            dateAdded: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric", day: "numeric" }),
            tags: [selectedTag, "Pride Month"]
          };

          const updated = [newPhoto, ...photos];
          savePhotos(updated);
          setCaptionText("");
          setUploadError(null);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const deletePhoto = (id: string) => {
    const filtered = photos.filter((p) => p.id !== id);
    savePhotos(filtered);
  };

  return (
    <div className="space-y-12">
      {/* Upload Zone */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-pink-100 shadow-xl rainbow-glow transition-all duration-300">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 rounded-2xl text-white shadow-md">
              <Camera size={24} className="animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-800">
              Add Creative Photos of Tristan
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Drop in photos of your favorite memories. Drag and drop, or choose from your files to create Tristan's visual gallery!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Photo Caption or Memory
                </label>
                <textarea
                  className="w-full h-24 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-400 focus:ring focus:ring-purple-100 text-sm focus:outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none font-sans"
                  placeholder="Tell a fun story about this picture! E.g. Tristan absolute king slaying at..."
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Select Accent Tag
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Iconic", "Fabulous", "Legendary", "Slay", "Chosen Family", "Pride ✨"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedTag === tag
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md transform scale-105"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Droppable File Input */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative h-full min-h-[180px] rounded-2xl border-2 border-dashed flex flex-col justify-center items-center p-6 transition-all duration-300 cursor-pointer ${
                dragActive
                  ? "border-pink-500 bg-pink-50/50 scale-[1.02]"
                  : "border-slate-200 hover:border-pink-400 hover:bg-pink-50/10"
              }`}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/*"
              />
              <ImageIcon size={32} className="text-slate-400 mb-2.5 group-hover:text-pink-500 transition-colors" />
              <p className="text-sm font-semibold text-slate-600">
                Drag and drop your photo here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                or click to browse from device
              </p>
              <div className="mt-3.5 px-3 py-1 bg-pink-100 rounded-full text-[10px] font-bold text-pink-700 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={10} /> Auto-compressed for performance
              </div>
            </div>
          </div>

          {uploadError && (
            <div className="p-3 bg-red-550/10 text-red-650 rounded-xl text-center text-xs font-semibold">
              ⚠️ {uploadError}
            </div>
          )}
        </div>
      </div>

      {/* Gallery Photo Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
          <div>
            <h2 className="font-display font-black text-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Tristan's Slay Canvas
            </h2>
            <p className="text-sm text-slate-500">
              A curated virtual photo board celebrating his awesome self
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* High impact Meme view state control */}
            <button
              onClick={() => setIsMemeMode(!isMemeMode)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm border ${
                isMemeMode
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent scale-102 hover:opacity-95"
                  : "bg-white hover:bg-slate-50 text-slate-650 border-slate-200"
              }`}
              title="Enhance meme font layout"
            >
              <Eye size={13} className="animate-pulse" />
              <span>{isMemeMode ? "💥 Meme Text Active" : "👀 Toggle Meme Outlines"}</span>
            </button>

            <div className="px-4 py-1.5 bg-gradient-to-r from-pink-150 to-indigo-150 rounded-full text-xs font-semibold text-indigo-700 flex items-center gap-1.5 shadow-xs">
              <Heart size={14} className="fill-indigo-500 text-indigo-500" /> {photos.length} Celebrations
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 ${
                  photo.id === "featured-tuff-guy"
                    ? "border-amber-300 ring-2 ring-amber-400/20 shadow-amber-100/50"
                    : "border-slate-100"
                }`}
              >
                {/* Photo frame */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Classic meme style text block overlays */}
                  {isMemeMode && (() => {
                    const meme = getAutoMemeText(photo.id, photo.caption);
                    return (
                      <div className="absolute inset-0 flex flex-col justify-between py-4 px-2 pointer-events-none select-none z-10 bg-black/5">
                        {/* Top meme caption */}
                        <div className="w-full text-center">
                          <span 
                            className="font-sans font-black text-white text-base sm:text-lg tracking-wide uppercase leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,1.0)] [text-shadow:_0_2px_0_#000,_0_-2px_0_#000,_2px_0_0_#000,_-2px_0_0_#000,_2px_2px_0_#000,_-2px_2px_0_#000,_2px_-2px_0_#000,_-2px_-2px_0_#000] block break-words"
                          >
                            {meme.top}
                          </span>
                        </div>
                        {/* Bottom meme caption */}
                        <div className="w-full text-center">
                          <span 
                            className="font-sans font-black text-white text-base sm:text-lg tracking-wide uppercase leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,1.0)] [text-shadow:_0_2px_0_#000,_0_-2px_0_#000,_2px_0_0_#000,_-2px_0_0_#000,_2px_2px_0_#000,_-2px_2px_0_#000,_2px_-2px_0_#000,_-2px_-2px_0_#000] block break-words"
                          >
                            {meme.bottom}
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-20">
                    {photo.id === "featured-tuff-guy" && (
                      <span className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1 shadow-md animate-bounce">
                        <Flame size={10} className="text-white fill-white" /> TUFF GUY #1
                      </span>
                    )}
                    {photo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1 shadow-sm"
                      >
                        <Compass size={10} className="text-pink-400" /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full text-slate-600 backdrop-blur-md shadow-md focus:outline-none transition-all duration-200 cursor-pointer z-30"
                    title="Delete photo"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Info and Caption */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed font-sans italic">
                    "{photo.caption}"
                  </p>
                  
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-50 pt-3">
                    <span>Captured: {photo.dateAdded}</span>
                    <span className="flex items-center gap-1.5 text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full font-bold">
                      <Heart size={11} className="fill-pink-500" /> LOVE IT
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {photos.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <ImageIcon size={48} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold">No pictures uploaded yet.</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
              Add some gorgeous photos of Tristan to launch his pride gallery!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
