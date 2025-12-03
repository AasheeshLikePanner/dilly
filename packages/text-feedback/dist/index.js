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
  TextFeedback: () => TextFeedback,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var TextFeedback = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [text, setText] = (0, import_react.useState)("");
  const [isFocused, setIsFocused] = (0, import_react.useState)(false);
  const [status, setStatus] = (0, import_react.useState)("idle");
  const textareaRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [text]);
  const handleSubmit = async () => {
    if (!text.trim()) return;
    setStatus("sending");
    if (showcaseMode) {
      setTimeout(() => {
        setStatus("sent");
        setTimeout(() => {
          setStatus("idle");
          setText("");
          setIsFocused(false);
        }, 3e3);
      }, 1200);
      return;
    }
    if (!apiKey) {
      onError?.(new Error("API key required"));
      setStatus("idle");
      return;
    }
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          type: "form",
          comment: text.trim(),
          component_name: "TextFeedback"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit feedback");
      }
      const data = await response.json();
      onSuccess?.(data);
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setText("");
        setIsFocused(false);
      }, 3e3);
    } catch (error) {
      onError?.(error);
      setStatus("idle");
    }
  };
  const maxLength = 280;
  const progress = text.length / maxLength * 100;
  const isNearLimit = text.length > maxLength - 20;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_framer_motion.motion.div,
    {
      className: "relative w-full max-w-[500px] bg-[#121214] border border-white/5 rounded-[28px] overflow-hidden z-10 ring-1 ring-white/5 font-sans",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: status === "sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_framer_motion.motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 z-20 bg-[#121214]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.div,
                {
                  initial: { scale: 0, rotate: -180 },
                  animate: { scale: 1, rotate: 0 },
                  transition: { type: "spring", stiffness: 200, damping: 15 },
                  className: "w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-500/20",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { size: 32, strokeWidth: 3 })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.h3,
                {
                  initial: { y: 10, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.1 },
                  className: "text-white font-bold text-xl tracking-tight",
                  children: "Feedback Sent"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.p,
                {
                  initial: { y: 10, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.2 },
                  className: "text-zinc-500 text-sm mt-2 max-w-[200px] leading-relaxed",
                  children: "Thanks for helping us improve the product."
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-6 pt-6 pb-2 flex justify-between items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_framer_motion.motion.div,
              {
                animate: {
                  backgroundColor: isFocused ? "rgba(99,102,241,0.2)" : "rgba(39,39,42,0.5)",
                  color: isFocused ? "#818cf8" : "#71717a"
                },
                className: "p-2.5 rounded-xl transition-colors",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MessageSquare, { size: 18 })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block text-sm font-semibold text-white tracking-tight", children: "Your Thoughts" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block text-[10px] text-zinc-500 font-medium uppercase tracking-wider", children: "Private Feedback" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "text-zinc-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: 18 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-6 pb-6 pt-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative min-h-[140px]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: !isFocused && !text && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_framer_motion.motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0, x: -5 },
                className: "absolute top-0 left-0 pointer-events-none",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-lg text-zinc-500 font-light", children: "How can we improve?" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-zinc-700 mt-1", children: "We read every message." })
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "textarea",
              {
                ref: textareaRef,
                value: text,
                onChange: (e) => setText(e.target.value.slice(0, maxLength)),
                onFocus: () => setIsFocused(true),
                onBlur: () => !text && setIsFocused(false),
                className: "w-full bg-transparent text-lg text-white placeholder:text-transparent resize-none focus:outline-none min-h-[140px] leading-relaxed selection:bg-indigo-500/30",
                style: { maxHeight: "300px" }
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_framer_motion.motion.div,
            {
              layout: true,
              className: "flex items-end justify-between mt-2 pt-4 border-t border-white/5",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  import_framer_motion.motion.div,
                  {
                    animate: { opacity: isFocused || text ? 1 : 0.5 },
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative w-4 h-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "w-full h-full -rotate-90", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8", cy: "8", r: "7", stroke: "#27272a", strokeWidth: "2", fill: "none" }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_framer_motion.motion.circle,
                          {
                            cx: "8",
                            cy: "8",
                            r: "7",
                            stroke: isNearLimit ? "#ef4444" : "#6366f1",
                            strokeWidth: "2",
                            fill: "none",
                            strokeDasharray: "44",
                            strokeDashoffset: 44 - 44 * progress / 100,
                            strokeLinecap: "round",
                            initial: { strokeDashoffset: 44 },
                            animate: { strokeDashoffset: 44 - 44 * progress / 100 }
                          }
                        )
                      ] }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `text-xs font-mono font-medium ${isNearLimit ? "text-red-400" : "text-zinc-600"}`, children: maxLength - text.length })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  import_framer_motion.motion.button,
                  {
                    onClick: handleSubmit,
                    disabled: !text.trim() || status !== "idle",
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.95 },
                    className: `
                relative h-10 px-5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 overflow-hidden
                ${!text.trim() ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"}
              `,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        import_framer_motion.motion.span,
                        {
                          initial: { x: 0, opacity: 1 },
                          animate: status === "sending" ? { x: -20, opacity: 0 } : { x: 0, opacity: 1 },
                          children: "Send"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative w-4 h-4", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: status === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_framer_motion.motion.div,
                          {
                            initial: { opacity: 0, scale: 0 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0 },
                            className: "absolute inset-0",
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Send, { size: 16, className: text.trim() ? "text-indigo-600" : "text-zinc-500" })
                          },
                          "icon-idle"
                        ) }),
                        status === "sending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_framer_motion.motion.div,
                          {
                            className: "absolute inset-0 text-black",
                            initial: { x: 0, y: 0, opacity: 1, scale: 1 },
                            animate: {
                              x: 60,
                              y: -60,
                              opacity: 0,
                              scale: 0.5
                            },
                            transition: { duration: 0.8, ease: "backIn" },
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Send, { size: 16, className: "text-indigo-600" })
                          },
                          "icon-flying"
                        )
                      ] }),
                      status === "sending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        import_framer_motion.motion.div,
                        {
                          className: "absolute right-4 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-zinc-400",
                          initial: { width: 0, opacity: 0 },
                          animate: { width: 20, opacity: [0, 1, 0], x: 30 },
                          transition: { duration: 0.4 }
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" })
      ]
    }
  );
};
var index_default = TextFeedback;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TextFeedback
});
