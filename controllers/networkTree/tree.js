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

exports.getFullTree = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_tree.swTreeId AS id,sw_tree.swTreeId AS title,sw_tree.parentId AS pid,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName AS img,sw_tree.other1,sw_tree.other2,`user`.idUser as point,`user`.email,uservalue.`value` AS name,uservalue.keyId FROM sw_tree INNER JOIN `user` ON `user`.idUser=sw_tree.userId LEFT JOIN uservalue ON uservalue.userId=`user`.idUser WHERE uservalue.keyId=2",
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

exports.newNode = (req, res, next) => {


    // introUid: '1000',
    // aPin: '16',
    // aPinUid: 1000,
    // side: 'A',
    // type: 'other',
    // product: 1
    //  let b = req.body;


    try {

        let b = req.body;
        let userID = 0;
        let cusID = 0;
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        if (b.type === 'other') {
            mycon.execute("INSERT INTO `user` ( `mobileno`, `status`, `dateTime`, `utypeId` ) " +
                "  VALUES	( '" + b.purchaser.cusTpno + "', 0, '" + day + "', 5 )", (e, r, f) => {
                    if (!e) {
                        cusID = r.insertId;
                        this.setUserVal({ uid: cusID, key: 2, val: b.purchaser.cusName });
                        this.setUserVal({ uid: cusID, key: 5, val: b.purchaser.cusAddressl1 });
                        this.setUserVal({ uid: cusID, key: 6, val: b.purchaser.cusAddressl2 });
                        this.setUserVal({ uid: cusID, key: 7, val: b.purchaser.cusAddressl3 });
                        this.setUserVal({ uid: cusID, key: 8, val: b.purchaser.cusCity });
                        this.setUserVal({ uid: cusID, key: 21, val: b.purchaser.cusNic });
                        this.setUserVal({ uid: cusID, key: 9, val: b.purchaser.cusTpno });


                        mycon.execute("INSERT INTO `user` (  `status`, `dateTime`, `utypeId` ) VALUES (0, '" + day + "', 4 )", (ee, rr, ff) => {
                            if (!ee) {
                                userID = rr.insertId;
                                b.vlaues.forEach(e => {
                                    this.setUserVal({ uid: userID, key: e.idUserKey, val: e.val });
                                });

                                mycon.execute("SELECT sw_prod.idProd,sw_prod.prodName,sw_prod.prodImage,sw_prod.prodPrice,sw_prod.prodPoint,sw_prod.prodOther,sw_prod.prodStatus FROM sw_prod WHERE sw_prod.idProd=" + b.product, (eee, rrr, fff) => {
                                    if (!eee) {
                                        let prod = rrr[0];
                                        mycon.execute("INSERT INTO  `sw_invoice` (   `date`, `userId`, `totalValue`, `productId` )" +
                                            " VALUES	(   '" + day + "', '" + cusID + "', '" + b.firstPay + "', '" + prod.idProd + "' )", (er, ro, fi) => {
                                                if (!er) {
                                                    let invoiceID = ro.insertId;
                                                    let para = {
                                                        uid: userID,
                                                        parent: b.aPin,
                                                        side: b.side,
                                                        point: prod.prodPoint,
                                                        intro: b.introUid,
                                                        invoice: invoiceID,
                                                    }

                                                    // console.log("000000000000000000000000000000000000000");
                                                    console.log(para);
                                                    // console.log("000000000000000000000000000000000000000");

                                                    this.addToTree(para, res, next);

                                                    userController.sendLoginInformation(userID);

                                                    console.log("================================================== "+ userID + " for sms")

                                                    mycon.execute("INSERT INTO `sw_installment` ( `userId`, `invoiceId`, `paidAmount`, `prodId`, `paidDate`, `status` )" +
                                                        " VALUES	( '" + cusID + "', '" + invoiceID + "', '" + b.firstPay + "', '" + prod.idProd + "', '" + day + "', 1 )", (eror, rows, fildData) => {
                                                            if (eror) {
                                                                console.log(eror);
                                                            }
                                                        });
                                                }
                                            });
                                    } else { console.log(eee); }
                                });
                            } else {
                                console.log(ee);
                            }
                        });
                    } else {
                        console.log(e);
                    }
                });
        } else {
            mycon.execute("INSERT INTO `user` (  `status`, `dateTime`, `utypeId` ) VALUES (0, '" + day + "', 4 )", (ee, rr, ff) => {
                if (!ee) {
                    userID = rr.insertId;
                    b.vlaues.forEach(e => {
                        this.setUserVal({ uid: userID, key: e.idUserKey, val: e.val });
                    });
                    mycon.execute("SELECT sw_prod.idProd,sw_prod.prodName,sw_prod.prodImage,sw_prod.prodPrice,sw_prod.prodPoint,sw_prod.prodOther,sw_prod.prodStatus FROM sw_prod WHERE sw_prod.idProd=" + b.product, (eee, rrr, fff) => {
                        if (!eee) {
                            let prod = rrr[0];
                            mycon.execute("INSERT INTO  `sw_invoice` (   `date`, `userId`, `totalValue`, `productId` )" +
                                " VALUES	(   '" + day + "', '" + userID + "', '" + b.firstPay + "', '" + prod.idProd + "' )", (er, ro, fi) => {
                                    if (!er) {
                                        let invoiceID = ro.insertId;

                                        let para = {
                                            invoice: invoiceID,
                                            uid: userID,
                                            parent: b.aPin,
                                            side: b.side,
                                            point: prod.prodPoint,
                                            intro: b.introUid
                                        }
                                        this.addToTree(para, res, next);
                                        userController.sendLoginInformation(userID);
                                        mycon.execute("INSERT INTO `sw_installment` ( `userId`, `invoiceId`, `paidAmount`, `prodId`, `paidDate`, `status` )" +
                                            " VALUES	( '" + userID + "', '" + invoiceID + "', '" + b.firstPay + "', '" + prod.idProd + "', '" + day + "', 1 )", (eror, rows, fildData) => {
                                                if (eror) {
                                                    console.log(eror);
                                                }
                                            });
                                    }
                                });
                        }
                    });
                } else {
                    console.log(ee);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}


exports.setUserVal = (parm) => {
    let q = "INSERT INTO  `uservalue`(  `userId`, `keyId`, `value`, `valueStatus`) VALUES (  " + parm.uid + ",  " + parm.key + " , '" + this.realEscapeString(parm.val) + "', 1)";
    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            return;
        } else {
            console.log(er)
            return;
        }
    });
}


exports.getDownTree = (req, res, next) => {
    try {
        let arr = [];
        function getNode(id) {
            mycon.execute("SELECT sw_tree.swTreeId AS id,sw_tree.swTreeId AS title,sw_tree.parentId AS pid,sw_tree.A,sw_tree.B,sw_tree.APoint,sw_tree.BPoint,sw_tree.userName AS img,`user`.email,uservalue.`value` AS `name` FROM sw_tree INNER JOIN `user` ON `user`.idUser=sw_tree.userId LEFT JOIN uservalue ON uservalue.userId=`user`.idUser WHERE uservalue.keyId=2 AND sw_tree.swTreeId=" + id,
                (error, rows, fildData) => {
                    if (!error) {
                        let nod = rows[0];
                        console.log('-----------------------------------------------------');
                        console.log(nod);
                        console.log('------------------------------------------------------');
                        
                        if (nod) {
                            arr.push(nod);
                            if (nod.A && nod.A > 0) {
                                getNode(nod.A);
                            }

                            if (nod.B && nod.B > 0) {
                                getNode(nod.B);
                            }
                        }
                    }
                });
        }

        getNode(req.body.id);

        setTimeout(() => {
            console.log(arr);
            res.send(arr);
        }, 2000);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.addToTree = (param, res, next) => {
    try {
        // var param = req.body;
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        // {
        //     "uid": 1000,
        //     "parent": 13,
        //     "side": "A",
        //     "point": 1,
        //     "intro": 12,
        //     "introCom": 14,
        // }

        mycon.execute("SELECT sw_commition.idCommition,sw_commition.register_date,sw_commition.userId,sw_commition.introducerid,sw_commition.introducerCommitionId,sw_commition.`status` FROM sw_commition WHERE sw_commition.userId='" + param.intro + "' ORDER BY sw_commition.idCommition ASC", (ee, rr, ff) => {
            if (!ee) {
                let introCom = rr[0].idCommition;
                mycon.execute("INSERT INTO `sw_commition`(`register_date`, `userId`, `introducerid`, `introducerCommitionId`, `status`) " +
                    " VALUES ('" + day + "', " + param.uid + ", " + param.intro + ", " + introCom + ", 1)", (e, r, f) => {
                        if (!e) {
                            let comId = r.insertId;
                            mycon.execute("INSERT INTO  `sw_tree` (  `parentId`, `A`, `B`, `userId`, `commitionId`, `APoint`, `BPoint`, `layar`, `status`, `userName`, `other1`, `other2` ) " +
                                "  VALUES	( " + param.parent + ", NULL, NULL, " + param.uid + ", " + comId + ", 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0' )", (er, ro, fi) => {
                                    if (!er) {
                                        let treeId = ro.insertId;

                                        console.log('---------');
                                        console.log(treeId);
                                        console.log('---------');


                                        mycon.execute("UPDATE `sw_invoice` SET `pin`='" + treeId + "' WHERE `idInvoice`= " + param.invoice, (ee, rr, ff) => {
                                            if (ee) {
                                                console.log(ee);
                                            }
                                        });

                                        mycon.execute("UPDATE `sw_installment` SET `pin`='" + treeId + "' WHERE `invoiceId`=" + param.invoice, (ee, rr, ff) => {
                                            if (ee) {
                                                console.log(ee);
                                            }
                                        })



                                        if (param.side === 'A') {
                                            mycon.execute("UPDATE `sw_tree` SET `A`='" + treeId + "' WHERE `swTreeId`=" + param.parent, (errr, rooo, fiii) => {
                                                if (!errr) {
                                                } else {
                                                    console.log(errr);
                                                }
                                            });
                                        }
                                        if (param.side === 'B') {
                                            mycon.execute("UPDATE `sw_tree` SET `B`='" + treeId + "' WHERE `swTreeId`=" + param.parent, (errr, rooo, fiii) => {
                                                if (!errr) {
                                                } else {
                                                    console.log(errr);
                                                }
                                            });
                                        }
                                        let idA = null;
                                        let idB = null;

                                        mycon.execute("INSERT INTO `sw_tree` ( `parentId`, `A`, `B`, `userId`, `commitionId`, `APoint`, `BPoint`, `layar`, `status`, `userName`, `other1`, `other2` )"
                                            + "  VALUES ( " + treeId + ", NULL, NULL, " + param.uid + ", NULL, 0, 0, 0, 0, '../../../assets/img/x-button.png', 0, '0' )", (err, roo, fii) => {
                                                if (!err) {
                                                    idA = roo.insertId;
                                                    mycon.execute("UPDATE `sw_tree` SET `A`='" + idA + "' WHERE `swTreeId`=" + treeId, (errr, rooo, fiii) => {
                                                        if (!errr) {

                                                        } else {
                                                            console.log(errr);
                                                        }
                                                    });
                                                } else {
                                                    console.log(err);
                                                }
                                            });
                                        mycon.execute("INSERT INTO `sw_tree` ( `parentId`, `A`, `B`, `userId`, `commitionId`, `APoint`, `BPoint`, `layar`, `status`, `userName`, `other1`, `other2` )"
                                            + "  VALUES ( " + treeId + ", NULL, NULL, " + param.uid + ", NULL, 0, 0, 0, 0, '../../../assets/img/x-button.png', 0, '0' )", (err, roo, fii) => {
                                                if (!err) {
                                                    idB = roo.insertId;
                                                    mycon.execute("UPDATE `sw_tree` SET `B`='" + idB + "' WHERE `swTreeId`=" + treeId, (errr, rooo, fiii) => {
                                                        if (!errr) {

                                                            let object = { "idMain": treeId, "A": idA, "B": idB, extra: param }
                                                            this.addPoint({ tid: treeId, obj: object, invoice: param.invoice }, res, next);


                                                        } else {
                                                            console.log(errr);
                                                        }
                                                    });
                                                } else {
                                                    console.log(err);
                                                }
                                            });
                                    } else {
                                        console.log(er);
                                    }
                                });
                        } else { console.log(e) }
                    });
            }
        });

    } catch (error) {
        console.log(error);
        //  res.status(500).send(error);
    }
}





exports.addPoint = (param, res, next) => {

    // console.log("11111111111111111111111111111111");
    console.log(param);
    // console.log("11111111111111111111111111111111");

    let invoiceID = param.invoice;

    try {



        function calPoint(nod) {
            let aPoint = 0;
            let bPoint = 0;

            mycon.execute("SELECT sw_point.userId,sw_point.commitionId,sw_point.Side,sum(sw_point.point) AS sum,sw_point.`status`,sw_point.treeid FROM sw_point WHERE sw_point.Side='A' AND sw_point.treeid='" + nod.swTreeId + "' AND sw_point.`status`='1'", (e, r, f) => {
                if (!e) {
                    aPoint = r[0].sum;
                    mycon.execute("SELECT sw_point.userId,sw_point.commitionId,sw_point.Side,sum(sw_point.point) AS sum,sw_point.`status`,sw_point.treeid FROM sw_point WHERE sw_point.Side='B' AND sw_point.treeid='" + nod.swTreeId + "' AND sw_point.`status`='1'", (e, r, f) => {
                        if (!e) {
                            bPoint = r[0].sum;
                            console.log("Node   -  " + nod.swTreeId + "   A Point- " + aPoint + "       B Point- " + bPoint);
                        }
                    });
                }
            });
        }


        function pointLoop(nodeId, myId) {
            mycon.execute("SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.swTreeId=" + nodeId, (e, r, f) => {
                if (!e) {
                    let nod = r[0];
                    if (nod) {
                        // console.log(nod);
                        if (nod.A && nod.A == myId) {
                            if (nod.commitionId && nod.commitionId > 0) {
                                // console.log('A point');
                                mycon.execute("INSERT INTO  `sw_point`(  `userId`, `commitionId`, `invoiceId`, `Side`, `point`, `status`, `treeid`) VALUES (  '" + nod.userId + "', '" + nod.commitionId + "', '" + invoiceID + "', 'A', 1, 1,'" + nod.swTreeId + "')", (ee, rr, ff) => {
                                    if (ee) {
                                        console.log(ee);
                                    }
                                })
                            } else {
                                // console.log("not active -------------------------" + nod.swTreeId)
                            }
                        }
                        if (nod.B && nod.B == myId) {
                            if (nod.commitionId && nod.commitionId > 0) {
                                // console.log('B point');
                                mycon.execute("INSERT INTO  `sw_point`(  `userId`, `commitionId`, `invoiceId`, `Side`, `point`, `status`, `treeid`) VALUES (  '" + nod.userId + "', '" + nod.commitionId + "', '" + invoiceID + "', 'B', 1, 1,'" + nod.swTreeId + "')", (ee, rr, ff) => {
                                    if (ee) {
                                        console.log(ee);
                                    }
                                })

                            } else {
                                //  console.log("not active -------------------------" + nod.swTreeId)
                            }

                        }
                        // calPoint(nod);
                        pointLoop(nod.parentId, nod.swTreeId);
                    }
                }
            });
        }


        mycon.execute("SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.swTreeId=  " + param.tid,
            (e, r, f) => {
                if (!e) {
                    // console.log(r[0]);
                    pointLoop(r[0].parentId, param.tid);
                }
            }
        )


        res.send(param.obj);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}




exports.canAdd = (req, res, next) => {
    try {
        var param = req.body;
        console.log('---------');
        console.log(param);
        console.log('---------');
        mycon.execute("SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId FROM sw_tree WHERE sw_tree.swTreeId=" + req.body.treeId,
            (er, ro, ne) => {
                let ob = {
                    sidA: true,
                    sidB: true,
                    userId: 0,
                    treeId: 0,

                }
                if (!er) {
                    console.log('Data');
                    let r = ro[0];
                    if (r) {
                        ob.userId = r.userId;
                        ob.treeId = r.swTreeId;

                        if (r) {
                            console.log('Data1');
                            if (r.A && r.A > 0) {

                                ob.sidA = false;
                            } else {

                            }
                            if (r.B && r.B > 0) {

                                ob.sidB = false;
                            } else {

                            }
                            res.send(ob);
                        } else {
                            ob.sidA = false;
                            ob.sidB = false;
                            res.send(ob);
                        }
                    } else {
                        ob.sidA = false;
                        ob.sidB = false;
                        res.send(ob);
                    }
                } else {
                    console.log(er);
                    ob.sidA = false;
                    ob.sidB = false;
                    res.send(ob);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getCurrent = (req, res, next) => {
    try {

        mycon.execute("SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.userId= " + req.body.uid, (e, r, f) => {
            if (!e) {
                res.send(r);
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getCurrentPoint = (req, res, next) => {
    try {
        let side = req.body.side;
        let tid = req.body.tid;
        let status = req.body.status;
        mycon.execute("SELECT sw_point.Side,Sum(sw_point.point) as point FROM sw_point WHERE sw_point.treeid='" + tid + "' AND sw_point.`status`='" + status + "' AND sw_point.Side='" + side + "' ", (e, r, f) => {
            if (!e) {
                res.send(r[0]);
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}




