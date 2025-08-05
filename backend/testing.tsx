docker buildx create --use   # Only needed once to enable buildx

docker buildx build \
  --platform linux/amd64 \
  -t 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest \
  --push .

    900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend

ERROR: failed to build: failed to solve: failed to push 900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend:latest: unexpected status from HEAD request to https://900546069136.dkr.ecr.us-east-1.amazonaws.com/v2/smiski-backend/blobs/sha256:37927ed901b1b2608b72796c6881bf645480268eca4ac9a37b9219e050bb4d84: 403 Forbidden

View build details: docker-desktop://dashboard/build/relaxed_diffie/relaxed_diffie0/ruf9w58amn4h617tlgwm4da1

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 900546069136.dkr.ecr.us-east-1.amazonaws.com





const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

// Replace with your region
const client = new DynamoDBClient({ region: 'us-east-1' });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'PomodoroUsers';

require('dotenv').config(); // loads variables from .env
const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION, 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

app.use(cors());
app.use(express.json());

// GET current stats for a user
app.get('/stats/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const data = await ddb.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { userId }
    }));

    if (!data.Item) {
      // Create user with default values if not found
      await ddb.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: { userId, coins: 0, cycles: 0 }
      }));
      return res.json({ coins: 0, cycles: 0 });
    }

    res.json(data.Item);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).send('Failed to get stats');
  }
});

// POST to increment cycle and coins
app.post('/complete-cycle', async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await ddb.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { userId },
      UpdateExpression: 'ADD coins :c, cycles :cy',
      ExpressionAttributeValues: {
        ':c': 5,
        ':cy': 1
      },
      ReturnValues: 'ALL_NEW'
    }));

    res.json({ message: 'Cycle completed', data: result.Attributes });
  } catch (err) {
    console.error('Error completing cycle:', err);
    res.status(500).send('Failed to complete cycle');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
