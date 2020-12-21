var express = require('express');
var router = express.Router();
const tree = require('../controllers/networkTree/tree');

const checkAuth = require('../middleware/check-auth');

//user
router.post("/getFullTree", tree.getFullTree);
router.post("/addToTree", tree.addToTree);
router.post("/canAdd", tree.canAdd);
router.post("/addPoint", tree.addPoint);
router.post("/getDownTree", tree.getDownTree);
router.post("/newNode", tree.newNode);
router.post("/getCurrent", tree.getCurrent);
router.post("/getCurrentPoint", tree.getCurrentPoint);



module.exports = router;