docker buildx create --use   # Only needed once to enable buildx

docker buildx build \
  --platform linux/amd64 \
  -t 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest \
  --push .

    900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend

ERROR: failed to build: failed to solve: failed to push 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest: unexpected status from HEAD request to https://900546069136.dkr.ecr.us-east-1.amazonaws.com/v2/smiski-backend/blobs/sha256:37927ed901b1b2608b72796c6881bf645480268eca4ac9a37b9219e050bb4d84: 403 Forbidden

View build details: docker-desktop://dashboard/build/relaxed_diffie/relaxed_diffie0/ruf9w58amn4h617tlgwm4da1

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 900546069136.dkr.ecr.us-east-1.amazonaws.com

