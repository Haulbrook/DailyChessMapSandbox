#!/bin/bash

# Crew Battle Map - Netlify Deployment Script
# This script helps deploy the Crew Battle Map to Netlify

set -e

echo "=========================================="
echo "Crew Battle Map - Netlify Deployment"
echo "=========================================="
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed."
    echo ""
    echo "Please install it with:"
    echo "  npm install -g netlify-cli"
    echo ""
    exit 1
fi

echo "✅ Netlify CLI is installed"
echo ""

# Check if logged in
if ! netlify status &> /dev/null; then
    echo "⚠️  Not logged in to Netlify"
    echo ""
    echo "Please run: netlify login"
    echo ""
    echo "This will open a browser window to authenticate with Netlify."
    echo "After logging in, run this script again."
    echo ""
    exit 1
fi

echo "✅ Logged in to Netlify"
echo ""

# Confirm deployment
echo "This will deploy the Crew Battle Map to Netlify."
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "Deploying to Netlify..."
echo ""

# Deploy to Netlify
netlify deploy --prod --dir=crew-battle-map --open

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Your Crew Battle Map is now live on Netlify!"
echo ""
echo "To view your site:"
echo "  netlify open:site"
echo ""
echo "To view the admin dashboard:"
echo "  netlify open:admin"
echo ""
