
interface DockerfileCommand {
    getCommand():string;
}

interface KeyValue {
    name:string,
    value:string
}

class FromCommand implements DockerfileCommand{
    private baseImage: string;
    constructor(baseImage: string) {
        this.baseImage = baseImage;
    }
    getCommand(): string {
        return "FROM "+this.baseImage;
    }
}

class CopyCommand implements DockerfileCommand{
    private readonly commands: string[];
    constructor(commands:string[]) {
        this.commands = commands;
    }
    getCommand(): string {
        return "COPY "+commandsReducer(this.commands);
    }

}

class RunCommand implements DockerfileCommand{
    private readonly commands: string[];
    constructor(commands:string[]) {
        this.commands = commands;
    }
    getCommand(): string {
        return "RUN "+commandsReducer(this.commands);
    }

}



class ARGCommand implements DockerfileCommand{
    private arg: KeyValue;
    constructor(arg:KeyValue) {
        this.arg = arg;
    }
    getCommand(): string {
        return "ARG "+this.arg.name+"="+this.arg.value;
    }
}

class CMDCommand implements DockerfileCommand{
    private readonly commands: string[];
    constructor(commands:string[]) {
        this.commands = commands;
    }
    getCommand(): string {
        return "CMD "+commandsReducer(this.commands);
    }
}

class LabelCommand implements DockerfileCommand{
    private readonly commands: KeyValue[];
    constructor(commands:KeyValue[]) {
        this.commands = commands;
    }
    getCommand(): string {
        return "LABEL "+keyValueCommandsReducer(this.commands);
    }
}

enum PortType{TCP,UDP}

interface PortExpose {
    port:number,
    type:PortType
}

class ExposeCommand implements DockerfileCommand{
    private readonly portExpose: PortExpose;
    constructor(portExpose:PortExpose) {
        this.portExpose = portExpose;
    }
    getCommand(): string {
        let {type,port} = this.portExpose;
        let typeString = type === PortType.TCP ? "tcp":
            type === PortType.UDP ? "udp" : null;
        return "EXPOSE " + port + "/" + typeString;
    }
}

class EnvCommand implements DockerfileCommand{
    private readonly commands: KeyValue[];
    constructor(commands:KeyValue[]) {
        this.commands = commands;
    }
    getCommand(): string {
        return "COPY "+keyValueCommandsReducer(this.commands);
    }
}

class ADDCommand implements DockerfileCommand{
    private readonly commands: string[];
    constructor(commands: string[]) {
        this.commands = commands;
    }
    getCommand(): string {
        return "COPY "+commandsReducer(this.commands);
    }
}

function commandsReducer(commands:string[]) {
    return commands.reduce((previousValue, currentValue) => {return previousValue + " " + currentValue},"");
}

function keyValueCommandsReducer(commands: KeyValue[]) {
    return commands.reduce((previousValue:string, currentValue:KeyValue) => {return previousValue + currentValue.name+"="+currentValue.value},"");
}



export {CopyCommand,DockerfileCommand};