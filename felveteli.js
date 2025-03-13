const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    port:3306,
    password:"",
    database:"felveteli"
});

app.get("/", (req,res) => {
    const sql = "SELECT * FROM diakok";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return util.format(res.json(result));
    });
});

app.listen(3000, () => {
    console.log("A szerver a 3000-es porton fut");
});