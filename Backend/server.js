import express from 'express';

const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Server is Ready');
})

app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`);
})

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "joke 1",
            content: "joke 1 content"
        }, 
        {
            id: 1,
            title: "joke 1",
            content: "joke 1 content"

        }, 
        {
            id: 1,
            title: "joke 1",
            content: "joke 1 content"
        }, 
        {
            id: 1,
            title: "joke 1",
            content: "joke 1 content"
        }, 
        {
            id: 1,
            title: "joke 1",
            content: "joke 1 content"
        }
    ]
    res.send(jokes)
})