pipeline{
  agent any
  stages{  
    stage('Build'){
      steps{
        sshagent(credentials:['dryp-instance']) {
          sh '''#!/bin/bash 
            ssh -o StrictHostKeyChecking=no ubuntu@ec2-65-0-21-75.ap-south-1.compute.amazonaws.com -yes << EOF
            #!/bin/bash
            cd dryp/version2/
            pwd
            git pull
            ls
            bash ./jenkins/start_blue_container.sh
            bash build.sh
            bash run.sh
            bash ./jenkins/start_script.sh
            exit
            EOF '''
        } 
      }
    }
  }
}
