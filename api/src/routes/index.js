const { Router } = require('express');
const { getDogsAndQuery } = require('./../Controllers/getDogs');
const { getDogById } = require('./../Controllers/getDogsById');
const { createDog } = require('./../Controllers/createDog');
const { getTemperaments } = require('./../Controllers/getTemperaments');
const router = Router();

router.get("/dogs", getDogsAndQuery);
router.get("/dogs/:idRaza", getDogById);
router.post("/dogs", createDog);
router.get("/temperaments",getTemperaments);


module.exports = router;
