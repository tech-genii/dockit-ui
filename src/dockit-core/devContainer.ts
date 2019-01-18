import * as Docker from 'dockerode';
import * as fs from 'fs';
import {DockitConfig} from "./dockitConfig";
import {runExec, runExecs} from "./execContainer";
import {ContainerCreateOptions} from "dockerode";




const docker = new Docker();

let previousKey,
    CTRL_P = '\u0010',
    CTRL_Q = '\u0011';

function checkIfDockerRunning():boolean {
    let socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
    return fs.statSync(socket).isSocket();
}

function createBaseDevContainer(dockitConfig:DockitConfig):number {
    if (!checkIfDockerRunning()) {
        throw new Error("Check if docker is running!!!!");
    }


    const options : ContainerCreateOptions = {
        Image: dockitConfig.baseImage,
        Cmd:["bash"],
        Tty:true,
        ExposedPorts:{
            [dockitConfig.portBinding.containerPort+"/tcp"]:{}
        },
        HostConfig:{
            Mounts:[
                {
                    //Binds current directory with the container for development
                    Type:"bind",Target:"/"+dockitConfig.appDir,Source:process.cwd()
                }
            ],
            PortBindings:{
                [dockitConfig.portBinding.containerPort+'/tcp']:[{
                    HostPort:dockitConfig.portBinding.hostPort,
                    HostIp:"localhost"
                }]
            }
        },
        WorkingDir: "/"+dockitConfig.appDir
        // AttachStdout:true,
        // AttachStdin:true,
        // AttachStderr:true,
        // OpenStdin:true,
        // StdinOnce:false
    };

    options.Image = dockitConfig.devImage;

    docker.createContainer(options,(error1, container) => {
            if (error1) {
                console.log("Could not start dev container building from runSetup in Dockit");
                options.Image = dockitConfig.baseImage;
                docker.createContainer(
                    options,
                    (error1, container) => {
                        if (error1) {
                            console.log(error1);
                        }
                        container.start().then(container => {
                            runExecs(container,dockitConfig.runtimeSetup,()=>{
                                console.log("Done setting up dev environment");

                                container.commit({
                                    repo:dockitConfig.devImage,
                                    tag:"latest"

                                },(error2, result) => {
                                    console.log(error2);
                                    runExec(container,dockitConfig.devCommand,()=>{
                                        console.log("Dev command executed");
                                    });

                                });

                            });

                        });
                    });

            }else {
                container.start().then(container => {
                    runExec(container,dockitConfig.devCommand,()=>{
                        console.log("Dev command executed");
                    });
                });
            }
        });


    return 0;
}

// Exit container
function exit (stream, isRaw) {
    process.stdout.removeListener('resize', resize);
    process.stdin.removeAllListeners();
    process.stdin.setRawMode(isRaw);
    process.stdin.resume();
    stream.end();
    process.exit();
}

// Resize tty
function resize (container) {
    var dimensions = {
        h: process.stdout.rows,
        w: process.stderr.columns
    };

    if (dimensions.h != 0 && dimensions.w != 0) {
        container.resize(dimensions, function() {});
    }
}



// createBaseDevContainer({
//     appDir:"app",
//     baseImage:"ubuntu",
//     devCommand: "npm run dockerDevelop",
//     devImage:"ubuntu_dockit_development",
//     portPublish:"",
//     portBinding:{
//         hostPort:"8080",
//         containerPort:"8080"
//     },
//     runtimeSetup:[
//         "apt update",
//         "apt install gnupg2 -y",
//         "apt install wget -y",
//         "wget https://deb.nodesource.com/setup_10.x",
//         "chmod 777 setup_10.x",
//         "/bin/bash setup_10.x",
//         "apt install -y nodejs"
//     ]
// });



// fs.writeFile("/tmp/dockit.yaml","Saifu\n",err => {
//     if (!err) {
//         fs.readFile("/tmp/dockit.yaml",(err, data) => {
//             if (err) {
//                 console.error(err);
//             }
//             console.log(data.toString("utf-8"));
//         });
//     }
// });


export {
    createBaseDevContainer,
    checkIfDockerRunning
};