import {DockitApp} from "./DockitApp";
import {Dockerfile} from "./Dockerfile";

interface Dockit{

    createNewDockitApp():DockitApp;

    createDockerFile(dockitApp:DockitApp):Dockerfile;

    commitDockit(message:String);

    startUpDevDockitApp(imageName:String):DockitApp;

    getDev(imageName:String):DockitApp;

    startApp(dockitApp:DockitApp);

    stopApp(dockitApp:DockitApp);
}