import {DockitStorage} from "../DockitStorage";

interface StorageFactory {
    getStorage():DockitStorage;
}