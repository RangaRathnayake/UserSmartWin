var express = require('express');
var router = express.Router();
const prod = require('../controllers/product/poduct');

const checkAuth = require('../middleware/check-auth');

//user
router.post("/getAllProduct", prod.getAllProduct);
router.post("/getProductByPin", prod.getProductByPin);
router.post("/setProductIssuStatus", prod.setProductIssuStatus);
router.post("/getMassagesForSend", prod.getMassagesForSend);
router.post("/sendMassage", prod.sendMassage);
router.post("/getAllSent", prod.getAllSent);
router.post("/getAllNotificationsByUserID", prod.getAllNotificationsByUserID);
router.post("/sendMassagePending", prod.sendMassagePending);
router.post("/changeProductOnInvoice", prod.changeProductOnInvoice);

router.post("/firstMessageBulk", prod.firstMessageBulk);

router.post("/block", prod.block);

//===========================================
router.post("/addProduct", prod.addProduct);
router.post("/updateProduct", prod.updateProduct);

router.post("/addProdCat", prod.addProdCat);
router.post("/updateProdCat", prod.updateProdCat);
router.post("/getProdCat", prod.getProdCat);
module.exports = router;

