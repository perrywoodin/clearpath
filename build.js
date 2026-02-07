/**
 * Clear Path QHHT - Site Builder
 *
 * This script reads content from YAML/Markdown files and generates HTML pages.
 * Run with: npm run build
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

// Configure marked for better output
marked.setOptions({
    breaks: true,
    gfm: true
});

// Paths
const CONTENT_DIR = path.join(__dirname, 'content');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const OUTPUT_DIR = path.join(__dirname, 'docs');
const BLOG_CONTENT_DIR = path.join(CONTENT_DIR, 'blog');
const BLOG_OUTPUT_DIR = path.join(OUTPUT_DIR, 'blog');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(BLOG_OUTPUT_DIR)) {
    fs.mkdirSync(BLOG_OUTPUT_DIR, { recursive: true });
}

/**
 * Read and parse a YAML file
 */
function readYaml(filename) {
    const filepath = path.join(CONTENT_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf8');
    return yaml.load(content);
}

/**
 * Read a template file
 */
function readTemplate(filename) {
    const filepath = path.join(TEMPLATES_DIR, filename);
    return fs.readFileSync(filepath, 'utf8');
}

/**
 * Parse front matter from markdown file
 */
function parseFrontMatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (match) {
        return {
            frontMatter: yaml.load(match[1]),
            body: match[2].trim()
        };
    }
    return { frontMatter: {}, body: content };
}

/**
 * Format a date (string or Date object) to readable format
 */
function formatDate(dateInput) {
    let date;
    if (dateInput instanceof Date) {
        date = dateInput;
    } else if (typeof dateInput === 'string') {
        date = new Date(dateInput + 'T00:00:00');
    } else {
        return 'Date not set';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get slug from filename
 */
function getSlug(filename) {
    return path.basename(filename, '.md');
}

/**
 * Get excerpt from markdown content (first paragraph)
 */
function getExcerpt(markdown, maxLength = 200) {
    // Remove headers and get first paragraph
    const lines = markdown.split('\n').filter(line => !line.startsWith('#') && line.trim());
    const firstPara = lines[0] || '';
    if (firstPara.length > maxLength) {
        return firstPara.substring(0, maxLength).trim() + '...';
    }
    return firstPara;
}

/**
 * Process title to convert *text* to <em>text</em>
 */
function processTitle(title) {
    return title.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/**
 * Simple template engine
 * Supports: {{variable}}, {{nested.variable}}, {{#array}}...{{/array}}, {{^condition}}...{{/condition}}
 */
function renderTemplate(template, data) {
    let result = template;

    // Handle array iterations: {{#array}}...{{/array}}
    const arrayPattern = /\{\{#(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    result = result.replace(arrayPattern, (match, path, inner) => {
        const array = getNestedValue(data, path);
        if (Array.isArray(array)) {
            return array.map((item, index) => {
                // Add index (1-based) for process steps
                const itemData = typeof item === 'object' ? { ...item, index: index + 1 } : { '.': item, index: index + 1 };
                return renderTemplate(inner, itemData);
            }).join('');
        }
        return match; // Return original match if not an array, for conditional processing
    });

    // Handle negative conditionals: {{^condition}}...{{/condition}}
    const negPattern = /\{\{\^(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    result = result.replace(negPattern, (match, path, inner) => {
        const value = getNestedValue(data, path);
        return !value ? inner : '';
    });

    // Handle positive conditionals for non-arrays: {{#condition}}...{{/condition}}
    const condPattern = /\{\{#(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    result = result.replace(condPattern, (match, path, inner) => {
        const value = getNestedValue(data, path);
        if (value && !Array.isArray(value)) {
            return renderTemplate(inner, data);
        }
        return '';
    });

    // Handle simple dot notation for array items: {{.}}
    result = result.replace(/\{\{\.\}\}/g, data['.'] || '');

    // Handle nested variables: {{path.to.value}}
    const varPattern = /\{\{(\w+(?:\.\w+)*)\}\}/g;
    result = result.replace(varPattern, (match, path) => {
        const value = getNestedValue(data, path);
        return value !== undefined ? value : match;
    });

    return result;
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

/**
 * Build the home page
 */
function buildHomePage() {
    console.log('Building index.html...');

    const data = readYaml('home.yaml');
    const template = readTemplate('index.html');

    // Process title for emphasis
    data.hero.title = processTitle(data.hero.title);

    const html = renderTemplate(template, data);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
}

/**
 * Build the about page
 */
function buildAboutPage() {
    console.log('Building about.html...');

    const data = readYaml('about.yaml');
    const template = readTemplate('about.html');

    const html = renderTemplate(template, data);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'about.html'), html);
}

/**
 * Build the contact page
 */
function buildContactPage() {
    console.log('Building contact.html...');

    const data = readYaml('contact.yaml');
    const template = readTemplate('contact.html');

    const html = renderTemplate(template, data);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'contact.html'), html);
}

/**
 * Build the services page
 */
function buildServicesPage() {
    console.log('Building services.html...');

    const data = readYaml('services.yaml');
    const template = readTemplate('services.html');

    const html = renderTemplate(template, data);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'services.html'), html);
}

/**
 * Build the thank you page
 */
function buildThankYouPage() {
    console.log('Building thank-you.html...');

    const template = readTemplate('thank-you.html');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'thank-you.html'), template);
}

/**
 * Build blog pages (listing and individual posts)
 */
function buildBlogPages() {
    console.log('Building blog pages...');

    const blogData = readYaml('blog.yaml');
    const listTemplate = readTemplate('blog.html');
    const postTemplate = readTemplate('blog/post.html');

    // Read all blog post markdown files
    const posts = [];
    const files = fs.readdirSync(BLOG_CONTENT_DIR).filter(f => f.endsWith('.md'));

    for (const file of files) {
        const filepath = path.join(BLOG_CONTENT_DIR, file);
        const content = fs.readFileSync(filepath, 'utf8');
        const { frontMatter, body } = parseFrontMatter(content);

        const slug = getSlug(file);
        const post = {
            ...frontMatter,
            slug,
            date_formatted: formatDate(frontMatter.date),
            excerpt: getExcerpt(body),
            content: marked.parse(body)
        };

        posts.push(post);

        // Build individual post page
        console.log(`  Building blog/${slug}.html...`);
        const postHtml = renderTemplate(postTemplate, post);
        fs.writeFileSync(path.join(BLOG_OUTPUT_DIR, `${slug}.html`), postHtml);
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Build blog listing page
    const listData = {
        ...blogData,
        posts
    };

    const listHtml = renderTemplate(listTemplate, listData);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'blog.html'), listHtml);
}

/**
 * Copy static assets to output directory
 */
function copyAssets() {
    console.log('Copying assets...');

    // Copy styles.css
    fs.copyFileSync(
        path.join(__dirname, 'styles.css'),
        path.join(OUTPUT_DIR, 'styles.css')
    );

    // Copy practitioner photo if it exists
    const photoPath = path.join(__dirname, 'practitioner-photo.jpg');
    if (fs.existsSync(photoPath)) {
        fs.copyFileSync(photoPath, path.join(OUTPUT_DIR, 'practitioner-photo.jpg'));
    }
}

/**
 * Main build function
 */
function build() {
    console.log('\n🌱 Building Clear Path QHHT website...\n');

    try {
        buildHomePage();
        buildAboutPage();
        buildServicesPage();
        buildContactPage();
        buildThankYouPage();
        buildBlogPages();
        copyAssets();

        console.log('\n✅ Build complete!\n');
        console.log('Output in: docs/\n');
        console.log('Open docs/index.html in a browser to preview.\n');
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run the build
build();
