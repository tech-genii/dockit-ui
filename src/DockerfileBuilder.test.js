import {DockerfileBuilder} from './DockerfileBuilder'
import {CopyCommand, EntryPointCommand, RunCommand, EnvCommand} from "./DockerfileCommands";

let dockerfileBuilder,runCommand,copyCommand,entrypointCommand,envCommand;

beforeEach(()=>{
    dockerfileBuilder = new DockerfileBuilder();
    runCommand = new RunCommand(["/bin/bash","echo","${SAIF}"]);
    entrypointCommand = new EntryPointCommand(["/bin/bash"]);
    copyCommand = new CopyCommand("./","/");
    envCommand = new EnvCommand([["cms-api","localhost"],["datamanagement-api","localhost"],["fe-api","localhost"]]);
});

afterEach(() => {
    dockerfileBuilder = null;
});

test('Test DockerfileBuilder Init',()=>{
    new DockerfileBuilder();
});

test('Test builder method returns builder instance',()=>{
    expect(dockerfileBuilder.withBaseImage('ubuntu')).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withRunCommand(runCommand)).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withCopyCommand(copyCommand)).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withEntryPointCommand(entrypointCommand)).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withEnvVariables(envCommand)).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withBuildArg()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withCMD()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withLabel('label')).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withOnBuildInstruction()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.andAdd("","")).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withCMD()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withVolume()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.runAsUser()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.useWorkingDirectory()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withHealthCheckBuilder()).toBeInstanceOf(DockerfileBuilder);
    expect(dockerfileBuilder.withShell()).toBeInstanceOf(DockerfileBuilder);
});

test('Test DockerfileBuilder methods',()=>{
    expect(()=>{dockerfileBuilder.withBaseImage();}).toThrow();
    expect(dockerfileBuilder.withBaseImage('ubuntu')).not.toBeNull();
    expect(()=>{dockerfileBuilder.withBaseImage()}).toThrow();
    expect(()=>{dockerfileBuilder.withRunCommand()}).toThrow();
    expect(()=>{dockerfileBuilder.withCopyCommand()}).toThrow();
    expect(()=>{dockerfileBuilder.withEntryPointCommand()}).toThrow();
});

it("Create a Dockerfile",()=>{

    dockerfileBuilder.withBaseImage("ubuntu");
    dockerfileBuilder.withCopyCommand(copyCommand);
    dockerfileBuilder.withCopyCommand(copyCommand);
    dockerfileBuilder.withCopyCommand(copyCommand);
    dockerfileBuilder.withRunCommand(runCommand);
    dockerfileBuilder.withRunCommand(runCommand);
    dockerfileBuilder.withRunCommand(runCommand);
    dockerfileBuilder.withEntryPointCommand(entrypointCommand);
    dockerfileBuilder.withEnvVariables(envCommand);
    expect(dockerfileBuilder.buildDockerfileString()).toMatchSnapshot();

    //Checks that methods works the same way even after previous execution
    expect(dockerfileBuilder.buildDockerfileString()).toMatchSnapshot();
});