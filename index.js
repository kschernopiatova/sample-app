let express = require('express');
let app = express();
var mysql = require('mysql');

app.get('/', function (req, res) {
    let obj = {
        endpoints: [
            "/rand",
            "/current-date"
        ]
    };
    res.send(obj);
});

app.get('/rand', function (req, res) {
    var con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS
    });
    con.connect(function (err) {
        if (err) {
            let obj = {
                name: "Error",
                value: "Couldn't connect to Database"
            };
            res.status(504)
            res.send(obj);
        }
    });
    console.log("Connected!");
            var data;
            con.query("SELECT `rand`, id FROM test_db.`test-db`",
                function (err, results, fields) {
                    try {
                        data = results[2].rand
                        console.log(data)
                        let obj = {
                            name: "rand-str",
                            value: data
                        };
                        res.send(obj);
                    } catch (TypeError) {
                        console.log("response was sent")
                    }
                });
    con.end(function (err) {
        if (err) {
            return console.log("Error: " + err.message);
        }
        console.log("Connection closed");
    });
});

app.get('/current-date', function (req, res) {
    let obj = {
        name: "current",
        value: new Date()
    };
    res.send(obj);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});