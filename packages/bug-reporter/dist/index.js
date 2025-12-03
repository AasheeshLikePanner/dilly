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
  BugReporter: () => BugReporter,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var BugReporter = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [title, setTitle] = (0, import_react.useState)("");
  const [description, setDescription] = (0, import_react.useState)("");
  const [status, setStatus] = (0, import_react.useState)("idle");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return;
    }
    setStatus("sending");
    if (showcaseMode) {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setTitle("");
        setDescription("");
      }, 3e3);
      return;
    }
    if (!apiKey) {
      onError?.(new Error("API key required"));
      setStatus("idle");
      return;
    }
    try {
      const response = await fetch("/api/bugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          type: "bug",
          priority: "medium",
          status: "open"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit bug");
      }
      const data = await response.json();
      setStatus("sent");
      onSuccess?.(data);
      setTimeout(() => {
        setStatus("idle");
        setTitle("");
        setDescription("");
      }, 3e3);
    } catch (err) {
      console.error("Error submitting bug:", err);
      setStatus("error");
      const errorMsg = err.message || "Failed to submit bug";
      onError?.(new Error(errorMsg));
      setTimeout(() => setStatus("idle"), 3e3);
    }
  };
  const isDisabled = !title.trim() || !description.trim() || status === "sending";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col items-center justify-center gap-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_framer_motion.motion.div,
    {
      layout: true,
      className: "relative w-full max-w-md bg-[#121214] border border-white/5 rounded-[28px] overflow-hidden z-10 ring-1 ring-white/5 font-sans",
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
                  children: "Bug Report Sent"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.p,
                {
                  initial: { y: 10, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.2 },
                  className: "text-zinc-500 text-sm mt-2 max-w-[200px] leading-relaxed",
                  children: "Thanks for helping us squash bugs!"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-2.5 rounded-xl bg-red-500/20 text-red-400", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Bug, { size: 18 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block text-sm font-semibold text-white tracking-tight", children: "Report a Bug" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block text-[10px] text-zinc-500 font-medium uppercase tracking-wider", children: "Help us improve" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "bug-title", className: "sr-only", children: "Bug Title" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "text",
                id: "bug-title",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "Short summary of the bug",
                className: "w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50",
                required: true,
                disabled: isDisabled
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "bug-description", className: "sr-only", children: "Bug Description" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "textarea",
              {
                id: "bug-description",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: "Detailed description of the bug, steps to reproduce, expected behavior, etc.",
                rows: 5,
                className: "w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-white placeholder:text-zinc-500 resize-y focus:outline-none focus:ring-2 focus:ring-red-500/50",
                required: true,
                disabled: isDisabled
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.button,
            {
              type: "submit",
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 },
              className: `
              w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300
              ${isDisabled ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]"}
            `,
              disabled: isDisabled,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", children: status === "sending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                import_framer_motion.motion.span,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Bug, { size: 16, className: "animate-spin" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sending..." })
                  ]
                },
                "sending"
              ) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                import_framer_motion.motion.span,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Send, { size: 16 }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Submit Bug Report" })
                  ]
                },
                "idle"
              ) })
            }
          )
        ] })
      ]
    }
  ) });
};
var index_default = BugReporter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BugReporter
});
