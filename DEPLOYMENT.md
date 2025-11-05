# Deployment Guide - Crew Battle Map

This guide covers deploying the Crew Battle Map to various hosting platforms, with a focus on Netlify.

## Quick Deploy to Netlify

### Method 1: Netlify CLI (Recommended)

**Step 1:** Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

**Step 2:** Login to Netlify
```bash
netlify login
```

**Step 3:** Deploy from project root
```bash
# From the DailyChessMap directory
netlify deploy
```

Follow the prompts:
- **Create & configure a new site**: Yes
- **Team**: Select your team
- **Site name**: Choose a unique name (e.g., `my-crew-battle-map`)
- **Publish directory**: `crew-battle-map`

**Step 4:** Deploy to production
```bash
netlify deploy --prod
```

Your site will be live at: `https://your-site-name.netlify.app`

---

### Method 2: GitHub Integration (Continuous Deployment)

**Step 1:** Push your code to GitHub (already done!)

**Step 2:** Go to [Netlify Dashboard](https://app.netlify.com)

**Step 3:** Click "Add new site" → "Import an existing project"

**Step 4:** Connect to GitHub and select your repository: `Haulbrook/DailyChessMap`

**Step 5:** Configure build settings:
- **Branch to deploy**: `claude/crew-equipment-battle-map-011CUqVngYR8wjvDG65c5iUy` (or create a `main` branch)
- **Build command**: Leave empty or use `echo 'Static site'`
- **Publish directory**: `crew-battle-map`

**Step 6:** Click "Deploy site"

Netlify will automatically deploy on every push!

---

### Method 3: Drag & Drop Deploy

**Step 1:** Go to [Netlify Drop](https://app.netlify.com/drop)

**Step 2:** Drag the `crew-battle-map` folder into the browser

**Step 3:** Wait for deployment to complete

**Note:** This method doesn't support continuous deployment.

---

### Method 4: Netlify CLI One-Command Deploy

```bash
# One-time deployment without configuration
netlify deploy --prod --dir=crew-battle-map
```

---

## Configuration Details

### netlify.toml

The project includes a `netlify.toml` configuration file with:
- **Publish directory**: `crew-battle-map`
- **Redirects**: Root redirects to index.html
- **Security headers**: XSS protection, frame options, etc.
- **Cache control**: Optimized for static assets
- **CORS**: Enabled for API integration

### _redirects

Backup redirect rules in `crew-battle-map/_redirects`:
- Handles SPA-like routing
- Ensures index.html is served for all routes

---

## Post-Deployment

### Custom Domain

To use a custom domain:

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `crewmap.yourdomain.com`)
4. Follow DNS configuration instructions

### Environment Variables

If you need environment variables:

1. Go to **Site settings** → **Environment variables**
2. Add variables (e.g., `API_URL`, `STORAGE_KEY`)
3. Redeploy to apply changes

### HTTPS

Netlify provides free HTTPS automatically via Let's Encrypt.

---

## Alternative Hosting Platforms

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd crew-battle-map
vercel
```

Configuration in `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### GitHub Pages

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Copy crew-battle-map contents to root
cp -r crew-battle-map/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

Then enable GitHub Pages in repository settings.

### Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Set build directory to `crew-battle-map`
4. Deploy

### AWS S3 + CloudFront

```bash
# Install AWS CLI
pip install awscli

# Create S3 bucket
aws s3 mb s3://crew-battle-map

# Upload files
aws s3 sync crew-battle-map/ s3://crew-battle-map --acl public-read

# Enable static website hosting
aws s3 website s3://crew-battle-map --index-document index.html
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

---

## Environment-Specific Builds

### Production Build

For production, ensure:
1. All console.log statements are removed (optional)
2. Error tracking is enabled (optional)
3. Analytics are configured (optional)

### Development Build

For local development:
```bash
# Simple HTTP server
cd crew-battle-map
python3 -m http.server 8000
# Visit: http://localhost:8000
```

Or use Netlify Dev:
```bash
netlify dev
```

---

## Performance Optimization

### Pre-Deployment Checklist

- [x] Minify CSS (optional - current size is small)
- [x] Minify JavaScript (optional - current size is manageable)
- [x] Optimize images (sample SVG is already optimized)
- [x] Enable gzip compression (Netlify does this automatically)
- [x] Set cache headers (configured in netlify.toml)
- [x] Enable HTTP/2 (Netlify enables by default)

### Post-Deployment Testing

Test these after deployment:
- [ ] Upload map functionality
- [ ] Add/edit/delete items
- [ ] Drag and drop pieces
- [ ] Export/import data
- [ ] LocalStorage persistence
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### Performance Monitoring

Use these tools to monitor performance:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (built into Chrome DevTools)

---

## Troubleshooting

### Deployment Fails

**Issue**: Build fails with error
**Solution**: Check that `netlify.toml` is in the repository root

**Issue**: 404 on deployed site
**Solution**: Verify publish directory is set to `crew-battle-map`

### LocalStorage Issues

**Issue**: Data not persisting between sessions
**Solution**: Ensure cookies are enabled and not in incognito mode

**Issue**: Different data on different domains
**Solution**: LocalStorage is domain-specific - export and import data to migrate

### CORS Errors

**Issue**: API calls blocked by CORS
**Solution**: Add CORS headers in netlify.toml or use a proxy

---

## CI/CD Pipeline

### Automated Testing (Optional)

Add to `.github/workflows/test.yml`:
```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate HTML
        run: |
          npm install -g html-validator-cli
          html-validator crew-battle-map/index.html
```

### Automated Deployment

Netlify automatically deploys when you push to the connected branch.

To deploy specific branches:
```bash
# Deploy feature branch
git checkout feature-branch
git push origin feature-branch
# Netlify creates a preview deployment
```

---

## Security Considerations

### Content Security Policy

Add to `netlify.toml` for stricter CSP:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
```

### Authentication (Optional)

To add password protection:
1. Use Netlify Identity
2. Add Netlify Functions for auth
3. Or use external auth provider (Auth0, Firebase Auth)

---

## Monitoring & Analytics

### Netlify Analytics

Enable in Netlify Dashboard:
- Site settings → Analytics
- $9/month for server-side analytics

### Google Analytics

Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Use Sentry for error tracking:
```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
</script>
```

---

## Cost Estimation

### Netlify Free Tier
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ CDN included

Perfect for this project!

### Netlify Pro ($19/month)
- 400GB bandwidth
- Faster builds
- Analytics
- Background functions

---

## Rollback Strategy

### Rollback on Netlify

1. Go to **Deploys** tab
2. Find previous successful deploy
3. Click **Publish deploy**

### Rollback via Git

```bash
# Revert to previous commit
git revert HEAD
git push origin branch-name
# Netlify auto-deploys the reverted version
```

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Community**: https://answers.netlify.com
- **Status Page**: https://www.netlifystatus.com

---

## Quick Reference

```bash
# Deploy to Netlify (production)
netlify deploy --prod

# Deploy preview
netlify deploy

# View deploy logs
netlify watch

# Open site in browser
netlify open:site

# Open Netlify admin
netlify open:admin

# Check deployment status
netlify status
```

---

**Ready to Deploy?** Run: `netlify deploy --prod`

**Need Help?** Check the troubleshooting section or Netlify docs.

**Version**: 1.0.0
**Last Updated**: November 2025
