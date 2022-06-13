import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';

@Injectable({
    providedIn: 'root'
})

export class StorageProvider {

    constructor() { }

    /**
     * Function for storing data against key locally
     * @param key string
     * @param data object
     */
    setSessionStorageData(key:string, data:any) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * * Function to fetch data against key locally
     * @param key string
     */
    getSessionStorageData(key:string) {
        const data=sessionStorage.getItem(key);
        if(data){
            return JSON.parse(data);
        }
    }

    /**
     * * Function to remove key locally
     * @param keyName string
     * @param storageType string
     */
    removeKeys(keyName:string) {
        sessionStorage.removeItem(keyName);
    }
}
