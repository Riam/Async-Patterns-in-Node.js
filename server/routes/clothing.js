const express = require('express');
const fs = require('fs');
const fsPromises = require("fs").promises;
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(async function (req, res) {
    try {
      let clothingData = await getClothingData();
      console.log("Sending data to client");
      res.send(clothingData);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  });

async function getClothingData() {
  console.log("Reading from disk");
  let fileData = await fsPromises.readFile(datafile, "utf8");
  return JSON.parse(fileData);
}

module.exports = router;
