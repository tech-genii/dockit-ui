
let DockerfileBuilder = require('./DockerfileBuilder').DockerfileBuilder();

test('Test DockerfileBuilder Init',()=>{
    new DockerfileBuilder();
});

test('Test builder method returns builder instance',()=>{
    let dockerfileBuilder = new DockerfileBuilder();

    expect(dockerfileBuilder.withBaseImage() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.andRun() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.andCopy() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEntryPointBuilder() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEnvs() instanceof DockerfileBuilder ).toBeTruthy();
});