pipeline {
    agent {
        docker {
            image 'node:8.10.0'
            args '-p 3000:3000'
        }
    }
    environment {
        tag = env.GIT_COMMIT.substring(0, 8)
        registry = 'ako520/whatbook-website'
        dev_server = 'root@39.97.101.229'
        project = 'whatbook-website'
    }
    stages {
        stage('Build') {
            steps {
                echo 'branch' + env.GIT_BRANCH
                sh 'printenv'
                slackSend(color: 'good', message: "${env.JOB_NAME} - ${env.BUILD_DISPLAY_NAME} Started <${env.RUN_DISPLAY_URL}|(Open)>")
                sh 'sh ./build.sh'
            }
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