aws ecr get-login-password --region YOUR_REGION | \
docker login --username AWS --password-stdin YOUR_AWS_ID.dkr.ecr.YOUR_REGION.amazonaws.com
