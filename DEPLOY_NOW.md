# Deploy to Netlify Now - Quick Guide

Follow these steps to deploy your Crew Battle Map to Netlify in under 5 minutes.

## Prerequisites

✅ Netlify CLI is already installed
✅ Code is committed and pushed to Git
✅ All configuration files are ready

## Step 1: Login to Netlify

```bash
netlify login
```

This will open a browser window. Click "Authorize" to authenticate.

## Step 2: Deploy Your Site

### Option A: Using the Deploy Script (Recommended)

```bash
./deploy.sh
```

This script will guide you through the deployment process.

### Option B: Manual Deployment

```bash
# Deploy to production
netlify deploy --prod --dir=crew-battle-map
```

Follow the prompts:
- **Create & configure a new site**: Yes
- **Team**: Select your team (or create one)
- **Site name**: Choose a unique name (e.g., `my-crew-battle-map`)

## Step 3: Access Your Live Site

After deployment completes, you'll see:
```
Website URL: https://your-site-name.netlify.app
```

Visit that URL to see your live Crew Battle Map!

## Alternative: GitHub Integration

If you prefer continuous deployment:

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select repository: `Haulbrook/DailyChessMap`
5. Configure:
   - **Branch**: `claude/crew-equipment-battle-map-011CUqVngYR8wjvDG65c5iUy`
   - **Publish directory**: `crew-battle-map`
   - **Build command**: (leave empty)
6. Click "Deploy site"

Now every push to the branch will automatically deploy!

## Quick Commands

```bash
# View site in browser
netlify open:site

# View admin dashboard
netlify open:admin

# Check deployment status
netlify status

# View recent deploys
netlify deploys

# Rollback to previous deploy
netlify rollback
```

## Need Help?

- **Full Guide**: See `DEPLOYMENT.md` for comprehensive documentation
- **Troubleshooting**: Common issues and solutions in `DEPLOYMENT.md`
- **Netlify Docs**: https://docs.netlify.com

## What's Next?

After deployment:
- [ ] Test all features (upload map, add items, drag pieces)
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)
- [ ] Share with your team!

---

**Ready to deploy?** Run: `./deploy.sh` or `netlify login && netlify deploy --prod --dir=crew-battle-map`
