const imageCheck = require('./util/ImageCheck');
const express = require('express');
const path = require('path');
const app = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

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
    console.log('Adding customer', customer)
    customers.push({id: customerCount, firstName:customer.firstName, lastName: customer.lastName})
    customerCount++;
    res.json(customers);
});

app.post('/api/imageCheck', (req, res) => {
    const image = req.body.image;

    if(!image){
        console.log('No image sent')
    }else{
        console.log('Retrieved: ', image)
        imageCheck.getFile(image);
    }

    res.json("This is a similar image!");
});

let port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));