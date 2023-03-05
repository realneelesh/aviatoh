const bStorage = sessionStorage;

export const userInfoKey = 'userInfoKey';
export const discDataKey = 'aviatohDiscData';


// this handles JSON stringify and JSON parsing
export const browserStorage = {
    setItem: (key, value) => {
        bStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        return JSON.parse(bStorage.getItem(key));
    },
    removeItem: (key) => {
        bStorage.removeItem(key);
    }
}