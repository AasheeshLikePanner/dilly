#!/bin/bash

# Script to publish all Dilly packages to NPM
# Make sure you are logged in with `npm login` before running this!

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

echo "🚀 Starting publish process for ${#PACKAGES[@]} packages..."
echo "Make sure you are logged in to npm!"
echo ""

for pkg in "${PACKAGES[@]}"; do
  echo "--------------------------------------------------"
  echo "📦 Publishing @zynta/$pkg..."
  
  cd "$pkg" || exit
  
  # Publish with public access
  # Using || true to continue if one fails (e.g. version already exists)
  npm publish --access public || echo "⚠️  Failed to publish $pkg (maybe version exists?)"
  
  cd ..
  echo "✅ Done with $pkg"
done

echo ""
echo "🎉 All packages processed!"
