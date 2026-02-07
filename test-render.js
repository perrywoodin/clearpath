const fs = require('fs');
const yaml = require('js-yaml');

const aboutData = yaml.load(fs.readFileSync('content/about.yaml', 'utf8'));

function getNestedValue(obj, pathStr) {
    return pathStr.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

function renderTemplate(template, data) {
    let result = template;
    console.log('Input template:', template);

    // Handle array iterations
    const arrayPattern = /\{\{#(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    let match;
    while ((match = arrayPattern.exec(result)) !== null) {
        console.log('Array pattern matched:', match[0]);
    }
    arrayPattern.lastIndex = 0;
    
    result = result.replace(arrayPattern, (match, path, inner) => {
        console.log('Processing array:', path);
        const array = getNestedValue(data, path);
        if (Array.isArray(array)) {
            return array.map((item, index) => {
                const itemData = typeof item === 'object' ? { ...item, index: index + 1 } : { '.': item, index: index + 1 };
                return renderTemplate(inner, itemData);
            }).join('');
        }
        return '';
    });

    console.log('After array processing:', result);

    // Handle negative conditionals
    const negPattern = /\{\{\^(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    result = result.replace(negPattern, (match, path, inner) => {
        console.log('Processing negative conditional:', path);
        const value = getNestedValue(data, path);
        console.log('  Value:', value, 'Returning:', !value ? inner : '');
        return !value ? inner : '';
    });

    console.log('After negative processing:', result);

    // Handle positive conditionals for non-arrays
    const condPattern = /\{\{#(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    result = result.replace(condPattern, (match, path, inner) => {
        console.log('Processing positive conditional:', path);
        const value = getNestedValue(data, path);
        console.log('  Value:', value, 'Is array:', Array.isArray(value));
        if (value && !Array.isArray(value)) {
            console.log('  Rendering inner content');
            return renderTemplate(inner, data);
        }
        console.log('  Not rendering');
        return '';
    });

    console.log('After positive processing:', result);
    return result;
}

const template = `{{#practitioner.has_photo}}<img src="test.jpg">{{/practitioner.has_photo}}{{^practitioner.has_photo}}NO PHOTO{{/practitioner.has_photo}}`;
const result = renderTemplate(template, aboutData);
console.log('\n=== FINAL RESULT ===');
console.log(result);
