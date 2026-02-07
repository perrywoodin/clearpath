# Clear Path QHHT - Content Editing Guide

This guide explains how to edit your website content and publish changes.

---

## Quick Start

1. **Edit content** in the `content/` folder
2. **Run the build**: Open Terminal, navigate to your site folder, and run:
   ```
   npm run build
   ```
3. **Preview** by opening `public/index.html` in a browser
4. **Upload** the `public/` folder to your web host

---

## First-Time Setup

Before you can build the site, you need to install the required tools:

### 1. Install Node.js
Download and install from: https://nodejs.org (choose the LTS version)

### 2. Install Dependencies
Open Terminal, navigate to your site folder, and run:
```
npm install
```

You only need to do this once.

---

## Content Files

All your content lives in the `content/` folder:

```
content/
├── home.yaml      ← Home page content
├── about.yaml     ← About page content
├── contact.yaml   ← Contact page content
├── blog.yaml      ← Blog page settings
└── blog/          ← Blog posts (one file per post)
    ├── what-to-expect-first-session.md
    ├── understanding-higher-self.md
    └── past-life-exploration.md
```

---

## Editing YAML Files (.yaml)

YAML files contain structured content. Here's how they work:

### Basic Rules
- **Indentation matters!** Use 2 spaces (not tabs)
- Text after a colon: `title: Your Title Here`
- Multi-line text: Use quotes or the `|` character
- Lists: Start each item with a dash `-`

### Example
```yaml
# This is a comment (ignored by the build)
hero:
  title: Find Your Way Back to *Wholeness*
  description: Experience the gentle power of QHHT...

benefits:
  items:
    - icon: "✨"
      title: Deep Healing
      description: Address physical challenges...

    - icon: "🌟"
      title: Life Purpose
      description: Gain clear insights...
```

### Tips
- Use `*asterisks*` around words in titles for emphasis (italic)
- Emoji icons should be in quotes: `icon: "✨"`
- If your text has special characters (: or #), wrap it in quotes

---

## Editing Blog Posts (.md)

Blog posts use Markdown format, which is easy to learn.

### Creating a New Blog Post

1. Create a new file in `content/blog/` (e.g., `my-new-post.md`)
2. Start with this template:

```markdown
---
title: Your Blog Post Title
date: 2026-02-15
description: A brief description for search engines (150 characters max)
---

Your first paragraph goes here. This will be highlighted.

## Section Heading

Regular paragraph text goes here. You can write as much as you want.

Another paragraph here.

## Another Section

More content...

> This is a blockquote - great for highlighting important quotes!

### Tips You Can Share

- First bullet point
- Second bullet point
- Third bullet point

## Final Thoughts

Wrap up your post here.
```

### Markdown Basics

| What You Type | What You Get |
|---------------|--------------|
| `## Heading` | Section heading |
| `### Smaller Heading` | Smaller heading |
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `[link text](url)` | Clickable link |
| `> quote` | Blockquote |
| `- item` | Bullet point |

---

## Building the Site

After editing content, you need to rebuild the site:

1. Open **Terminal**
2. Navigate to your site folder:
   ```
   cd ~/path/to/clearpath.love
   ```
3. Run the build:
   ```
   npm run build
   ```

You should see:
```
🌱 Building Clear Path QHHT website...

Building index.html...
Building about.html...
Building contact.html...
Building blog pages...
  Building blog/what-to-expect-first-session.html...
  Building blog/understanding-higher-self.html...
  Building blog/past-life-exploration.html...

✅ Build complete!
```

---

## Previewing Changes

After building, open `public/index.html` in your web browser to preview:
- Double-click the file, or
- Right-click → Open With → Your Browser

---

## Common Tasks

### Update Your Bio (About Page)
Edit `content/about.yaml`, find the `practitioner` section:
```yaml
practitioner:
  name: "Your Name"
  credentials: "Certified QHHT Practitioner, Level 2"
  bio:
    - "Your first paragraph..."
    - "Your second paragraph..."
```

### Add Your Photo
1. Save your photo as `practitioner-photo.jpg` in the main folder (next to build.js)
2. In `content/about.yaml`, change `has_photo: false` to `has_photo: true`
3. Run `npm run build` (the photo will be copied to `public/`)

### Update Pricing/FAQ
Edit `content/contact.yaml`, find the `faq` section

### Add a New Blog Post
1. Create a new `.md` file in `content/blog/`
2. Follow the template above
3. Run `npm run build`

### Change Contact Info
Edit `content/contact.yaml`, find the `contact_info` section

---

## Files You Don't Need to Edit

- `templates/` - HTML templates (only edit if changing design)
- `build.js` - The build script
- `styles.css` - Styling (only edit if changing design)
- `package.json` - Project configuration
- `public/` - Generated output (this is what you deploy)

---

## Troubleshooting

### "command not found: npm"
Node.js isn't installed. Download from https://nodejs.org

### Build fails with YAML error
Check your YAML file for:
- Missing colons after keys
- Incorrect indentation (must use spaces, not tabs)
- Unquoted special characters

### Changes not showing up
1. Make sure you ran `npm run build`
2. Refresh your browser (Cmd+R or Ctrl+R)
3. Clear browser cache if needed

---

## Need Help?

If you get stuck, the error messages usually indicate which file and line has the problem. Check that file for typos or formatting issues.
