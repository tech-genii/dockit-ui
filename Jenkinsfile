pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            echo 'Jenkins Dockit Build'
          }
        }
        stage('Test') {
          steps {
            echo 'Test Started'
          }
        }
      }
    }
  }
}