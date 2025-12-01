function loadStorage(sessionStorageKey) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(sessionStorageKey);
}

function saveStorage(sessionStorageKey, data = []) {
    if (typeof window === 'undefined') return null;
    window.localStorage.setItem(sessionStorageKey, JSON.stringify(data));
}

function deleteStorage(sessionStorageKey) {
    if (typeof window === 'undefined') return null;
    window.localStorage.removeItem(sessionStorageKey);
}

export { loadStorage, saveStorage, deleteStorage };
