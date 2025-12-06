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
styleInject('/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */\n@layer properties {\n  @supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {\n    *,\n    :before,\n    :after,\n    ::backdrop {\n      --tw-rotate-x:initial;\n      --tw-rotate-y:initial;\n      --tw-rotate-z:initial;\n      --tw-skew-x:initial;\n      --tw-skew-y:initial;\n      --tw-border-style:solid;\n      --tw-font-weight:initial;\n      --tw-tracking:initial;\n      --tw-shadow:0 0 #0000;\n      --tw-shadow-color:initial;\n      --tw-shadow-alpha:100%;\n      --tw-inset-shadow:0 0 #0000;\n      --tw-inset-shadow-color:initial;\n      --tw-inset-shadow-alpha:100%;\n      --tw-ring-color:initial;\n      --tw-ring-shadow:0 0 #0000;\n      --tw-inset-ring-color:initial;\n      --tw-inset-ring-shadow:0 0 #0000;\n      --tw-ring-inset:initial;\n      --tw-ring-offset-width:0px;\n      --tw-ring-offset-color:#fff;\n      --tw-ring-offset-shadow:0 0 #0000;\n      --tw-outline-style:solid;\n      --tw-blur:initial;\n      --tw-brightness:initial;\n      --tw-contrast:initial;\n      --tw-grayscale:initial;\n      --tw-hue-rotate:initial;\n      --tw-invert:initial;\n      --tw-opacity:initial;\n      --tw-saturate:initial;\n      --tw-sepia:initial;\n      --tw-drop-shadow:initial;\n      --tw-drop-shadow-color:initial;\n      --tw-drop-shadow-alpha:100%;\n      --tw-drop-shadow-size:initial;\n      --tw-backdrop-blur:initial;\n      --tw-backdrop-brightness:initial;\n      --tw-backdrop-contrast:initial;\n      --tw-backdrop-grayscale:initial;\n      --tw-backdrop-hue-rotate:initial;\n      --tw-backdrop-invert:initial;\n      --tw-backdrop-opacity:initial;\n      --tw-backdrop-saturate:initial;\n      --tw-backdrop-sepia:initial;\n      --tw-animation-delay:0s;\n      --tw-animation-direction:normal;\n      --tw-animation-duration:initial;\n      --tw-animation-fill-mode:none;\n      --tw-animation-iteration-count:1;\n      --tw-enter-blur:0;\n      --tw-enter-opacity:1;\n      --tw-enter-rotate:0;\n      --tw-enter-scale:1;\n      --tw-enter-translate-x:0;\n      --tw-enter-translate-y:0;\n      --tw-exit-blur:0;\n      --tw-exit-opacity:1;\n      --tw-exit-rotate:0;\n      --tw-exit-scale:1;\n      --tw-exit-translate-x:0;\n      --tw-exit-translate-y:0;\n    }\n  }\n}\n@layer theme {\n  :root,\n  :host {\n    --color-zinc-200:oklch(92% .004 286.32);\n    --color-zinc-400:oklch(70.5% .015 286.067);\n    --color-zinc-600:oklch(44.2% .017 285.786);\n    --color-zinc-900:oklch(21% .006 285.885);\n    --color-black:#000;\n    --color-white:#fff;\n    --spacing:.25rem;\n    --container-md:28rem;\n    --text-xs:.75rem;\n    --text-xs--line-height:calc(1/.75);\n    --text-sm:.875rem;\n    --text-sm--line-height:calc(1.25/.875);\n    --text-lg:1.125rem;\n    --text-lg--line-height:calc(1.75/1.125);\n    --text-4xl:2.25rem;\n    --text-4xl--line-height:calc(2.5/2.25);\n    --font-weight-medium:500;\n    --font-weight-bold:700;\n    --tracking-widest:.1em;\n    --blur-xl:24px;\n    --default-transition-duration:.15s;\n    --default-transition-timing-function:cubic-bezier(.4,0,.2,1);\n    --default-font-family:var(--font-geist-sans);\n    --default-mono-font-family:var(--font-geist-mono);\n  }\n}\n@layer base {\n  *,\n  :after,\n  :before,\n  ::backdrop {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  ::file-selector-button {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  html,\n  :host {\n    -webkit-text-size-adjust: 100%;\n    tab-size: 4;\n    line-height: 1.5;\n    font-family: var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");\n    font-feature-settings: var(--default-font-feature-settings,normal);\n    font-variation-settings: var(--default-font-variation-settings,normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b,\n  strong {\n    font-weight: bolder;\n  }\n  code,\n  kbd,\n  samp,\n  pre {\n    font-family: var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings,normal);\n    font-variation-settings: var(--default-mono-font-variation-settings,normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub,\n  sup {\n    vertical-align: baseline;\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n  }\n  sub {\n    bottom: -.25em;\n  }\n  sup {\n    top: -.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol,\n  ul,\n  menu {\n    list-style: none;\n  }\n  img,\n  svg,\n  video,\n  canvas,\n  audio,\n  iframe,\n  embed,\n  object {\n    vertical-align: middle;\n    display: block;\n  }\n  img,\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n  button,\n  input,\n  select,\n  optgroup,\n  textarea {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px) {\n    ::placeholder {\n      color: currentColor;\n    }\n    @supports (color:color-mix(in lab, red, red)) {\n      ::placeholder {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-year-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-month-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-day-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-hour-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-minute-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-second-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-millisecond-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button,\n  input:where([type=button], [type=reset], [type=submit]) {\n    appearance: button;\n  }\n  ::file-selector-button {\n    appearance: button;\n  }\n  ::-webkit-inner-spin-button {\n    height: auto;\n  }\n  ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=until-found])) {\n    display: none !important;\n  }\n  * {\n    border-color: var(--border);\n    outline-color: var(--ring);\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    * {\n      outline-color: color-mix(in oklab, var(--ring)50%, transparent);\n    }\n  }\n}\n@layer components;\n@layer utilities {\n  .absolute {\n    position: absolute;\n  }\n  .relative {\n    position: relative;\n  }\n  .-top-20 {\n    top: calc(var(--spacing)*-20);\n  }\n  .-right-20 {\n    right: calc(var(--spacing)*-20);\n  }\n  .-bottom-20 {\n    bottom: calc(var(--spacing)*-20);\n  }\n  .-left-20 {\n    left: calc(var(--spacing)*-20);\n  }\n  .left-\\[-32px\\] {\n    left: -32px;\n  }\n  .z-20 {\n    z-index: 20;\n  }\n  .mt-6 {\n    margin-top: calc(var(--spacing)*6);\n  }\n  .mt-8 {\n    margin-top: calc(var(--spacing)*8);\n  }\n  .mb-2 {\n    margin-bottom: calc(var(--spacing)*2);\n  }\n  .mb-12 {\n    margin-bottom: calc(var(--spacing)*12);\n  }\n  .flex {\n    display: flex;\n  }\n  .table {\n    display: table;\n  }\n  .h-4 {\n    height: calc(var(--spacing)*4);\n  }\n  .h-16 {\n    height: calc(var(--spacing)*16);\n  }\n  .h-64 {\n    height: calc(var(--spacing)*64);\n  }\n  .h-full {\n    height: 100%;\n  }\n  .w-16 {\n    width: calc(var(--spacing)*16);\n  }\n  .w-64 {\n    width: calc(var(--spacing)*64);\n  }\n  .w-\\[300px\\] {\n    width: 300px;\n  }\n  .w-full {\n    width: 100%;\n  }\n  .max-w-md {\n    max-width: var(--container-md);\n  }\n  .border-collapse {\n    border-collapse: collapse;\n  }\n  .transform {\n    transform: var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,);\n  }\n  .cursor-grab {\n    cursor: grab;\n  }\n  .resize {\n    resize: both;\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .justify-between {\n    justify-content: space-between;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .gap-3 {\n    gap: calc(var(--spacing)*3);\n  }\n  .gap-8 {\n    gap: calc(var(--spacing)*8);\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .rounded-\\[3rem\\] {\n    border-radius: 3rem;\n  }\n  .rounded-full {\n    border-radius: 3.40282e38px;\n  }\n  .rounded-xl {\n    border-radius: calc(var(--radius) + 4px);\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-4 {\n    border-style: var(--tw-border-style);\n    border-width: 4px;\n  }\n  .border-white {\n    border-color: var(--color-white);\n  }\n  .border-white\\/5 {\n    border-color: #ffffff0d;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .border-white\\/5 {\n      border-color: color-mix(in oklab, var(--color-white)5%, transparent);\n    }\n  }\n  .border-zinc-900 {\n    border-color: var(--color-zinc-900);\n  }\n  .bg-black {\n    background-color: var(--color-black);\n  }\n  .bg-white {\n    background-color: var(--color-white);\n  }\n  .bg-zinc-900 {\n    background-color: var(--color-zinc-900);\n  }\n  .bg-zinc-900\\/80 {\n    background-color: #18181bcc;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-zinc-900\\/80 {\n      background-color: color-mix(in oklab, var(--color-zinc-900)80%, transparent);\n    }\n  }\n  .p-10 {\n    padding: calc(var(--spacing)*10);\n  }\n  .px-2 {\n    padding-inline: calc(var(--spacing)*2);\n  }\n  .py-3 {\n    padding-block: calc(var(--spacing)*3);\n  }\n  .text-center {\n    text-align: center;\n  }\n  .text-4xl {\n    font-size: var(--text-4xl);\n    line-height: var(--tw-leading,var(--text-4xl--line-height));\n  }\n  .text-lg {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading,var(--text-lg--line-height));\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading,var(--text-sm--line-height));\n  }\n  .text-xs {\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading,var(--text-xs--line-height));\n  }\n  .text-\\[10px\\] {\n    font-size: 10px;\n  }\n  .font-bold {\n    --tw-font-weight:var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  .font-medium {\n    --tw-font-weight:var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .tracking-widest {\n    --tw-tracking:var(--tracking-widest);\n    letter-spacing: var(--tracking-widest);\n  }\n  .text-black {\n    color: var(--color-black);\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .text-zinc-400 {\n    color: var(--color-zinc-400);\n  }\n  .text-zinc-600 {\n    color: var(--color-zinc-600);\n  }\n  .uppercase {\n    text-transform: uppercase;\n  }\n  .underline {\n    text-decoration-line: underline;\n  }\n  .opacity-10 {\n    opacity: .1;\n  }\n  .opacity-50 {\n    opacity: .5;\n  }\n  .shadow-2xl {\n    --tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-\\[0_0_30px_rgba\\(0\\,0\\,0\\,0\\.5\\)\\] {\n    --tw-shadow:0 0 30px var(--tw-shadow-color,#00000080);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-\\[inset_0_1px_2px_rgba\\(255\\,255\\,255\\,0\\.05\\)\\] {\n    --tw-shadow:inset 0 1px 2px var(--tw-shadow-color,#ffffff0d);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .blur-\\[80px\\] {\n    --tw-blur:blur(80px);\n    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);\n  }\n  .filter {\n    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);\n  }\n  .backdrop-blur-xl {\n    --tw-backdrop-blur:blur(var(--blur-xl));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .backdrop-filter {\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .transition {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to,\n      opacity,\n      box-shadow,\n      transform,\n      translate,\n      scale,\n      rotate,\n      filter,\n      -webkit-backdrop-filter,\n      backdrop-filter,\n      display,\n      content-visibility,\n      overlay,\n      pointer-events;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .transition-colors {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  @media (hover: hover) {\n    .hover\\:bg-zinc-200:hover {\n      background-color: var(--color-zinc-200);\n    }\n  }\n  .active\\:cursor-grabbing:active {\n    cursor: grabbing;\n  }\n  .disabled\\:cursor-not-allowed:disabled {\n    cursor: not-allowed;\n  }\n  .disabled\\:opacity-50:disabled {\n    opacity: .5;\n  }\n}\n@property --tw-animation-delay { syntax:"*";inherits:false;initial-value:0s }\n@property --tw-animation-direction { syntax:"*";inherits:false;initial-value:normal }\n@property --tw-animation-duration { syntax:"*";inherits:false }\n@property --tw-animation-fill-mode { syntax:"*";inherits:false;initial-value:none }\n@property --tw-animation-iteration-count { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-translate-y { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-translate-y { syntax:"*";inherits:false;initial-value:0 }\n:root {\n  --radius:.625rem;\n  --background:#fafaf9;\n  --bg-body:#fafaf9;\n  --bg-gradient-start:#fafaf9;\n  --bg-gradient-end:#ebebe9;\n  --card:#fff;\n  --bg-card:#fff;\n  --bg-card-hover:#f5f5f4;\n  --border:#e7e5e4;\n  --border-subtle:#e7e5e4;\n  --border-highlight:#d6d3d1;\n  --foreground:#1c1917;\n  --text-primary:#1c1917;\n  --secondary-foreground:#57534e;\n  --text-secondary:#57534e;\n  --muted-foreground:#78716c;\n  --text-tertiary:#78716c;\n  --status-red:#ef4444;\n  --status-green:#22c55e;\n  --status-orange:#f97316;\n  --status-blue:#3b82f6;\n  --popover:0 0% 100%;\n  --popover-foreground:240 10% 3.9%;\n  --primary:240 5.9% 10%;\n  --primary-foreground:0 0% 98%;\n  --secondary:240 4.8% 95.9%;\n  --muted:240 4.8% 95.9%;\n  --accent:240 4.8% 95.9%;\n  --accent-foreground:240 5.9% 10%;\n  --destructive:0 84.2% 60.2%;\n  --input:240 5.9% 90%;\n  --ring:240 10% 3.9%;\n  --chart-1:#e76e50;\n  --chart-2:#2a9d90;\n  --chart-3:#274754;\n  --chart-4:#e8c468;\n  --chart-5:#f4a462;\n  --sidebar:#f5f5f4;\n  --sidebar-foreground:#1c1917;\n  --sidebar-primary:240 5.9% 10%;\n  --sidebar-primary-foreground:0 0% 98%;\n  --sidebar-accent:#e7e5e4;\n  --sidebar-accent-foreground:#1c1917;\n  --sidebar-border:#e7e5e4;\n  --sidebar-ring:#d6d3d1;\n}\n.dark {\n  --background:#101010;\n  --bg-body:#101010;\n  --card:#151516;\n  --bg-card:#151516;\n  --bg-card-hover:#1c1c1e;\n  --border:#2c2c2e;\n  --border-subtle:#2c2c2e;\n  --border-highlight:#3a3a3c;\n  --foreground:#fff;\n  --text-primary:#fff;\n  --secondary-foreground:#8e8e93;\n  --text-secondary:#8e8e93;\n  --muted-foreground:#48484a;\n  --text-tertiary:#48484a;\n  --status-red:#ff453a;\n  --status-green:#32d74b;\n  --status-orange:#ff9f0a;\n  --status-blue:#0a84ff;\n  --popover:.205 0 0;\n  --popover-foreground:.985 0 0;\n  --primary:.922 0 0;\n  --primary-foreground:.205 0 0;\n  --secondary:.269 0 0;\n  --muted:.269 0 0;\n  --accent:.269 0 0;\n  --accent-foreground:.985 0 0;\n  --destructive:.704 .191 22.216;\n  --input:1 0 0/15%;\n  --ring:.556 0 0;\n  --chart-1:oklch(48.8% .243 264.376);\n  --chart-2:oklch(69.6% .17 162.48);\n  --chart-3:oklch(76.9% .188 70.08);\n  --chart-4:oklch(62.7% .265 303.9);\n  --chart-5:oklch(64.5% .246 16.439);\n  --sidebar:#161616;\n  --sidebar-foreground:#fff;\n  --sidebar-primary:.488 .243 264.376;\n  --sidebar-primary-foreground:#fff;\n  --sidebar-accent:#2c2c2e;\n  --sidebar-accent-foreground:#fff;\n  --sidebar-border:#ffffff1a;\n  --sidebar-ring:#8e8e93;\n}\n.background-spotlight {\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      #222 0%,\n      #101010 60%);\n}\n.text-metallic {\n  -webkit-text-fill-color: transparent;\n  background:\n    linear-gradient(\n      135deg,\n      #fff 0%,\n      #a1a1aa 100%);\n  -webkit-background-clip: text;\n}\n.glass-panel {\n  -webkit-backdrop-filter: blur(20px)saturate(180%);\n  border-bottom: 1px solid var(--border-subtle);\n  background: #101010b3;\n}\n@keyframes magic-pulse {\n  0%, to {\n    opacity: .4;\n    filter: blur();\n    transform: scale(.995);\n  }\n  50% {\n    opacity: .8;\n    filter: blur(1px);\n    transform: scale(1);\n  }\n}\n.animate-magic-pulse {\n  animation: 2.5s cubic-bezier(.4, 0, .2, 1) infinite magic-pulse;\n}\n@property --tw-rotate-x { syntax:"*";inherits:false }\n@property --tw-rotate-y { syntax:"*";inherits:false }\n@property --tw-rotate-z { syntax:"*";inherits:false }\n@property --tw-skew-x { syntax:"*";inherits:false }\n@property --tw-skew-y { syntax:"*";inherits:false }\n@property --tw-border-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-font-weight { syntax:"*";inherits:false }\n@property --tw-tracking { syntax:"*";inherits:false }\n@property --tw-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-shadow-color { syntax:"*";inherits:false }\n@property --tw-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-inset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-shadow-color { syntax:"*";inherits:false }\n@property --tw-inset-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-ring-color { syntax:"*";inherits:false }\n@property --tw-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-ring-color { syntax:"*";inherits:false }\n@property --tw-inset-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-ring-inset { syntax:"*";inherits:false }\n@property --tw-ring-offset-width { syntax:"<length>";inherits:false;initial-value:0 }\n@property --tw-ring-offset-color { syntax:"*";inherits:false;initial-value:#fff }\n@property --tw-ring-offset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-outline-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-blur { syntax:"*";inherits:false }\n@property --tw-brightness { syntax:"*";inherits:false }\n@property --tw-contrast { syntax:"*";inherits:false }\n@property --tw-grayscale { syntax:"*";inherits:false }\n@property --tw-hue-rotate { syntax:"*";inherits:false }\n@property --tw-invert { syntax:"*";inherits:false }\n@property --tw-opacity { syntax:"*";inherits:false }\n@property --tw-saturate { syntax:"*";inherits:false }\n@property --tw-sepia { syntax:"*";inherits:false }\n@property --tw-drop-shadow { syntax:"*";inherits:false }\n@property --tw-drop-shadow-color { syntax:"*";inherits:false }\n@property --tw-drop-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-drop-shadow-size { syntax:"*";inherits:false }\n@property --tw-backdrop-blur { syntax:"*";inherits:false }\n@property --tw-backdrop-brightness { syntax:"*";inherits:false }\n@property --tw-backdrop-contrast { syntax:"*";inherits:false }\n@property --tw-backdrop-grayscale { syntax:"*";inherits:false }\n@property --tw-backdrop-hue-rotate { syntax:"*";inherits:false }\n@property --tw-backdrop-invert { syntax:"*";inherits:false }\n@property --tw-backdrop-opacity { syntax:"*";inherits:false }\n@property --tw-backdrop-saturate { syntax:"*";inherits:false }\n@property --tw-backdrop-sepia { syntax:"*";inherits:false }\n');

// src/index.tsx
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { TrendingDown, Minus, Zap } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var SliderShapeShifter = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [value, setValue] = useState(5);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const width = 300;
  useEffect(() => {
    x.set(width / 2);
  }, []);
  const progress = useTransform(x, [0, width], [0, 1]);
  const color = useTransform(progress, [0, 0.5, 1], [
    "#ef4444",
    "#eab308",
    "#10b981"
  ]);
  const borderRadius = useTransform(progress, [0, 0.5, 1], [
    "20%",
    "50%",
    "30%"
  ]);
  const rotate = useTransform(progress, [0, 1], [-45, 45]);
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
      const response = await fetch("https://www.zynta.cloud/api/feedback", {
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
    if (value <= 3) return TrendingDown;
    if (value <= 7) return Minus;
    return Zap;
  };
  const Icon = getIcon();
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl w-full max-w-md flex flex-col items-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: { backgroundColor: color },
        className: "absolute -top-20 -right-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: { backgroundColor: color },
        className: "absolute -bottom-20 -left-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2", children: "Your Rating" }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "text-4xl font-bold text-white flex items-center justify-center gap-3",
          children: [
            value,
            /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-zinc-600", children: "/ 10" })
          ]
        },
        value
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[300px] relative h-16 flex items-center justify-center", ref: constraintsRef, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute w-full h-4 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] overflow-hidden", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          style: { width: x, backgroundColor: color },
          className: "h-full opacity-50"
        }
      ) }),
      /* @__PURE__ */ jsx(
        motion.div,
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
          children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0, rotate: -90 },
              animate: { scale: 1, rotate: 0 },
              exit: { scale: 0, rotate: 90 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsx(Icon, { size: 24, color: "white", strokeWidth: 3 })
            },
            value <= 3 ? "low" : value <= 7 ? "mid" : "high"
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between px-2 mt-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest", children: [
      /* @__PURE__ */ jsx("span", { children: "Worse" }),
      /* @__PURE__ */ jsx("span", { children: "Better" })
    ] }),
    /* @__PURE__ */ jsx(
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
export {
  SliderShapeShifter,
  index_default as default
};
