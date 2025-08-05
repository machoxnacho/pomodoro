docker ps
CONTAINER ID   IMAGE                                                         COMMAND                  CREATED          STATUS                 PORTS                                         NAMES
31f074c40d49   900546069136.dkr.ecr.us-east-1.amazonaws.com/smiski-backend   "docker-entrypoint.s…"   44 minutes ago   Up 44 minutes          0.0.0.0:32772->5000/tcp, :::32772->5000/tcp   ecs-smiski-backend-task-3-smiski-backend-bcbec09bbdc982c26400
1025156a1de1   amazon/amazon-ecs-agent:latest                                "/agent"                 6 hours ago      Up 6 hours (healthy)                   

service smiski-backend-service was unable to place a task because no container instance met all of its requirements. The closest matching container-instance 5ed586c73a7748a8aa66067ee6ea4017 has insufficient memory available. For more information, see the Troubleshooting section of the Amazon ECS Developer Guide.


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

app.get('/health', (req, res) => {
  res.status(200).send('Smiski backend is healthy!');
});

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
