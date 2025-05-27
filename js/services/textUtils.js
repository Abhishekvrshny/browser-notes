// Extract title from markdown text
const extractTitle = (text) => {
    if (!text) return 'Untitled';
    const firstLine = text.split('\n')[0].trim();
    if (firstLine.startsWith('#')) return firstLine.replace(/^#+\s*/, '');
    return firstLine.substring(0, 50) || 'Untitled';
};

// Get word count from text
const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Export for use in other modules
window.extractTitle = extractTitle;
window.getWordCount = getWordCount;
