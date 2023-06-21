import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalStorage = {
    storeData : async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {}
    },
    storeDataObject : async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
        }
    },
    getData: async (key: string) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {}
    },
    getDataObject: async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            if (jsonValue != null) {
                return JSON.parse(jsonValue);
            }
        } catch (e) {}
    },
}