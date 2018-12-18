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
        // const catConfig = shell.cat(dockitFilePath).stdout;
        dockitConf = YAML.parse(dockitConf);
        docker.createContainer({
            Image: dockitConf.dockit.devImage,
            Tty: true,
            Entrypoint:"/bin/bash"
        }, (error1, container) => {
            container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
                stream.pipe(process.stdout);
            });
        });
    });

cli.parse(process.argv);