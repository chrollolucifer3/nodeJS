const express = require('express');
const siteController = require("../Controllers/SiteController");
const router = express.Router();

router.get('/', siteController.get);  


module.exports = router