aws ecr get-login-password --region YOUR_REGION | docker login --username AWS --password-stdin YOUR_AWS_ID.dkr.ecr.YOUR_REGION.amazonaws.com

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 9005-4606-9136.dkr.ecr.YOUR_REGION.amazonaws.com
