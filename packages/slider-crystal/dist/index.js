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
  SliderCrystal: () => SliderCrystal,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var RANGE = Array.from({ length: 10 }, (_, i) => i + 1);
var SliderCrystal = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [level, setLevel] = (0, import_react.useState)(0);
  const [hoverLevel, setHoverLevel] = (0, import_react.useState)(0);
  const [submitted, setSubmitted] = (0, import_react.useState)(false);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const handleSubmit = async () => {
    if (showcaseMode) {
      setSubmitted(true);
      return;
    }
    if (!apiKey || level === 0) {
      onError?.(new Error("API key and rating required"));
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
          rating: level,
          component_name: "SliderReaction",
          component_variant: "Crystal"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit feedback");
      }
      const data = await response.json();
      onSuccess?.(data);
      setSubmitted(true);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const getColorForLevel = (l) => {
    if (l === 0) return "bg-zinc-800";
    if (l <= 4) return "bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]";
    if (l <= 7) return "bg-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.4)]";
    return "bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)]";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col items-center gap-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "bg-black/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl",
      onMouseLeave: () => setHoverLevel(0),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex gap-2 mb-8", children: RANGE.map((val) => {
          const isActive = (hoverLevel || level) >= val;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_framer_motion.motion.button,
            {
              onClick: () => !submitted && setLevel(val),
              onMouseEnter: () => !submitted && setHoverLevel(val),
              disabled: submitted,
              className: "relative w-7 h-24 rounded-lg overflow-hidden outline-none group bg-zinc-900/50 border border-white/5",
              whileHover: { scaleY: 1.15, translateY: -4 },
              whileTap: { scaleY: 0.95 },
              transition: { type: "spring", stiffness: 400, damping: 20 },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_framer_motion.motion.div,
                  {
                    initial: false,
                    animate: {
                      height: isActive ? "100%" : "0%",
                      opacity: isActive ? 1 : 0
                    },
                    transition: { type: "spring", stiffness: 300, damping: 30 },
                    className: `absolute bottom-0 left-0 right-0 w-full ${getColorForLevel(hoverLevel || level)}`
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" })
              ]
            },
            val
          );
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-center h-12 px-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1", children: "Your Rating" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-3xl font-bold text-white leading-none", children: hoverLevel || level }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-zinc-600 text-sm font-medium", children: "/ 10" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_framer_motion.AnimatePresence, { children: [
            level > 0 && !submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_framer_motion.motion.button,
              {
                initial: { scale: 0, opacity: 0, rotate: -45 },
                animate: { scale: 1, opacity: 1, rotate: 0 },
                exit: { scale: 0, opacity: 0 },
                whileHover: { scale: 1.1 },
                whileTap: { scale: 0.95 },
                onClick: handleSubmit,
                disabled: isSubmitting,
                className: "h-12 w-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed",
                children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sparkles, { size: 20, className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowRight, { size: 24, strokeWidth: 2.5 })
              }
            ),
            submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_framer_motion.motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                className: "h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { size: 24, strokeWidth: 3 })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
};
var index_default = SliderCrystal;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SliderCrystal
});
