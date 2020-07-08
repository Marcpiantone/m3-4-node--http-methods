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
    const { givenName, order, province } = info;
    const infoValidation = validations.validate(info);
    const existsValidation = validations.exists(info);
    const countryValidation = validations.countryIsCanada(info);
    const inStockValidation = validations.inStock(info);

    //if infoValidation is false = 0 match with customers database, then success
    if (infoValidation === true) {
      res.send({
        status: "success",
        givenName: givenName,
        order: order,
        province: province,
      });
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
      if (inStockValidation === false)
        res.send({
          status: "error",
          error: "unavailable",
        });
    }
  })
  // .get HTML "no frills"
  // .get("/order-confirmed", (req, res) =>
  //   res.sendFile(__dirname + "/public/order-confirmed.html")
  // )

  // .get .ejs with more data
  .get("/order-confirmed", (req, res) => {
    console.log(req.query);
    const { givenName, order, province } = req.query;
    res.render("./pages/order-confirmed.ejs", { givenName, order, province });
  })

  .get("*", (req, res) => res.send("Dang. 404."))
  .listen(8000, () => console.log(`Listening on port 8000`));
