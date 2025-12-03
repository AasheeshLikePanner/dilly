#!/bin/bash

# Script to build and publish all Dilly packages

PACKAGES=(
  "emoji-dock"
  "emoji-soul"
  "emoji-interactive"
  "slider-shapeshifter"
  "slider-cinematic"
  "slider-crystal"
  "text-feedback"
  "bug-reporter"
)

echo "Building all packages..."

for pkg in "${PACKAGES[@]}"; do
  echo "Building @zynta/$pkg..."
  cd "$pkg" || exit
  npm run build
  cd ..
done

echo "✅ All packages built successfully!"
echo ""
echo "To publish, run:"
echo "  cd packages/<package-name>"
echo "  npm publish --access public"
