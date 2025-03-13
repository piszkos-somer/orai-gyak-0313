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
    const sql = "SELECT d.nev, t.agazat, (d.hozott + d.kpmagy + d.kpmat) AS osszpontszam FROM diakok d JOIN jelentkezesek j ON d.oktazon = j.diak JOIN tagozatok t ON j.tag = t.akod";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/d", (req,res) => {
    const sql = "SELECT * FROM diakok";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/d/:id", (req,res) => {
    const sql = "SELECT * FROM diakok WHERE oktazon = ?";
    db.query(sql,[req.params.id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/j", (req,res) => {
    const sql = "SELECT * FROM jelentkezesek";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/t", (req,res) => {
    const sql = "SELECT * FROM tagozatok";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});



app.listen(3000, () => {
    console.log("A szerver a 3000-es porton fut");
});