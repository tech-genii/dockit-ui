import * as YAML from 'yaml'
import * as fs from 'fs'
import * as cli from 'commander';
import chalk from "chalk";
import {createBaseDevContainer, createDevSetupContainer} from "./devContainer";
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

    });

cli
    .command("setup [image_name]")
    .alias("s")
    .description("This command starts a fresh container for setting up development environment")
    .action(imageName => {
        console.log("Starting Container for Dev Setup");
        createDevSetupContainer({appDir:"app",devImage:"dockit_dev"});
    });


cli.parse(process.argv);