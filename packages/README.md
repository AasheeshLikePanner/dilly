# Dilly Component Packages

This directory contains individual npm packages for each Dilly component variant.

## Available Packages

### Emoji Feedback
- `@dilly/emoji-dock` - Mac OS dock-style emoji selector
- `@dilly/emoji-soul` - High contrast card design
- `@dilly/emoji-interactive` - Full modal flow with comment

### Slider Feedback
- `@dilly/slider-shapeshifter` - Morphing handle slider
- `@dilly/slider-cinematic` - Spotlight number selector
- `@dilly/slider-crystal` - Crystal charge bars

### Text Feedback
- `@dilly/text-feedback` - Animated text input form

### Bug Reporting
- `@dilly/bug-reporter` - Bug submission form

## Development

```bash
# Install dependencies for all packages
npm install

# Build all packages
npm run build:all

# Watch mode for development
npm run dev:all
```

## Publishing

Each package can be published individually:

```bash
cd packages/emoji-dock
npm publish --access public
```
