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
        mycon.execute("INSERT INTO `on_pay_details` ( `cus_id`, `pro_id`, `unit_price`, `bank_rate`, `tot`, `datetime`, `active_status`,`order_type`,`bill_tot` ) VALUES ( '"+req.body.cusid+"', '"+req.body.proid+"', '"+req.body.uprice+"', '"+req.body.rate+"', '"+req.body.tot+"', '2021-01-05 11:08:42', '1','1','"+req.body.bill_tot+"' );",
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