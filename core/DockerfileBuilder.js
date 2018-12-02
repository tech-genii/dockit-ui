import {CopyCommand, RunCommand, EntryPointCommand, EnvCommand} from "./DockerfileCommands"

class DockerfileBuilder{
    constructor() {
        this.commands = [];
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
        this.commands.push(runCommand);
        // this.runCommands.unshift(runCommand);
        return this;
    }

    withCopyCommand(copyCommand) {
        if (!(copyCommand instanceof CopyCommand)) {
            throw new Error("parameter should be an instance of CopyCommand");
        }
        this.commands.push(copyCommand);
        // this.copyCommands.unshift(copyCommand);
        return this;
    }

    withEntryPointCommand(entryPointCommand) {
        if (!(entryPointCommand instanceof EntryPointCommand)) {
            throw new Error("parameter should be an instance of EntryPointCommand");
        }

        this.entryPointCommand = entryPointCommand;
        return this;
    }
    withEnvVariables(envCommand) {
        if (!(envCommand instanceof EnvCommand)) {
            throw new Error("parameter should be an instance of EnvCommand")
        }
        this.envs = envCommand;
        return this;
    }

    buildDockerfileString() {
        let dockerfileString = "";
        dockerfileString += "FROM "+this.baseImage+"\n";
        dockerfileString += this.envs.getCommand();
        dockerfileString += "\n";
        this.commands.unshift("");
        this.copyCommands.unshift("");
        dockerfileString += this.commands.reduce((prevCommandString,nextCommand)=>{return prevCommandString+"\n"+nextCommand.getCommand()});
        // dockerfileString += this.copyCommands.reduce((copyCommandString,currentCopyCommand)=>{return copyCommandString+"\n"+currentCopyCommand.getCommand()});
        // this.runCommands.unshift("");
        // dockerfileString += "\n";
        // dockerfileString += this.runCommands.reduce((previousValue, currentValue) => previousValue+"\n"+currentValue.getCommand());
        dockerfileString += "\n";
        dockerfileString += this.entryPointCommand.getCommand();


        return dockerfileString;
    }

}


export {DockerfileBuilder};