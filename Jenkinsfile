pipeline {
    agent none
    environment {
        tag = env.GIT_COMMIT.substring(0, 8)
        registry = 'ako520/whatbook-website'
        dev_server = 'root@39.97.101.229'
        project = 'whatbook-website'
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:8.10.0'
                }
            }
            steps {
                slackSend(color: 'good', message: "${env.JOB_NAME} - ${env.BUILD_DISPLAY_NAME} Started <${env.RUN_DISPLAY_URL}|(Open)>")
                sh 'sh ./build.sh'
                stash includes: '/build/', name: 'build' 
            }
        }
    }
}