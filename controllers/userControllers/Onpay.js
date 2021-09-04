const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');
const { param } = require('../../routers');



exports.save_payment_details = (req, res, next) => {
    try {
        let ts = Date.now();
        let date_ob = new Date(ts);
        console.log(date_ob);
        mycon.execute("INSERT INTO `on_pay_details` ( `cus_id`, `pro_id`, `unit_price`, `bank_rate`, `bill_tot`, `tot`, `bank_order_id`, `active_status`, `order_type` ) VALUES ( '"+req.body.cusid+"', '"+req.body.proid+"', '"+req.body.uprice+"', '"+req.body.rate+"', '"+req.body.bill_tot+"', '"+req.body.tot+"', '"+req.body.bank_order_id+"', '0', '2' );",
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
        mycon.execute("SELECT sw_prod.prodPrice FROM `sw_prod` WHERE sw_prod.idProd = '"+req.body.proid+"'",
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
    try {
        mycon.execute("SELECT	MAX( on_pay_details.cus_order_id )+1 AS order_id FROM `on_pay_details`",
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

exports.updateby_orderid = (req, res, next) => {
    try {
        mycon.execute("UPDATE `swin`.`on_pay_details` SET `active_status` = '"+req.body.status+"' WHERE `bank_order_id` = '"+req.body.order+"';",
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



