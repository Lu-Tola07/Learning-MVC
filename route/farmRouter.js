const express = require("express");
const {register, getAll, getOne, update, toDelete, getAllMature, yetToBeSold} = require("../controller/farmController");
const router = express.Router();

router.post("/register-animal", register);

router.get("/all-animals", getAll);

router.get("/animal/:id", getOne);

router.put("/animal/:id", update);

router.delete("/animal/:id", toDelete);

router.get("/mature-animals", getAllMature);

router.get("/sold-animals", yetToBeSold);

module.exports = router
