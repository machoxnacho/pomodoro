docker buildx create --use   # Only needed once to enable buildx

docker buildx build \
  --platform linux/amd64 \
  -t 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest \
  --push .

