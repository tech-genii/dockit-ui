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
    expect(dockerfileBuilder.withBaseImage('ubuntu') instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withRunCommand(runCommand) instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withCopyCommand(copyCommand) instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEntryPointCommand(entrypointCommand) instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEnvVariables(envCommand) instanceof DockerfileBuilder ).toBeTruthy();

});

test('Test DockerfileBuilder methods',()=>{
    expect(()=>{dockerfileBuilder.withBaseImage();}).toThrow();
    expect(dockerfileBuilder.withBaseImage('ubuntu')).not.toBeNull();
    expect(()=>{dockerfileBuilder.withBaseImage()}).toThrow();
    expect(()=>{dockerfileBuilder.withRunCommand()}).toThrow();
    expect(()=>{dockerfileBuilder.withCopyCommand()}).toThrow();
    expect(()=>{dockerfileBuilder.withEntryPointCommand()}).toThrow();
});


test('Test Dockerfile commands',()=>{
    expect(()=>{new DockerfileBuilder.EntryPointCommand()}).toThrow();
    expect(()=>{new DockerfileBuilder.CopyCommand(null,"./")}).toThrow();
    expect(()=>{new DockerfileBuilder.CopyCommand("./",null)}).toThrow();
    expect(()=>{new DockerfileBuilder.RunCommand()}).toThrow();
    expect(()=>{new DockerfileBuilder.EntryPointCommand()}).toThrow();
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
});