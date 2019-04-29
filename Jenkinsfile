pipeline {
    agent any
    environment {
        tag = env.GIT_COMMIT.substring(0, 8)
        registry = 'ako520/whatbook-website'
        dev_server = 'root@39.97.101.229'
        project = 'whatbook-website'
    }
    stages {
        stage('Build Docker image') {
            when {
                expression { env.GIT_BRANCH == 'CI' }
            }
            agent any
            steps {
                script {
                    echo 'printenv'
                    def customImage = docker.build("${env.registry}:${env.tag}")
                    /* Push the container to the custom Registry */
                    customImage.push("${env.tag}")
                    customImage.push("latest")
                }
            }
        }
        stage('Deploy - Test') {
            when { branch 'CI' }
            steps {
                agent docker
                switchContainer(env.dev_server, env.project)
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
        stage('Clean docker image') {
            when {
                expression { env.GIT_BRANCH ==~ /(master|release|CI)/ }
            }
            steps {
                sh "docker rmi ${env.registry}:${env.tag}"
                sh "docker rmi ${env.registry}:latest"
            }
        }
    }
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    post {
        success {
            slackSend(color: 'good', message: ":）${env.JOB_NAME} - ${env.BUILD_DISPLAY_NAME} Success. Take ${currentBuild.durationString.replace(' and counting', '')} <${env.RUN_DISPLAY_URL}|(Open)>")
        }
        failure {
            slackSend(color: 'danger', message: ":( ${env.JOB_NAME} - ${env.BUILD_DISPLAY_NAME} Failed <${env.RUN_DISPLAY_URL}|(Open)>")
        }
    }
}

def switchContainer(String server, String project) {
    sh "ssh ${server} mkdir -p /apps/${project}"
    sh "scp docker-compose.yml ${server}:/apps/${project}"
    sh "scp .env ${server}:/apps/${project}"
    sh "ssh ${server} docker-compose  -f /apps/${project}/docker-compose.yml  pull"
    sh "ssh ${server} docker-compose  -f /apps/${project}/docker-compose.yml  down -v"
    sh "ssh ${server} docker-compose  -f /apps/${project}/docker-compose.yml  up -d"
    sh "ssh ${server} docker image prune -f"
}