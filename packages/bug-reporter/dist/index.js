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

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/styles.css
styleInject('/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */\n@layer properties {\n  @supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {\n    *,\n    :before,\n    :after,\n    ::backdrop {\n      --tw-rotate-x:initial;\n      --tw-rotate-y:initial;\n      --tw-rotate-z:initial;\n      --tw-skew-x:initial;\n      --tw-skew-y:initial;\n      --tw-space-y-reverse:0;\n      --tw-border-style:solid;\n      --tw-leading:initial;\n      --tw-font-weight:initial;\n      --tw-tracking:initial;\n      --tw-shadow:0 0 #0000;\n      --tw-shadow-color:initial;\n      --tw-shadow-alpha:100%;\n      --tw-inset-shadow:0 0 #0000;\n      --tw-inset-shadow-color:initial;\n      --tw-inset-shadow-alpha:100%;\n      --tw-ring-color:initial;\n      --tw-ring-shadow:0 0 #0000;\n      --tw-inset-ring-color:initial;\n      --tw-inset-ring-shadow:0 0 #0000;\n      --tw-ring-inset:initial;\n      --tw-ring-offset-width:0px;\n      --tw-ring-offset-color:#fff;\n      --tw-ring-offset-shadow:0 0 #0000;\n      --tw-outline-style:solid;\n      --tw-blur:initial;\n      --tw-brightness:initial;\n      --tw-contrast:initial;\n      --tw-grayscale:initial;\n      --tw-hue-rotate:initial;\n      --tw-invert:initial;\n      --tw-opacity:initial;\n      --tw-saturate:initial;\n      --tw-sepia:initial;\n      --tw-drop-shadow:initial;\n      --tw-drop-shadow-color:initial;\n      --tw-drop-shadow-alpha:100%;\n      --tw-drop-shadow-size:initial;\n      --tw-backdrop-blur:initial;\n      --tw-backdrop-brightness:initial;\n      --tw-backdrop-contrast:initial;\n      --tw-backdrop-grayscale:initial;\n      --tw-backdrop-hue-rotate:initial;\n      --tw-backdrop-invert:initial;\n      --tw-backdrop-opacity:initial;\n      --tw-backdrop-saturate:initial;\n      --tw-backdrop-sepia:initial;\n      --tw-duration:initial;\n      --tw-animation-delay:0s;\n      --tw-animation-direction:normal;\n      --tw-animation-duration:initial;\n      --tw-animation-fill-mode:none;\n      --tw-animation-iteration-count:1;\n      --tw-enter-blur:0;\n      --tw-enter-opacity:1;\n      --tw-enter-rotate:0;\n      --tw-enter-scale:1;\n      --tw-enter-translate-x:0;\n      --tw-enter-translate-y:0;\n      --tw-exit-blur:0;\n      --tw-exit-opacity:1;\n      --tw-exit-rotate:0;\n      --tw-exit-scale:1;\n      --tw-exit-translate-x:0;\n      --tw-exit-translate-y:0;\n    }\n  }\n}\n@layer theme {\n  :root,\n  :host {\n    --color-red-400:oklch(70.4% .191 22.216);\n    --color-red-500:oklch(63.7% .237 25.331);\n    --color-red-600:oklch(57.7% .245 27.325);\n    --color-emerald-500:oklch(69.6% .17 162.48);\n    --color-zinc-500:oklch(55.2% .016 285.938);\n    --color-zinc-700:oklch(37% .013 285.805);\n    --color-zinc-800:oklch(27.4% .006 286.033);\n    --color-white:#fff;\n    --spacing:.25rem;\n    --container-md:28rem;\n    --text-sm:.875rem;\n    --text-sm--line-height:calc(1.25/.875);\n    --text-xl:1.25rem;\n    --text-xl--line-height:calc(1.75/1.25);\n    --font-weight-medium:500;\n    --font-weight-semibold:600;\n    --font-weight-bold:700;\n    --tracking-tight:-.025em;\n    --tracking-wider:.05em;\n    --leading-relaxed:1.625;\n    --animate-spin:spin 1s linear infinite;\n    --blur-sm:8px;\n    --default-transition-duration:.15s;\n    --default-transition-timing-function:cubic-bezier(.4,0,.2,1);\n    --default-font-family:var(--font-geist-sans);\n    --default-mono-font-family:var(--font-geist-mono);\n  }\n}\n@layer base {\n  *,\n  :after,\n  :before,\n  ::backdrop {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  ::file-selector-button {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  html,\n  :host {\n    -webkit-text-size-adjust: 100%;\n    tab-size: 4;\n    line-height: 1.5;\n    font-family: var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");\n    font-feature-settings: var(--default-font-feature-settings,normal);\n    font-variation-settings: var(--default-font-variation-settings,normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b,\n  strong {\n    font-weight: bolder;\n  }\n  code,\n  kbd,\n  samp,\n  pre {\n    font-family: var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings,normal);\n    font-variation-settings: var(--default-mono-font-variation-settings,normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub,\n  sup {\n    vertical-align: baseline;\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n  }\n  sub {\n    bottom: -.25em;\n  }\n  sup {\n    top: -.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol,\n  ul,\n  menu {\n    list-style: none;\n  }\n  img,\n  svg,\n  video,\n  canvas,\n  audio,\n  iframe,\n  embed,\n  object {\n    vertical-align: middle;\n    display: block;\n  }\n  img,\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n  button,\n  input,\n  select,\n  optgroup,\n  textarea {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px) {\n    ::placeholder {\n      color: currentColor;\n    }\n    @supports (color:color-mix(in lab, red, red)) {\n      ::placeholder {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-year-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-month-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-day-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-hour-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-minute-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-second-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-millisecond-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button,\n  input:where([type=button], [type=reset], [type=submit]) {\n    appearance: button;\n  }\n  ::file-selector-button {\n    appearance: button;\n  }\n  ::-webkit-inner-spin-button {\n    height: auto;\n  }\n  ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=until-found])) {\n    display: none !important;\n  }\n  * {\n    border-color: var(--border);\n    outline-color: var(--ring);\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    * {\n      outline-color: color-mix(in oklab, var(--ring)50%, transparent);\n    }\n  }\n}\n@layer components;\n@layer utilities {\n  .sr-only {\n    clip-path: inset(50%);\n    white-space: nowrap;\n    border-width: 0;\n    width: 1px;\n    height: 1px;\n    margin: -1px;\n    padding: 0;\n    position: absolute;\n    overflow: hidden;\n  }\n  .absolute {\n    position: absolute;\n  }\n  .relative {\n    position: relative;\n  }\n  .inset-0 {\n    inset: calc(var(--spacing)*0);\n  }\n  .z-10 {\n    z-index: 10;\n  }\n  .z-20 {\n    z-index: 20;\n  }\n  .mt-2 {\n    margin-top: calc(var(--spacing)*2);\n  }\n  .mb-4 {\n    margin-bottom: calc(var(--spacing)*4);\n  }\n  .block {\n    display: block;\n  }\n  .flex {\n    display: flex;\n  }\n  .table {\n    display: table;\n  }\n  .h-16 {\n    height: calc(var(--spacing)*16);\n  }\n  .w-16 {\n    width: calc(var(--spacing)*16);\n  }\n  .w-full {\n    width: 100%;\n  }\n  .max-w-\\[200px\\] {\n    max-width: 200px;\n  }\n  .max-w-md {\n    max-width: var(--container-md);\n  }\n  .border-collapse {\n    border-collapse: collapse;\n  }\n  .transform {\n    transform: var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,);\n  }\n  .animate-spin {\n    animation: var(--animate-spin);\n  }\n  .cursor-not-allowed {\n    cursor: not-allowed;\n  }\n  .resize {\n    resize: both;\n  }\n  .resize-y {\n    resize: vertical;\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .gap-2 {\n    gap: calc(var(--spacing)*2);\n  }\n  .gap-3 {\n    gap: calc(var(--spacing)*3);\n  }\n  .gap-6 {\n    gap: calc(var(--spacing)*6);\n  }\n  :where(.space-y-4 > :not(:last-child)) {\n    --tw-space-y-reverse:0;\n    margin-block-start: calc(calc(var(--spacing)*4)*var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing)*4)*calc(1 - var(--tw-space-y-reverse)));\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .rounded-\\[28px\\] {\n    border-radius: 28px;\n  }\n  .rounded-full {\n    border-radius: 3.40282e38px;\n  }\n  .rounded-lg {\n    border-radius: var(--radius);\n  }\n  .rounded-xl {\n    border-radius: calc(var(--radius) + 4px);\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-white {\n    border-color: var(--color-white);\n  }\n  .border-white\\/5 {\n    border-color: #ffffff0d;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .border-white\\/5 {\n      border-color: color-mix(in oklab, var(--color-white)5%, transparent);\n    }\n  }\n  .border-zinc-700 {\n    border-color: var(--color-zinc-700);\n  }\n  .bg-\\[\\#121214\\] {\n    background-color: #121214;\n  }\n  .bg-\\[\\#121214\\]\\/95 {\n    background-color: oklab(18.3088% .00111321 -.00388382/.95);\n  }\n  .bg-emerald-500 {\n    background-color: var(--color-emerald-500);\n  }\n  .bg-emerald-500\\/10 {\n    background-color: #00bb7f1a;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-emerald-500\\/10 {\n      background-color: color-mix(in oklab, var(--color-emerald-500)10%, transparent);\n    }\n  }\n  .bg-red-500 {\n    background-color: var(--color-red-500);\n  }\n  .bg-red-500\\/20 {\n    background-color: #fb2c3633;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-red-500\\/20 {\n      background-color: color-mix(in oklab, var(--color-red-500)20%, transparent);\n    }\n  }\n  .bg-zinc-800 {\n    background-color: var(--color-zinc-800);\n  }\n  .bg-zinc-800\\/50 {\n    background-color: #27272a80;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-zinc-800\\/50 {\n      background-color: color-mix(in oklab, var(--color-zinc-800)50%, transparent);\n    }\n  }\n  .p-2 {\n    padding: calc(var(--spacing)*2);\n  }\n  .p-2\\.5 {\n    padding: calc(var(--spacing)*2.5);\n  }\n  .p-3 {\n    padding: calc(var(--spacing)*3);\n  }\n  .p-6 {\n    padding: calc(var(--spacing)*6);\n  }\n  .py-3 {\n    padding-block: calc(var(--spacing)*3);\n  }\n  .text-center {\n    text-align: center;\n  }\n  .font-sans {\n    font-family: var(--font-geist-sans);\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading,var(--text-sm--line-height));\n  }\n  .text-xl {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading,var(--text-xl--line-height));\n  }\n  .text-\\[10px\\] {\n    font-size: 10px;\n  }\n  .leading-relaxed {\n    --tw-leading:var(--leading-relaxed);\n    line-height: var(--leading-relaxed);\n  }\n  .font-bold {\n    --tw-font-weight:var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  .font-medium {\n    --tw-font-weight:var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .font-semibold {\n    --tw-font-weight:var(--font-weight-semibold);\n    font-weight: var(--font-weight-semibold);\n  }\n  .tracking-tight {\n    --tw-tracking:var(--tracking-tight);\n    letter-spacing: var(--tracking-tight);\n  }\n  .tracking-wider {\n    --tw-tracking:var(--tracking-wider);\n    letter-spacing: var(--tracking-wider);\n  }\n  .text-emerald-500 {\n    color: var(--color-emerald-500);\n  }\n  .text-red-400 {\n    color: var(--color-red-400);\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .text-zinc-500 {\n    color: var(--color-zinc-500);\n  }\n  .uppercase {\n    text-transform: uppercase;\n  }\n  .underline {\n    text-decoration-line: underline;\n  }\n  .shadow-\\[0_0_20px_rgba\\(239\\,68\\,68\\,0\\.3\\)\\] {\n    --tw-shadow:0 0 20px var(--tw-shadow-color,#ef44444d);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .ring-1 {\n    --tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .ring-emerald-500 {\n    --tw-ring-color:var(--color-emerald-500);\n  }\n  .ring-emerald-500\\/20 {\n    --tw-ring-color:#00bb7f33;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .ring-emerald-500\\/20 {\n      --tw-ring-color:color-mix(in oklab,var(--color-emerald-500)20%,transparent);\n    }\n  }\n  .ring-white {\n    --tw-ring-color:var(--color-white);\n  }\n  .ring-white\\/5 {\n    --tw-ring-color:#ffffff0d;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .ring-white\\/5 {\n      --tw-ring-color:color-mix(in oklab,var(--color-white)5%,transparent);\n    }\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .filter {\n    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);\n  }\n  .backdrop-blur-sm {\n    --tw-backdrop-blur:blur(var(--blur-sm));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .backdrop-filter {\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .transition {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to,\n      opacity,\n      box-shadow,\n      transform,\n      translate,\n      scale,\n      rotate,\n      filter,\n      -webkit-backdrop-filter,\n      backdrop-filter,\n      display,\n      content-visibility,\n      overlay,\n      pointer-events;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .transition-all {\n    transition-property: all;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .duration-300 {\n    --tw-duration:.3s;\n    transition-duration: .3s;\n  }\n  .placeholder\\:text-zinc-500::placeholder {\n    color: var(--color-zinc-500);\n  }\n  @media (hover: hover) {\n    .hover\\:bg-red-600:hover {\n      background-color: var(--color-red-600);\n    }\n  }\n  .focus\\:ring-2:focus {\n    --tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .focus\\:ring-red-500\\/50:focus {\n    --tw-ring-color:#fb2c3680;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .focus\\:ring-red-500\\/50:focus {\n      --tw-ring-color:color-mix(in oklab,var(--color-red-500)50%,transparent);\n    }\n  }\n  .focus\\:outline-none:focus {\n    --tw-outline-style:none;\n    outline-style: none;\n  }\n}\n@property --tw-animation-delay { syntax:"*";inherits:false;initial-value:0s }\n@property --tw-animation-direction { syntax:"*";inherits:false;initial-value:normal }\n@property --tw-animation-duration { syntax:"*";inherits:false }\n@property --tw-animation-fill-mode { syntax:"*";inherits:false;initial-value:none }\n@property --tw-animation-iteration-count { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-translate-y { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-translate-y { syntax:"*";inherits:false;initial-value:0 }\n:root {\n  --radius:.625rem;\n  --background:#fafaf9;\n  --bg-body:#fafaf9;\n  --bg-gradient-start:#fafaf9;\n  --bg-gradient-end:#ebebe9;\n  --card:#fff;\n  --bg-card:#fff;\n  --bg-card-hover:#f5f5f4;\n  --border:#e7e5e4;\n  --border-subtle:#e7e5e4;\n  --border-highlight:#d6d3d1;\n  --foreground:#1c1917;\n  --text-primary:#1c1917;\n  --secondary-foreground:#57534e;\n  --text-secondary:#57534e;\n  --muted-foreground:#78716c;\n  --text-tertiary:#78716c;\n  --status-red:#ef4444;\n  --status-green:#22c55e;\n  --status-orange:#f97316;\n  --status-blue:#3b82f6;\n  --popover:0 0% 100%;\n  --popover-foreground:240 10% 3.9%;\n  --primary:240 5.9% 10%;\n  --primary-foreground:0 0% 98%;\n  --secondary:240 4.8% 95.9%;\n  --muted:240 4.8% 95.9%;\n  --accent:240 4.8% 95.9%;\n  --accent-foreground:240 5.9% 10%;\n  --destructive:0 84.2% 60.2%;\n  --input:240 5.9% 90%;\n  --ring:240 10% 3.9%;\n  --chart-1:#e76e50;\n  --chart-2:#2a9d90;\n  --chart-3:#274754;\n  --chart-4:#e8c468;\n  --chart-5:#f4a462;\n  --sidebar:#f5f5f4;\n  --sidebar-foreground:#1c1917;\n  --sidebar-primary:240 5.9% 10%;\n  --sidebar-primary-foreground:0 0% 98%;\n  --sidebar-accent:#e7e5e4;\n  --sidebar-accent-foreground:#1c1917;\n  --sidebar-border:#e7e5e4;\n  --sidebar-ring:#d6d3d1;\n}\n.dark {\n  --background:#101010;\n  --bg-body:#101010;\n  --card:#151516;\n  --bg-card:#151516;\n  --bg-card-hover:#1c1c1e;\n  --border:#2c2c2e;\n  --border-subtle:#2c2c2e;\n  --border-highlight:#3a3a3c;\n  --foreground:#fff;\n  --text-primary:#fff;\n  --secondary-foreground:#8e8e93;\n  --text-secondary:#8e8e93;\n  --muted-foreground:#48484a;\n  --text-tertiary:#48484a;\n  --status-red:#ff453a;\n  --status-green:#32d74b;\n  --status-orange:#ff9f0a;\n  --status-blue:#0a84ff;\n  --popover:.205 0 0;\n  --popover-foreground:.985 0 0;\n  --primary:.922 0 0;\n  --primary-foreground:.205 0 0;\n  --secondary:.269 0 0;\n  --muted:.269 0 0;\n  --accent:.269 0 0;\n  --accent-foreground:.985 0 0;\n  --destructive:.704 .191 22.216;\n  --input:1 0 0/15%;\n  --ring:.556 0 0;\n  --chart-1:oklch(48.8% .243 264.376);\n  --chart-2:oklch(69.6% .17 162.48);\n  --chart-3:oklch(76.9% .188 70.08);\n  --chart-4:oklch(62.7% .265 303.9);\n  --chart-5:oklch(64.5% .246 16.439);\n  --sidebar:#161616;\n  --sidebar-foreground:#fff;\n  --sidebar-primary:.488 .243 264.376;\n  --sidebar-primary-foreground:#fff;\n  --sidebar-accent:#2c2c2e;\n  --sidebar-accent-foreground:#fff;\n  --sidebar-border:#ffffff1a;\n  --sidebar-ring:#8e8e93;\n}\n.background-spotlight {\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      #222 0%,\n      #101010 60%);\n}\n.text-metallic {\n  -webkit-text-fill-color: transparent;\n  background:\n    linear-gradient(\n      135deg,\n      #fff 0%,\n      #a1a1aa 100%);\n  -webkit-background-clip: text;\n}\n.glass-panel {\n  -webkit-backdrop-filter: blur(20px)saturate(180%);\n  border-bottom: 1px solid var(--border-subtle);\n  background: #101010b3;\n}\n@keyframes magic-pulse {\n  0%, to {\n    opacity: .4;\n    filter: blur();\n    transform: scale(.995);\n  }\n  50% {\n    opacity: .8;\n    filter: blur(1px);\n    transform: scale(1);\n  }\n}\n.animate-magic-pulse {\n  animation: 2.5s cubic-bezier(.4, 0, .2, 1) infinite magic-pulse;\n}\n@property --tw-rotate-x { syntax:"*";inherits:false }\n@property --tw-rotate-y { syntax:"*";inherits:false }\n@property --tw-rotate-z { syntax:"*";inherits:false }\n@property --tw-skew-x { syntax:"*";inherits:false }\n@property --tw-skew-y { syntax:"*";inherits:false }\n@property --tw-space-y-reverse { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-border-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-leading { syntax:"*";inherits:false }\n@property --tw-font-weight { syntax:"*";inherits:false }\n@property --tw-tracking { syntax:"*";inherits:false }\n@property --tw-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-shadow-color { syntax:"*";inherits:false }\n@property --tw-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-inset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-shadow-color { syntax:"*";inherits:false }\n@property --tw-inset-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-ring-color { syntax:"*";inherits:false }\n@property --tw-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-ring-color { syntax:"*";inherits:false }\n@property --tw-inset-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-ring-inset { syntax:"*";inherits:false }\n@property --tw-ring-offset-width { syntax:"<length>";inherits:false;initial-value:0 }\n@property --tw-ring-offset-color { syntax:"*";inherits:false;initial-value:#fff }\n@property --tw-ring-offset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-outline-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-blur { syntax:"*";inherits:false }\n@property --tw-brightness { syntax:"*";inherits:false }\n@property --tw-contrast { syntax:"*";inherits:false }\n@property --tw-grayscale { syntax:"*";inherits:false }\n@property --tw-hue-rotate { syntax:"*";inherits:false }\n@property --tw-invert { syntax:"*";inherits:false }\n@property --tw-opacity { syntax:"*";inherits:false }\n@property --tw-saturate { syntax:"*";inherits:false }\n@property --tw-sepia { syntax:"*";inherits:false }\n@property --tw-drop-shadow { syntax:"*";inherits:false }\n@property --tw-drop-shadow-color { syntax:"*";inherits:false }\n@property --tw-drop-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-drop-shadow-size { syntax:"*";inherits:false }\n@property --tw-backdrop-blur { syntax:"*";inherits:false }\n@property --tw-backdrop-brightness { syntax:"*";inherits:false }\n@property --tw-backdrop-contrast { syntax:"*";inherits:false }\n@property --tw-backdrop-grayscale { syntax:"*";inherits:false }\n@property --tw-backdrop-hue-rotate { syntax:"*";inherits:false }\n@property --tw-backdrop-invert { syntax:"*";inherits:false }\n@property --tw-backdrop-opacity { syntax:"*";inherits:false }\n@property --tw-backdrop-saturate { syntax:"*";inherits:false }\n@property --tw-backdrop-sepia { syntax:"*";inherits:false }\n@property --tw-duration { syntax:"*";inherits:false }\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n');

// src/index.tsx
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
      const response = await fetch("https://zynta.cloud/api/bugs", {
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
