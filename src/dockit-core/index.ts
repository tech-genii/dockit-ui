import * as YAML from 'yaml'
import * as fs from 'fs'
import * as cli from 'commander';
import * as shell from 'shelljs'
import chalk from "chalk";
import * as Docker from 'dockerode';

const docker = new Docker();

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

        console.log(dockitConf.dockit.portBinding);

        const execResult = shell
            .exec("docker run -t -d "
                +"-p"+dockitConf.dockit.portBinding+" "
                +"--mount type=bind,source="+CWD+",target=/"+dockitConf.dockit.workingDir+" "
                + dockitConf.dockit.devImage + " "
                + "top");

        console.log("Spined up the development container");

        if (!execResult.code) {
            const containerID = execResult.stdout.trim();
            const baseContainer = docker.getContainer(containerID);
            shell
                .exec("docker exec -d -w /"+dockitConf.dockit.workingDir+" "+containerID+" "+dockitConf.dockit.developCommand)
            console.log("Started the development environment........");
        }
    });

cli.parse(process.argv);