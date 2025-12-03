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
var EmojiSoul = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [selected, setSelected] = useState(null);
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
          component_variant: "Soul"
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
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-black relative w-full max-w-md rounded-[2rem] border border-zinc-800 p-1 overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-30 transition-colors duration-700 ease-in-out bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 0.15 },
        exit: { opacity: 0 },
        className: `absolute inset-0 ${FEEDBACK_OPTIONS.find((o) => o.id === selected)?.color} blur-3xl`
      },
      selected
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-zinc-900/80 backdrop-blur-sm rounded-[1.8rem] p-8 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-white font-medium text-xl mb-8 tracking-tight", children: "How was the quality?" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center px-2", children: FEEDBACK_OPTIONS.map((option) => {
        const isSelected = selected === option.id;
        return /* @__PURE__ */ jsxs(
          motion.button,
          {
            onClick: () => handleSelect(option),
            whileHover: "hover",
            whileTap: "tap",
            disabled: isSubmitting,
            variants: emojiVariants[option.anim],
            className: "relative outline-none group",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    scale: isSelected ? 1.5 : 1,
                    opacity: selected && !isSelected ? 0.3 : 1,
                    filter: isSelected ? "grayscale(0%)" : selected ? "grayscale(100%)" : "grayscale(0%)"
                  },
                  className: "text-4xl transition-all duration-300",
                  children: option.emoji
                }
              ),
              isSelected && /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: "soul-dot",
                  className: `absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${option.color.replace("bg-", "bg-")}`
                }
              )
            ]
          },
          option.id
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 h-8", children: selected && /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "text-sm text-zinc-400",
          children: "Thanks for feedback!"
        }
      ) })
    ] })
  ] }) });
};
var index_default = EmojiSoul;
export {
  EmojiSoul,
  index_default as default
};
