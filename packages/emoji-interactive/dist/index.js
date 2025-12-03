"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  EmojiInteractive: () => EmojiInteractive,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
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
var EmojiInteractive = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [step, setStep] = (0, import_react.useState)("rate");
  const [rating, setRating] = (0, import_react.useState)(null);
  const [comment, setComment] = (0, import_react.useState)("");
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const handleRate = (id) => {
    setRating(id);
    setTimeout(() => setStep("comment"), 400);
  };
  const handleSubmit = async () => {
    if (showcaseMode) {
      setStep("done");
      setTimeout(() => {
        setStep("rate");
        setRating(null);
        setComment("");
      }, 3e3);
      return;
    }
    if (!apiKey || rating === null) {
      onError?.(new Error("API key and rating required"));
      return;
    }
    setIsSubmitting(true);
    try {
      const selectedOption = FEEDBACK_OPTIONS.find((o) => o.id === rating);
      if (!selectedOption) {
        throw new Error("Invalid rating");
      }
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          type: "emoji",
          rating: selectedOption.rating,
          emoji: selectedOption.emoji,
          comment: comment || void 0,
          component_name: "EmojiReaction",
          component_variant: "Interactive"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit feedback");
      }
      const data = await response.json();
      onSuccess?.(data);
      setStep("done");
      setTimeout(() => {
        setStep("rate");
        setRating(null);
        setComment("");
      }, 3e3);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col items-center justify-center gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_framer_motion.motion.div,
    {
      layout: true,
      className: "bg-[#111] w-full max-w-sm rounded-3xl shadow-2xl border border-white/5 overflow-hidden relative",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-4 right-4 z-20 text-zinc-600 hover:text-zinc-300 cursor-pointer transition-colors", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_framer_motion.AnimatePresence, { mode: "wait", children: [
          step === "rate" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_framer_motion.motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
              className: "p-8 flex flex-col items-center pt-12",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-white font-bold text-2xl mb-2 tracking-tight", children: "Rate Experience" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-zinc-500 text-sm text-center mb-10 leading-relaxed", children: [
                  "Help us improve by selecting",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                  "how you felt about the service."
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-center gap-2 w-full", children: FEEDBACK_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_framer_motion.motion.button,
                  {
                    onClick: () => handleRate(option.id),
                    whileHover: "hover",
                    whileTap: "tap",
                    variants: emojiVariants[option.anim],
                    className: "p-3 rounded-2xl hover:bg-white/5 transition-colors relative outline-none",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-4xl block", children: option.emoji })
                  },
                  option.id
                )) })
              ]
            },
            "step-rate"
          ),
          step === "comment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_framer_motion.motion.div,
            {
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -50 },
              className: "p-6 pt-8",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between mb-6", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setStep("rate"), className: "text-xs font-medium text-zinc-500 hover:text-white transition-colors uppercase tracking-wider", children: "Back" }),
                  rating && (() => {
                    const opt = FEEDBACK_OPTIONS.find((o) => o.id === rating);
                    if (!opt) return null;
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-lg", children: opt.emoji }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs font-bold text-white", children: opt.label })
                    ] });
                  })()
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "textarea",
                  {
                    value: comment,
                    onChange: (e) => setComment(e.target.value),
                    placeholder: "Tell us what made you feel this way...",
                    className: "w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-700 transition-all mb-4 placeholder:text-zinc-600"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_framer_motion.motion.button,
                  {
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    onClick: handleSubmit,
                    disabled: isSubmitting,
                    className: "w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    children: isSubmitting ? "Submitting..." : "Submit Feedback"
                  }
                )
              ]
            },
            "step-comment"
          ),
          step === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_framer_motion.motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "p-10 h-[340px] flex flex-col items-center justify-center text-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_framer_motion.motion.div,
                  {
                    initial: { scale: 0, rotate: 180 },
                    animate: { scale: 1, rotate: 0 },
                    transition: { type: "spring", stiffness: 200, damping: 15 },
                    className: "text-6xl mb-6",
                    children: "\u2728"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-white font-bold text-2xl mb-2", children: "Received!" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-zinc-500 text-sm max-w-[200px]", children: "Your feedback helps us create better experiences." })
              ]
            },
            "step-done"
          )
        ] })
      ]
    }
  ) });
};
var index_default = EmojiInteractive;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiInteractive
});
