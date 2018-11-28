
let DockerfileBuilder = require('./DockerfileBuilder').DockerfileBuilder();
let RunCommand = require('./RunCommand').runCommand;

let dockerfileBuilder,runCommand;

beforeEach(()=>{
    dockerfileBuilder = new DockerfileBuilder();
    runCommand = new RunCommand([]);
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
    expect(dockerfileBuilder.andCopy() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEntryPointBuilder() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEnvs() instanceof DockerfileBuilder ).toBeTruthy();

});

test('Test DockerfileBuilder methods',()=>{
    expect(()=>{dockerfileBuilder.withBaseImage();}).toThrow();
    expect(dockerfileBuilder.withBaseImage('ubuntu')).not.toBeNull();
});

it("Create a Dockerfile",()=>{
    expect(`
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
    `).toMatchSnapshot();
});