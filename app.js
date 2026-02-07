const memoArea = document.getElementById('memoArea');
const statusEl = document.getElementById('status');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');

const LOCAL_STORAGE_KEY = 'simple_memo_content';

// Load saved content
document.addEventListener('DOMContentLoaded', () => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
        memoArea.value = savedContent;
    }
});

// Auto-save function
let timeoutId;
memoArea.addEventListener('input', () => {
    // Clear previous timeout
    clearTimeout(timeoutId);

    // Save immediately
    localStorage.setItem(LOCAL_STORAGE_KEY, memoArea.value);
    
    // Show saving status
    showStatus('Saving...');

    // Access debounce visual feedback (simulate network/processing delay if needed, but here it's instant)
    timeoutId = setTimeout(() => {
        showStatus('Saved');
        setTimeout(() => {
            hideStatus();
        }, 2000);
    }, 500);
});

// Clear button
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your memo?')) {
        memoArea.value = '';
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        showStatus('Cleared');
        setTimeout(hideStatus, 2000);
    }
});

// Copy button
copyBtn.addEventListener('click', () => {
    if (!memoArea.value) return;
    
    navigator.clipboard.writeText(memoArea.value).then(() => {
        showStatus('Copied!');
        setTimeout(hideStatus, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showStatus('Error copying');
    });
});

function showStatus(text) {
    statusEl.textContent = text;
    statusEl.classList.add('visible');
}

function hideStatus() {
    statusEl.classList.remove('visible');
}
