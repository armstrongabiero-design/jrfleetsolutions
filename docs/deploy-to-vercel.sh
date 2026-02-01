#!/bin/bash

# Quick Vercel Deployment Script
# JR Fleet Solutions

echo "╔════════════════════════════════════════════════════════╗"
echo "║   JR Fleet Solutions - Vercel Deployment Script       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found!"
    echo ""
    echo "Installing Vercel CLI..."
    npm i -g vercel
    echo ""
fi

echo "🚀 Deploying to Vercel..."
echo ""

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your site is now live on Vercel."
echo "Check your Vercel dashboard for the deployment URL."
echo ""
echo "═══════════════════════════════════════════════════════"
