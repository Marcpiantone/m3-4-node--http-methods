"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const validations = require("./validations");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints

  // POST

  .post("/order", (req, res) => {
    let info = req.body;
    const infoValidation = validations.validate(info);
    const existsValidation = validations.exists(info);
    const countryValidation = validations.countryIsCanada(info);

    console.log(info);

    //if infoValidation is false = 0 match with customers database, then success
    if (infoValidation === true) {
      res.send({ status: "success" });
    } else {
      if (existsValidation === false)
        res.send({
          status: "error",
          error: "repeat-customer",
        });
      if (countryValidation === false)
        res.send({
          status: "error",
          error: "undeliverable",
        });
    }
  })

  .get("/order-confirmed", (req, res) =>
    res.sendFile(
      "C:/Users/Marc Piantone/Documents/concordia-bootcamps/m3-4-node--http-methods/public/order-confirmed.html"
    )
  )

  .get("*", (req, res) => res.send("Dang. 404."))
  .listen(8000, () => console.log(`Listening on port 8000`));
