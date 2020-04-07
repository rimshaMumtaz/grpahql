const cron = require('node-cron');
const shell = require('shelljs');
var express = require('express');
const fetch = require('node-fetch');
var User = require('./dbConnection.js');

var app = express();

var dataUserList = [];
var endCursorr = 0;
var newEndCursorStringType;

cron.schedule("* */3 * * *", function () {
    newEndCursorStringType = endCursorr.toString();
    queryFetch(
        ` query Users($limit: String){
                    user(username:"moneymatchgaming") {
                          followers(first:50, after:$limit){
                              totalCount
                              pageInfo {
                                  startCursor
                                  endCursor
                              }
                              list {
                                  username
                              }
                          }
                      
                    }
              }`, {limit: newEndCursorStringType}
    ).then(data => {
        dataUserList = data.data.user.followers.list;
        endCursorr += 50;

        var userList  = dataUserList;

        User.collection.insertMany(userList,  function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                console.log("Data saved successfully");
            }
        });
    });

    if (shell.exec("dir").code !== 0) {
        console.log("something went wrong");
    }
});

function queryFetch(query, variable) {
    return fetch('https://graphigo.prd.dlive.tv/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: query,
            variables: variable
        })
    }).then(res => res.json(console.log()))
}

//the port at which app will be running
app.listen(5000., () => console.log('Server Started'));
