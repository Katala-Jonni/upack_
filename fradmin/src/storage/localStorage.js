function loadStorage(sessionStorageKey) {
    const stringData = window.localStorage.getItem(sessionStorageKey);
    let data = null;

    try {
        data = JSON.parse(stringData);
    } catch (e) {
        data = null;
    }

    return data;
}

function saveStorage(sessionStorageKey, data) {
    window.localStorage.setItem(sessionStorageKey, JSON.stringify(data));
}

function deleteStorage(sessionStorageKey) {
    window.localStorage.removeItem(sessionStorageKey);
}

export { loadStorage, saveStorage, deleteStorage };
