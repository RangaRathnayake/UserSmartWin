const mycon = require('../../util/conn');
const userController = require('../userControllers/user');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');


exports.realEscapeString = (str) => {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
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

exports.balancePoint = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_tree.swTreeId,sw_tree.userId,sw_tree.commitionId FROM sw_tree WHERE sw_tree.swTreeId=" + req.body.tid,
            (error, rows, fildData) => {
                if (!error) {
                    console.log(rows);
                    var data = rows[0];
                    console.log(data.userId + " -- " + data.commitionId);
                    mycon.execute("DELETE from sw_point WHERE treeid = '" + req.body.tid + "' and Side = '" + req.body.side + "'", (e, r, f) => {
                        if (!e) {
                            var point = req.body.point;
                            for (var x = 0; x < point; x++) {
                                console.log(x);
                                mycon.execute("INSERT INTO `sw_point` (  `userId`, `commitionId`, `invoiceId`, `Side`, `point`, `status`, `treeid` ) "
                                    + " VALUES	(  " + data.userId + ", " + data.commitionId + ", 1, '" + req.body.side + "', 1, 1, '" + req.body.tid + "' )",
                                    (ee, rr, ff) => {
                                        if (ee) {
                                            console.log(ee);
                                        }
                                    });
                            }
                        }
                    });
                    res.send(rows);
                }
            });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
