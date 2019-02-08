import {DockitEventHandler} from "./DockitEventHandler";

export interface DockitApp {

    start();

    stop();

    registerDockitEventHandler(handler:DockitEventHandler);

    onStart(handler:DockitEventHandler);

    onStop(handler:DockitEventHandler);

}