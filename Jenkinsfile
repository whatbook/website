pipeline {
    agent any
    stages {
        stage('Build Docker image') {
            steps {
                script {
                    def customImage = docker.build("${env.registry}:${env.tag}")
                    /* Push the container to the custom Registry */
                }
            }
        }
    }
}
