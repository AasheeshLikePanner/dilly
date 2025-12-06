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
styleInject('/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */\n@layer properties {\n  @supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {\n    *,\n    :before,\n    :after,\n    ::backdrop {\n      --tw-rotate-x:initial;\n      --tw-rotate-y:initial;\n      --tw-rotate-z:initial;\n      --tw-skew-x:initial;\n      --tw-skew-y:initial;\n      --tw-border-style:solid;\n      --tw-gradient-position:initial;\n      --tw-gradient-from:#0000;\n      --tw-gradient-via:#0000;\n      --tw-gradient-to:#0000;\n      --tw-gradient-stops:initial;\n      --tw-gradient-via-stops:initial;\n      --tw-gradient-from-position:0%;\n      --tw-gradient-via-position:50%;\n      --tw-gradient-to-position:100%;\n      --tw-leading:initial;\n      --tw-font-weight:initial;\n      --tw-tracking:initial;\n      --tw-shadow:0 0 #0000;\n      --tw-shadow-color:initial;\n      --tw-shadow-alpha:100%;\n      --tw-inset-shadow:0 0 #0000;\n      --tw-inset-shadow-color:initial;\n      --tw-inset-shadow-alpha:100%;\n      --tw-ring-color:initial;\n      --tw-ring-shadow:0 0 #0000;\n      --tw-inset-ring-color:initial;\n      --tw-inset-ring-shadow:0 0 #0000;\n      --tw-ring-inset:initial;\n      --tw-ring-offset-width:0px;\n      --tw-ring-offset-color:#fff;\n      --tw-ring-offset-shadow:0 0 #0000;\n      --tw-outline-style:solid;\n      --tw-blur:initial;\n      --tw-brightness:initial;\n      --tw-contrast:initial;\n      --tw-grayscale:initial;\n      --tw-hue-rotate:initial;\n      --tw-invert:initial;\n      --tw-opacity:initial;\n      --tw-saturate:initial;\n      --tw-sepia:initial;\n      --tw-drop-shadow:initial;\n      --tw-drop-shadow-color:initial;\n      --tw-drop-shadow-alpha:100%;\n      --tw-drop-shadow-size:initial;\n      --tw-animation-delay:0s;\n      --tw-animation-direction:normal;\n      --tw-animation-duration:initial;\n      --tw-animation-fill-mode:none;\n      --tw-animation-iteration-count:1;\n      --tw-enter-blur:0;\n      --tw-enter-opacity:1;\n      --tw-enter-rotate:0;\n      --tw-enter-scale:1;\n      --tw-enter-translate-x:0;\n      --tw-enter-translate-y:0;\n      --tw-exit-blur:0;\n      --tw-exit-opacity:1;\n      --tw-exit-rotate:0;\n      --tw-exit-scale:1;\n      --tw-exit-translate-x:0;\n      --tw-exit-translate-y:0;\n    }\n  }\n}\n@layer theme {\n  :root,\n  :host {\n    --color-red-500:oklch(63.7% .237 25.331);\n    --color-orange-500:oklch(70.5% .213 47.604);\n    --color-yellow-500:oklch(79.5% .184 86.047);\n    --color-blue-500:oklch(62.3% .214 259.815);\n    --color-rose-500:oklch(64.5% .246 16.439);\n    --color-zinc-200:oklch(92% .004 286.32);\n    --color-zinc-300:oklch(87.1% .006 286.286);\n    --color-zinc-500:oklch(55.2% .016 285.938);\n    --color-zinc-600:oklch(44.2% .017 285.786);\n    --color-zinc-700:oklch(37% .013 285.805);\n    --color-zinc-800:oklch(27.4% .006 286.033);\n    --color-zinc-900:oklch(21% .006 285.885);\n    --color-black:#000;\n    --color-white:#fff;\n    --spacing:.25rem;\n    --container-sm:24rem;\n    --text-xs:.75rem;\n    --text-xs--line-height:calc(1/.75);\n    --text-sm:.875rem;\n    --text-sm--line-height:calc(1.25/.875);\n    --text-lg:1.125rem;\n    --text-lg--line-height:calc(1.75/1.125);\n    --text-2xl:1.5rem;\n    --text-2xl--line-height:calc(2/1.5);\n    --text-4xl:2.25rem;\n    --text-4xl--line-height:calc(2.5/2.25);\n    --text-6xl:3.75rem;\n    --text-6xl--line-height:1;\n    --font-weight-medium:500;\n    --font-weight-bold:700;\n    --tracking-tight:-.025em;\n    --tracking-wider:.05em;\n    --leading-relaxed:1.625;\n    --radius-2xl:1rem;\n    --radius-3xl:1.5rem;\n    --default-transition-duration:.15s;\n    --default-transition-timing-function:cubic-bezier(.4,0,.2,1);\n    --default-font-family:var(--font-geist-sans);\n    --default-mono-font-family:var(--font-geist-mono);\n  }\n}\n@layer base {\n  *,\n  :after,\n  :before,\n  ::backdrop {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  ::file-selector-button {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  html,\n  :host {\n    -webkit-text-size-adjust: 100%;\n    tab-size: 4;\n    line-height: 1.5;\n    font-family: var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");\n    font-feature-settings: var(--default-font-feature-settings,normal);\n    font-variation-settings: var(--default-font-variation-settings,normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b,\n  strong {\n    font-weight: bolder;\n  }\n  code,\n  kbd,\n  samp,\n  pre {\n    font-family: var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings,normal);\n    font-variation-settings: var(--default-mono-font-variation-settings,normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub,\n  sup {\n    vertical-align: baseline;\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n  }\n  sub {\n    bottom: -.25em;\n  }\n  sup {\n    top: -.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol,\n  ul,\n  menu {\n    list-style: none;\n  }\n  img,\n  svg,\n  video,\n  canvas,\n  audio,\n  iframe,\n  embed,\n  object {\n    vertical-align: middle;\n    display: block;\n  }\n  img,\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n  button,\n  input,\n  select,\n  optgroup,\n  textarea {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px) {\n    ::placeholder {\n      color: currentColor;\n    }\n    @supports (color:color-mix(in lab, red, red)) {\n      ::placeholder {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-year-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-month-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-day-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-hour-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-minute-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-second-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-millisecond-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button,\n  input:where([type=button], [type=reset], [type=submit]) {\n    appearance: button;\n  }\n  ::file-selector-button {\n    appearance: button;\n  }\n  ::-webkit-inner-spin-button {\n    height: auto;\n  }\n  ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=until-found])) {\n    display: none !important;\n  }\n  * {\n    border-color: var(--border);\n    outline-color: var(--ring);\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    * {\n      outline-color: color-mix(in oklab, var(--ring)50%, transparent);\n    }\n  }\n}\n@layer components;\n@layer utilities {\n  .pointer-events-none {\n    pointer-events: none;\n  }\n  .absolute {\n    position: absolute;\n  }\n  .relative {\n    position: relative;\n  }\n  .top-0 {\n    top: calc(var(--spacing)*0);\n  }\n  .top-4 {\n    top: calc(var(--spacing)*4);\n  }\n  .right-0 {\n    right: calc(var(--spacing)*0);\n  }\n  .right-4 {\n    right: calc(var(--spacing)*4);\n  }\n  .left-0 {\n    left: calc(var(--spacing)*0);\n  }\n  .z-20 {\n    z-index: 20;\n  }\n  .mb-2 {\n    margin-bottom: calc(var(--spacing)*2);\n  }\n  .mb-4 {\n    margin-bottom: calc(var(--spacing)*4);\n  }\n  .mb-6 {\n    margin-bottom: calc(var(--spacing)*6);\n  }\n  .mb-10 {\n    margin-bottom: calc(var(--spacing)*10);\n  }\n  .block {\n    display: block;\n  }\n  .flex {\n    display: flex;\n  }\n  .table {\n    display: table;\n  }\n  .h-32 {\n    height: calc(var(--spacing)*32);\n  }\n  .h-\\[340px\\] {\n    height: 340px;\n  }\n  .w-full {\n    width: 100%;\n  }\n  .max-w-\\[200px\\] {\n    max-width: 200px;\n  }\n  .max-w-sm {\n    max-width: var(--container-sm);\n  }\n  .border-collapse {\n    border-collapse: collapse;\n  }\n  .transform {\n    transform: var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,);\n  }\n  .cursor-pointer {\n    cursor: pointer;\n  }\n  .resize {\n    resize: both;\n  }\n  .resize-none {\n    resize: none;\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .justify-between {\n    justify-content: space-between;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .gap-2 {\n    gap: calc(var(--spacing)*2);\n  }\n  .gap-4 {\n    gap: calc(var(--spacing)*4);\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .rounded-2xl {\n    border-radius: var(--radius-2xl);\n  }\n  .rounded-3xl {\n    border-radius: var(--radius-3xl);\n  }\n  .rounded-full {\n    border-radius: 3.40282e38px;\n  }\n  .rounded-xl {\n    border-radius: calc(var(--radius) + 4px);\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-white {\n    border-color: var(--color-white);\n  }\n  .border-white\\/5 {\n    border-color: #ffffff0d;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .border-white\\/5 {\n      border-color: color-mix(in oklab, var(--color-white)5%, transparent);\n    }\n  }\n  .border-zinc-800 {\n    border-color: var(--color-zinc-800);\n  }\n  .bg-\\[\\#111\\] {\n    background-color: #111;\n  }\n  .bg-blue-500 {\n    background-color: var(--color-blue-500);\n  }\n  .bg-orange-500 {\n    background-color: var(--color-orange-500);\n  }\n  .bg-red-500 {\n    background-color: var(--color-red-500);\n  }\n  .bg-rose-500 {\n    background-color: var(--color-rose-500);\n  }\n  .bg-white {\n    background-color: var(--color-white);\n  }\n  .bg-white\\/5 {\n    background-color: #ffffff0d;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-white\\/5 {\n      background-color: color-mix(in oklab, var(--color-white)5%, transparent);\n    }\n  }\n  .bg-yellow-500 {\n    background-color: var(--color-yellow-500);\n  }\n  .bg-zinc-900 {\n    background-color: var(--color-zinc-900);\n  }\n  .bg-zinc-900\\/50 {\n    background-color: #18181b80;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-zinc-900\\/50 {\n      background-color: color-mix(in oklab, var(--color-zinc-900)50%, transparent);\n    }\n  }\n  .bg-gradient-to-b {\n    --tw-gradient-position:to bottom in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  .from-white {\n    --tw-gradient-from:var(--color-white);\n    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position));\n  }\n  .from-white\\/5 {\n    --tw-gradient-from:#ffffff0d;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .from-white\\/5 {\n      --tw-gradient-from:color-mix(in oklab,var(--color-white)5%,transparent);\n    }\n  }\n  .from-white\\/5 {\n    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position));\n  }\n  .to-transparent {\n    --tw-gradient-to:transparent;\n    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position));\n  }\n  .p-3 {\n    padding: calc(var(--spacing)*3);\n  }\n  .p-4 {\n    padding: calc(var(--spacing)*4);\n  }\n  .p-6 {\n    padding: calc(var(--spacing)*6);\n  }\n  .p-8 {\n    padding: calc(var(--spacing)*8);\n  }\n  .p-10 {\n    padding: calc(var(--spacing)*10);\n  }\n  .px-3 {\n    padding-inline: calc(var(--spacing)*3);\n  }\n  .py-1 {\n    padding-block: calc(var(--spacing)*1);\n  }\n  .py-4 {\n    padding-block: calc(var(--spacing)*4);\n  }\n  .pt-8 {\n    padding-top: calc(var(--spacing)*8);\n  }\n  .pt-12 {\n    padding-top: calc(var(--spacing)*12);\n  }\n  .text-center {\n    text-align: center;\n  }\n  .text-2xl {\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading,var(--text-2xl--line-height));\n  }\n  .text-4xl {\n    font-size: var(--text-4xl);\n    line-height: var(--tw-leading,var(--text-4xl--line-height));\n  }\n  .text-6xl {\n    font-size: var(--text-6xl);\n    line-height: var(--tw-leading,var(--text-6xl--line-height));\n  }\n  .text-lg {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading,var(--text-lg--line-height));\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading,var(--text-sm--line-height));\n  }\n  .text-xs {\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading,var(--text-xs--line-height));\n  }\n  .leading-relaxed {\n    --tw-leading:var(--leading-relaxed);\n    line-height: var(--leading-relaxed);\n  }\n  .font-bold {\n    --tw-font-weight:var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  .font-medium {\n    --tw-font-weight:var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .tracking-tight {\n    --tw-tracking:var(--tracking-tight);\n    letter-spacing: var(--tracking-tight);\n  }\n  .tracking-wider {\n    --tw-tracking:var(--tracking-wider);\n    letter-spacing: var(--tracking-wider);\n  }\n  .text-black {\n    color: var(--color-black);\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .text-zinc-500 {\n    color: var(--color-zinc-500);\n  }\n  .text-zinc-600 {\n    color: var(--color-zinc-600);\n  }\n  .uppercase {\n    text-transform: uppercase;\n  }\n  .underline {\n    text-decoration-line: underline;\n  }\n  .shadow-2xl {\n    --tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .filter {\n    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);\n  }\n  .transition {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to,\n      opacity,\n      box-shadow,\n      transform,\n      translate,\n      scale,\n      rotate,\n      filter,\n      -webkit-backdrop-filter,\n      backdrop-filter,\n      display,\n      content-visibility,\n      overlay,\n      pointer-events;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .transition-all {\n    transition-property: all;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .transition-colors {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .outline-none {\n    --tw-outline-style:none;\n    outline-style: none;\n  }\n  .placeholder\\:text-zinc-600::placeholder {\n    color: var(--color-zinc-600);\n  }\n  @media (hover: hover) {\n    .hover\\:bg-white\\/5:hover {\n      background-color: #ffffff0d;\n    }\n    @supports (color:color-mix(in lab, red, red)) {\n      .hover\\:bg-white\\/5:hover {\n        background-color: color-mix(in oklab, var(--color-white)5%, transparent);\n      }\n    }\n    .hover\\:bg-zinc-200:hover {\n      background-color: var(--color-zinc-200);\n    }\n    .hover\\:text-white:hover {\n      color: var(--color-white);\n    }\n    .hover\\:text-zinc-300:hover {\n      color: var(--color-zinc-300);\n    }\n  }\n  .focus\\:border-zinc-700:focus {\n    border-color: var(--color-zinc-700);\n  }\n  .focus\\:ring-2:focus {\n    --tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .focus\\:ring-white\\/10:focus {\n    --tw-ring-color:#ffffff1a;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .focus\\:ring-white\\/10:focus {\n      --tw-ring-color:color-mix(in oklab,var(--color-white)10%,transparent);\n    }\n  }\n  .focus\\:outline-none:focus {\n    --tw-outline-style:none;\n    outline-style: none;\n  }\n  .disabled\\:cursor-not-allowed:disabled {\n    cursor: not-allowed;\n  }\n  .disabled\\:opacity-50:disabled {\n    opacity: .5;\n  }\n}\n@property --tw-animation-delay { syntax:"*";inherits:false;initial-value:0s }\n@property --tw-animation-direction { syntax:"*";inherits:false;initial-value:normal }\n@property --tw-animation-duration { syntax:"*";inherits:false }\n@property --tw-animation-fill-mode { syntax:"*";inherits:false;initial-value:none }\n@property --tw-animation-iteration-count { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-translate-y { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-translate-y { syntax:"*";inherits:false;initial-value:0 }\n:root {\n  --radius:.625rem;\n  --background:#fafaf9;\n  --bg-body:#fafaf9;\n  --bg-gradient-start:#fafaf9;\n  --bg-gradient-end:#ebebe9;\n  --card:#fff;\n  --bg-card:#fff;\n  --bg-card-hover:#f5f5f4;\n  --border:#e7e5e4;\n  --border-subtle:#e7e5e4;\n  --border-highlight:#d6d3d1;\n  --foreground:#1c1917;\n  --text-primary:#1c1917;\n  --secondary-foreground:#57534e;\n  --text-secondary:#57534e;\n  --muted-foreground:#78716c;\n  --text-tertiary:#78716c;\n  --status-red:#ef4444;\n  --status-green:#22c55e;\n  --status-orange:#f97316;\n  --status-blue:#3b82f6;\n  --popover:0 0% 100%;\n  --popover-foreground:240 10% 3.9%;\n  --primary:240 5.9% 10%;\n  --primary-foreground:0 0% 98%;\n  --secondary:240 4.8% 95.9%;\n  --muted:240 4.8% 95.9%;\n  --accent:240 4.8% 95.9%;\n  --accent-foreground:240 5.9% 10%;\n  --destructive:0 84.2% 60.2%;\n  --input:240 5.9% 90%;\n  --ring:240 10% 3.9%;\n  --chart-1:#e76e50;\n  --chart-2:#2a9d90;\n  --chart-3:#274754;\n  --chart-4:#e8c468;\n  --chart-5:#f4a462;\n  --sidebar:#f5f5f4;\n  --sidebar-foreground:#1c1917;\n  --sidebar-primary:240 5.9% 10%;\n  --sidebar-primary-foreground:0 0% 98%;\n  --sidebar-accent:#e7e5e4;\n  --sidebar-accent-foreground:#1c1917;\n  --sidebar-border:#e7e5e4;\n  --sidebar-ring:#d6d3d1;\n}\n.dark {\n  --background:#101010;\n  --bg-body:#101010;\n  --card:#151516;\n  --bg-card:#151516;\n  --bg-card-hover:#1c1c1e;\n  --border:#2c2c2e;\n  --border-subtle:#2c2c2e;\n  --border-highlight:#3a3a3c;\n  --foreground:#fff;\n  --text-primary:#fff;\n  --secondary-foreground:#8e8e93;\n  --text-secondary:#8e8e93;\n  --muted-foreground:#48484a;\n  --text-tertiary:#48484a;\n  --status-red:#ff453a;\n  --status-green:#32d74b;\n  --status-orange:#ff9f0a;\n  --status-blue:#0a84ff;\n  --popover:.205 0 0;\n  --popover-foreground:.985 0 0;\n  --primary:.922 0 0;\n  --primary-foreground:.205 0 0;\n  --secondary:.269 0 0;\n  --muted:.269 0 0;\n  --accent:.269 0 0;\n  --accent-foreground:.985 0 0;\n  --destructive:.704 .191 22.216;\n  --input:1 0 0/15%;\n  --ring:.556 0 0;\n  --chart-1:oklch(48.8% .243 264.376);\n  --chart-2:oklch(69.6% .17 162.48);\n  --chart-3:oklch(76.9% .188 70.08);\n  --chart-4:oklch(62.7% .265 303.9);\n  --chart-5:oklch(64.5% .246 16.439);\n  --sidebar:#161616;\n  --sidebar-foreground:#fff;\n  --sidebar-primary:.488 .243 264.376;\n  --sidebar-primary-foreground:#fff;\n  --sidebar-accent:#2c2c2e;\n  --sidebar-accent-foreground:#fff;\n  --sidebar-border:#ffffff1a;\n  --sidebar-ring:#8e8e93;\n}\n.background-spotlight {\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      #222 0%,\n      #101010 60%);\n}\n.text-metallic {\n  -webkit-text-fill-color: transparent;\n  background:\n    linear-gradient(\n      135deg,\n      #fff 0%,\n      #a1a1aa 100%);\n  -webkit-background-clip: text;\n}\n.glass-panel {\n  -webkit-backdrop-filter: blur(20px)saturate(180%);\n  border-bottom: 1px solid var(--border-subtle);\n  background: #101010b3;\n}\n@keyframes magic-pulse {\n  0%, to {\n    opacity: .4;\n    filter: blur();\n    transform: scale(.995);\n  }\n  50% {\n    opacity: .8;\n    filter: blur(1px);\n    transform: scale(1);\n  }\n}\n.animate-magic-pulse {\n  animation: 2.5s cubic-bezier(.4, 0, .2, 1) infinite magic-pulse;\n}\n@property --tw-rotate-x { syntax:"*";inherits:false }\n@property --tw-rotate-y { syntax:"*";inherits:false }\n@property --tw-rotate-z { syntax:"*";inherits:false }\n@property --tw-skew-x { syntax:"*";inherits:false }\n@property --tw-skew-y { syntax:"*";inherits:false }\n@property --tw-border-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-gradient-position { syntax:"*";inherits:false }\n@property --tw-gradient-from { syntax:"<color>";inherits:false;initial-value:#0000 }\n@property --tw-gradient-via { syntax:"<color>";inherits:false;initial-value:#0000 }\n@property --tw-gradient-to { syntax:"<color>";inherits:false;initial-value:#0000 }\n@property --tw-gradient-stops { syntax:"*";inherits:false }\n@property --tw-gradient-via-stops { syntax:"*";inherits:false }\n@property --tw-gradient-from-position { syntax:"<length-percentage>";inherits:false;initial-value:0% }\n@property --tw-gradient-via-position { syntax:"<length-percentage>";inherits:false;initial-value:50% }\n@property --tw-gradient-to-position { syntax:"<length-percentage>";inherits:false;initial-value:100% }\n@property --tw-leading { syntax:"*";inherits:false }\n@property --tw-font-weight { syntax:"*";inherits:false }\n@property --tw-tracking { syntax:"*";inherits:false }\n@property --tw-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-shadow-color { syntax:"*";inherits:false }\n@property --tw-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-inset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-shadow-color { syntax:"*";inherits:false }\n@property --tw-inset-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-ring-color { syntax:"*";inherits:false }\n@property --tw-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-ring-color { syntax:"*";inherits:false }\n@property --tw-inset-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-ring-inset { syntax:"*";inherits:false }\n@property --tw-ring-offset-width { syntax:"<length>";inherits:false;initial-value:0 }\n@property --tw-ring-offset-color { syntax:"*";inherits:false;initial-value:#fff }\n@property --tw-ring-offset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-outline-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-blur { syntax:"*";inherits:false }\n@property --tw-brightness { syntax:"*";inherits:false }\n@property --tw-contrast { syntax:"*";inherits:false }\n@property --tw-grayscale { syntax:"*";inherits:false }\n@property --tw-hue-rotate { syntax:"*";inherits:false }\n@property --tw-invert { syntax:"*";inherits:false }\n@property --tw-opacity { syntax:"*";inherits:false }\n@property --tw-saturate { syntax:"*";inherits:false }\n@property --tw-sepia { syntax:"*";inherits:false }\n@property --tw-drop-shadow { syntax:"*";inherits:false }\n@property --tw-drop-shadow-color { syntax:"*";inherits:false }\n@property --tw-drop-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-drop-shadow-size { syntax:"*";inherits:false }\n');

// src/index.tsx
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
      const response = await fetch("https://www.zynta.cloud/api/feedback", {
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
