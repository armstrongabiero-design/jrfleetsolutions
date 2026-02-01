#!/bin/bash

# JR Fleet Solutions Landing Page - Quick Start Script
# This script helps you quickly preview the landing page

echo "╔════════════════════════════════════════════════════╗"
echo "║   JR Fleet Solutions - Landing Page Quick Start   ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the correct directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    echo "Please run this script from the landingPage directory."
    exit 1
fi

echo "✅ Found landing page files"
echo ""
echo "Starting local development server..."
echo ""

# Try different server options
if command -v python3 &> /dev/null; then
    echo "🚀 Starting Python HTTP Server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "═══════════════════════════════════════════════════"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Starting Python HTTP Server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "═══════════════════════════════════════════════════"
    python -m SimpleHTTPServer 8000
elif command -v php &> /dev/null; then
    echo "🚀 Starting PHP Built-in Server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "═══════════════════════════════════════════════════"
    php -S localhost:8000
else
    echo "⚠️  No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  • Python 3: brew install python3"
    echo "  • Node.js: brew install node (then run: npx http-server -p 8000)"
    echo "  • PHP: brew install php"
    echo ""
    echo "Or simply open index.html directly in your browser."
    exit 1
fi
