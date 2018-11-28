function DockerfileBuilder() {
    this.withBaseImage = function(){
        return this;
    };

    this.andRun = function(){
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