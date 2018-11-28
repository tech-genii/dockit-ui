let RunCommand = require('./RunCommand').runCommand;

function DockerfileBuilder() {
    let baseImage,runCommands,copyCommands,entrypoint,envs;

    this.withBaseImage = function(image){

        if (typeof image !== 'string'){
            throw Error("Expected a string but found "+(typeof image))
        }
        return this;
    };

    this.andRun = function(runCommand){
        if (!(runCommand instanceof RunCommand)) {
            throw new Error("parameter should be an instance of RunCommand");
        }
        return this;
    };

    this.andCopy = function(){
        return this;
    };

    this.withEntryPointBuilder = function(){
        return this;
    };

    this.withEnvs = function(){
        return this;
    };
};




exports.DockerfileBuilder = function () {
    return DockerfileBuilder;
};