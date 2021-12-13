const imageCheck = require('./util/imageCheck/imageCheck');
const express = require('express');
const path = require('path');
const app = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));


// CUSTOMER PANEL

let customerCount = 4;
const customers = [
    {id: 0, firstName: "Jack", lastName: "Hancock"},
    {id: 1, firstName: "Jim", lastName: "Bean"},
    {id: 2, firstName: "John", lastName: "Doe"},
    {id: 3, firstName: "bob", lastName: "Doe"},
];

app.get('/api/customers', (req, res) => {
    res.json(customers);
});

app.post('/api/customers', (req, res) => {
    const customer = req.body;
    console.log('Adding customer', req)
    customers.push({id: customerCount, firstName:customer.firstName, lastName: customer.lastName})
    customerCount++;
    res.json(customers);
});


// IMAGE CHECK

let similarImages = []

app.use('/img', express.static('util/imageCheck/imgDatabase/'))

app.post('/api/imageCheck', (req, res) => {
    const image = req.body.image;
    if(!image.file){
        console.log('No image sent')
    }else{
        imageCheck.getSimilarImages(image);
    }
    res.json("This is a similar image!");
});

app.post('/api/similar', (req, res) => {
    console.log('LOGGING IMAGES :' + req.body.similarImages + ':')
    if(req.body.similarImages === ""){
        similarImages = ['NONE']
    }else{
        similarImages = req.body.similarImages.split(',')
    }
    res.json(req.body);
});

app.get('/api/similarImages', (req, res) => {
    res.json(similarImages)
});


let port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));