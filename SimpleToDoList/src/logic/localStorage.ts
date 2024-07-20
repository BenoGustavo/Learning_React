export class LocalStorageController {
    private static instance: LocalStorageController;

    private constructor() {
        if (!LocalStorageController.instance) {
            LocalStorageController.instance = this;
        }
        return LocalStorageController.instance;
    }

    public static getInstance(): LocalStorageController {
        if (!LocalStorageController.instance) {
            LocalStorageController.instance = new LocalStorageController();
        }
        return LocalStorageController.instance;
    }

    saveData(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getData(key: string) {
        return JSON.parse(localStorage.getItem(key) || '[]');
    }
}