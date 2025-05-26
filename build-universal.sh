#!/bin/bash

# Build script for modern Node.js environments
# This script attempts to build without legacy provider first,
# then falls back to legacy provider if needed

echo "🔧 Building Website Reader for production..."

# Try building without legacy provider first (for modern Node.js)
if npm run build:vercel 2>/dev/null; then
    echo "✅ Build successful with modern Node.js"
    exit 0
fi

echo "⚠️  Modern build failed, trying with legacy provider..."

# Fallback to legacy provider
export NODE_OPTIONS="--openssl-legacy-provider"
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful with legacy provider"
else
    echo "❌ Build failed with both methods"
    exit 1
fi
