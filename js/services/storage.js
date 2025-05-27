// Storage utilities
const storage = {
    get: (key) => { 
        try { 
            return JSON.parse(localStorage.getItem(key)); 
        } catch { 
            return null; 
        } 
    },
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

// Export for use in other modules
window.storage = storage;
