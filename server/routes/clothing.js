const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function (req, res) {

    getClothingData()
      .then((data) => {
        res.send(data);
        console.log("Sending data to client.");
      })
      .catch((error) => {
        res.status(500).send(error);
        console.log(error);
      })
      .finally(() => {
        console.log("Promise work is all done.");
      });

    console.log("Doing other work.");
  });

function getClothingData() {
  return new Promise((resolve, reject) => {
    console.log("Reading from disk");
    fs.readFile(datafile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        let clothingData = JSON.parse(data);
        resolve(clothingData);
      };
    });
  });
}

module.exports = router;
