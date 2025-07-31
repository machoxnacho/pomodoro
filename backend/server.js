const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

const DATA_FILE = './data.json';

app.use(cors());
app.use(express.json());

//create data file if it does not exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ coins: 0, cycles: 0}, null, 2));
}

//read and write the data
function readData() {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET current status 
app.get('/stats', (req, res) =>{
    const data = readData();
    res.json(data);
});

// POST to incremenent cycle and coins
app.post('/complete-cycle',(req, res) => {
    const data = readData();
    data.cycles += 1;
    data.coins += 5;
    writeData(data);
    res.json({message: 'Cycle completed', data});
});

app.listen(PORT, () => {
    console.log(`Server runnning on http://localhost:${PORT}`);
});