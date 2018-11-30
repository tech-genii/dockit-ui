import {CopyCommand,RunCommand,EntryPointCommand} from "./DockerfileCommands"

class DockerfileBuilder{
    constructor() {
        this.runCommands = [];
        this.copyCommands = [];
        this.entryPointCommand = null;
        // noinspection JSUnusedGlobalSymbols
        this.envs = null;
    }
    withBaseImage(image) {
        if (typeof image !== 'string'){
            throw Error("Expected a string but found "+(typeof image))
        }
        this.baseImage = image;
        return this;
    }

    withRunCommand(runCommand) {
        if (!(runCommand instanceof RunCommand)) {
            throw new Error("parameter should be an instance of RunCommand");
        }
        this.runCommands.unshift(runCommand);
        return this;
    }

    withCopyCommand(copyCommand) {
        if (!(copyCommand instanceof CopyCommand)) {
            throw new Error("parameter should be an instance of CopyCommand");
        }
        this.copyCommands.unshift(copyCommand);
        return this;
    }

    withEntryPointCommand(entryPointCommand) {
        if (!(entryPointCommand instanceof EntryPointCommand)) {
            throw new Error("parameter should be an instance of EntryPointCommand");
        }

        this.entryPointCommand = entryPointCommand;
        return this;
    }
    withEnvVariables(envs) {
        this.envs = envs;
        return this;
    }

    buildDockerfileString() {
        let dockerfileString = "";
        dockerfileString += "FROM "+this.baseImage+"\n";
        this.copyCommands.unshift("");
        dockerfileString += this.copyCommands.reduce((copyCommandString,currentCopyCommand)=>{return copyCommandString+"\n"+currentCopyCommand.getCommand()});
        this.runCommands.unshift("");
        dockerfileString += "\n";
        dockerfileString += this.runCommands.reduce((previousValue, currentValue) => previousValue+"\n"+currentValue.getCommand());
        dockerfileString += "\n";
        dockerfileString += this.entryPointCommand.getCommand();


        return dockerfileString;
    }

}


export {DockerfileBuilder};