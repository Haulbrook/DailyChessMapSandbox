# How to Deploy - Step by Step

This guide shows you EXACTLY where and how to run the deployment commands.

## What You Need

- A terminal/command line interface (already open if you're reading this!)
- Internet connection
- A Netlify account (free - you'll create one in Step 1)

---

## Step 1: Open Your Terminal

You're likely already here if you're working with this project!

**Where you are right now:**
```bash
/home/user/DailyChessMap
```

**To confirm, run:**
```bash
pwd
```

You should see: `/home/user/DailyChessMap`

**If you're not in the right folder:**
```bash
cd /home/user/DailyChessMap
```

---

## Step 2: Login to Netlify (One Time Only)

**In your terminal, type:**
```bash
netlify login
```

**What happens:**
- A browser window will open
- You'll see the Netlify login page
- Click "Sign up" if you don't have an account (it's free!)
- Or click "Log in" if you already have one
- Click "Authorize" to grant access
- Come back to your terminal

**You'll see a success message:**
```
You are now logged in to your Netlify account!
```

---

## Step 3: Deploy Your Site

**Option A: Use the Automated Script (Recommended)**

**In your terminal, type:**
```bash
./deploy.sh
```

**What happens:**
- Script checks everything is ready
- Asks if you want to continue (type `y` and press Enter)
- Uploads your site to Netlify
- Opens your live site in a browser!

**Option B: Manual Deployment**

**In your terminal, type:**
```bash
netlify deploy --prod --dir=crew-battle-map
```

**Follow the prompts:**
- `? What would you like to do?` → Select "Create & configure a new site"
- `? Team:` → Select your team (or it will use your personal team)
- `? Site name (leave blank for random name):` → Type a name like `my-crew-map` or press Enter for random
- Wait for upload to complete

**You'll see:**
```
✔ Finished hashing
✔ CDN requesting 10 files
✔ Finished uploading 10 assets
✔ Deploy is live!

Website URL: https://your-site-name.netlify.app
```

---

## Step 4: View Your Live Site

**Your site is now live!**

**To open it in your browser, type:**
```bash
netlify open:site
```

Or copy the URL from the terminal and paste it in your browser.

---

## Visual Example of Terminal Session

Here's what your terminal session will look like:

```bash
# You start here
$ pwd
/home/user/DailyChessMap

# Login to Netlify
$ netlify login
Opening https://app.netlify.com/authorize...
⠙ Waiting for authorization...
✔ You are now logged in to your Netlify account!

# Deploy your site
$ ./deploy.sh
==========================================
Crew Battle Map - Netlify Deployment
==========================================

✅ Netlify CLI is installed

✅ Logged in to Netlify

This will deploy the Crew Battle Map to Netlify.

Continue? (y/n) y

Deploying to Netlify...

Deploy path: /home/user/DailyChessMap/crew-battle-map
Deploying to main site URL...
⠙ Uploading files...
✔ Finished hashing 10 files
✔ CDN requesting 10 files
✔ Finished uploading 10 assets
✔ Deploy is live!

Website URL: https://your-site-name.netlify.app

==========================================
✅ Deployment Complete!
==========================================

Your Crew Battle Map is now live on Netlify!
```

---

## Alternative: Deploy via Netlify Website (No Commands Needed)

If you prefer not to use the command line:

1. **Go to:** https://app.netlify.com
2. **Sign up or log in**
3. **Click:** "Add new site" → "Import an existing project"
4. **Connect to GitHub:**
   - Select your repository: `Haulbrook/DailyChessMap`
   - Branch: `claude/crew-equipment-battle-map-011CUqVngYR8wjvDG65c5iUy`
5. **Configure:**
   - Build command: (leave blank)
   - Publish directory: `crew-battle-map`
6. **Click:** "Deploy site"
7. **Wait** for deployment to complete (2-3 minutes)
8. **Visit** your live site URL!

---

## Common Questions

### Q: Where do I type these commands?

**A:** In your **terminal** (command line), not in any file!

### Q: What if `./deploy.sh` says "permission denied"?

**A:** Run this first:
```bash
chmod +x deploy.sh
```

Then try again:
```bash
./deploy.sh
```

### Q: What if `netlify` command is not found?

**A:** Install it first:
```bash
npm install -g netlify-cli
```

### Q: Can I see all my deployed sites?

**A:** Yes! Run:
```bash
netlify sites:list
```

Or visit: https://app.netlify.com

### Q: How do I update my deployed site?

**A:** Just run the deploy command again:
```bash
./deploy.sh
```

Or if you used GitHub integration, just push to your branch:
```bash
git push origin your-branch-name
```

---

## Need Help?

- **Full deployment guide:** See `DEPLOYMENT.md`
- **Quick reference:** See `DEPLOY_NOW.md`
- **Netlify support:** https://answers.netlify.com

---

## Summary

**The commands you run in your TERMINAL:**

```bash
# 1. Make sure you're in the right folder
cd /home/user/DailyChessMap

# 2. Login to Netlify (one time)
netlify login

# 3. Deploy your site
./deploy.sh
```

**That's it! Your site will be live in minutes! 🚀**
