function loadStorage(sessionStorageKey) {
    const stringData = window.localStorage.getItem(sessionStorageKey);
    let data = null;

    // console.log('stringData', stringData);
    //
    // try {
    //     data = JSON.parse(stringData);
    // } catch (e) {
    //     data = null;
    // }
    // console.log('data', data);
    // return data;
    return stringData;
}

function saveStorage(sessionStorageKey, data) {
    window.localStorage.setItem(sessionStorageKey, JSON.stringify(data));
}

function deleteStorage(sessionStorageKey) {
    window.localStorage.removeItem(sessionStorageKey);
}

export { loadStorage, saveStorage, deleteStorage };
