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
styleInject('/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */\n@layer properties {\n  @supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {\n    *,\n    :before,\n    :after,\n    ::backdrop {\n      --tw-translate-x:0;\n      --tw-translate-y:0;\n      --tw-translate-z:0;\n      --tw-rotate-x:initial;\n      --tw-rotate-y:initial;\n      --tw-rotate-z:initial;\n      --tw-skew-x:initial;\n      --tw-skew-y:initial;\n      --tw-border-style:solid;\n      --tw-font-weight:initial;\n      --tw-tracking:initial;\n      --tw-shadow:0 0 #0000;\n      --tw-shadow-color:initial;\n      --tw-shadow-alpha:100%;\n      --tw-inset-shadow:0 0 #0000;\n      --tw-inset-shadow-color:initial;\n      --tw-inset-shadow-alpha:100%;\n      --tw-ring-color:initial;\n      --tw-ring-shadow:0 0 #0000;\n      --tw-inset-ring-color:initial;\n      --tw-inset-ring-shadow:0 0 #0000;\n      --tw-ring-inset:initial;\n      --tw-ring-offset-width:0px;\n      --tw-ring-offset-color:#fff;\n      --tw-ring-offset-shadow:0 0 #0000;\n      --tw-outline-style:solid;\n      --tw-blur:initial;\n      --tw-brightness:initial;\n      --tw-contrast:initial;\n      --tw-grayscale:initial;\n      --tw-hue-rotate:initial;\n      --tw-invert:initial;\n      --tw-opacity:initial;\n      --tw-saturate:initial;\n      --tw-sepia:initial;\n      --tw-drop-shadow:initial;\n      --tw-drop-shadow-color:initial;\n      --tw-drop-shadow-alpha:100%;\n      --tw-drop-shadow-size:initial;\n      --tw-backdrop-blur:initial;\n      --tw-backdrop-brightness:initial;\n      --tw-backdrop-contrast:initial;\n      --tw-backdrop-grayscale:initial;\n      --tw-backdrop-hue-rotate:initial;\n      --tw-backdrop-invert:initial;\n      --tw-backdrop-opacity:initial;\n      --tw-backdrop-saturate:initial;\n      --tw-backdrop-sepia:initial;\n      --tw-duration:initial;\n      --tw-ease:initial;\n      --tw-animation-delay:0s;\n      --tw-animation-direction:normal;\n      --tw-animation-duration:initial;\n      --tw-animation-fill-mode:none;\n      --tw-animation-iteration-count:1;\n      --tw-enter-blur:0;\n      --tw-enter-opacity:1;\n      --tw-enter-rotate:0;\n      --tw-enter-scale:1;\n      --tw-enter-translate-x:0;\n      --tw-enter-translate-y:0;\n      --tw-exit-blur:0;\n      --tw-exit-opacity:1;\n      --tw-exit-rotate:0;\n      --tw-exit-scale:1;\n      --tw-exit-translate-x:0;\n      --tw-exit-translate-y:0;\n    }\n  }\n}\n@layer theme {\n  :root,\n  :host {\n    --color-red-500:oklch(63.7% .237 25.331);\n    --color-orange-500:oklch(70.5% .213 47.604);\n    --color-yellow-500:oklch(79.5% .184 86.047);\n    --color-blue-500:oklch(62.3% .214 259.815);\n    --color-rose-500:oklch(64.5% .246 16.439);\n    --color-zinc-400:oklch(70.5% .015 286.067);\n    --color-zinc-800:oklch(27.4% .006 286.033);\n    --color-zinc-900:oklch(21% .006 285.885);\n    --color-black:#000;\n    --color-white:#fff;\n    --spacing:.25rem;\n    --container-md:28rem;\n    --text-sm:.875rem;\n    --text-sm--line-height:calc(1.25/.875);\n    --text-xl:1.25rem;\n    --text-xl--line-height:calc(1.75/1.25);\n    --text-4xl:2.25rem;\n    --text-4xl--line-height:calc(2.5/2.25);\n    --font-weight-medium:500;\n    --tracking-tight:-.025em;\n    --ease-in-out:cubic-bezier(.4,0,.2,1);\n    --blur-sm:8px;\n    --blur-3xl:64px;\n    --default-transition-duration:.15s;\n    --default-transition-timing-function:cubic-bezier(.4,0,.2,1);\n    --default-font-family:var(--font-geist-sans);\n    --default-mono-font-family:var(--font-geist-mono);\n  }\n}\n@layer base {\n  *,\n  :after,\n  :before,\n  ::backdrop {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  ::file-selector-button {\n    box-sizing: border-box;\n    border: 0 solid;\n    margin: 0;\n    padding: 0;\n  }\n  html,\n  :host {\n    -webkit-text-size-adjust: 100%;\n    tab-size: 4;\n    line-height: 1.5;\n    font-family: var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");\n    font-feature-settings: var(--default-font-feature-settings,normal);\n    font-variation-settings: var(--default-font-variation-settings,normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b,\n  strong {\n    font-weight: bolder;\n  }\n  code,\n  kbd,\n  samp,\n  pre {\n    font-family: var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings,normal);\n    font-variation-settings: var(--default-mono-font-variation-settings,normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub,\n  sup {\n    vertical-align: baseline;\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n  }\n  sub {\n    bottom: -.25em;\n  }\n  sup {\n    top: -.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol,\n  ul,\n  menu {\n    list-style: none;\n  }\n  img,\n  svg,\n  video,\n  canvas,\n  audio,\n  iframe,\n  embed,\n  object {\n    vertical-align: middle;\n    display: block;\n  }\n  img,\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n  button,\n  input,\n  select,\n  optgroup,\n  textarea {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    opacity: 1;\n    background-color: #0000;\n    border-radius: 0;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px) {\n    ::placeholder {\n      color: currentColor;\n    }\n    @supports (color:color-mix(in lab, red, red)) {\n      ::placeholder {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-year-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-month-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-day-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-hour-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-minute-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-second-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-millisecond-field {\n    padding-block: 0;\n  }\n  ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button,\n  input:where([type=button], [type=reset], [type=submit]) {\n    appearance: button;\n  }\n  ::file-selector-button {\n    appearance: button;\n  }\n  ::-webkit-inner-spin-button {\n    height: auto;\n  }\n  ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=until-found])) {\n    display: none !important;\n  }\n  * {\n    border-color: var(--border);\n    outline-color: var(--ring);\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    * {\n      outline-color: color-mix(in oklab, var(--ring)50%, transparent);\n    }\n  }\n}\n@layer components;\n@layer utilities {\n  .absolute {\n    position: absolute;\n  }\n  .relative {\n    position: relative;\n  }\n  .inset-0 {\n    inset: calc(var(--spacing)*0);\n  }\n  .-bottom-4 {\n    bottom: calc(var(--spacing)*-4);\n  }\n  .left-1 {\n    left: calc(var(--spacing)*1);\n  }\n  .left-1\\/2 {\n    left: 50%;\n  }\n  .z-10 {\n    z-index: 10;\n  }\n  .mt-10 {\n    margin-top: calc(var(--spacing)*10);\n  }\n  .mb-8 {\n    margin-bottom: calc(var(--spacing)*8);\n  }\n  .flex {\n    display: flex;\n  }\n  .table {\n    display: table;\n  }\n  .h-1 {\n    height: calc(var(--spacing)*1);\n  }\n  .h-1\\.5 {\n    height: calc(var(--spacing)*1.5);\n  }\n  .h-8 {\n    height: calc(var(--spacing)*8);\n  }\n  .w-1 {\n    width: calc(var(--spacing)*1);\n  }\n  .w-1\\.5 {\n    width: calc(var(--spacing)*1.5);\n  }\n  .w-full {\n    width: 100%;\n  }\n  .max-w-md {\n    max-width: var(--container-md);\n  }\n  .border-collapse {\n    border-collapse: collapse;\n  }\n  .-translate-x-1 {\n    --tw-translate-x:calc(var(--spacing)*-1);\n    translate: var(--tw-translate-x)var(--tw-translate-y);\n  }\n  .-translate-x-1\\/2 {\n    --tw-translate-x:calc(calc(1/2*100%)*-1);\n    translate: var(--tw-translate-x)var(--tw-translate-y);\n  }\n  .transform {\n    transform: var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,);\n  }\n  .resize {\n    resize: both;\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .justify-between {\n    justify-content: space-between;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .gap-4 {\n    gap: calc(var(--spacing)*4);\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .rounded-\\[1\\.8rem\\] {\n    border-radius: 1.8rem;\n  }\n  .rounded-\\[2rem\\] {\n    border-radius: 2rem;\n  }\n  .rounded-full {\n    border-radius: 3.40282e38px;\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-zinc-800 {\n    border-color: var(--color-zinc-800);\n  }\n  .bg-black {\n    background-color: var(--color-black);\n  }\n  .bg-blue-500 {\n    background-color: var(--color-blue-500);\n  }\n  .bg-orange-500 {\n    background-color: var(--color-orange-500);\n  }\n  .bg-red-500 {\n    background-color: var(--color-red-500);\n  }\n  .bg-rose-500 {\n    background-color: var(--color-rose-500);\n  }\n  .bg-yellow-500 {\n    background-color: var(--color-yellow-500);\n  }\n  .bg-zinc-900 {\n    background-color: var(--color-zinc-900);\n  }\n  .bg-zinc-900\\/80 {\n    background-color: #18181bcc;\n  }\n  @supports (color:color-mix(in lab, red, red)) {\n    .bg-zinc-900\\/80 {\n      background-color: color-mix(in oklab, var(--color-zinc-900)80%, transparent);\n    }\n  }\n  .bg-\\[radial-gradient\\(circle_at_50\\%_0\\%\\,rgba\\(255\\,255\\,255\\,0\\.1\\)\\,transparent_70\\%\\)\\] {\n    background-image:\n      radial-gradient(\n        circle at 50% 0,\n        #ffffff1a,\n        #0000 70%);\n  }\n  .p-1 {\n    padding: calc(var(--spacing)*1);\n  }\n  .p-8 {\n    padding: calc(var(--spacing)*8);\n  }\n  .px-2 {\n    padding-inline: calc(var(--spacing)*2);\n  }\n  .text-center {\n    text-align: center;\n  }\n  .text-4xl {\n    font-size: var(--text-4xl);\n    line-height: var(--tw-leading,var(--text-4xl--line-height));\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading,var(--text-sm--line-height));\n  }\n  .text-xl {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading,var(--text-xl--line-height));\n  }\n  .font-medium {\n    --tw-font-weight:var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .tracking-tight {\n    --tw-tracking:var(--tracking-tight);\n    letter-spacing: var(--tracking-tight);\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .text-zinc-400 {\n    color: var(--color-zinc-400);\n  }\n  .underline {\n    text-decoration-line: underline;\n  }\n  .opacity-30 {\n    opacity: .3;\n  }\n  .shadow-2xl {\n    --tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .blur-3xl {\n    --tw-blur:blur(var(--blur-3xl));\n    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);\n  }\n  .filter {\n    filter: var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,);\n  }\n  .backdrop-blur-sm {\n    --tw-backdrop-blur:blur(var(--blur-sm));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .backdrop-filter {\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);\n  }\n  .transition {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to,\n      opacity,\n      box-shadow,\n      transform,\n      translate,\n      scale,\n      rotate,\n      filter,\n      -webkit-backdrop-filter,\n      backdrop-filter,\n      display,\n      content-visibility,\n      overlay,\n      pointer-events;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .transition-all {\n    transition-property: all;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .transition-colors {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to;\n    transition-timing-function: var(--tw-ease,var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration,var(--default-transition-duration));\n  }\n  .duration-300 {\n    --tw-duration:.3s;\n    transition-duration: .3s;\n  }\n  .duration-700 {\n    --tw-duration:.7s;\n    transition-duration: .7s;\n  }\n  .ease-in-out {\n    --tw-ease:var(--ease-in-out);\n    transition-timing-function: var(--ease-in-out);\n  }\n  .outline-none {\n    --tw-outline-style:none;\n    outline-style: none;\n  }\n}\n@property --tw-animation-delay { syntax:"*";inherits:false;initial-value:0s }\n@property --tw-animation-direction { syntax:"*";inherits:false;initial-value:normal }\n@property --tw-animation-duration { syntax:"*";inherits:false }\n@property --tw-animation-fill-mode { syntax:"*";inherits:false;initial-value:none }\n@property --tw-animation-iteration-count { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-enter-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-enter-translate-y { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-blur { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-opacity { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-rotate { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-scale { syntax:"*";inherits:false;initial-value:1 }\n@property --tw-exit-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-exit-translate-y { syntax:"*";inherits:false;initial-value:0 }\n:root {\n  --radius:.625rem;\n  --background:#fafaf9;\n  --bg-body:#fafaf9;\n  --bg-gradient-start:#fafaf9;\n  --bg-gradient-end:#ebebe9;\n  --card:#fff;\n  --bg-card:#fff;\n  --bg-card-hover:#f5f5f4;\n  --border:#e7e5e4;\n  --border-subtle:#e7e5e4;\n  --border-highlight:#d6d3d1;\n  --foreground:#1c1917;\n  --text-primary:#1c1917;\n  --secondary-foreground:#57534e;\n  --text-secondary:#57534e;\n  --muted-foreground:#78716c;\n  --text-tertiary:#78716c;\n  --status-red:#ef4444;\n  --status-green:#22c55e;\n  --status-orange:#f97316;\n  --status-blue:#3b82f6;\n  --popover:0 0% 100%;\n  --popover-foreground:240 10% 3.9%;\n  --primary:240 5.9% 10%;\n  --primary-foreground:0 0% 98%;\n  --secondary:240 4.8% 95.9%;\n  --muted:240 4.8% 95.9%;\n  --accent:240 4.8% 95.9%;\n  --accent-foreground:240 5.9% 10%;\n  --destructive:0 84.2% 60.2%;\n  --input:240 5.9% 90%;\n  --ring:240 10% 3.9%;\n  --chart-1:#e76e50;\n  --chart-2:#2a9d90;\n  --chart-3:#274754;\n  --chart-4:#e8c468;\n  --chart-5:#f4a462;\n  --sidebar:#f5f5f4;\n  --sidebar-foreground:#1c1917;\n  --sidebar-primary:240 5.9% 10%;\n  --sidebar-primary-foreground:0 0% 98%;\n  --sidebar-accent:#e7e5e4;\n  --sidebar-accent-foreground:#1c1917;\n  --sidebar-border:#e7e5e4;\n  --sidebar-ring:#d6d3d1;\n}\n.dark {\n  --background:#101010;\n  --bg-body:#101010;\n  --card:#151516;\n  --bg-card:#151516;\n  --bg-card-hover:#1c1c1e;\n  --border:#2c2c2e;\n  --border-subtle:#2c2c2e;\n  --border-highlight:#3a3a3c;\n  --foreground:#fff;\n  --text-primary:#fff;\n  --secondary-foreground:#8e8e93;\n  --text-secondary:#8e8e93;\n  --muted-foreground:#48484a;\n  --text-tertiary:#48484a;\n  --status-red:#ff453a;\n  --status-green:#32d74b;\n  --status-orange:#ff9f0a;\n  --status-blue:#0a84ff;\n  --popover:.205 0 0;\n  --popover-foreground:.985 0 0;\n  --primary:.922 0 0;\n  --primary-foreground:.205 0 0;\n  --secondary:.269 0 0;\n  --muted:.269 0 0;\n  --accent:.269 0 0;\n  --accent-foreground:.985 0 0;\n  --destructive:.704 .191 22.216;\n  --input:1 0 0/15%;\n  --ring:.556 0 0;\n  --chart-1:oklch(48.8% .243 264.376);\n  --chart-2:oklch(69.6% .17 162.48);\n  --chart-3:oklch(76.9% .188 70.08);\n  --chart-4:oklch(62.7% .265 303.9);\n  --chart-5:oklch(64.5% .246 16.439);\n  --sidebar:#161616;\n  --sidebar-foreground:#fff;\n  --sidebar-primary:.488 .243 264.376;\n  --sidebar-primary-foreground:#fff;\n  --sidebar-accent:#2c2c2e;\n  --sidebar-accent-foreground:#fff;\n  --sidebar-border:#ffffff1a;\n  --sidebar-ring:#8e8e93;\n}\n.background-spotlight {\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      #222 0%,\n      #101010 60%);\n}\n.text-metallic {\n  -webkit-text-fill-color: transparent;\n  background:\n    linear-gradient(\n      135deg,\n      #fff 0%,\n      #a1a1aa 100%);\n  -webkit-background-clip: text;\n}\n.glass-panel {\n  -webkit-backdrop-filter: blur(20px)saturate(180%);\n  border-bottom: 1px solid var(--border-subtle);\n  background: #101010b3;\n}\n@keyframes magic-pulse {\n  0%, to {\n    opacity: .4;\n    filter: blur();\n    transform: scale(.995);\n  }\n  50% {\n    opacity: .8;\n    filter: blur(1px);\n    transform: scale(1);\n  }\n}\n.animate-magic-pulse {\n  animation: 2.5s cubic-bezier(.4, 0, .2, 1) infinite magic-pulse;\n}\n@property --tw-translate-x { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-translate-y { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-translate-z { syntax:"*";inherits:false;initial-value:0 }\n@property --tw-rotate-x { syntax:"*";inherits:false }\n@property --tw-rotate-y { syntax:"*";inherits:false }\n@property --tw-rotate-z { syntax:"*";inherits:false }\n@property --tw-skew-x { syntax:"*";inherits:false }\n@property --tw-skew-y { syntax:"*";inherits:false }\n@property --tw-border-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-font-weight { syntax:"*";inherits:false }\n@property --tw-tracking { syntax:"*";inherits:false }\n@property --tw-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-shadow-color { syntax:"*";inherits:false }\n@property --tw-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-inset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-shadow-color { syntax:"*";inherits:false }\n@property --tw-inset-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-ring-color { syntax:"*";inherits:false }\n@property --tw-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-inset-ring-color { syntax:"*";inherits:false }\n@property --tw-inset-ring-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-ring-inset { syntax:"*";inherits:false }\n@property --tw-ring-offset-width { syntax:"<length>";inherits:false;initial-value:0 }\n@property --tw-ring-offset-color { syntax:"*";inherits:false;initial-value:#fff }\n@property --tw-ring-offset-shadow { syntax:"*";inherits:false;initial-value:0 0 #0000 }\n@property --tw-outline-style { syntax:"*";inherits:false;initial-value:solid }\n@property --tw-blur { syntax:"*";inherits:false }\n@property --tw-brightness { syntax:"*";inherits:false }\n@property --tw-contrast { syntax:"*";inherits:false }\n@property --tw-grayscale { syntax:"*";inherits:false }\n@property --tw-hue-rotate { syntax:"*";inherits:false }\n@property --tw-invert { syntax:"*";inherits:false }\n@property --tw-opacity { syntax:"*";inherits:false }\n@property --tw-saturate { syntax:"*";inherits:false }\n@property --tw-sepia { syntax:"*";inherits:false }\n@property --tw-drop-shadow { syntax:"*";inherits:false }\n@property --tw-drop-shadow-color { syntax:"*";inherits:false }\n@property --tw-drop-shadow-alpha { syntax:"<percentage>";inherits:false;initial-value:100% }\n@property --tw-drop-shadow-size { syntax:"*";inherits:false }\n@property --tw-backdrop-blur { syntax:"*";inherits:false }\n@property --tw-backdrop-brightness { syntax:"*";inherits:false }\n@property --tw-backdrop-contrast { syntax:"*";inherits:false }\n@property --tw-backdrop-grayscale { syntax:"*";inherits:false }\n@property --tw-backdrop-hue-rotate { syntax:"*";inherits:false }\n@property --tw-backdrop-invert { syntax:"*";inherits:false }\n@property --tw-backdrop-opacity { syntax:"*";inherits:false }\n@property --tw-backdrop-saturate { syntax:"*";inherits:false }\n@property --tw-backdrop-sepia { syntax:"*";inherits:false }\n@property --tw-duration { syntax:"*";inherits:false }\n@property --tw-ease { syntax:"*";inherits:false }\n');

// src/index.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
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
var EmojiSoul = ({ apiKey, showcaseMode = false, onSuccess, onError } = {}) => {
  const [selected, setSelected] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSelect = async (option) => {
    setSelected(option.id);
    if (showcaseMode) {
      return;
    }
    if (!apiKey) {
      onError?.(new Error("API key required"));
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://zynta.cloud/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          type: "emoji",
          rating: option.rating,
          emoji: option.emoji,
          component_name: "EmojiReaction",
          component_variant: "Soul"
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit feedback");
      }
      const data = await response.json();
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-black relative w-full max-w-md rounded-[2rem] border border-zinc-800 p-1 overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-30 transition-colors duration-700 ease-in-out bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 0.15 },
        exit: { opacity: 0 },
        className: `absolute inset-0 ${FEEDBACK_OPTIONS.find((o) => o.id === selected)?.color} blur-3xl`
      },
      selected
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-zinc-900/80 backdrop-blur-sm rounded-[1.8rem] p-8 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-white font-medium text-xl mb-8 tracking-tight", children: "How was the quality?" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center px-2", children: FEEDBACK_OPTIONS.map((option) => {
        const isSelected = selected === option.id;
        return /* @__PURE__ */ jsxs(
          motion.button,
          {
            onClick: () => handleSelect(option),
            whileHover: "hover",
            whileTap: "tap",
            disabled: isSubmitting,
            variants: emojiVariants[option.anim],
            className: "relative outline-none group",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    scale: isSelected ? 1.5 : 1,
                    opacity: selected && !isSelected ? 0.3 : 1,
                    filter: isSelected ? "grayscale(0%)" : selected ? "grayscale(100%)" : "grayscale(0%)"
                  },
                  className: "text-4xl transition-all duration-300",
                  children: option.emoji
                }
              ),
              isSelected && /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: "soul-dot",
                  className: `absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${option.color.replace("bg-", "bg-")}`
                }
              )
            ]
          },
          option.id
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 h-8", children: selected && /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "text-sm text-zinc-400",
          children: "Thanks for feedback!"
        }
      ) })
    ] })
  ] }) });
};
var index_default = EmojiSoul;
export {
  EmojiSoul,
  index_default as default
};
