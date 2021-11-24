var express = require('express');
var router = express.Router();
const user = require('../controllers/userControllers/user');
const userType = require('../controllers/userControllers/usetType');
const privilage = require('../controllers/userControllers/privilege');
const checkAuth = require('../middleware/check-auth');

//user
router.post("/getAllUsers", user.getAllUsers);
router.post("/getUsersList", user.getUsersList);
router.post("/update", user.update);
router.post("/signUp", user.signUp);
router.post("/userLogin", user.userLogin);
router.post("/getUserType", user.getUserType);
router.post("/getUserKeys", user.getUserKeys);
router.post("/saveNewUser", user.saveNewUser);
router.post("/getAllUsers", user.getAllUsers);
router.post("/searchUserById", user.searchUserById);
router.post("/sendLoginInformation", user.sendLoginInformation);
router.post("/createPassword", user.createPassword);
router.post("/getUserData", user.getUserData);
router.post("/getUserDataByPin", user.getUserDataByPin);
router.post("/getValue", user.getValue);
router.post("/getPinsById", user.getPinsById);
router.post("/getUsersListBYNic", user.getUsersListBYNic);
router.post("/saveoncus", user.saveoncus);
router.post("/getuidbymob", user.getuidbymob);


// router.post("/blockUser", user.blockUser);
// router.post("/unBlockUser", user.unBlockUser);


//userType
router.post("/getAllUserType", userType.getAllUserType);


//privilage
router.post("/getPrivilagesByUserType", privilage.getPrivilagesByUserType);

//Sms
router.post("/singalMessage", user.singalMessage);

router.post("/sendBulkSms", user.sendBulkSms);


router.post("/sendBulkSms", user.sendBulkSms);

router.post("/bankCodeBranchCode", user.bankCodeBranchCode);

router.post("/findByNic", user.findByNic);

router.post("/formOne", user.formOne);

router.post("/getMyref", user.getMyref);

router.post("/getOneRef", user.getOneRef);

router.post("/getAllBank", user.getAllBank);

router.post("/getBranch", user.getBranch);

router.post("/addCoreLeader", user.addCoreLeader);

router.post("/getCoreLeaders", user.getCoreLeaders);

router.post("/addKeyLeader", user.addKeyLeader);

router.post("/getKeyLeaders", user.getKeyLeaders);

router.post("/updateRefData", user.updateRefData);

router.post("/allBankRef", user.allBankRef);

router.post("/rejectBankPros", user.rejectBankPros);

router.post("/completeBankPros", user.completeBankPros);

router.post("/getBankRefarance", user.getBankRefarance);

router.post("/getTempData", user.getTempData);

module.exports = router;