docker push 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest
The push refers to repository [900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend]
4c4eb3d16508: Waiting 
4197994b707b: Waiting 
d757d01e4983: Waiting 
43da18ac37b7: Waiting 
280bbe393e78: Waiting 
b58ee5cb7152: Waiting 
354ffb7f5514: Waiting 
28b4958639f9: Waiting 
f5f9d435c580: Waiting 
e7fb18dd4198: Waiting 
1a12b4ea7c0c: Waiting 
6cba32d1c1ee: Waiting 
1f4f297e4f69: Waiting 
unknown: unexpected status from HEAD request to https://900546069136.dkr.ecr.us-east-1.amazonaws.com/v2/smiski-backend/blobs/sha256:b58ee5cb7152015437e4a9b3066ae9e25a26a3bef6617d0b7f25368511c2d954: 403 Forbidden

docker tag smiski-backend:latest 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest
docker push 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest

"portMappings": [
        {
          "name": "smiski-backend-5000-tcp",
          "containerPort": 5000,
          "hostPort": 0,
          "protocol": "tcp",
          "appProtocol": "http"
        }
      ],


service smiski-backend-service was unable to place a task because no container instance met all of its requirements. The closest matching container-instance 5ed586c73a7748a8aa66067ee6ea4017 has insufficient memory available. For more information, see the Troubleshooting section of the Amazon ECS Developer Guide.
service smiski-backend-service deployment ecs-svc/9942794867572721678 deployment failed: tasks failed to start.|Learn more 

{
  "taskDefinitionArn": "arn:aws:ecs:us-east-1:900546069136:task-definition/smiski-backend-task:1",
  "containerDefinitions": [
    {
      "name": "smiski-backend",
      "image": "900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend",
      "cpu": 0,
      "portMappings": [
        {
          "name": "smiski-backend-5000-tcp",
          "containerPort": 5000,
          "hostPort": 0,
          "protocol": "tcp",
          "appProtocol": "http"
        }
      ],
      "essential": true,
      "environment": [],
      "environmentFiles": [],
      "mountPoints": [],
      "volumesFrom": [],
      "ulimits": [],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/smiski-backend-task",
          "awslogs-create-group": "true",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        },
        "secretOptions": []
      },
      "systemControls": []
    }
  ],
  "family": "smiski-backend-task",
  "executionRoleArn": "arn:aws:iam::900546069136:role/ecsTaskExecutionRole",
  "networkMode": "bridge",
  "revision": 1,
  "volumes": [],
  "status": "ACTIVE",
  "requiresAttributes": [
    {
      "name": "com.amazonaws.ecs.capability.logging-driver.awslogs"
    },
    {
      "name": "ecs.capability.execution-role-awslogs"
    },
    {
      "name": "com.amazonaws.ecs.capability.ecr-auth"
    },
    {
      "name": "com.amazonaws.ecs.capability.docker-remote-api.1.19"
    },
    {
      "name": "ecs.capability.execution-role-ecr-pull"
    },
    {
      "name": "com.amazonaws.ecs.capability.docker-remote-api.1.18"
    },
    {
      "name": "com.amazonaws.ecs.capability.docker-remote-api.1.29"
    }
  ],
  "placementConstraints": [],
  "compatibilities": [
    "EC2"
  ],
  "requiresCompatibilities": [
    "EC2"
  ],
  "cpu": "1024",
  "memory": "3072",
  "runtimePlatform": {
    "cpuArchitecture": "X86_64",
    "operatingSystemFamily": "LINUX"
  },
  "registeredAt": "2025-08-05T15:42:47.473Z",
  "registeredBy": "arn:aws:sts::900546069136:assumed-role/bntran-capstone-admin/bntran-Isengard",
  "enableFaultInjection": false,
  "tags": [
    {
      "key": "auto-delete",
      "value": "no"
    }
  ]
}

