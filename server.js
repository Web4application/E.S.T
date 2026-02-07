const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

// Crucial: This serves your .jst file as a JavaScript file so the browser can read it
app.get('/index.jst', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'public/index.jst'));
});

app.get('/', (req, res) => {
    try {
        // Step 1: Load the .est Blueprint
        const estData = yaml.load(fs.readFileSync('./config/web.est', 'utf8'));
        
        // Step 2: Compile through index.ejs
        res.render('index', { est: estData });
    } catch (e) {
        res.send("Error compiling E.S.T. stack: " + e.message);
    }
});

app.listen(3000, () => console.log('🚀 The New Beginning is live at http://localhost:3000'));
