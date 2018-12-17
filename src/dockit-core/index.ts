import * as YAML from 'yaml'
import * as fs from 'fs'
import * as cli from 'commander';
import * as shell from 'shelljs'
import chalk from "chalk";

const CWD = process.cwd();
const DEFAULT_DOCKIT_CONF = '/Dockit.yaml';
const DEFAULT_PATH = CWD+ DEFAULT_DOCKIT_CONF;


cli
    .command("develop [dockitFile]")
    .alias("d")
    .description("This command starts the development environment")
    .action(dockitFile => {
        let dockitFilePath = CWD;
        if (dockitFile) {
            if (dockitFile.toString().trim().startsWith("/")) {
                dockitFilePath = dockitFile.toString().trim();
            }else {
                dockitFilePath += "/"+dockitFile.toString().trim();
            }
        }else {
            dockitFilePath = DEFAULT_PATH;
        }
        let dockitConf:any = fs.readFileSync(dockitFilePath,"utf-8");
        const catConfig = shell.cat(dockitFilePath).stdout;
        dockitConf = YAML.parse(dockitConf);
        const exec = shell.exec("docker run -d " +dockitConf.dockit.devImage);
        console.log(exec.code?chalk.bold.redBright(exec.stderr):chalk.bold.blueBright(exec.stdout));
        console.log(dockitConf);
        console.log(catConfig);
    });

cli.parse(process.argv);