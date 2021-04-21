const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');

//getProduct
exports.getAllProduct = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_prod.idProd,sw_prod.prodName,sw_prod.prodImage,sw_prod.prodPrice,sw_prod.prodPoint,sw_prod.prodOther,sw_prod.prodStatus FROM sw_prod",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getProductByPin = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_tree.swTreeId,sw_invoice.idInvoice,sw_invoice.productId,sw_prod.idProd,sw_prod.prodName,sw_prod.prodImage,sw_prod.prodPrice,sw_prod.prodPoint,sw_prod.prodOther,sw_prod.prodStatus, sw_tree.other2, sw_tree.other1 FROM sw_tree INNER JOIN sw_invoice ON sw_invoice.pin=sw_tree.swTreeId INNER JOIN sw_prod ON sw_prod.idProd=sw_invoice.productId WHERE sw_tree.swTreeId='" + req.body.tid + "' LIMIT 1",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.setProductIssuStatus = (req, res, next) => {
    try {
        mycon.execute("UPDATE `sw_tree` SET `other2`='" + req.body.status + "' WHERE `swTreeId`=" + req.body.tid,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getMassagesForSend = (req, res, next) => {
    try {
        mycon.execute("SELECT system_massage.id,system_massage.message_sinhala,system_massage.message_english,system_massage.`status`,system_massage.status_text FROM system_massage",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.sendMassage = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        mycon.execute("INSERT INTO `sw_prod_issuing` (`user_id`,`tid_id`,`prod_id`,`date`,`comment`,`status`,`status_text`) " +
            " VALUES ('" + req.body.uid + "','" + req.body.tid + "','" + req.body.prodid + "','" + day + "','" + req.body.msg + "','" + req.body.status + "','" + req.body.sttext + "')",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);

                    mycon.execute("SELECT uservalue.`value`,userkey.`key` FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId= '" + req.body.uid + "' AND (uservalue.keyId=22 OR uservalue.keyId=9) ORDER BY userkey.keyOder ASC", (e, r, f) => {
                        if (!e) {

                            mg.emailSend({
                                to: r[1].value,
                                subject: 'Smart Win Entrepreneur',
                                message: req.body.msg
                            });
                            mg.smsSend({ mob: r[0].value, message: req.body.msg });

                        } else {
                            console.log(e);
                        }
                    });
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getAllSent = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_prod_issuing.idProd,sw_prod_issuing.user_id,sw_prod_issuing.tid_id,sw_prod_issuing.prod_id,sw_prod_issuing.date,sw_prod_issuing.`comment`,sw_prod_issuing.`status`,sw_prod_issuing.status_text FROM sw_prod_issuing WHERE sw_prod_issuing.tid_id=" + req.body.tid,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getAllNotificationsByUserID = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.userId='" + req.body.uid + "' AND sw_tree.`status`=1",
            (error, rows, fildData) => {
                if (!error) {
                    rows.forEach(row => {
                        row.A = null;
                        row.B = null;
                        mycon.execute("SELECT sw_prod_issuing.idProd,sw_prod_issuing.user_id,sw_prod_issuing.tid_id,sw_prod_issuing.prod_id,sw_prod_issuing.date,sw_prod_issuing.`comment`,sw_prod_issuing.`status`,sw_prod_issuing.status_text FROM sw_prod_issuing WHERE sw_prod_issuing.tid_id=" + row.swTreeId,
                            (error, rrs, fildData) => {
                                if (!error) {
                                    row.layar = rrs;
                                } else {
                                    console.log(error);
                                }
                            });
                    });
                    setTimeout(() => {
                        res.send(rows);
                    }, 500);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



exports.sendMassagePending = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO `sw_prod_issuing` (`user_id`,`tid_id`,`prod_id`,`date`,`comment`,`status`,`status_text`) " +
            " VALUES ('" + req.body.uid + "','" + req.body.tid + "','" + req.body.prodid + "','" + req.body.date + "','" + req.body.msg + "','" + req.body.status + "','" + req.body.sttext + "')",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.changeProductOnInvoice = (req, res, next) => {
    try {
        mycon.execute("UPDATE `sw_invoice` SET `productId`='" + req.body.pid + "',`comment`='" + req.body.comment + "' WHERE `pin`= '" + req.body.tid + "'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
