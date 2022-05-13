const express = require('express');
const app = express();

app.get('', (req, res, next) => {
    res.send("Hello world\n");
});

app.listen(3000, () => {
    console.log("App is listening 3000 port");
});