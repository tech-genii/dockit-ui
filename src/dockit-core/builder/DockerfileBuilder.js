import {CopyCommand, RunCommand, EntryPointCommand, EnvCommand} from "./DockerfileCommands"

const EXPOSE_PORT_TYPES = ["tcp","udp"];

class DockerfileBuilder{
    constructor() {
        this.commands = [];
        this.cmdCommand = null;
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
        if(typeof label !== 'string'){
            throw new Error("parameter should be of type String");
        }
        this.label = label;
        return this;
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

        return this;
        
    }

    andAdd(srcFilePattern, dest, chownExp) {
        return this;
    }

    withCMD(cmdCommand) {
        if (!(cmdCommand instanceof CMDCommand)) {
            throw new Error("cmdCommand should be an instance of CMDCommand");
        }
        this.cmdCommand = cmdCommand;
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
        dockerfileString += [""].concat(this.commands).reduce((prevCommandString,nextCommand)=>{return prevCommandString+"\n"+nextCommand.getCommand()});
        dockerfileString += "\n";
        dockerfileString += this.entryPointCommand.getCommand();


        return dockerfileString;
    }

}


export {DockerfileBuilder};