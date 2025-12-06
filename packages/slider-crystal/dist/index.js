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
styleInject('/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */\n@layer properties {\n  @supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {\n    *,\n    :before,\n    :after,\n    ::backdrop {\n      --tw-rotate-x:initial;\n      --tw-rotate-y:initial;\n      --tw-rotate-z:initial;\n      --tw-skew-x:initial;\n      --tw-skew-y:initial;\n      --tw-border-style:solid;\n      --tw-gradient-position:initial;\n      --tw-gradient-from:#0000;\n      --tw-gradient-via:#0000;\n      --tw-gradient-to:#0000;\n      --tw-gradient-stops:initial;\n      --tw-gradient-via-stops:initial;\n      --tw-gradient-from-position:0%;\n      --tw-gradient-via-position:50%;\n      --tw-gradient-to-position:100%;\n      --tw-leading:initial;\n      --tw-font-weight:initial;\n      --tw-tracking:initial;\n      --tw-shadow:0 0 #0000;\n      --tw-shadow-color:initial;\n      --tw-shadow-alpha:100%;\n      --tw-inset-shadow:0 0 #0000;\n      --tw-inset-shadow-color:initial;\n      --tw-inset-shadow-alpha:100%;\n      --tw-ring-color:initial;\n      --tw-ring-shadow:0 0 #0000;\n      --tw-inset-ring-color:initial;\n      --tw-inset-ring-shadow:0 0 #0000;\n      --tw-ring-inset:initial;\n      --tw-ring-offset-width:0px;\n      --tw-ring-offset-color:#fff;\n      --tw-ring-offset-shadow:0 0 #0000;\n      --tw-outline-style:solid;\n      --tw-blur:initial;\n      --tw-brightness:initial;\n      --tw-contrast:initial;\n      --tw-grayscale:initial;\n      --tw-hue-rotate:initial;\n      --tw-invert:initial;\n      --tw-opacity:initial;\n      --tw-saturate:initial;\n      --tw-sepia:initial;\n      --tw-drop-shadow:initial;\n      --tw-drop-shadow-color:initial;\n      --tw-drop-shadow-alpha:100%;\n      --tw-drop-shadow-size:initial;\n      --tw-backdrop-blur:initial;\n      --tw-backdrop-brightness:initial;\n      --tw-backdrop-contrast:initial;\n      --tw-backdrop-grayscale:initial;\n      --tw-backdrop-hue-rotate:initial;\n      --tw-backdrop-invert:initial;\n      --tw-backdrop-opacity:initial;\n      --tw-backdrop-saturate:initial;\n      --tw-backdrop-sepia:initial;\n      --tw-animation-delay:0s;\n      --tw-animation-direction:normal;\n      --tw-animation-duration:initial;\n      --tw-animation-fill-mode:none;\n      --tw-animation-iteration-count:1;\n      --tw-enter-blur:0;\n      --tw-enter-opacity:1;\n      --tw-enter-rotate:0;\n      --tw-enter-scale:1;\n      --tw-enter-translate-x:0;\n      --tw-enter-translate-y:0;\n      --tw-exit-blur:0;\n      --tw-exit-opacity:1;\n      --tw-exit-rotate:0;\n      --tw-exit-scale:1;\n      --tw-exit-translate-x:0;\n      --tw-exit-translate-y:0;\n    }\n  }\n}\n@layer theme {\n  :root,\n  :host {\n    --color-red-500:oklch(63.7% .237 25.331);\n    --color-yellow-500:oklch(79.5% .184 86.047);\n    --color-emerald-500:oklch(69.6% .17 162.48);\n    --color-zinc-500:oklch(55.2% .016 285.938);\n    --color-zinc-600:oklch(44.2% .017 285.786);\n    --color-zinc-800:oklch(27.4% .006 286.033);\n    --color-zinc-900:oklch(21% .006 285.885);\n    --color-black:#000;\n    --color-white:#fff;\n    --spacing:.25rem;\n    --text-sm:.875rem;\n    --text-sm--line-height:calc(1.25/.875);\n    --text-3xl:1.875rem;\n    --text-3xl--line-height:calc(2.25/1.875);\n    --font-weight-medium:500;\n    --font-weight-bold:700;\n    --tracking-widest:.1em;\n    --animate-spin:spin 1s linear infinite;\n    --blur-md:12px;\n    --default-transition-duration:.15s;\n    --default-transition-timing-function:cubic-bezier(.4,0,.2,1);\n    --default-font-family:var(--font-geist-sans);\n    --default-mono-font-family:var(--font-geist-mono);\n  }\n}\n@layer base {\n  *,\n  :after,\n  :before,\n  ::backdrop {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  ::file-selector-button {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  html,\n  :host {\n    -webkit-text-size-adjust: 100%;\n    tab-size: 4;\n    line-height: 1.5;\n    font-family: var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");\n    font-feature-settings: var(--default-font-feature-settings,normal);\n    font-variation-settings: var(--default-font-variation-settings,normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b,\n  strong {\n    font-weight: bolder;\n  }\n  code,\n  kbd,\n  samp,\n  pre {\n    font-family: var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings,normal);\n    font-variation-settings: var(--default-mono-font-variation-settings,normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub,\n  sup {\n    vertical-align: baseline;\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n  }\n  sub {\n    bottom: -.25em;\n  }\n  sup {\n    top: -.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol,\n  ul,\n  menu {\n    list-style: none;\n  }\n  img,\n  svg,\n  video,\n  canvas,\n  audio,\n  iframe,\n  embed,\n  object {\n    vertical-align: middle;\n    display: block;\n  }\n  img,\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n  button,\n  input,\n  select,\n  optgroup,\n  textarea {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px) {\n    ::placeholder {\n      color: currentColor;\n    }\n    @supports (color:color-mix(in lab, red, red)) {\n      ::placeholder {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-year-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-month-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-day-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-hour-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-minute-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-second-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-millisecond-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button,\n  input:where([type=button], [type=reset], [type=submit]) {\n    appearance: button;\n  }\n  ::file-selector-button {\n    appearance: button;\n  }\n  ::-webkit-inner-spin-button {\n    height: auto;\n  }\n  ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=until-found])) {\n    display: none !important;\n  }\n  * {\n    border-color: var(--border);\n    outline-color: var(--ring);\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    * {\n      outline-color: color-mix(in oklab, var(--ring)50%, transparent);\n    }\n  }\n}\n@layer components;\n@layer utilities {\n  .pointer-events-none {\n    pointer-events: none;\n  }\n  .absolute {\n    position: absolute;\n  }\n  .relative {\n    position: relative;\n  }\n  .inset-0 {\n    inset: calc(var(--spacing)*0);\n  }\n  .right-0 {\n    right: calc(var(--spacing)*0);\n  }\n  .bottom-0 {\n    bottom: calc(var(--spacing)*0);\n  }\n  .left-0 {\n    left: calc(var(--spacing)*0);\n  }\n  .mb-1 {\n    margin-bottom: calc(var(--spacing)*1);\n  }\n  .mb-8 {\n    margin-bottom: calc(var(--spacing)*8);\n  }\n  .flex {\n    display: flex;\n  }\n  .table {\n    display: table;\n  }\n  .h-12 {\n    height: calc(var(--spacing)*12);\n  }\n  .h-24 {\n    height: calc(var(--spacing)*24);\n  }\n  .w-7 {\n    width: calc(var(--spacing)*7);\n  }\n  .w-12 {\n    width: calc(var(--spacing)*12);\n  }\n  .w-full {\n    width: 100%;\n  }\n  .border-collapse {\n    border-collapse: collapse;\n  }\n  .transform {\n    transform: var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,);\n  }\n  .animate-spin {\n    animation: var(--animate-spin);\n  }\n  .resize {\n    resize: both;\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .items-baseline {\n    align-items: baseline;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .justify-between {\n    justify-content: space-between;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .gap-1 {\n    gap: calc(var(--spacing)*1);\n  }\n  .gap-2 {\n    gap: calc(var(--spacing)*2);\n  }\n  .gap-8 {\n    gap: calc(var(--spacing)*8);\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .rounded-\\[2\\.5rem\\] {\n    border-radius: 2.5rem;\n  }\n  .rounded-full {\n    border-radius: 3.40282e38px;\n  }\n  .rounded-lg {\n    border-radius: var(--radius);\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-white {\n    border-color: var(--color-white);\n  }\n  .border-white\\/5 {\n    border-color: #ffffff0d;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .border-white\\/5 {\n      border-color: color-mix(in oklab, var(--color-white)5%, transparent);\n    }\n  }\n  .bg-black {\n    background-color: var(--color-black);\n  }\n  .bg-black\\/50 {\n    background-color: #00000080;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-black\\/50 {\n      background-color: color-mix(in oklab, var(--color-black)50%, transparent);\n    }\n  }\n  .bg-emerald-500 {\n    background-color: var(--color-emerald-500);\n  }\n  .bg-red-500 {\n    background-color: var(--color-red-500);\n  }\n  .bg-white {\n    background-color: var(--color-white);\n  }\n  .bg-yellow-500 {\n    background-color: var(--color-yellow-500);\n  }\n  .bg-zinc-800 {\n    background-color: var(--color-zinc-800);\n  }\n  .bg-zinc-900 {\n    background-color: var(--color-zinc-900);\n  }\n  .bg-zinc-900\\/50 {\n    background-color: #18181b80;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-zinc-900\\/50 {\n      background-color: color-mix(in oklab, var(--color-zinc-900)50%, transparent);\n    }\n  }\n  .bg-gradient-to-b {\n    --tw-gradient-position:to bottom in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  .from-white {\n    --tw-gradient-from:var(--color-white);\n    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position));\n  }\n  .from-white\\/10 {\n    --tw-gradient-from:#ffffff1a;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .from-white\\/10 {\n      --tw-gradient-from:color-mix(in oklab,var(--color-white)10%,transparent);\n    }\n  }\n  .from-white\\/10 {\n    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position));\n  }\n  .to-transparent {\n    --tw-gradient-to:transparent;\n    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position));\n  }\n  .p-8 {\n    padding: calc(var(--spacing)*8);\n  }\n  .px-2 {\n    padding-inline: calc(var(--spacing)*2);\n  }\n  .text-3xl {\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading,var(--text-3xl--line-height));\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading,var(--text-sm--line-height));\n  }\n  .text-\\[10px\\] {\n    font-size: 10px;\n  }\n  .leading-none {\n    --tw-leading:1;\n    line-height: 1;\n  }\n  .font-bold {\n    --tw-font-weight:var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  .font-medium {\n    --tw-font-weight:var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .tracking-widest {\n    --tw-tracking:var(--tracking-widest);\n    letter-spacing: var(--tracking-widest);\n  }\n  .text-black {\n    color: var(--color-black);\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .text-zinc-500 {\n    color: var(--color-zinc-500);\n  }\n  .text-zinc-600 {\n    color: var(--color-zinc-600);\n  }\n  .uppercase {\n    text-transform: uppercase;\n  }\n  .underline {\n    text-decoration-line: underline;\n  }\n  .shadow-2xl {\n    --tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-\\[0_0_20px_rgba\\(16\\,185\\,129\\,0\\.5\\)\\] {\n    --tw-shadow:0 0 20px var(--tw-shadow-color,#10b98180);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-\\[0_0_20px_rgba\\(255\\,255\\,255\\,0\\.3\\)\\] {\n    --tw-shadow:0 0 20px var(--tw-shadow-color,#ffffff4d);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-\\[0_0_25px_rgba\\(16\\,185\\,129\\,0\\.4\\)\\] {\n    --tw-shadow:0 0 25px var(--tw-shadow-color,#10b98166);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-\\[0_0_25px_rgba\\(234\\,179\\,8\\,0\\.4\\)\\] {\n    --tw-shadow:0 0 25px var(--tw-shadow-color,#eab30866);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-\\[0_0_25px_rgba\\(239\\,68\\,68\\,0\\.4\\)\\] {\n    --tw-shadow:0 0 25px var(--tw-shadow-color,#ef444466);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .filter {\n    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);\n  }\n  .backdrop-blur-md {\n    --tw-backdrop-blur:blur(var(--blur-md));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .backdrop-filter {\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .transition {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to,\n      opacity,\n      box-shadow,\n      transform,\n      translate,\n      scale,\n      rotate,\n      filter,\n      -webkit-backdrop-filter,\n      backdrop-filter,\n      display,\n      content-visibility,\n      overlay,\n      pointer-events;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .outline-none {\n    --tw-outline-style:none;\n    outline-style: none;\n  }\n  .disabled\\:cursor-not-allowed:disabled {\n    cursor: not-allowed;\n  }\n  .disabled\\:opacity-50:disabled {\n    opacity: .5;\n  }\n}\n@property --tw-animation-delay { syntax:"*";inherits:false;initial-value:0s }\n@property --tw-animation-direction { syntax:"*";inherits:false;initial-value:normal }\n@property --tw-animation-duration { syntax:"*";inherits:false }\n@property --tw-animation-fill-mode { syntax:"*";inherits:false;initial-value:none }\n@property --tw-animation-iteration-count { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-translate-y { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-translate-y { syntax:"*";inherits:false;initial-value:0 }\n:root {\n  --radius:.625rem;\n  --background:#fafaf9;\n  --bg-body:#fafaf9;\n  --bg-gradient-start:#fafaf9;\n  --bg-gradient-end:#ebebe9;\n  --card:#fff;\n  --bg-card:#fff;\n  --bg-card-hover:#f5f5f4;\n  --border:#e7e5e4;\n  --border-subtle:#e7e5e4;\n  --border-highlight:#d6d3d1;\n  --foreground:#1c1917;\n  --text-primary:#1c1917;\n  --secondary-foreground:#57534e;\n  --text-secondary:#57534e;\n  --muted-foreground:#78716c;\n  --text-tertiary:#78716c;\n  --status-red:#ef4444;\n  --status-green:#22c55e;\n  --status-orange:#f97316;\n  --status-blue:#3b82f6;\n  --popover:0 0% 100%;\n  --popover-foreground:240 10% 3.9%;\n  --primary:240 5.9% 10%;\n  --primary-foreground:0 0% 98%;\n  --secondary:240 4.8% 95.9%;\n  --muted:240 4.8% 95.9%;\n  --accent:240 4.8% 95.9%;\n  --accent-foreground:240 5.9% 10%;\n  --destructive:0 84.2% 60.2%;\n  --input:240 5.9% 90%;\n  --ring:240 10% 3.9%;\n  --chart-1:#e76e50;\n  --chart-2:#2a9d90;\n  --chart-3:#274754;\n  --chart-4:#e8c468;\n  --chart-5:#f4a462;\n  --sidebar:#f5f5f4;\n  --sidebar-foreground:#1c1917;\n  --sidebar-primary:240 5.9% 10%;\n  --sidebar-primary-foreground:0 0% 98%;\n  --sidebar-accent:#e7e5e4;\n  --sidebar-accent-foreground:#1c1917;\n  --sidebar-border:#e7e5e4;\n  --sidebar-ring:#d6d3d1;\n}\n.dark {\n  --background:#101010;\n  --bg-body:#101010;\n  --card:#151516;\n  --bg-card:#151516;\n  --bg-card-hover:#1c1c1e;\n  --border:#2c2c2e;\n  --border-subtle:#2c2c2e;\n  --border-highlight:#3a3a3c;\n  --foreground:#fff;\n  --text-primary:#fff;\n  --secondary-foreground:#8e8e93;\n  --text-secondary:#8e8e93;\n  --muted-foreground:#48484a;\n  --text-tertiary:#48484a;\n  --status-red:#ff453a;\n  --status-green:#32d74b;\n  --status-orange:#ff9f0a;\n  --status-blue:#0a84ff;\n  --popover:.205 0 0;\n  --popover-foreground:.985 0 0;\n  --primary:.922 0 0;\n  --primary-foreground:.205 0 0;\n  --secondary:.269 0 0;\n  --muted:.269 0 0;\n  --accent:.269 0 0;\n  --accent-foreground:.985 0 0;\n  --destructive:.704 .191 22.216;\n  --input:1 0 0/15%;\n  --ring:.556 0 0;\n  --chart-1:oklch(48.8% .243 264.376);\n  --chart-2:oklch(69.6% .17 162.48);\n  --chart-3:oklch(76.9% .188 70.08);\n  --chart-4:oklch(62.7% .265 303.9);\n  --chart-5:oklch(64.5% .246 16.439);\n  --sidebar:#161616;\n  --sidebar-foreground:#fff;\n  --sidebar-primary:.488 .243 264.376;\n  --sidebar-primary-foreground:#fff;\n  --sidebar-accent:#2c2c2e;\n  --sidebar-accent-foreground:#fff;\n  --sidebar-border:#ffffff1a;\n  --sidebar-ring:#8e8e93;\n}\n.background-spotlight {\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      #222 0%,\n      #101010 60%);\n}\n.text-metallic {\n  -webkit-text-fill-color: transparent;\n  background:\n    linear-gradient(\n      135deg,\n      #fff 0%,\n      #a1a1aa 100%);\n  -webkit-background-clip: text;\n}\n.glass-panel {\n  -webkit-backdrop-filter: blur(20px)saturate(180%);\n  border-bottom: 1px solid var(--border-subtle);\n  background: #101010b3;\n}\n@keyframes magic-pulse {\n  0%, to {\n    opacity: .4;\n    filter: blur();\n    transform: scale(.995);\n  }\n  50% {\n    opacity: .8;\n    filter: blur(1px);\n    transform: scale(1);\n  }\n}\n.animate-magic-pulse {\n  animation: 2.5s cubic-bezier(.4, 0, .2, 1) infinite magic-pulse;\n}\n@property --tw-rotate-x { syntax:"*";inherits:false }\n@property --tw-rotate-y { syntax:"*";inherits:false }\n@property --tw-rotate-z { syntax:"*";inherits:false }\n@property --tw-skew-x { syntax:"*";inherits:false }\n@property --tw-skew-y { syntax:"*";inherits:false }\n@property --tw-border-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-gradient-position { syntax:"*";inherits:false }\n@property --tw-gradient-from { syntax:"<color>";inherits:false;initial-value:#0000 }\n@property --tw-gradient-via { syntax:"<color>";inherits:false;initial-value:#0000 }\n@property --tw-gradient-to { syntax:"<color>";inherits:false;initial-value:#0000 }\n@property --tw-gradient-stops { syntax:"*";inherits:false }\n@property --tw-gradient-via-stops { syntax:"*";inherits:false }\n@property --tw-gradient-from-position { syntax:"<length-percentage>";inherits:false;initial-value:0% }\n@property --tw-gradient-via-position { syntax:"<length-percentage>";inherits:false;initial-value:50% }\n@property --tw-gradient-to-position { syntax:"<length-percentage>";inherits:false;initial-value:100% }\n@property --tw-leading { syntax:"*";inherits:false }\n@property --tw-font-weight { syntax:"*";inherits:false }\n@property --tw-tracking { syntax:"*";inherits:false }\n@property --tw-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-shadow-color { syntax:"*";inherits:false }\n@property --tw-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-inset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-shadow-color { syntax:"*";inherits:false }\n@property --tw-inset-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-ring-color { syntax:"*";inherits:false }\n@property --tw-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-ring-color { syntax:"*";inherits:false }\n@property --tw-inset-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-ring-inset { syntax:"*";inherits:false }\n@property --tw-ring-offset-width { syntax:"<length>";inherits:false;initial-value:0 }\n@property --tw-ring-offset-color { syntax:"*";inherits:false;initial-value:#fff }\n@property --tw-ring-offset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-outline-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-blur { syntax:"*";inherits:false }\n@property --tw-brightness { syntax:"*";inherits:false }\n@property --tw-contrast { syntax:"*";inherits:false }\n@property --tw-grayscale { syntax:"*";inherits:false }\n@property --tw-hue-rotate { syntax:"*";inherits:false }\n@property --tw-invert { syntax:"*";inherits:false }\n@property --tw-opacity { syntax:"*";inherits:false }\n@property --tw-saturate { syntax:"*";inherits:false }\n@property --tw-sepia { syntax:"*";inherits:false }\n@property --tw-drop-shadow { syntax:"*";inherits:false }\n@property --tw-drop-shadow-color { syntax:"*";inherits:false }\n@property --tw-drop-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-drop-shadow-size { syntax:"*";inherits:false }\n@property --tw-backdrop-blur { syntax:"*";inherits:false }\n@property --tw-backdrop-brightness { syntax:"*";inherits:false }\n@property --tw-backdrop-contrast { syntax:"*";inherits:false }\n@property --tw-backdrop-grayscale { syntax:"*";inherits:false }\n@property --tw-backdrop-hue-rotate { syntax:"*";inherits:false }\n@property --tw-backdrop-invert { syntax:"*";inherits:false }\n@property --tw-backdrop-opacity { syntax:"*";inherits:false }\n@property --tw-backdrop-saturate { syntax:"*";inherits:false }\n@property --tw-backdrop-sepia { syntax:"*";inherits:false }\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n');

// src/index.tsx
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
      const response = await fetch("https://www.zynta.cloud/api/feedback", {
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
