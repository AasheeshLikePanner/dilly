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
  SliderShapeShifter: () => SliderShapeShifter,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var SliderShapeShifter = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [value, setValue] = (0, import_react.useState)(5);
  const [isDragging, setIsDragging] = (0, import_react.useState)(false);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const [hasSubmitted, setHasSubmitted] = (0, import_react.useState)(false);
  const constraintsRef = (0, import_react.useRef)(null);
  const x = (0, import_framer_motion.useMotionValue)(0);
  const width = 300;
  (0, import_react.useEffect)(() => {
    x.set(width / 2);
  }, []);
  const progress = (0, import_framer_motion.useTransform)(x, [0, width], [0, 1]);
  const color = (0, import_framer_motion.useTransform)(progress, [0, 0.5, 1], [
    "#ef4444",
    "#eab308",
    "#10b981"
  ]);
  const borderRadius = (0, import_framer_motion.useTransform)(progress, [0, 0.5, 1], [
    "20%",
    "50%",
    "30%"
  ]);
  const rotate = (0, import_framer_motion.useTransform)(progress, [0, 1], [-45, 45]);
  const handleDrag = () => {
    const p = x.get() / width;
    const newValue = Math.min(Math.max(Math.round(p * 9) + 1, 1), 10);
    if (newValue !== value) setValue(newValue);
  };
  const handleSubmit = async () => {
    if (showcaseMode) {
      setHasSubmitted(true);
      setTimeout(() => setHasSubmitted(false), 2e3);
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
          type: "slider",
          rating: value,
          component_name: "SliderReaction",
          component_variant: "ShapeShifter"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit feedback");
      }
      const data = await response.json();
      onSuccess?.(data);
      setHasSubmitted(true);
      setTimeout(() => setHasSubmitted(false), 2e3);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const getIcon = () => {
    if (value <= 3) return import_lucide_react.TrendingDown;
    if (value <= 7) return import_lucide_react.Minus;
    return import_lucide_react.Zap;
  };
  const Icon = getIcon();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col items-center gap-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-zinc-900/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl w-full max-w-md flex flex-col items-center relative overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        style: { backgroundColor: color },
        className: "absolute -top-20 -right-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        style: { backgroundColor: color },
        className: "absolute -bottom-20 -left-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2", children: "Your Rating" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_framer_motion.motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "text-4xl font-bold text-white flex items-center justify-center gap-3",
          children: [
            value,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-lg font-medium text-zinc-600", children: "/ 10" })
          ]
        },
        value
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-[300px] relative h-16 flex items-center justify-center", ref: constraintsRef, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute w-full h-4 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_framer_motion.motion.div,
        {
          style: { width: x, backgroundColor: color },
          className: "h-full opacity-50"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_framer_motion.motion.div,
        {
          drag: "x",
          dragConstraints: constraintsRef,
          dragElastic: 0,
          dragMomentum: false,
          onDrag: handleDrag,
          onDragStart: () => setIsDragging(true),
          onDragEnd: () => setIsDragging(false),
          style: { x, borderRadius, backgroundColor: color, rotate },
          className: "absolute left-[-32px] w-16 h-16 flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-zinc-900",
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.95 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.div,
            {
              initial: { scale: 0, rotate: -90 },
              animate: { scale: 1, rotate: 0 },
              exit: { scale: 0, rotate: 90 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 24, color: "white", strokeWidth: 3 })
            },
            value <= 3 ? "low" : value <= 7 ? "mid" : "high"
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full flex justify-between px-2 mt-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Worse" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Better" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: handleSubmit,
        disabled: isSubmitting || hasSubmitted,
        className: "mt-6 w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        children: hasSubmitted ? "\u2713 Submitted" : isSubmitting ? "Submitting..." : "Submit Rating"
      }
    )
  ] }) });
};
var index_default = SliderShapeShifter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SliderShapeShifter
});
