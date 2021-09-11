var express = require('express');
var router = express.Router();
const onpay = require('../controllers/userControllers/Onpay');
const userType = require('../controllers/userControllers/usetType');
const privilage = require('../controllers/userControllers/privilege');
const checkAuth = require('../middleware/check-auth');

router.post("/savepaydetails",onpay.save_payment_details);
router.post("/getproprice",onpay.getproprice);
router.post("/getorder",onpay.getmaxid);
router.post("/updateby_orderid",onpay.updateby_orderid);
router.post("/bank",onpay.bank);
module.exports = router;