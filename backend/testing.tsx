docker ps
CONTAINER ID   IMAGE                                                         COMMAND                  CREATED          STATUS                 PORTS                                         NAMES
31f074c40d49   900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend   "docker-entrypoint.s…"   44 minutes ago   Up 44 minutes          0.0.0.0:32772->5000/tcp, :::32772->5000/tcp   ecs-smiski-backend-task-3-smiski-backend-bcbec09bbdc982c26400
1025156a1de1   amazon/amazon-ecs-agent:latest                                "/agent"                 6 hours ago      Up 6 hours (healthy)                   

service smiski-backend-service was unable to place a task because no container instance met all of its requirements. The closest matching container-instance 5ed586c73a7748a8aa66067ee6ea4017 has insufficient memory available. For more information, see the Troubleshooting section of the Amazon ECS Developer Guide.
