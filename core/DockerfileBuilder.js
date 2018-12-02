import {CopyCommand, RunCommand, EntryPointCommand, EnvCommand} from "./DockerfileCommands"

const EXPOSE_PORT_TYPES = ["tcp","udp"];
class DockerfileBuilder{
    constructor() {
        this.commands = [];
        this.exposePorts = [];
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

    withLabel(label){
        if(!(label instanceof String)){
            throw new Error("parameter should be of type String");
        }
        this.label = label;
    }

    andExposePort(port,type){
        if(!(port instanceof Number)){
            throw new Error("port should be of type Integer");
        }

        if(!type){
            this.exposePorts.push({port,type:"tcp"});
        }else{
            if(!(port instanceof String)){
                throw new Error("port should be of type String");
            }
            if(EXPOSE_PORT_TYPES.indexOf(type) < 0 ){
                throw new Error("port type should be one of  the following : "+EXPOSE_PORT_TYPES);
            }
            this.exposePorts.push({port,type});
        }
        
    }

    andAdd(srcFilePattern, dest, chownExp) {
        return this;
    }

    withCMD(cmd) {
        return this;
    }

    withVolume(mountpoint, volume) {
        return this;
    }

    runAsUser(user, usergroup) {
        return this;
    }

    useWorkingDirectory(workingDirectory) {
        return this;
    }

    withBuildArg(buildArgs) {
        return this;
    }

    withOnBuildInstruction(onBuildCommand) {
        return this;
    }

    withHealthCheckBuilder(healthCheckBuilder) {
        return this;
    }

    withShell(shell) {
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