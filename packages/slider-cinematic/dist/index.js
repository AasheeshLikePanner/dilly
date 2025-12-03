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
  SliderCinematic: () => SliderCinematic,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var RANGE = Array.from({ length: 10 }, (_, i) => i + 1);
var SliderCinematic = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [selected, setSelected] = (0, import_react.useState)(5);
  const [hovered, setHovered] = (0, import_react.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const [hasSubmitted, setHasSubmitted] = (0, import_react.useState)(false);
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
          rating: selected,
          component_name: "SliderReaction",
          component_variant: "Cinematic"
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
  const displayValue = hovered || selected;
  const activeColor = displayValue <= 4 ? "text-red-500" : displayValue <= 7 ? "text-yellow-500" : "text-emerald-500";
  const activeGlow = displayValue <= 4 ? "bg-red-500" : displayValue <= 7 ? "bg-yellow-500" : "bg-emerald-500";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col items-center gap-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative group w-full max-w-lg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-black px-6 py-8 rounded-[2rem] border border-zinc-800 shadow-2xl relative overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        layoutId: "spotlight",
        className: `absolute top-0 bottom-0 w-20 opacity-20 blur-xl transition-colors duration-500 ${activeGlow}`,
        animate: {
          left: `${(displayValue - 1) / 9 * 80 + 5}%`
        },
        transition: { type: "spring", stiffness: 200, damping: 25 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-center mb-8 px-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-zinc-500 text-xs font-medium uppercase tracking-wider", children: "Likelihood" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `text-3xl font-bold transition-colors duration-300 ${activeColor}`, children: displayValue }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-zinc-600 text-sm", children: "/ 10" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors duration-300 ${activeColor}`, children: displayValue <= 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Shield, { size: 18 }) : displayValue <= 7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Minus, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Star, { size: 18, fill: "currentColor", className: "opacity-50" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative flex justify-between items-center z-10", children: RANGE.map((num) => {
      const isActive = selected === num;
      const isHovered = hovered === num;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          onClick: () => setSelected(num),
          onMouseEnter: () => setHovered(num),
          onMouseLeave: () => setHovered(null),
          className: "relative w-8 h-12 flex items-center justify-center outline-none group/btn",
          children: [
            (isActive || isHovered) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_framer_motion.motion.div,
              {
                layoutId: "lens-ring",
                className: "absolute inset-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                transition: { type: "spring", stiffness: 400, damping: 30 }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `text-sm font-bold relative z-20 transition-all duration-300 ${isActive ? "text-white scale-125" : isHovered ? "text-zinc-300 scale-110" : "text-zinc-600"}`, children: num }),
            isActive && num >= 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.div,
                {
                  className: `absolute -top-2 w-1 h-1 rounded-full ${activeGlow}`,
                  animate: { y: -20, opacity: 0 },
                  transition: { duration: 1, repeat: Infinity, delay: 0 }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.div,
                {
                  className: `absolute -top-1 right-0 w-0.5 h-0.5 rounded-full ${activeGlow}`,
                  animate: { y: -15, opacity: 0 },
                  transition: { duration: 1.5, repeat: Infinity, delay: 0.5 }
                }
              )
            ] })
          ]
        },
        num
      );
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: handleSubmit,
        disabled: isSubmitting || hasSubmitted,
        className: "mt-6 w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        children: hasSubmitted ? "\u2713 Submitted" : isSubmitting ? "Submitting..." : "Submit Rating"
      }
    )
  ] }) }) });
};
var index_default = SliderCinematic;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SliderCinematic
});
