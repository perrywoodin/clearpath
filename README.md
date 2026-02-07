# Clear Path QHHT Website

A static website for Clear Path QHHT practice, featuring automatic healing and transformation guidance.

🌐 **Live Site:** https://clearpath.love

## How It Works

This site uses **GitHub Actions** to automatically rebuild and deploy when you make changes. No manual build steps needed!

### Editing Content (Choose One Method):

**Option 1: Edit on GitHub.com** (Easiest - no software needed)
1. Go to https://github.com/perrywoodin/clearpath
2. Navigate to `content/` folder and click any `.yaml` file
3. Click the pencil icon (✏️) to edit
4. Make changes → Click "Commit changes"
5. Site automatically rebuilds in 1-2 minutes!

**Option 2: Edit Locally** (For multiple changes)
1. Edit files in the `content/` folder
2. Save changes
3. Run: `git add -A && git commit -m "Update content" && git push`
4. Site automatically rebuilds in 1-2 minutes!

📝 **See EDITING-INSTRUCTIONS.md for detailed guidance**

## Project Structure

```
clearpath.love/
├── content/              ← Edit content here
│   ├── home.yaml        ← Home page content
│   ├── about.yaml       ← About page & practitioner info
│   ├── contact.yaml     ← Contact form & location
│   ├── blog.yaml        ← Blog listing
│   └── blog/            ← Blog posts (Markdown)
├── templates/            ← HTML templates
├── styles.css            ← Site styling
├── build.js              ← Build script (runs automatically)
├── docs/                 ← Generated site (auto-deployed to GitHub Pages)
└── .github/workflows/    ← GitHub Actions (auto-build)
```

## Hosting & Deployment

- **Hosting:** GitHub Pages
- **Domain:** clearpath.love (via Porkbun DNS)
- **Auto-Deploy:** GitHub Actions rebuilds on every push
- **SSL/HTTPS:** Enabled via GitHub Pages

## Contact Form

✅ Already configured with Formspree (form ID: `mzdabvdz`)
- Form submissions redirect to: https://clearpath.love/thank-you.html
- Notifications sent to your email

## Site Details

- **Practitioner:** Laura Welles
- **Location:** 558 Delaware Ave, Albany, NY 12209
- **Email Hosting:** iCloud (MX records configured at Porkbun)
