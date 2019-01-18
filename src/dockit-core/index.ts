import * as YAML from 'yaml'
import * as fs from 'fs'
import * as cli from 'commander';
import chalk from "chalk";
import {createBaseDevContainer} from "./devContainer";
const CWD = process.cwd();
const DEFAULT_DOCKIT_CONF = '/Dockit.yaml';
const DEFAULT_PATH = CWD+ DEFAULT_DOCKIT_CONF;


cli
    .command("develop [dockitFile]")
    .alias("d")
    .description("This command starts the development environment")
    .action(dockitFile => {
        let dockitFilePath: string = CWD;
        if (dockitFile) {
            if (dockitFile.toString().trim().startsWith("/")) {
                dockitFilePath = dockitFile.toString().trim();
            } else {
                dockitFilePath += "/" + dockitFile.toString().trim();
            }
        } else {
            dockitFilePath = DEFAULT_PATH;
        }
        let dockitConf: any = fs.readFileSync(dockitFilePath, "utf-8");
        dockitConf = YAML.parse(dockitConf);

        console.log(dockitConf.dockit);

        const portBindings = dockitConf.dockit.portBinding;

        createBaseDevContainer({
            portBinding: {
                containerPort: portBindings[0].containerPort.toString(),
                hostPort: portBindings[0].hostPort.toString()
            },
            portPublish: "",
            appDir:dockitConf.dockit.workingDir,
            devCommand:dockitConf.dockit.developCommand,
            runtimeSetup:dockitConf.dockit.runtimeSetup,
            baseImage:dockitConf.dockit.baseImage,
            devImage:dockitConf.dockit.devImage
        });



        // let containerID: string;
        //
        //
        // let execResult = shell
        //     .exec("docker run -t -d "
        //         +"-p"+portBindings[0].hostPort+":"+portBindings[0].containerPort+" "
        //         +"--mount type=bind,source="+CWD+",target=/"+dockitConf.dockit.workingDir+" "
        //         + dockitConf.dockit.devImage + " "
        //         + "top");
        //
        // if (execResult.code) {
        //     console.warn("DevImage not found preparing the Image");
        //     execResult = shell
        //         .exec("docker run -t -d "
        //             +"-p"+portBindings[0].hostPort+":"+portBindings[0].containerPort+" "
        //             +"--mount type=bind,source="+CWD+",target=/"+dockitConf.dockit.workingDir+" "
        //             + dockitConf.dockit.baseImage + " "
        //             + "top");
        //
        //     containerID = execResult.stdout.trim();
        //
        //     const baseContainer = docker.getContainer(containerID);
        //     const runtimeSetup:[] = dockitConf.dockit.runtimeSetup;
        //     console.log("Starting Runtime and Build Dependecny setup");
        //     TODO : Remove this for dockerode solution
        //     // runtimeSetup.forEach(command => {
        //     //     console.log("[RUNTIME SETUP] "+command);
        //     //     shell.exec("docker exec "+" "+containerID+" "+command);
        //     // });
        //     runExecs(baseContainer,runtimeSetup,()=>{
        //         console.log("Completed Runtime and Build Dependency setup");
        //
        //         console.log("Creating DevImage");
        //         shell.exec("docker commit "+containerID+" "+dockitConf.dockit.devImage);
        //         console.log("Created DevImage");
        //         startDevelopment(containerID);
        //     });
        //
        // }else {
        //     containerID = execResult.stdout.trim();
        //     startDevelopment(containerID);
        // }
        //
        // function startDevelopment(containerID) {
        //     console.log("Spined up the development container");
        //
        //     if (!execResult.code) {
        //         console.log("Starting Development Mode");
        //         shell
        //             .exec("docker exec -d -w /" + dockitConf.dockit.workingDir + " " + containerID + " " + dockitConf.dockit.developCommand)
        //         console.log("Started Development Mode");
        //     } else {
        //
        //     }
        // }

    });

cli.parse(process.argv);