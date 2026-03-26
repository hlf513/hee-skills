#!/usr/bin/env node
/**
 * Embed local images as base64 in Reveal.js presentations.
 *
 * Converts all local image references to base64 data URIs,
 * making the HTML file self-contained and portable.
 */

const fs = require('fs');
const path = require('path');

/**
 * Get file size in megabytes
 */
function getFileSizeMB(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size / (1024 * 1024);
}

/**
 * Convert image file to base64 data URI
 */
function imageToBase64(imagePath) {
    if (!fs.existsSync(imagePath)) {
        console.error(`Warning: Image not found: ${imagePath}`);
        return null;
    }

    const ext = path.extname(imagePath).toLowerCase();

    // MIME type mapping
    const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.bmp': 'image/bmp',
        '.ico': 'image/x-icon'
    };

    const mimeType = mimeTypes[ext] || 'image/png';

    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Data = imageBuffer.toString('base64');
        return `data:${mimeType};base64,${base64Data}`;
    } catch (error) {
        console.error(`Error encoding ${imagePath}: ${error.message}`);
        return null;
    }
}

/**
 * Extract all local image references from HTML file
 */
function extractImagesFromHTML(htmlFile) {
    const htmlDir = path.dirname(path.resolve(htmlFile));
    const content = fs.readFileSync(htmlFile, 'utf-8');

    // Find all img tags with src attributes
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    const matches = [...content.matchAll(imgRegex)];

    const images = [];

    for (const match of matches) {
        const src = match[1];

        // Skip if already base64 or external URL
        if (src.startsWith('data:')) continue;
        if (src.startsWith('http://') || src.startsWith('https://')) continue;

        // Resolve full path
        let fullPath;
        if (path.isAbsolute(src)) {
            fullPath = src;
        } else {
            fullPath = path.join(htmlDir, src);
        }

        if (fs.existsSync(fullPath)) {
            images.push({ src, fullPath });
        }
    }

    return images;
}

/**
 * Embed images in HTML file
 */
function embedImagesInHTML(htmlFile, options = {}) {
    const { backup = true } = options;

    // Create backup
    if (backup) {
        const backupFile = htmlFile + '.backup';
        fs.copyFileSync(htmlFile, backupFile);
        console.log(`✓ Backup created: ${backupFile}`);
    }

    console.log(`\n🔍 Scanning ${htmlFile} for local images...`);

    // Find images
    const images = extractImagesFromHTML(htmlFile);

    if (images.length === 0) {
        console.log("No local images found to embed.");
        return 0;
    }

    console.log(`Found ${images.length} local image(s):\n`);

    // Read HTML content
    let content = fs.readFileSync(htmlFile, 'utf-8');

    // Process each image
    let embeddedCount = 0;
    let totalOriginalSize = 0;
    let totalEmbeddedSize = 0;

    images.forEach((image, index) => {
        const { src, fullPath } = image;
        const fileName = path.basename(fullPath);
        const fileSizeMB = getFileSizeMB(fullPath);

        totalOriginalSize += fileSizeMB;

        console.log(`[${index + 1}/${images.length}] ${fileName} (${fileSizeMB.toFixed(2)} MB)`);

        // Convert to base64
        const base64URI = imageToBase64(fullPath);

        if (base64URI) {
            const embeddedSizeMB = base64URI.length / (1024 * 1024);
            totalEmbeddedSize += embeddedSizeMB;

            // Escape special regex characters
            const escapedSrc = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Replace in HTML
            const regex = new RegExp(`src=["']?${escapedSrc}["']?`, 'g');
            content = content.replace(regex, `src="${base64URI}"`);

            embeddedCount++;
            console.log(`       ✓ Embedded (${embeddedSizeMB.toFixed(2)} MB)`);
        } else {
            console.log(`       ✗ Failed to embed`);
        }
    });

    // Write updated HTML
    fs.writeFileSync(htmlFile, content, 'utf-8');

    // Summary
    console.log(`\n${'='.repeat(60)}`);
    console.log(`✓ Successfully embedded ${embeddedCount} image(s)`);
    console.log(`  Original size: ${totalOriginalSize.toFixed(2)} MB`);
    console.log(`  Embedded size: ${totalEmbeddedSize.toFixed(2)} MB`);

    const increase = totalEmbeddedSize - totalOriginalSize;
    const percentage = ((totalEmbeddedSize / totalOriginalSize - 1) * 100).toFixed(1);

    console.log(`  Size increase:  ${increase.toFixed(2)} MB (${percentage}%)`);
    console.log(`${'='.repeat(60)}\n`);

    return embeddedCount;
}

/**
 * Main execution
 */
function main() {
    const args = process.argv.slice(2);

    let htmlFile;

    if (args.length === 0) {
        // Auto-detect HTML file in current directory
        const htmlFiles = fs.readdirSync('.')
            .filter(file => file.endsWith('.html'))
            .sort();

        if (htmlFiles.length === 0) {
            console.error('Error: No HTML file found in current directory');
            console.error('Usage: node embed-images.js <html-file>');
            process.exit(1);
        } else if (htmlFiles.length === 1) {
            htmlFile = htmlFiles[0];
            console.log(`Auto-detected HTML file: ${htmlFile}`);
        } else {
            // Multiple files, prefer index.html or presentation.html
            const preferred = ['index.html', 'presentation.html'];
            for (const name of preferred) {
                if (htmlFiles.includes(name)) {
                    htmlFile = name;
                    break;
                }
            }
            if (!htmlFile) {
                htmlFile = htmlFiles[0];
            }
            console.log(`Found ${htmlFiles.length} HTML files, using: ${htmlFile}`);
        }
    } else {
        htmlFile = args[0];
    }

    if (!fs.existsSync(htmlFile)) {
        console.error(`Error: File not found: ${htmlFile}`);
        process.exit(1);
    }

    // Check if file is HTML
    if (!htmlFile.endsWith('.html')) {
        console.warn(`Warning: ${htmlFile} may not be an HTML file`);
    }

    // Embed images
    const count = embedImagesInHTML(htmlFile);

    if (count > 0) {
        console.log(`✨ Done! Open ${htmlFile} in a browser to verify.\n`);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { embedImagesInHTML, extractImagesFromHTML, imageToBase64 };
