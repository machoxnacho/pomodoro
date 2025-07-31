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
