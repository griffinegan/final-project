import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Serve static files (CSS and JS)
app.use(express.static(process.cwd()));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
