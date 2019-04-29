pipeline {
    agent {
        docker {
            image 'node:8.10.0'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build Docker image') {
            agent any
            steps {
                script {
                    def customImage = docker.build("${env.registry}:${env.tag}")
                    /* Push the container to the custom Registry */
                }
            }
        }
    }
}
