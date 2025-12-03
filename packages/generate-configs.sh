#!/bin/bash

# Script to generate package.json and tsconfig.json for all packages

PACKAGES=(
  "emoji-soul:High contrast card-style emoji feedback component"
  "emoji-interactive:Full modal flow emoji feedback with comment"
  "slider-shapeshifter:Morphing handle slider feedback component"
  "slider-cinematic:Spotlight number selector feedback component"
  "slider-crystal:Crystal charge bars feedback component"
  "text-feedback:Animated text input feedback form"
  "bug-reporter:Bug submission form component"
)

for pkg_info in "${PACKAGES[@]}"; do
  IFS=':' read -r pkg desc <<< "$pkg_info"
  
  echo "Creating package: @dilly/$pkg..."
  
  # Create package.json
  cat > "$pkg/package.json" << EOF
{
  "name": "@dilly/$pkg",
  "version": "1.0.0",
  "description": "$desc for React",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "tsup src/index.tsx --format cjs,esm --dts --external react --external framer-motion --external lucide-react",
    "dev": "tsup src/index.tsx --format cjs,esm --dts --watch --external react --external framer-motion --external lucide-react",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "framer-motion": "^10.0.0 || ^11.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "tsup": "^8.0.0",
    "typescript": "^5.3.0"
  },
  "keywords": ["react", "feedback", "component", "ui", "dilly"],
  "author": "Dilly",
  "license": "MIT"
}
EOF

  # Create tsconfig.json
  cat > "$pkg/tsconfig.json" << EOF
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

  echo "✅ Created config files for @dilly/$pkg"
done

echo ""
echo "✅ All package configs created!"
