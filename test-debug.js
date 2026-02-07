const fs = require('fs');
const yaml = require('js-yaml');

const aboutData = yaml.load(fs.readFileSync('content/about.yaml', 'utf8'));

console.log('has_photo:', aboutData.practitioner.has_photo);
console.log('has_photo type:', typeof aboutData.practitioner.has_photo);

function getNestedValue(obj, pathStr) {
    return pathStr.split('.').reduce((current, key) => {
        console.log('  checking key:', key, 'current:', current && current[key]);
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

const value = getNestedValue(aboutData, 'practitioner.has_photo');
console.log('Final value:', value);
console.log('Conditional check (value && !Array.isArray(value)):', value && !Array.isArray(value));
