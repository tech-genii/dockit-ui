function DockerfileBuilder() {
    let baseImage,runCommands = [],copyCommands = [],_entryPointCommand,_envs;

    this.withBaseImage = function(image){

        if (typeof image !== 'string'){
            throw Error("Expected a string but found "+(typeof image))
        }
        baseImage = image;
        return this;
    };

    this.andRun = function(runCommand){
        if (!(runCommand instanceof DockerfileBuilder.RunCommand)) {
            throw new Error("parameter should be an instance of RunCommand");
        }
        runCommands.unshift(runCommand);
        return this;
    };

    this.andCopy = function(copyCommand){
        if (!(copyCommand instanceof DockerfileBuilder.CopyCommand)) {
            throw new Error("parameter should be an instance of CopyCommand");
        }
        copyCommands.unshift(copyCommand);
        return this;
    };

    this.withEntryPointBuilder = function(entryPointCommand){
        if (!(entryPointCommand instanceof DockerfileBuilder.EntryPointCommand)) {
            throw new Error("parameter should be an instance of EntryPointCommand");
        }

        _entryPointCommand = entryPointCommand;
        return this;
    };

    this.withEnvs = function(envs){
        _envs = envs;
        return this;
    };

    this.toDockerfileString = function () {
        let dockerfileString = "";
        dockerfileString += "FROM "+baseImage+"\n";
        copyCommands.unshift("");
        dockerfileString += copyCommands.reduce((copyCommandString,currentCopyCommand)=>{return copyCommandString+"\n"+currentCopyCommand.getCommand()})
        runCommands.unshift("");
        dockerfileString += "\n";
        dockerfileString += runCommands.reduce((previousValue, currentValue) => previousValue+"\n"+currentValue.getCommand());
        dockerfileString += "\n";
        dockerfileString += _entryPointCommand.getCommand();


        return dockerfileString;
    }
}

DockerfileBuilder.RunCommand = function(command) {
    if (!(command instanceof Array)) {
        throw new Error("Expected instance of type Array but found : "+(typeof command));
    }

    this.getCommand = function () {
        let runCommandString = "RUN "+command.reduce((previousValue, currentValue) => previousValue+" "+currentValue);
        return runCommandString;
    }
};

DockerfileBuilder.CopyCommand = function(src,dest) {
    let _src,_dest;
    if (typeof src !== 'string'){
        throw Error("Expected a string but found "+(typeof src))
    }
    if (typeof dest !== 'string'){
        throw Error("Expected a string but found "+(typeof dest))
    }

    _src = src;
    _dest = dest;

    this.getCommand = function () {
        return "COPY "+src+ " "+dest
    }
};

DockerfileBuilder.EntryPointCommand = function(command) {
    if (!(command instanceof Array)) {
        throw new Error("Expected instance of type Array but found : "+(typeof command));
    }

    this.getCommand = function () {
        let runCommandString = "ENTRYPOINT "+command.reduce((previousValue, currentValue) => previousValue+" "+currentValue);
        return runCommandString;
    }
};





exports.DockerfileBuilder = function () {
    return DockerfileBuilder;
};