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
router.post("/bankref",onpay.bankref);
router.post("/bankreflist",onpay.getreflist);
router.post("/bankreflistmore",onpay.getreflistmore);
router.post("/updateref",onpay.updateref);
router.post("/pendinglist",onpay.pendingpro);
router.post("/comlist",onpay.complategpro);
router.post("/pendinglistall",onpay.pendingpro_all);
router.post("/com_all",onpay.com_all);
router.post("/updatestatus",onpay.completebankprocess);
router.post("/getid",onpay.getidbymid);
router.post("/addsysref",onpay.add_sys_ref);

router.post("/del",onpay.del);
router.post("/refcount",onpay.refcount);
module.exports = router;