const express = require('express')
var elasticsearch = require('elasticsearch');
const mysql = require('mysql');
const app = express()
const port = 4433
const indexName = 'a11e693f-d6d2-11e8-b283-382c4ab4a532_discoveryindexkind'


const connection = mysql.createConnection({
    host: 'u28rhuskh0x5paau.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'hf8t3p2wowg351hr',
    password: 's4fp8u046l30aloj',
    database: 'rsxx9m87051sudx7'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

const configuration = { countries: 'USA'};
connection.query('INSERT INTO configurations SET ?', configuration, (err, res) => {
    if(err) throw err;

    console.log('Last insert ID:', res.insertId);
});

var client = new elasticsearch.Client({
    host: 'https://elastic:5t8e50MT30Pwbed6g5X2zVgk@474197f539d74ae980590eb60963a9f1.eu-central-1.aws.cloud.es.io:9243',
    log: 'trace'
});

client.search({
    index: indexName,
    body: {
        query: {
            match_all:{}
        }
    }
}).then(function (resp) {
    var hits = resp.hits.hits;
    let response = "";
    for (var i = 0; i < hits.length ; i++) {
        response = response.concat("Type of event " + i + " is: " + hits[i]._source.Type + "\n")
    }
    app.get('/', (req, res) => res.send(response))

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}, function (err) {
    console.trace(err.message);
});



module.exports = app;