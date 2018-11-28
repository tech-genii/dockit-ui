
let DockerfileBuilder = require('./DockerfileBuilder').DockerfileBuilder();

let dockerfileBuilder,runCommand,copyCommand,entrypointCommand;

beforeEach(()=>{
    dockerfileBuilder = new DockerfileBuilder();
    runCommand = new DockerfileBuilder.RunCommand(["/bin/bash","echo","${SAIF}"]);
    entrypointCommand = new DockerfileBuilder.EntryPointCommand(["/bin/bash"]);
    copyCommand = new DockerfileBuilder.CopyCommand("./","/");
});

afterEach(() => {
    dockerfileBuilder = null;
});

test('Test DockerfileBuilder Init',()=>{
    new DockerfileBuilder();
});

test('Test builder method returns builder instance',()=>{

    expect(dockerfileBuilder.withBaseImage('ubuntu') instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.andRun(runCommand) instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.andCopy(copyCommand) instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEntryPointBuilder(entrypointCommand) instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEnvs() instanceof DockerfileBuilder ).toBeTruthy();

});

test('Test DockerfileBuilder methods',()=>{
    expect(()=>{dockerfileBuilder.withBaseImage();}).toThrow();
    expect(dockerfileBuilder.withBaseImage('ubuntu')).not.toBeNull();
});

it("Create a Dockerfile",()=>{
    dockerfileBuilder.withBaseImage("ubuntu");
    dockerfileBuilder.andCopy(copyCommand);
    dockerfileBuilder.andCopy(copyCommand);
    dockerfileBuilder.andCopy(copyCommand);
    dockerfileBuilder.andRun(runCommand);
    dockerfileBuilder.andRun(runCommand);
    dockerfileBuilder.andRun(runCommand);
    dockerfileBuilder.withEntryPointBuilder(entrypointCommand);
    expect(dockerfileBuilder.toDockerfileString()).toMatchSnapshot();
});