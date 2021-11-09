const mycon = require('../../util/conn');
const userController = require('../userControllers/user');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');


exports.getAllInvoice = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_invoice.idInvoice,sw_invoice.date,sw_invoice.userId,sw_invoice.totalValue,sw_invoice.productId,`user`.idUser,uservalue.`value`,sw_invoice.pin  FROM sw_invoice INNER JOIN `user` ON `user`.idUser=sw_invoice.userId INNER JOIN uservalue ON uservalue.userId=`user`.idUser WHERE uservalue.keyId=2 ORDER BY sw_invoice.idInvoice DESC",
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


exports.getInvoicePayment = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_invoice.idInvoice,sw_invoice.date,sw_invoice.userId,sw_invoice.totalValue,sw_invoice.productId,sw_invoice.pin FROM sw_invoice WHERE sw_invoice.pin=" + req.body.pin,
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

exports.getTotPaid = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_invoice.idInvoice,sw_invoice.date,sw_invoice.userId,Sum(sw_invoice.totalValue) AS sum,sw_invoice.productId,sw_invoice.pin,sw_prod.prodName,sw_prod.prodPrice FROM sw_invoice INNER JOIN sw_prod ON sw_prod.idProd=sw_invoice.productId WHERE sw_invoice.pin=" + req.body.pin,
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

exports.newInvoice = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        mycon.execute("INSERT INTO  `sw_invoice`(  `date`, `userId`, `totalValue`, `productId`, `pin`) VALUES (  '" + day + "', '" + req.body.uid + "', '" + req.body.amount + "', '" + req.body.prod + "', '" + req.body.pin + "')",
            (error, rows, fildData) => {
                if (!error) {
                    in_id = rows.insertId;
                    mycon.execute("INSERT INTO  `sw_installment`( `userId`, `invoiceId`, `paidAmount`, `prodId`, `paidDate`, `status`, `pin`) VALUES (  '" + req.body.uid + "', '" + in_id + "', '" + req.body.amount + "', '" + req.body.prod + "', '" + day + "', 1, '" + req.body.pin + "')", (e, r, f) => {
                        if (!e) {
                            res.send(rows);
                        }
                    });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getInvoiceData = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_invoice.idInvoice,sw_invoice.date,sw_invoice.userId,sw_invoice.totalValue,sw_invoice.productId,sw_invoice.pin,uservalue.keyId,uservalue.`value`,userkey.`key` FROM sw_invoice INNER JOIN uservalue ON uservalue.userId=sw_invoice.userId INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE sw_invoice.idInvoice=" + req.body.id + " ORDER BY userkey.keyOder ASC",
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


exports.getFullIncom = (req, res, next) => {
    try {
        var from = dateFormat(new Date(req.body.from), "yyyy-mm-dd");
        var to = dateFormat(new Date(req.body.to), "yyyy-mm-dd");
        mycon.execute("SELECT sw_invoice.idInvoice,sw_invoice.date,sw_invoice.userId,sw_invoice.totalValue,sw_invoice.productId,sw_invoice.pin,sw_invoice.cusid FROM sw_invoice WHERE sw_invoice.date BETWEEN '" + req.body.from + "' AND '" + req.body.to + "' ORDER BY sw_invoice.idInvoice DESC ",
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


exports.getPointExpenses = (req, res, next) => {
    try {

        var from = dateFormat(new Date(req.body.from), "yyyy-mm-dd");
        var to = dateFormat(new Date(req.body.to), "yyyy-mm-dd");

        mycon.execute("SELECT sw_pointcommition.idPointcomition,Sum(sw_pointcommition.amount) as amount,sw_process.dateTime,sw_process.idProcess FROM sw_pointcommition INNER JOIN sw_process ON sw_pointcommition.process_id=sw_process.idProcess WHERE sw_process.dateTime BETWEEN '" + req.body.from + "' AND '" + req.body.to + "' GROUP BY sw_process.idProcess ORDER BY sw_process.idProcess DESC", (e, r, f) => {
            if (!e) {
                res.send(r);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getCommitionExpenses = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_introcommition.idIntrocommiton,Sum(sw_introcommition.amount) as amount,sw_process.dateTime,sw_process.idProcess FROM sw_introcommition INNER JOIN sw_process ON sw_introcommition.process_id=sw_process.idProcess WHERE sw_process.dateTime BETWEEN '" + req.body.from + "' AND '" + req.body.to + "' GROUP BY sw_process.idProcess ORDER BY sw_process.idProcess DESC", (e, r, f) => {
            if (!e) {
                res.send(r);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getbanreflist = (req, res, next) => {
    try {
        mycon.execute("SELECT bank_ref.id, bank_ref.sys_ref_no AS refno FROM `bank_ref` WHERE bank_ref.uid = '"+req.body.uid+"' AND bank_ref.active_status = '0' AND bank_ref.sys_ref_no IS NOT NULL", (e, r, f) => {
            if (!e) {
                res.send(r);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

