# How to Edit Your Website

Your website automatically rebuilds when you make changes! You have two easy options:

---

## Option 1: Edit Directly on GitHub (Easiest - No Software Needed!)

1. **Go to your repository:** https://github.com/perrywoodin/clearpath

2. **Navigate to the file you want to edit:**
   - For home page: Click `content` → `home.yaml`
   - For about page: Click `content` → `about.yaml`
   - For contact page: Click `content` → `contact.yaml`
   - For blog posts: Click `content` → `blog` → click the post

3. **Click the pencil icon** (✏️) in the top-right corner to edit

4. **Make your changes** in the editor

5. **Click "Commit changes"** button at the top right
   - Add a description like "Update practitioner bio"
   - Click "Commit changes"

6. **Wait 1-2 minutes** - GitHub automatically rebuilds your site!

7. **Check your site** at https://clearpath.love

---

## Option 2: Edit on Your Computer (For Multiple Changes)

1. **Open the folder** where you have the website files

2. **Edit the YAML files** in the `content` folder:
   - `home.yaml` - Home page content
   - `about.yaml` - About page and practitioner info
   - `contact.yaml` - Contact form and location
   - `blog/*.md` - Blog posts

3. **Save your changes**

4. **Commit and push to GitHub:**
   ```bash
   cd "/path/to/clearpath.love"
   git add -A
   git commit -m "Update website content"
   git push origin main
   ```

5. **Wait 1-2 minutes** - GitHub automatically rebuilds your site!

---

## Common Edits

### Update Your Bio
Edit `content/about.yaml` - lines 22-27

### Change Location/Contact Info
Edit `content/contact.yaml` - lines 24-28

### Add/Edit Blog Posts
Edit files in `content/blog/` folder

### Update Practitioner Photo
Replace `practitioner-photo.jpg` with your new photo (keep the same filename)

---

## No Need to Build Manually!

GitHub Actions now handles the build process automatically. You never need to run `npm run build` - just make your changes and push!

---

## Need Help?

- If the site doesn't update after 5 minutes, check: https://github.com/perrywoodin/clearpath/actions
- Green checkmark ✓ = build successful
- Red X ✗ = build failed (click to see error details)
