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
styleInject(`/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */
@layer properties {
  @supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {
    *,
    :before,
    :after,
    ::backdrop {
      --tw-translate-x:0;
      --tw-translate-y:0;
      --tw-translate-z:0;
      --tw-rotate-x:initial;
      --tw-rotate-y:initial;
      --tw-rotate-z:initial;
      --tw-skew-x:initial;
      --tw-skew-y:initial;
      --tw-border-style:solid;
      --tw-leading:initial;
      --tw-font-weight:initial;
      --tw-tracking:initial;
      --tw-shadow:0 0 #0000;
      --tw-shadow-color:initial;
      --tw-shadow-alpha:100%;
      --tw-inset-shadow:0 0 #0000;
      --tw-inset-shadow-color:initial;
      --tw-inset-shadow-alpha:100%;
      --tw-ring-color:initial;
      --tw-ring-shadow:0 0 #0000;
      --tw-inset-ring-color:initial;
      --tw-inset-ring-shadow:0 0 #0000;
      --tw-ring-inset:initial;
      --tw-ring-offset-width:0px;
      --tw-ring-offset-color:#fff;
      --tw-ring-offset-shadow:0 0 #0000;
      --tw-outline-style:solid;
      --tw-blur:initial;
      --tw-brightness:initial;
      --tw-contrast:initial;
      --tw-grayscale:initial;
      --tw-hue-rotate:initial;
      --tw-invert:initial;
      --tw-opacity:initial;
      --tw-saturate:initial;
      --tw-sepia:initial;
      --tw-drop-shadow:initial;
      --tw-drop-shadow-color:initial;
      --tw-drop-shadow-alpha:100%;
      --tw-drop-shadow-size:initial;
      --tw-backdrop-blur:initial;
      --tw-backdrop-brightness:initial;
      --tw-backdrop-contrast:initial;
      --tw-backdrop-grayscale:initial;
      --tw-backdrop-hue-rotate:initial;
      --tw-backdrop-invert:initial;
      --tw-backdrop-opacity:initial;
      --tw-backdrop-saturate:initial;
      --tw-backdrop-sepia:initial;
      --tw-duration:initial;
      --tw-animation-delay:0s;
      --tw-animation-direction:normal;
      --tw-animation-duration:initial;
      --tw-animation-fill-mode:none;
      --tw-animation-iteration-count:1;
      --tw-enter-blur:0;
      --tw-enter-opacity:1;
      --tw-enter-rotate:0;
      --tw-enter-scale:1;
      --tw-enter-translate-x:0;
      --tw-enter-translate-y:0;
      --tw-exit-blur:0;
      --tw-exit-opacity:1;
      --tw-exit-rotate:0;
      --tw-exit-scale:1;
      --tw-exit-translate-x:0;
      --tw-exit-translate-y:0;
    }
  }
}
@layer theme {
  :root,
  :host {
    --color-red-400:oklch(70.4% .191 22.216);
    --color-emerald-500:oklch(69.6% .17 162.48);
    --color-indigo-500:oklch(58.5% .233 277.117);
    --color-indigo-600:oklch(51.1% .262 276.966);
    --color-zinc-400:oklch(70.5% .015 286.067);
    --color-zinc-500:oklch(55.2% .016 285.938);
    --color-zinc-600:oklch(44.2% .017 285.786);
    --color-zinc-700:oklch(37% .013 285.805);
    --color-zinc-800:oklch(27.4% .006 286.033);
    --color-black:#000;
    --color-white:#fff;
    --spacing:.25rem;
    --text-xs:.75rem;
    --text-xs--line-height:calc(1/.75);
    --text-sm:.875rem;
    --text-sm--line-height:calc(1.25/.875);
    --text-lg:1.125rem;
    --text-lg--line-height:calc(1.75/1.125);
    --text-xl:1.25rem;
    --text-xl--line-height:calc(1.75/1.25);
    --font-weight-light:300;
    --font-weight-medium:500;
    --font-weight-semibold:600;
    --font-weight-bold:700;
    --tracking-tight:-.025em;
    --tracking-wider:.05em;
    --leading-relaxed:1.625;
    --blur-sm:8px;
    --default-transition-duration:.15s;
    --default-transition-timing-function:cubic-bezier(.4,0,.2,1);
    --default-font-family:var(--font-geist-sans);
    --default-mono-font-family:var(--font-geist-mono);
  }
}
@layer base {
  *,
  :after,
  :before,
  ::backdrop {
    box-sizing: border-box;
    border: 0 solid;
    margin: 0;
    padding: 0;
  }
  ::file-selector-button {
    box-sizing: border-box;
    border: 0 solid;
    margin: 0;
    padding: 0;
  }
  html,
  :host {
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    line-height: 1.5;
    font-family: var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings,normal);
    font-variation-settings: var(--default-font-variation-settings,normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    -webkit-text-decoration: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp,
  pre {
    font-family: var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);
    font-feature-settings: var(--default-mono-font-feature-settings,normal);
    font-variation-settings: var(--default-mono-font-variation-settings,normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    vertical-align: baseline;
    font-size: 75%;
    line-height: 0;
    position: relative;
  }
  sub {
    bottom: -.25em;
  }
  sup {
    top: -.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol,
  ul,
  menu {
    list-style: none;
  }
  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    vertical-align: middle;
    display: block;
  }
  img,
  video {
    max-width: 100%;
    height: auto;
  }
  button,
  input,
  select,
  optgroup,
  textarea {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    opacity: 1;
    background-color: #0000;
    border-radius: 0;
  }
  ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    opacity: 1;
    background-color: #0000;
    border-radius: 0;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px) {
    ::placeholder {
      color: currentColor;
    }
    @supports (color:color-mix(in lab, red, red)) {
      ::placeholder {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-year-field {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-month-field {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-day-field {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-hour-field {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-minute-field {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-second-field {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-millisecond-field {
    padding-block: 0;
  }
  ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button,
  input:where([type=button], [type=reset], [type=submit]) {
    appearance: button;
  }
  ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button {
    height: auto;
  }
  ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden=until-found])) {
    display: none !important;
  }
  * {
    border-color: var(--border);
    outline-color: var(--ring);
  }
  @supports (color:color-mix(in lab, red, red)) {
    * {
      outline-color: color-mix(in oklab, var(--ring)50%, transparent);
    }
  }
}
@layer components;
@layer utilities {
  .pointer-events-none {
    pointer-events: none;
  }
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .inset-0 {
    inset: calc(var(--spacing)*0);
  }
  .top-0 {
    top: calc(var(--spacing)*0);
  }
  .top-1 {
    top: calc(var(--spacing)*1);
  }
  .top-1\\/2 {
    top: 50%;
  }
  .right-4 {
    right: calc(var(--spacing)*4);
  }
  .left-0 {
    left: calc(var(--spacing)*0);
  }
  .z-10 {
    z-index: 10;
  }
  .z-20 {
    z-index: 20;
  }
  .mt-1 {
    margin-top: calc(var(--spacing)*1);
  }
  .mt-2 {
    margin-top: calc(var(--spacing)*2);
  }
  .mb-4 {
    margin-bottom: calc(var(--spacing)*4);
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .table {
    display: table;
  }
  .h-4 {
    height: calc(var(--spacing)*4);
  }
  .h-10 {
    height: calc(var(--spacing)*10);
  }
  .h-16 {
    height: calc(var(--spacing)*16);
  }
  .h-\\[1px\\] {
    height: 1px;
  }
  .h-full {
    height: 100%;
  }
  .min-h-\\[140px\\] {
    min-height: 140px;
  }
  .w-4 {
    width: calc(var(--spacing)*4);
  }
  .w-8 {
    width: calc(var(--spacing)*8);
  }
  .w-16 {
    width: calc(var(--spacing)*16);
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\[200px\\] {
    max-width: 200px;
  }
  .max-w-\\[500px\\] {
    max-width: 500px;
  }
  .border-collapse {
    border-collapse: collapse;
  }
  .-translate-y-1 {
    --tw-translate-y:calc(var(--spacing)*-1);
    translate: var(--tw-translate-x)var(--tw-translate-y);
  }
  .-translate-y-1\\/2 {
    --tw-translate-y:calc(calc(1/2*100%)*-1);
    translate: var(--tw-translate-x)var(--tw-translate-y);
  }
  .-rotate-90 {
    rotate: -90deg;
  }
  .transform {
    transform: var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,);
  }
  .cursor-not-allowed {
    cursor: not-allowed;
  }
  .resize {
    resize: both;
  }
  .resize-none {
    resize: none;
  }
  .flex-col {
    flex-direction: column;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .gap-2 {
    gap: calc(var(--spacing)*2);
  }
  .gap-3 {
    gap: calc(var(--spacing)*3);
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-\\[28px\\] {
    border-radius: 28px;
  }
  .rounded-full {
    border-radius: 3.40282e38px;
  }
  .rounded-xl {
    border-radius: calc(var(--radius) + 4px);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .border-white {
    border-color: var(--color-white);
  }
  .border-white\\/5 {
    border-color: #ffffff0d;
  }
  @supports (color:color-mix(in lab, red, red)) {
    .border-white\\/5 {
      border-color: color-mix(in oklab, var(--color-white)5%, transparent);
    }
  }
  .bg-\\[\\#121214\\] {
    background-color: #121214;
  }
  .bg-\\[\\#121214\\]\\/95 {
    background-color: oklab(18.3088% .00111321 -.00388382/.95);
  }
  .bg-emerald-500 {
    background-color: var(--color-emerald-500);
  }
  .bg-emerald-500\\/10 {
    background-color: #00bb7f1a;
  }
  @supports (color:color-mix(in lab, red, red)) {
    .bg-emerald-500\\/10 {
      background-color: color-mix(in oklab, var(--color-emerald-500)10%, transparent);
    }
  }
  .bg-transparent {
    background-color: #0000;
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-zinc-400 {
    background-color: var(--color-zinc-400);
  }
  .bg-zinc-800 {
    background-color: var(--color-zinc-800);
  }
  .bg-\\[url\\(\\'https\\:\\/\\/grainy-gradients\\.vercel\\.app\\/noise\\.svg\\'\\)\\] {
    background-image: url(https://grainy-gradients.vercel.app/noise.svg);
  }
  .p-2 {
    padding: calc(var(--spacing)*2);
  }
  .p-2\\.5 {
    padding: calc(var(--spacing)*2.5);
  }
  .p-6 {
    padding: calc(var(--spacing)*6);
  }
  .px-5 {
    padding-inline: calc(var(--spacing)*5);
  }
  .px-6 {
    padding-inline: calc(var(--spacing)*6);
  }
  .pt-4 {
    padding-top: calc(var(--spacing)*4);
  }
  .pt-6 {
    padding-top: calc(var(--spacing)*6);
  }
  .pb-2 {
    padding-bottom: calc(var(--spacing)*2);
  }
  .pb-6 {
    padding-bottom: calc(var(--spacing)*6);
  }
  .text-center {
    text-align: center;
  }
  .font-mono {
    font-family: var(--font-geist-mono);
  }
  .font-sans {
    font-family: var(--font-geist-sans);
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading,var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading,var(--text-sm--line-height));
  }
  .text-xl {
    font-size: var(--text-xl);
    line-height: var(--tw-leading,var(--text-xl--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading,var(--text-xs--line-height));
  }
  .text-\\[10px\\] {
    font-size: 10px;
  }
  .leading-relaxed {
    --tw-leading:var(--leading-relaxed);
    line-height: var(--leading-relaxed);
  }
  .font-bold {
    --tw-font-weight:var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-light {
    --tw-font-weight:var(--font-weight-light);
    font-weight: var(--font-weight-light);
  }
  .font-medium {
    --tw-font-weight:var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight:var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .tracking-tight {
    --tw-tracking:var(--tracking-tight);
    letter-spacing: var(--tracking-tight);
  }
  .tracking-wider {
    --tw-tracking:var(--tracking-wider);
    letter-spacing: var(--tracking-wider);
  }
  .text-black {
    color: var(--color-black);
  }
  .text-emerald-500 {
    color: var(--color-emerald-500);
  }
  .text-indigo-600 {
    color: var(--color-indigo-600);
  }
  .text-red-400 {
    color: var(--color-red-400);
  }
  .text-white {
    color: var(--color-white);
  }
  .text-zinc-500 {
    color: var(--color-zinc-500);
  }
  .text-zinc-600 {
    color: var(--color-zinc-600);
  }
  .text-zinc-700 {
    color: var(--color-zinc-700);
  }
  .uppercase {
    text-transform: uppercase;
  }
  .underline {
    text-decoration-line: underline;
  }
  .opacity-\\[0\\.02\\] {
    opacity: .02;
  }
  .shadow-\\[0_0_20px_rgba\\(255\\,255\\,255\\,0\\.2\\)\\] {
    --tw-shadow:0 0 20px var(--tw-shadow-color,#fff3);
    box-shadow:
      var(--tw-inset-shadow),
      var(--tw-inset-ring-shadow),
      var(--tw-ring-offset-shadow),
      var(--tw-ring-shadow),
      var(--tw-shadow);
  }
  .ring-1 {
    --tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);
    box-shadow:
      var(--tw-inset-shadow),
      var(--tw-inset-ring-shadow),
      var(--tw-ring-offset-shadow),
      var(--tw-ring-shadow),
      var(--tw-shadow);
  }
  .ring-emerald-500 {
    --tw-ring-color:var(--color-emerald-500);
  }
  .ring-emerald-500\\/20 {
    --tw-ring-color:#00bb7f33;
  }
  @supports (color:color-mix(in lab, red, red)) {
    .ring-emerald-500\\/20 {
      --tw-ring-color:color-mix(in oklab,var(--color-emerald-500)20%,transparent);
    }
  }
  .ring-white {
    --tw-ring-color:var(--color-white);
  }
  .ring-white\\/5 {
    --tw-ring-color:#ffffff0d;
  }
  @supports (color:color-mix(in lab, red, red)) {
    .ring-white\\/5 {
      --tw-ring-color:color-mix(in oklab,var(--color-white)5%,transparent);
    }
  }
  .outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .filter {
    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);
  }
  .backdrop-blur-sm {
    --tw-backdrop-blur:blur(var(--blur-sm));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);
  }
  .backdrop-filter {
    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);
  }
  .transition {
    transition-property:
      color,
      background-color,
      border-color,
      outline-color,
      text-decoration-color,
      fill,
      stroke,
      --tw-gradient-from,
      --tw-gradient-via,
      --tw-gradient-to,
      opacity,
      box-shadow,
      transform,
      translate,
      scale,
      rotate,
      filter,
      -webkit-backdrop-filter,
      backdrop-filter,
      display,
      content-visibility,
      overlay,
      pointer-events;
    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
    transition-duration: var(--tw-duration,var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
    transition-duration: var(--tw-duration,var(--default-transition-duration));
  }
  .transition-colors {
    transition-property:
      color,
      background-color,
      border-color,
      outline-color,
      text-decoration-color,
      fill,
      stroke,
      --tw-gradient-from,
      --tw-gradient-via,
      --tw-gradient-to;
    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));
    transition-duration: var(--tw-duration,var(--default-transition-duration));
  }
  .duration-300 {
    --tw-duration:.3s;
    transition-duration: .3s;
  }
  .selection\\:bg-indigo-500\\/30 ::selection {
    background-color: #625fff4d;
  }
  @supports (color:color-mix(in lab, red, red)) {
    .selection\\:bg-indigo-500\\/30 ::selection {
      background-color: color-mix(in oklab, var(--color-indigo-500)30%, transparent);
    }
  }
  .selection\\:bg-indigo-500\\/30::selection {
    background-color: #625fff4d;
  }
  @supports (color:color-mix(in lab, red, red)) {
    .selection\\:bg-indigo-500\\/30::selection {
      background-color: color-mix(in oklab, var(--color-indigo-500)30%, transparent);
    }
  }
  .placeholder\\:text-transparent::placeholder {
    color: #0000;
  }
  @media (hover: hover) {
    .hover\\:bg-white\\/5:hover {
      background-color: #ffffff0d;
    }
    @supports (color:color-mix(in lab, red, red)) {
      .hover\\:bg-white\\/5:hover {
        background-color: color-mix(in oklab, var(--color-white)5%, transparent);
      }
    }
    .hover\\:text-white:hover {
      color: var(--color-white);
    }
    .hover\\:shadow-\\[0_0_25px_rgba\\(255\\,255\\,255\\,0\\.4\\)\\]:hover {
      --tw-shadow:0 0 25px var(--tw-shadow-color,#fff6);
      box-shadow:
        var(--tw-inset-shadow),
        var(--tw-inset-ring-shadow),
        var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow),
        var(--tw-shadow);
    }
  }
  .focus\\:outline-none:focus {
    --tw-outline-style:none;
    outline-style: none;
  }
}
@property --tw-animation-delay { syntax:"*";inherits:false;initial-value:0s }
@property --tw-animation-direction { syntax:"*";inherits:false;initial-value:normal }
@property --tw-animation-duration { syntax:"*";inherits:false }
@property --tw-animation-fill-mode { syntax:"*";inherits:false;initial-value:none }
@property --tw-animation-iteration-count { syntax:"*";inherits:false;initial-value:1 }
@property --tw-enter-blur { syntax:"*";inherits:false;initial-value:0 }
@property --tw-enter-opacity { syntax:"*";inherits:false;initial-value:1 }
@property --tw-enter-rotate { syntax:"*";inherits:false;initial-value:0 }
@property --tw-enter-scale { syntax:"*";inherits:false;initial-value:1 }
@property --tw-enter-translate-x { syntax:"*";inherits:false;initial-value:0 }
@property --tw-enter-translate-y { syntax:"*";inherits:false;initial-value:0 }
@property --tw-exit-blur { syntax:"*";inherits:false;initial-value:0 }
@property --tw-exit-opacity { syntax:"*";inherits:false;initial-value:1 }
@property --tw-exit-rotate { syntax:"*";inherits:false;initial-value:0 }
@property --tw-exit-scale { syntax:"*";inherits:false;initial-value:1 }
@property --tw-exit-translate-x { syntax:"*";inherits:false;initial-value:0 }
@property --tw-exit-translate-y { syntax:"*";inherits:false;initial-value:0 }
:root {
  --radius:.625rem;
  --background:#fafaf9;
  --bg-body:#fafaf9;
  --bg-gradient-start:#fafaf9;
  --bg-gradient-end:#ebebe9;
  --card:#fff;
  --bg-card:#fff;
  --bg-card-hover:#f5f5f4;
  --border:#e7e5e4;
  --border-subtle:#e7e5e4;
  --border-highlight:#d6d3d1;
  --foreground:#1c1917;
  --text-primary:#1c1917;
  --secondary-foreground:#57534e;
  --text-secondary:#57534e;
  --muted-foreground:#78716c;
  --text-tertiary:#78716c;
  --status-red:#ef4444;
  --status-green:#22c55e;
  --status-orange:#f97316;
  --status-blue:#3b82f6;
  --popover:0 0% 100%;
  --popover-foreground:240 10% 3.9%;
  --primary:240 5.9% 10%;
  --primary-foreground:0 0% 98%;
  --secondary:240 4.8% 95.9%;
  --muted:240 4.8% 95.9%;
  --accent:240 4.8% 95.9%;
  --accent-foreground:240 5.9% 10%;
  --destructive:0 84.2% 60.2%;
  --input:240 5.9% 90%;
  --ring:240 10% 3.9%;
  --chart-1:#e76e50;
  --chart-2:#2a9d90;
  --chart-3:#274754;
  --chart-4:#e8c468;
  --chart-5:#f4a462;
  --sidebar:#f5f5f4;
  --sidebar-foreground:#1c1917;
  --sidebar-primary:240 5.9% 10%;
  --sidebar-primary-foreground:0 0% 98%;
  --sidebar-accent:#e7e5e4;
  --sidebar-accent-foreground:#1c1917;
  --sidebar-border:#e7e5e4;
  --sidebar-ring:#d6d3d1;
}
.dark {
  --background:#101010;
  --bg-body:#101010;
  --card:#151516;
  --bg-card:#151516;
  --bg-card-hover:#1c1c1e;
  --border:#2c2c2e;
  --border-subtle:#2c2c2e;
  --border-highlight:#3a3a3c;
  --foreground:#fff;
  --text-primary:#fff;
  --secondary-foreground:#8e8e93;
  --text-secondary:#8e8e93;
  --muted-foreground:#48484a;
  --text-tertiary:#48484a;
  --status-red:#ff453a;
  --status-green:#32d74b;
  --status-orange:#ff9f0a;
  --status-blue:#0a84ff;
  --popover:.205 0 0;
  --popover-foreground:.985 0 0;
  --primary:.922 0 0;
  --primary-foreground:.205 0 0;
  --secondary:.269 0 0;
  --muted:.269 0 0;
  --accent:.269 0 0;
  --accent-foreground:.985 0 0;
  --destructive:.704 .191 22.216;
  --input:1 0 0/15%;
  --ring:.556 0 0;
  --chart-1:oklch(48.8% .243 264.376);
  --chart-2:oklch(69.6% .17 162.48);
  --chart-3:oklch(76.9% .188 70.08);
  --chart-4:oklch(62.7% .265 303.9);
  --chart-5:oklch(64.5% .246 16.439);
  --sidebar:#161616;
  --sidebar-foreground:#fff;
  --sidebar-primary:.488 .243 264.376;
  --sidebar-primary-foreground:#fff;
  --sidebar-accent:#2c2c2e;
  --sidebar-accent-foreground:#fff;
  --sidebar-border:#ffffff1a;
  --sidebar-ring:#8e8e93;
}
.background-spotlight {
  background:
    radial-gradient(
      circle at 50% 0,
      #222 0%,
      #101010 60%);
}
.text-metallic {
  -webkit-text-fill-color: transparent;
  background:
    linear-gradient(
      135deg,
      #fff 0%,
      #a1a1aa 100%);
  -webkit-background-clip: text;
}
.glass-panel {
  -webkit-backdrop-filter: blur(20px)saturate(180%);
  border-bottom: 1px solid var(--border-subtle);
  background: #101010b3;
}
@keyframes magic-pulse {
  0%, to {
    opacity: .4;
    filter: blur();
    transform: scale(.995);
  }
  50% {
    opacity: .8;
    filter: blur(1px);
    transform: scale(1);
  }
}
.animate-magic-pulse {
  animation: 2.5s cubic-bezier(.4, 0, .2, 1) infinite magic-pulse;
}
@property --tw-translate-x { syntax:"*";inherits:false;initial-value:0 }
@property --tw-translate-y { syntax:"*";inherits:false;initial-value:0 }
@property --tw-translate-z { syntax:"*";inherits:false;initial-value:0 }
@property --tw-rotate-x { syntax:"*";inherits:false }
@property --tw-rotate-y { syntax:"*";inherits:false }
@property --tw-rotate-z { syntax:"*";inherits:false }
@property --tw-skew-x { syntax:"*";inherits:false }
@property --tw-skew-y { syntax:"*";inherits:false }
@property --tw-border-style { syntax:"*";inherits:false;initial-value:solid }
@property --tw-leading { syntax:"*";inherits:false }
@property --tw-font-weight { syntax:"*";inherits:false }
@property --tw-tracking { syntax:"*";inherits:false }
@property --tw-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }
@property --tw-shadow-color { syntax:"*";inherits:false }
@property --tw-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }
@property --tw-inset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }
@property --tw-inset-shadow-color { syntax:"*";inherits:false }
@property --tw-inset-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }
@property --tw-ring-color { syntax:"*";inherits:false }
@property --tw-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }
@property --tw-inset-ring-color { syntax:"*";inherits:false }
@property --tw-inset-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }
@property --tw-ring-inset { syntax:"*";inherits:false }
@property --tw-ring-offset-width { syntax:"<length>";inherits:false;initial-value:0 }
@property --tw-ring-offset-color { syntax:"*";inherits:false;initial-value:#fff }
@property --tw-ring-offset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }
@property --tw-outline-style { syntax:"*";inherits:false;initial-value:solid }
@property --tw-blur { syntax:"*";inherits:false }
@property --tw-brightness { syntax:"*";inherits:false }
@property --tw-contrast { syntax:"*";inherits:false }
@property --tw-grayscale { syntax:"*";inherits:false }
@property --tw-hue-rotate { syntax:"*";inherits:false }
@property --tw-invert { syntax:"*";inherits:false }
@property --tw-opacity { syntax:"*";inherits:false }
@property --tw-saturate { syntax:"*";inherits:false }
@property --tw-sepia { syntax:"*";inherits:false }
@property --tw-drop-shadow { syntax:"*";inherits:false }
@property --tw-drop-shadow-color { syntax:"*";inherits:false }
@property --tw-drop-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }
@property --tw-drop-shadow-size { syntax:"*";inherits:false }
@property --tw-backdrop-blur { syntax:"*";inherits:false }
@property --tw-backdrop-brightness { syntax:"*";inherits:false }
@property --tw-backdrop-contrast { syntax:"*";inherits:false }
@property --tw-backdrop-grayscale { syntax:"*";inherits:false }
@property --tw-backdrop-hue-rotate { syntax:"*";inherits:false }
@property --tw-backdrop-invert { syntax:"*";inherits:false }
@property --tw-backdrop-opacity { syntax:"*";inherits:false }
@property --tw-backdrop-saturate { syntax:"*";inherits:false }
@property --tw-backdrop-sepia { syntax:"*";inherits:false }
@property --tw-duration { syntax:"*";inherits:false }
`);

// src/index.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Check } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var TextFeedback = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState("idle");
  const textareaRef = useRef(null);
  useEffect(() => {
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
      const response = await fetch("https://zynta.cloud/api/feedback", {
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
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "relative w-full max-w-[500px] bg-[#121214] border border-white/5 rounded-[28px] overflow-hidden z-10 ring-1 ring-white/5 font-sans",
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: status === "sent" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 z-20 bg-[#121214]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { scale: 0, rotate: -180 },
                  animate: { scale: 1, rotate: 0 },
                  transition: { type: "spring", stiffness: 200, damping: 15 },
                  className: "w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-500/20",
                  children: /* @__PURE__ */ jsx(Check, { size: 32, strokeWidth: 3 })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.h3,
                {
                  initial: { y: 10, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.1 },
                  className: "text-white font-bold text-xl tracking-tight",
                  children: "Feedback Sent"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
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
        /* @__PURE__ */ jsxs("div", { className: "px-6 pt-6 pb-2 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: {
                  backgroundColor: isFocused ? "rgba(99,102,241,0.2)" : "rgba(39,39,42,0.5)",
                  color: isFocused ? "#818cf8" : "#71717a"
                },
                className: "p-2.5 rounded-xl transition-colors",
                children: /* @__PURE__ */ jsx(MessageSquare, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-sm font-semibold text-white tracking-tight", children: "Your Thoughts" }),
              /* @__PURE__ */ jsx("span", { className: "block text-[10px] text-zinc-500 font-medium uppercase tracking-wider", children: "Private Feedback" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "text-zinc-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full", children: /* @__PURE__ */ jsx(X, { size: 18 }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-6 pb-6 pt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative min-h-[140px]", children: [
            /* @__PURE__ */ jsx(AnimatePresence, { children: !isFocused && !text && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0, x: -5 },
                className: "absolute top-0 left-0 pointer-events-none",
                children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg text-zinc-500 font-light", children: "How can we improve?" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-zinc-700 mt-1", children: "We read every message." })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              layout: true,
              className: "flex items-end justify-between mt-2 pt-4 border-t border-white/5",
              children: [
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    animate: { opacity: isFocused || text ? 1 : 0.5 },
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "relative w-4 h-4", children: /* @__PURE__ */ jsxs("svg", { className: "w-full h-full -rotate-90", children: [
                        /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "7", stroke: "#27272a", strokeWidth: "2", fill: "none" }),
                        /* @__PURE__ */ jsx(
                          motion.circle,
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
                      /* @__PURE__ */ jsx("span", { className: `text-xs font-mono font-medium ${isNearLimit ? "text-red-400" : "text-zinc-600"}`, children: maxLength - text.length })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.button,
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
                      /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          initial: { x: 0, opacity: 1 },
                          animate: status === "sending" ? { x: -20, opacity: 0 } : { x: 0, opacity: 1 },
                          children: "Send"
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "relative w-4 h-4", children: [
                        /* @__PURE__ */ jsx(AnimatePresence, { children: status === "idle" && /* @__PURE__ */ jsx(
                          motion.div,
                          {
                            initial: { opacity: 0, scale: 0 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0 },
                            className: "absolute inset-0",
                            children: /* @__PURE__ */ jsx(Send, { size: 16, className: text.trim() ? "text-indigo-600" : "text-zinc-500" })
                          },
                          "icon-idle"
                        ) }),
                        status === "sending" && /* @__PURE__ */ jsx(
                          motion.div,
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
                            children: /* @__PURE__ */ jsx(Send, { size: 16, className: "text-indigo-600" })
                          },
                          "icon-flying"
                        )
                      ] }),
                      status === "sending" && /* @__PURE__ */ jsx(
                        motion.div,
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
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" })
      ]
    }
  );
};
var index_default = TextFeedback;
export {
  TextFeedback,
  index_default as default
};
