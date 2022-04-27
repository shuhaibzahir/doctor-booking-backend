const express = require("express")
const router = express.Router()
const {register} = require("../../controllers/Hospital")

router.post("/register",register)