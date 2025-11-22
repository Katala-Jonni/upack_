function loadStorage(sessionStorageKey) {
    return window.localStorage.getItem(sessionStorageKey);
}

function saveStorage(sessionStorageKey, data = []) {
    window.localStorage.setItem(sessionStorageKey, JSON.stringify(data));
}

function deleteStorage(sessionStorageKey) {
    window.localStorage.removeItem(sessionStorageKey);
}

export { loadStorage, saveStorage, deleteStorage };
