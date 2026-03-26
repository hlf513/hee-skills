#!/usr/bin/env node

/**
 * Reveal.js Presentation Validator
 * Validates Reveal.js presentations against best practices
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

// Validation results
const results = {
    passed: [],
    warnings: [],
    failed: []
};

// Helper functions
function pass(message) {
    results.passed.push(message);
    console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function warn(message) {
    results.warnings.push(message);
    console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

function fail(message) {
    results.failed.push(message);
    console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function section(title) {
    console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.blue}  ${title}${colors.reset}`);
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
}

/**
 * HTML Parser - Simple tag and structure parser
 */
class HTMLParser {
    constructor(html) {
        this.html = html;
        this.lines = html.split('\n');
    }

    /**
     * Count occurrences of a tag
     */
    countTag(tagName) {
        const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, 'gi');
        const matches = this.html.match(regex);
        return matches ? matches.length : 0;
    }

    /**
     * Check for nested sections using DOM-like parsing
     */
    hasNestedSections() {
        let depth = 0;
        let maxDepth = 0;
        const regex = /<\/?section(?:\s[^>]*)?>|<section\s*[^>]*>/gi;
        let match;

        while ((match = regex.exec(this.html)) !== null) {
            const tag = match[0];

            if (tag.startsWith('</section')) {
                depth--;
            } else {
                depth++;
                if (depth > maxDepth) {
                    maxDepth = depth;
                }
            }
        }

        return {
            hasNested: maxDepth >= 2,
            maxDepth: maxDepth,
            sectionCount: this.countTag('section')
        };
    }

    /**
     * Check for nested lists (ul/ol inside ul/ol)
     */
    hasNestedLists() {
        // Check for patterns like <ul>...<ul> without closing </ul> in between
        // This indicates actual nesting, not separate lists
        const lines = this.html.split('\n');
        let inList = false;
        let listTag = '';

        for (const line of lines) {
            // Check if we enter a list
            const ulOpen = line.match(/<ul[^>]*>/);
            const olOpen = line.match(/<ol[^>]*>/);
            const ulClose = line.match(/<\/ul>/);
            const olClose = line.match(/<\/ol>/);

            if (ulOpen && !inList) {
                inList = true;
                listTag = 'ul';
            } else if (olOpen && !inList) {
                inList = true;
                listTag = 'ol';
            } else if ((ulClose && listTag === 'ul') || (olClose && listTag === 'ol')) {
                inList = false;
                listTag = '';
            } else if ((ulOpen || olOpen) && inList) {
                // Found a list opening while already in a list = nested!
                return true;
            }
        }

        return false;
    }

    /**
     * Check for inline styles with hardcoded colors
     */
    hasHardcodedInlineColors() {
        // Find all style attributes with hex colors
        const styleRegex = /style="([^"]*)"/gi;
        let match;
        let count = 0;

        while ((match = styleRegex.exec(this.html)) !== null) {
            const styleContent = match[1];
            // Check if contains hex color but not CSS variable
            if (/#{0-9a-fA-F}{6}/.test(styleContent) && !/var\(--/.test(styleContent)) {
                count++;
            }
        }

        return count;
    }

    /**
     * Check for CSS variables in :root
     */
    hasCSSVariables() {
        return this.html.includes('--accent-color:') || this.html.includes('var(--');
    }

    /**
     * Check for specific text patterns
     */
    hasPattern(pattern) {
        return new RegExp(pattern, 'gi').test(this.html);
    }

    /**
     * Count occurrences
     */
    countPattern(pattern) {
        const matches = this.html.match(new RegExp(pattern, 'gi'));
        return matches ? matches.length : 0;
    }

    /**
     * Get line numbers containing a pattern
     */
    getLinesWithPattern(pattern) {
        const lines = [];
        const regex = new RegExp(pattern, 'gi');

        this.lines.forEach((line, index) => {
            if (regex.test(line)) {
                lines.push({ line: index + 1, content: line.trim() });
            }
        });

        return lines;
    }
}

/**
 * Main validation function
 */
function validate(htmlFilePath) {
    // Check file exists
    if (!fs.existsSync(htmlFilePath)) {
        console.error(`${colors.red}Error: File '${htmlFilePath}' not found${colors.reset}`);
        process.exit(1);
    }

    // Read HTML file
    const html = fs.readFileSync(htmlFilePath, 'utf-8');
    const parser = new HTMLParser(html);

    console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}  Reveal.js Presentation Validator${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
    console.log(`\nValidating: ${colors.blue}${htmlFilePath}${colors.reset}\n`);

    // =========================================================================
    // 1. Structure Validation
    // =========================================================================
    section('1. Structure Validation');

    const h1Count = parser.countTag('h1');
    if (h1Count === 1) {
        pass(`Exactly one h1 tag found`);
    } else {
        fail(`Found ${h1Count} h1 tags (should be exactly 1)`);
    }

    const h2Count = parser.countTag('h2');
    if (h2Count >= 2) {
        pass(`Found ${h2Count} h2 tags (chapters + roadmap)`);
    } else {
        fail(`Found ${h2Count} h2 tags (should have at least 2)`);
    }

    const sectionInfo = parser.hasNestedSections();
    if (sectionInfo.hasNested) {
        pass(`Nested sections found (${sectionInfo.sectionCount} sections, max depth: ${sectionInfo.maxDepth})`);
    } else {
        warn(`No nested sections found (depth: ${sectionInfo.maxDepth})`);
    }

    // =========================================================================
    // 2. Cover Page Validation
    // =========================================================================
    section('2. Cover Page Validation');

    if (parser.hasPattern('cover-version')) {
        pass('Cover page includes version info');
    } else {
        warn('Cover page missing version info');
    }

    if (parser.hasPattern('cover-agenda|cover.*agenda')) {
        fail('Cover page contains agenda (should be separate chapter)');
    } else {
        pass('Cover page does not contain agenda');
    }

    // =========================================================================
    // 3. Roadmap Validation
    // =========================================================================
    section('3. Roadmap Validation');

    if (parser.hasPattern('card-grid')) {
        pass('Found card-grid component');
    } else {
        warn('No card-grid found');
    }

    const cardCount = parser.countPattern('<div class="card">');
    if (cardCount > 0) {
        pass(`Found ${cardCount} card(s)`);
    } else {
        warn('No cards found');
    }

    // =========================================================================
    // 4. CSS Validation
    // =========================================================================
    section('4. CSS Validation');

    const hardcodedInlineCount = parser.hasHardcodedInlineColors();
    if (hardcodedInlineCount === 0) {
        pass('No hardcoded colors in inline styles (using CSS variables)');
    } else {
        warn(`Found ${hardcodedInlineCount} inline style(s) with hex colors (prefer CSS variables)`);
    }

    if (parser.hasCSSVariables()) {
        pass('Uses CSS variables for colors');
    } else {
        warn('No CSS variable usage found');
    }

    // =========================================================================
    // 5. Component Usage Validation
    // =========================================================================
    section('5. Component Usage Validation');

    if (parser.hasPattern('<img')) {
        if (parser.hasPattern('img-box')) {
            pass('Images use img-box wrapper');
        } else {
            warn('Images found but no img-box wrapper');
        }
    } else {
        pass('No images or all properly handled');
    }

    if (parser.hasPattern('<span class="tag')) {
        pass('Tag component used');
    }

    // =========================================================================
    // 6. List Validation
    // =========================================================================
    section('6. List Validation');

    if (parser.hasNestedLists()) {
        fail('Nested lists found (only 1-level lists allowed)');
    } else {
        pass('No nested lists (correct 1-level structure)');
    }

    // Check for potentially short list items
    const shortItems = parser.getLinesWithPattern('<li>[^<]{1,10}</li>');
    if (shortItems.length > 0) {
        warn(`Found ${shortItems.length} potentially short list items (should be descriptive phrases)`);
    } else {
        pass('List items appear descriptive');
    }

    // =========================================================================
    // 7. Content Validation
    // =========================================================================
    section('7. Content Validation');

    if (parser.hasPattern('VERSION|JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER')) {
        pass('Version info found');
    } else {
        warn('Version info might be missing');
    }

    if (parser.hasPattern('reveal')) {
        pass('Reveal.js referenced');
    } else {
        fail('Reveal.js script not found');
    }

    // =========================================================================
    // Summary
    // =========================================================================
    section('Validation Summary');

    const total = results.passed.length + results.failed.length + results.warnings.length;
    const score = total > 0 ? Math.round((results.passed.length / total) * 100) : 0;

    console.log(`\nTotal Checks: ${colors.blue}${total}${colors.reset}`);
    console.log(`${colors.green}Passed: ${results.passed.length}${colors.reset}`);
    console.log(`${colors.yellow}Warnings: ${results.warnings.length}${colors.reset}`);
    console.log(`${colors.red}Failed: ${results.failed.length}${colors.reset}\n`);

    if (results.failed.length === 0 && results.warnings.length <= 2) {
        console.log(`${colors.green}╔═══════════════════════════════════════════════════╗${colors.reset}`);
        console.log(`${colors.green}║  ✓ PASSED - Presentation meets standards!        ║${colors.reset}`);
        console.log(`${colors.green}╚═══════════════════════════════════════════════════╝${colors.reset}`);
        console.log(`\nScore: ${colors.green}${score}%${colors.reset}\n`);
        process.exit(0);
    } else if (results.failed.length === 0) {
        console.log(`${colors.yellow}╔═══════════════════════════════════════════════════╗${colors.reset}`);
        console.log(`${colors.yellow}║  ⚠ PASSED WITH WARNINGS                         ║${colors.reset}`);
        console.log(`${colors.yellow}╚═══════════════════════════════════════════════════╝${colors.reset}`);
        console.log(`\nScore: ${colors.yellow}${score}%${colors.reset}\n`);
        process.exit(0);
    } else {
        console.log(`${colors.red}╔═══════════════════════════════════════════════════╗${colors.reset}`);
        console.log(`${colors.red}║  ✗ FAILED - Critical issues found                ║${colors.reset}`);
        console.log(`${colors.red}╚═══════════════════════════════════════════════════╝${colors.reset}`);
        console.log(`\nScore: ${colors.red}${score}%${colors.reset}\n`);
        process.exit(1);
    }
}

// Main execution
if (process.argv.length < 3) {
    console.error(`${colors.red}Error: No HTML file specified${colors.reset}`);
    console.error('Usage: node validate.js <presentation.html>');
    process.exit(1);
}

const htmlFilePath = process.argv[2];
validate(htmlFilePath);
