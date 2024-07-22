export function saveOnLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
}

export function loadLocalStorage(key: string) {
    return localStorage.getItem(key);
}