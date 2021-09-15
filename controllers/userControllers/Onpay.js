const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');
const { param } = require('../../routers');
const e = require('express');

const firebase = require('../../util/firebase_connect');

exports.realEscapeString = (str) => {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
                // and double/single quotes
        }
    });
}


exports.save_payment_details = (req, res, next) => {
    try {
        let ts = Date.now();
        let date_ob = new Date(ts);
        console.log(date_ob);
        mycon.execute("INSERT INTO `on_pay_details` ( `cus_id`, `pro_id`, `unit_price`, `bank_rate`, `bill_tot`, `tot`, `bank_order_id`, `active_status`, `order_type`, `paytype`) VALUES ( '" + req.body.cusid + "', '" + req.body.proid + "', '" + req.body.uprice + "', '" + req.body.rate + "', '" + req.body.bill_tot + "', '" + req.body.tot + "', '" + req.body.bank_order_id + "', '0', '2', '"+req.body.paytype+"' );",
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

exports.getproprice = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_prod.prodPrice FROM `sw_prod` WHERE sw_prod.idProd = '" + req.body.proid + "'",
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

exports.getmaxid = (req, res, next) => {

    console.log('asdf asdf asdf');
    try {
        mycon.execute("SELECT	MAX( on_pay_details.cus_order_id )+1 AS order_id FROM `on_pay_details`",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error)
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.updateby_orderid = (req, res, next) => {
    try {
        mycon.execute("UPDATE `on_pay_details` SET `active_status` = '" + req.body.status + "' WHERE `bank_order_id` = '" + req.body.order + "';",
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

exports.bank = (req, res, next) => {

    console.log(req.body.object);
    console.log("xxxxxx");
    try {
        mycon.execute("INSERT INTO  `bank` (`obj`,`user_id`) VALUES (" + JSON.stringify(req.body) + ",'1');",
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


exports.bankref = (req, res, next) => {

    console.log(req.body.object);
    console.log("xxxxxx");
    try {
        mycon.execute("INSERT INTO `bank_ref` ( `metaid`, `refno`, `active_status`, `amount` , `uid` , `proid` ,`typeid`) VALUES ( '"+req.body.mid+"', '"+req.body.refno+"', '0', '"+req.body.amount+"', '"+req.body.uid+"' , '"+req.body.proid+"' ,'"+req.body.typeid+"' );",
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

exports.getreflist = (req, res, next) => {

    console.log(req.body.object);
    console.log("xxxxxx");
    try {
        mycon.execute("SELECT sw_prod.prodName, bank_ref.id, bank_ref.amount FROM bank_ref INNER JOIN sw_prod ON bank_ref.proid = sw_prod.idProd WHERE bank_ref.active_status = '0' AND bank_ref.uid = '"+req.body.uid+"'",
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


exports.getreflistmore = (req, res, next) => {

    console.log(req.body.object);
    console.log("xxxxxx");
    try {
        mycon.execute("SELECT sw_prod.prodName, bank_ref.id, bank_ref.amount FROM bank_ref INNER JOIN sw_prod ON bank_ref.proid = sw_prod.idProd WHERE bank_ref.active_status = '0' AND bank_ref.uid = '"+req.body.uid+"' AND bank_ref.id = '"+req.body.refid+"'",
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

exports.updateref = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("UPDATE `bank_ref` SET `refno` = '"+req.body.refno+"', `active_status` = '1', `cus_sys_ref_no` = '"+req.body.sys_ref_no+"' WHERE (`id` = '"+req.body.id+"');",
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

exports.pendingpro = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("SELECT bank_ref.id, bank_ref.metaid, bank_ref.refno, bank_ref.active_status, bank_ref.amount, bank_ref.uid, bank_ref.proid, uservalue.`value`, sw_prod.prodName, sw_prod.prodPrice FROM bank_ref INNER JOIN uservalue ON bank_ref.uid = uservalue.userId INNER JOIN sw_prod ON bank_ref.proid = sw_prod.idProd WHERE uservalue.keyId = '1' AND bank_ref.active_status = '1'",
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


exports.complategpro = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("SELECT bank_ref.id, bank_ref.metaid, bank_ref.refno, bank_ref.active_status, bank_ref.amount, bank_ref.uid, bank_ref.proid, uservalue.`value`, sw_prod.prodName, sw_prod.prodPrice, bank_ref.img_path, bank_ref.typeid, bank_ref.sys_ref_no, bank_ref.cus_sys_ref_no FROM bank_ref INNER JOIN uservalue ON bank_ref.uid = uservalue.userId INNER JOIN sw_prod ON bank_ref.proid = sw_prod.idProd WHERE uservalue.keyId = '1' AND bank_ref.active_status = '2'",
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


exports.pendingpro_all = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("SELECT bank_ref.id, bank_ref.metaid, bank_ref.refno, bank_ref.active_status, bank_ref.amount, bank_ref.uid, bank_ref.proid, uservalue.`value` AS valu, sw_prod.prodName, bank_ref.img_path, sw_prod.prodPrice, bank_ref.typeid, bank_ref.sys_ref_no, bank_ref.cus_sys_ref_no FROM bank_ref INNER JOIN uservalue ON bank_ref.uid = uservalue.userId INNER JOIN sw_prod ON bank_ref.proid = sw_prod.idProd WHERE uservalue.keyId = '1' AND bank_ref.active_status = '1' AND bank_ref.id = '"+req.body.id+"'",
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

exports.com_all = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("SELECT bank_ref.id, bank_ref.metaid, bank_ref.refno, bank_ref.active_status, bank_ref.amount, bank_ref.uid, bank_ref.proid, uservalue.`value` AS valu, sw_prod.prodName, bank_ref.img_path, sw_prod.prodPrice, bank_ref.typeid, bank_ref.sys_ref_no, bank_ref.cus_sys_ref_no FROM bank_ref INNER JOIN uservalue ON bank_ref.uid = uservalue.userId INNER JOIN sw_prod ON bank_ref.proid = sw_prod.idProd WHERE uservalue.keyId = '1' AND bank_ref.active_status = '2' AND bank_ref.id = '"+req.body.id+"'",
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

exports.completebankprocess = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("UPDATE `bank_ref` SET `active_status` = '2' WHERE (`id` = '"+req.body.id+"');",
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

exports.getidbymid = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("SELECT bank_ref.id FROM bank_ref WHERE bank_ref.metaid = '"+req.body.metid+"'",
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


exports.add_sys_ref = (req, res, next) => {

    console.log(req.body.object);
    try {
        mycon.execute("UPDATE `bank_ref` SET `sys_ref_no` = '"+req.body.refno+"' WHERE (`metaid` = '"+req.body.metid+"');",
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