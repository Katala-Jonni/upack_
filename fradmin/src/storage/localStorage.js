function loadStorage(sessionStorageKey) {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(sessionStorageKey);
  } catch (e) {
    console.log('loadStorage', e);
  }

}

function saveStorage(sessionStorageKey, data = []) {
  try {
    if (typeof window === 'undefined') return null;
    window.localStorage.setItem(sessionStorageKey, JSON.stringify(data));
  } catch (e) {
    console.log('loadStorage', e);
  }
}

function deleteStorage(sessionStorageKey) {
  try {
    if (typeof window === 'undefined') return null;
    window.localStorage.removeItem(sessionStorageKey);
  } catch (e) {
    console.log('loadStorage', e);
  }
}

export { loadStorage, saveStorage, deleteStorage };
