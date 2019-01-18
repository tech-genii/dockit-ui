interface PortPublish {
    hostPort:string;
    containerPort:string;
}

interface DockitConfig {
    portBinding: PortPublish;
    baseImage:string | "ubuntu";
    devImage:string;
    runtimeSetup:string[];
    devCommand:string;
    appDir: string | "app" ;
    portPublish: string;
}

export {DockitConfig};