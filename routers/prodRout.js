var express = require('express');
var router = express.Router();
const prod = require('../controllers/product/poduct');

const checkAuth = require('../middleware/check-auth');

//user
router.post('/getAllProduct', prod.getAllProduct);
router.post('/update', prod.update);
router.post('/getprobyid', prod.getprobyid);
router.post('/imgcount', prod.getcount);
router.post('/getproductbyid', prod.getproductbyid);
router.post('/getProductByPin', prod.getProductByPin);
router.post('/setProductIssuStatus', prod.setProductIssuStatus);
router.post('/getMassagesForSend', prod.getMassagesForSend);
router.post('/sendMassage', prod.sendMassage);
router.post('/getSMShistry', prod.getSMShistry);
router.post('/getAllSent', prod.getAllSent);
router.post('/getAllNotificationsByUserID', prod.getAllNotificationsByUserID);
router.post('/sendMassagePending', prod.sendMassagePending);
router.post('/changeProductOnInvoice', prod.changeProductOnInvoice);

router.post('/firstMessageBulk', prod.firstMessageBulk);

router.post('/block', prod.block);

//===========================================
router.post('/addProduct', prod.addProduct);
router.post('/updateProduct', prod.updateProduct);

router.post('/addProdCat', prod.addProdCat);
router.post('/updateProdCat', prod.updateProdCat);
router.post('/getProdCat', prod.getProdCat);
router.post('/moreimgbyproid', prod.moreimgbyproid);
module.exports = router;
