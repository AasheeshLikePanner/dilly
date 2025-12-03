// src/index.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
var emojiVariants = {
  shake: {
    hover: { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } },
    tap: { x: [0, -4, 4, -4, 4, 0], scale: 1.2 }
  },
  droop: {
    hover: { rotate: -15, y: 2, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.9, rotate: -25 }
  },
  glance: {
    hover: { rotate: [0, 5, -5, 0], transition: { duration: 0.5 } },
    tap: { scale: 1.1 }
  },
  bounce: {
    hover: { y: -4, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 1.3 }
  },
  heartbeat: {
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 400 } },
    tap: { scale: [1, 1.4, 1], transition: { duration: 0.3 } }
  }
};
var FEEDBACK_OPTIONS = [
  { id: 1, label: "Terrible", emoji: "\u{1F616}", anim: "shake", color: "bg-red-500", rating: 0 },
  { id: 2, label: "Bad", emoji: "\u{1F61E}", anim: "droop", color: "bg-orange-500", rating: 3 },
  { id: 3, label: "Okay", emoji: "\u{1F610}", anim: "glance", color: "bg-yellow-500", rating: 5 },
  { id: 4, label: "Good", emoji: "\u{1F604}", anim: "bounce", color: "bg-blue-500", rating: 8 },
  { id: 5, label: "Amazing", emoji: "\u{1F60D}", anim: "heartbeat", color: "bg-rose-500", rating: 10 }
];
var EmojiDock = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSelect = async (option) => {
    setSelected(option.id);
    if (showcaseMode) {
      return;
    }
    if (!apiKey) {
      onError?.(new Error("API key required"));
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          type: "emoji",
          rating: option.rating,
          emoji: option.emoji,
          component_name: "EmojiReaction",
          component_variant: "Dock"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit feedback");
      }
      const data = await response.json();
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center gap-6", children: /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsx("div", { className: "flex items-end gap-2 px-4 pb-3 pt-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/5", children: FEEDBACK_OPTIONS.map((option) => {
    const isSelected = selected === option.id;
    const isHovered = hovered === option.id;
    const scale = isSelected ? 1.4 : isHovered ? 1.3 : 1;
    const y = isSelected ? -12 : isHovered ? -8 : 0;
    return /* @__PURE__ */ jsxs(
      motion.button,
      {
        onClick: () => !isSubmitting && handleSelect(option),
        onMouseEnter: () => !isSubmitting && setHovered(option.id),
        onMouseLeave: () => setHovered(null),
        disabled: isSubmitting,
        initial: "idle",
        whileHover: "hover",
        whileTap: "tap",
        variants: emojiVariants[option.anim],
        className: "relative flex flex-col items-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed",
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { children: isSelected && /* @__PURE__ */ jsx(
            motion.div,
            {
              layoutId: "selection",
              className: "absolute -inset-2 bg-white/10 rounded-2xl blur-sm"
            }
          ) }),
          /* @__PURE__ */ jsx(
            motion.span,
            {
              className: "text-5xl relative z-10",
              animate: { scale, y },
              transition: { type: "spring", stiffness: 300, damping: 20 },
              children: option.emoji
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: (isHovered || isSelected) && /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: { opacity: 0, y: -5, scale: 0.8 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: -5, scale: 0.8 },
              className: "absolute -bottom-6 text-[10px] font-bold text-white/70 uppercase tracking-wider whitespace-nowrap",
              children: option.label
            }
          ) })
        ]
      },
      option.id
    );
  }) }) }) });
};
var index_default = EmojiDock;
export {
  EmojiDock,
  index_default as default
};
