const express = require('express');
const graphqlHTTP = require('express-graphql');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || config.serverPort;

//Mongoose
mongoose.connect("mongodb+srv://afstudeerUser:Y8C8N95ET9nVfHsTQO14GhYBlNCnFZJj8Mj93SK@afstuderenlightcluster-vhsq8.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('error', (error) => {
        console.warn('Warning', error);
    })
    .once('open', () => {
        console.log('Message:', 'The ' + config.dbName + ' database is connected');
    });

//GraphQL and endpoints
app.use('/graphiql', graphqlHTTP({ schema: require('./Schema.js'), graphiql: true}));

//App
app.listen(port, function () {
    console.log('http://localhost:', port)
});

module.exports = app;