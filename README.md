# Clear Path QHHT Website

A simple static website for Clear Path QHHT practice.

## Quick Start

```bash
# Install dependencies (first time only)
npm install

# Build the site
npm run build

# Preview by opening public/index.html in your browser
```

## Project Structure

```
clearpath.love/
├── content/           ← Edit content here
│   ├── home.yaml
│   ├── about.yaml
│   ├── contact.yaml
│   ├── blog.yaml
│   └── blog/          ← Blog posts (Markdown)
├── templates/         ← HTML templates
├── styles.css         ← Site styling
├── build.js           ← Build script
└── public/            ← Generated site (deploy this folder)
    ├── index.html
    ├── about.html
    ├── contact.html
    ├── blog.html
    ├── blog/
    └── styles.css
```

## Editing Content

See **EDITING-GUIDE.md** for detailed instructions on:
- Editing YAML content files
- Creating blog posts
- Running the build
- Common tasks

## Deployment

After running `npm run build`, upload the entire `public/` folder to your web host.

### Recommended: Netlify Drop (Free)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `public/` folder to upload
3. Connect your custom domain in Site Settings

### Contact Form Setup

The contact form uses Formspree:
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. Update `YOUR_FORM_ID` in `content/contact.yaml`
4. Run `npm run build`

## Personalizing the Site

Key items to update in the content files:

1. **contact.yaml**: Replace `YOUR_FORM_ID` with your Formspree ID
2. **contact.yaml**: Add your phone number and location
3. **about.yaml**: Add your name, bio, and credentials
4. **about.yaml**: Set `has_photo: true` and add `practitioner-photo.jpg` to root folder
5. **contact.yaml**: Update FAQ answers (pricing, virtual sessions, etc.)
