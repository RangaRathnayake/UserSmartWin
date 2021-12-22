const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');
const { param } = require('../../routers');
const { getPrivilagesByUserType } = require('./privilege');


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


exports.rss = (str) => {
    if (str) {
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
    } else { return 'NULL' }
}



// getAllUsers 
exports.getAllUsers = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser,userkey.`key`,uservalue.`value` FROM `user` INNER JOIN uservalue ON uservalue.userId=`user`.idUser INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey ORDER BY `user`.idUser ASC,userkey.keyOder ASC",
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


exports.getUserType = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.utypeId FROM `user` WHERE `user`.idUser=" + req.body.uid,
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


exports.saveoncus = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO `on_cus` ( `user_ful_name`, `mobile`, `adress`, `postalcode`, `email`, `active_status` ) VALUES ( '" + req.body.user_ful_name + "', '" + req.body.mobile + "', '" + req.body.adress + "', '" + req.body.postalcode + "', '" + req.body.email + "', '1' );",
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

exports.getuidbymob = (req, res, next) => {
    try {
        mycon.execute("SELECT on_cus.on_cus_id FROM `on_cus` WHERE on_cus.mobile = '" + req.body.mob + "'",
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

// userLogin
exports.userLogin = (req, res, next) => {
    try {
        var q = "SELECT `user`.idUser,`user`.email,`user`.pword,`user`.mobileno,`user`.authcode,`user`.`status`,`user`.dateTime,`user`.utypeId FROM `user` WHERE `user`.idUser='" + req.body.email + "'";
        mycon.execute(q,
            (e, r, f) => {
                if (!e) {
                    var user = r[0];
                    console.log(user);
                    bcript.compare(req.body.pword, user.pword, (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(401).json({ message: 'user name or password is wrong' });
                        } else {
                            if (result) {

                                const token = jwt.sign({
                                        uid: user.idUser,
                                        email: user.email,
                                        mobile: user.mobileno,
                                        uType: user.utypeId
                                    },
                                    process.env.JWT_KEY, {
                                        expiresIn: "1h"
                                    },
                                );
                                return res.status(200).json({
                                    mg: "Auth Successfull",
                                    token: token
                                });
                            } else {
                                return res.status(401).json({ message: 'user name or password is wrong' });
                            }
                        }
                    });
                } else {
                    console.log(e);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



// userSignup(email,pword, mobile)
exports.signUp = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        var val = Math.floor(1000 + Math.random() * 9000);
        var q = "SELECT `user`.idUser FROM `user` WHERE `user`.email='" + req.body.email + "'";
        mycon.execute(q, (e, r, f) => {
            if (!e) {
                if (r.length > 0) {
                    return res.status(401).json({ message: 'This Email Address Alrady Exsist Please Login Or Register With Other Email' });
                } else {
                    bcript.hash(req.body.pword, 10, (err, hash) => {
                        if (err) {
                            return status(500).json({ error: err });
                        } else {
                            console.log(hash);
                            var qq = "INSERT INTO  `user`(  `email`, `pword`, `mobileno`, `authcode`, `status`, `dateTime`, `utypeId`)" +
                                " VALUES ( '" + req.body.email + "', '" + hash + "', '" + req.body.mobile + "', '" + val + "', '0', '" + day + "', 5)";
                            mycon.execute(qq, (ee, rr, ff) => {
                                if (!ee) {
                                    res.send({ uid: rr.insertId, email: req.body.email });
                                } else {
                                    console.log(ee);
                                    return status(500).json({ error: ee });
                                }
                            });
                        }
                    });
                }
            } else {
                console.log(e);
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.getUserKeys = (req, res, next) => {
    try {
        mycon.execute("SELECT userkey.idUserKey,userkey.`key`,userkey.keyStatus,userkey.keyOder,userkey.formId,userkey.val,userkey.type FROM userkey WHERE userkey.keyStatus=1 ORDER BY userkey.keyOder ASC",
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

exports.saveNewUser = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        console.log("00000000000");
        let values = req.body.values;

        mycon.execute("INSERT INTO `user` (  `status`, `dateTime`, `utypeId` ) VALUES (0, '" + day + "', 5 )",
            (error, rows, fildData) => {
                if (!error) {
                    let uid = rows.insertId;

                    values.forEach(e => {
                        let q = "INSERT INTO  `uservalue`(  `userId`, `keyId`, `value`, `valueStatus`) VALUES (  " + uid + ", " + e.idUserKey + ", '" + e.val + "', 1)";
                        mycon.execute(q, (er, ro, fi) => {
                            if (!er) {
                                //  console.log(ro);
                            } else {
                                console.log(er)
                            }
                        });
                    });
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

//(uid)
exports.searchUserById = (req, res, next) => {
    try {
        mycon.execute("SELECT userkey.`key`,uservalue.`value`,uservalue.idUserValue,uservalue.userId,uservalue.keyId,uservalue.valueStatus,userkey.keyOder,userkey.formId,userkey.type FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId= '" + req.body.uid + "' ORDER BY userkey.keyOder ASC",
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

exports.sendLoginInformation = (uid) => {
    try {

        let link = "www.smartwin.lk/#/createpass"
        let mobile = '';
        let email = '';
        let name = '';
        let textMg = '';

        mycon.execute("SELECT userkey.`key`,uservalue.`value`,uservalue.idUserValue,uservalue.userId,uservalue.keyId,uservalue.valueStatus,userkey.keyOder,userkey.formId,userkey.type FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId= '" + uid + "' ORDER BY userkey.keyOder ASC", (e, r, f) => {
            if (!e) {
                r.forEach(el => {
                    if (el.keyId === 9) {
                        mobile = el.value;
                    }
                    if (el.keyId === 22) {
                        email = el.value;
                    }
                    if (el.keyId === 2) {
                        name = el.value;
                    }
                });

                var val = Math.floor(100000 + Math.random() * 900000);
                mycon.execute("UPDATE `user` SET `authcode`='" + val + "' WHERE `idUser`=" + uid, (er, ro, fi) => {
                    if (!er) {
                        console.log(ro);
                    }
                });

                console.log(mobile + ' -- ' + email + ' -- ' + name);

                textMg += "Welcome to Smart Win Entrepreneur !" +
                    "  Dear " + name + " your  SW No: " + uid + " and your verification number : " + val + " Please visit sw.smartwinent.com and join smart win Telegram group https://t.me/+Hqgv96cvxxo0N2U1 T and C Apply. Far inquiry call Tel. 037 22 34 777 WhatsApp 07 55 44 33 99" +
                    "";


                mg.emailSend({
                    to: email,
                    subject: 'Smart Win Entrepreneur',
                    message: textMg
                });



                mg.smsSend({ mob: mobile, message: textMg });
                console.log(textMg);
                //  res.send({ ok: textMg });
            }
        });
    } catch (error) {
        console.log(error);
        //  res.status(500).send(error);
    }
}

exports.createPassword = (req, res, next) => {
    let b = req.body;
    // console.log(b);
    try {
        mycon.execute("SELECT `user`.email,`user`.pword,`user`.mobileno,`user`.authcode,`user`.idUser,`user`.`status`,`user`.dateTime,`user`.utypeId FROM `user` WHERE `user`.idUser=" + b.uid, (e, r, f) => {
            if (!e) {
                if (r[0] && r[0].authcode == b.code) {


                    // mycon.execute("SELECT uservalue.`value` FROM uservalue WHERE uservalue.userId='" + b.uid + "' AND uservalue.keyId=21", (eee, rrr, fff) => {
                    //     if (!eee) {
                    // console.log(rrr);
                    // if (rrr[0].value == b.code) {
                    bcript.hash(req.body.pword, 10, (err, hash) => {
                        if (err) {
                            return status(500).json({ error: err });
                        } else {
                            console.log(hash);
                            mycon.execute("UPDATE  `user` SET  `pword` = '" + hash + "',  `status` = 1, `utypeId` = 3 WHERE	`idUser` = " + b.uid, (ee, rr, ff) => {
                                if (!ee) {
                                    res.send({ mg: "password created" });
                                }
                            });
                        }
                    });
                    // } else {
                    //     res.send({ mg: "NIC Is Wrong" });
                    // }
                    // } else {
                    //     res.send({ mg: "No NIC" });
                    // }
                    // });


                } else {
                    res.send({ mg: "Verification Code is Wrong" });
                }
            } else {
                console.log(e);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getTreeId = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.userId='" + req.body.uid + "' ORDER BY sw_tree.swTreeId ASC LIMIT 1", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getUsersList = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser,uservalue.`value`,DATE(`user`.dateTime) AS DAY FROM `user` INNER JOIN uservalue ON uservalue.userId=`user`.idUser INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.keyId=2 ORDER BY `user`.idUser ASC", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getUsersListBYNic = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser, uservalue.`value` FROM `user` INNER JOIN uservalue ON uservalue.userId = `user`.idUser INNER JOIN userkey ON uservalue.keyId = userkey.idUserKey WHERE uservalue.keyId = 21 AND uservalue.`value` LIKE '" + req.body.nic + "%' ORDER BY `user`.idUser ASC", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.update = (req, res, next) => {
    try {
        req.body.udata.forEach(ee => {
            console.log(ee);
            this.updateUserValues(ee);
        });


        res.send({ "ok": "updated" });

        setTimeout(() => {
            this.sendLoginInformation(req.body.udata[0].userId);
        }, 2000);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.updateUserValues = (parm) => {

    let q = "UPDATE `uservalue` SET `value`='" + this.realEscapeString(parm.value) + "' WHERE `idUserValue`= " + parm.idUserValue;

    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            return;
        } else {
            console.log(er)
            return;
        }
    });
}


exports.getUserData = (parm) => {
    let q = "SELECT uservalue.keyId,uservalue.`value`,userkey.`key` FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId='" + parm.id + "' ORDER BY userkey.keyOder ASC";
    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            return;
        } else {
            console.log(er)
            return;
        }
    });
}

exports.getUserDataByPin = (req, res, next) => {
    let q = "SELECT sw_tree.userId,userkey.idUserKey,userkey.`key`,userkey.keyStatus,userkey.keyOder,userkey.formId,userkey.type,uservalue.`value` FROM sw_tree INNER JOIN uservalue ON uservalue.userId=sw_tree.userId INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE sw_tree.swTreeId=" + req.body.tid;
    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            res.send(ro);
        } else {
            console.log(er)
            return;
        }
    });
}

exports.getPinsById = (req, res, next) => {
    let q = "SELECT sw_tree.swTreeId as `key`, sw_tree.swTreeId as `value` FROM sw_tree WHERE sw_tree.userId=" + req.body.uid;
    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            res.send(ro);
        } else {
            console.log(er)
            return;
        }
    });
}

exports.singalMessage = (req, res, next) => {

    mg.smsSend(req.body);

    res.send({ "sms": "ok" });
}


exports.getValue = (req, res, next) => {
    try {
        mycon.execute("SELECT keyval.id,keyval.`key`,keyval.`value` FROM keyval WHERE keyval.`key`='" + req.body.key + "'",
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


exports.sendBulkSms = (req, res, next) => {
    try {
        mycon.execute("SELECT uservalue.userId,uservalue.`value`,userkey.`key` FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.keyId=9 AND uservalue.`value` IS NOT NULL",
            (error, rows, fildData) => {
                if (!error) {

                    let arr = [];

                    rows.forEach(element => {
                        let mobile = element.value;
                        if (mobile.length == 10) {
                            arr.push(mobile);
                        }
                    });

                    function go() {
                        var to = arr.pop();
                        console.log(to);

                        var mgg = "Sinhala Hindu aluth aurudu udawen pasu ayathanaye weda aramba kirima saha ganu denu kirima 2021-04-18 dina udesana 8.30 ta karyalayedi pewethwe. a sandaha sahabagiwana lesa obata aradana..  From Smart Win Entrepreneur (pvt) Ltd"

                        let param = { message: mgg, mob: to }

                        mg.smsSend(param);

                        setTimeout(() => { go(); }, 2000);
                    }


                    setTimeout(() => {
                        go();
                        console.log(arr);
                        res.send(arr);
                    }, 500);

                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}








exports.bankCodeBranchCode = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser FROM `user`",
            (error, rows, fildData) => {
                if (!error) {
                    let l = rows.length;

                    res.send(rows);
                    let x = 0;

                    function getvalues() {
                        let uid = rows[x].idUser;

                        mycon.execute("SELECT uservalue.`value` FROM uservalue WHERE uservalue.userId='" + uid + "' AND uservalue.keyId=23", (e, r, f) => {
                            if (!e) {
                                if (r[0]) {
                                    console.log(r[0].value);
                                } else {
                                    //  console.log(r[0].value);


                                    mycon.execute("INSERT INTO `uservalue`( `userId`, `keyId`, `value`, `valueStatus`) VALUES ( '" + uid + "', '23', '', 1)", (ee, rr, ff) => {
                                        if (ee) { console.log(ee) }
                                    })
                                    mycon.execute("INSERT INTO `uservalue`( `userId`, `keyId`, `value`, `valueStatus`) VALUES ( '" + uid + "', '24', '', 1)", (eee, rrr, fff) => {
                                        if (eee) { console.log(eee) }
                                    })


                                }
                            }
                        })

                        x = x + 1;
                        setTimeout(() => {
                            if (x <= l) {
                                getvalues();
                            }
                        }, 30);
                    }

                    getvalues();
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.findByNic = (req, res, next) => {
    try {
        mycon.execute("SELECT uservalue.idUserValue,uservalue.userId,uservalue.keyId,uservalue.`value`,uservalue.valueStatus FROM uservalue WHERE uservalue.keyId=21 AND uservalue.`value`='" + req.body.nic + "'", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.formOne = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd");
        var dd = dateFormat(new Date(), "yymmdd");
        mycon.execute("INSERT INTO `refaral` (`ref`,`iSWno`,`namewith`,`nic`,`address`,`mobile`,`payType`,`status`,`userId`,`day`,`product`,`price`) VALUES (''," + req.body.iSWno + ",'" + this.realEscapeString(req.body.name) + "','" + req.body.nic + "','" + this.realEscapeString(req.body.address) + "','" + req.body.mobile + "','" + req.body.type + "',0," + req.body.userId + ",'" + day + "','" + req.body.product + "','" + req.body.price + "')", (er, ro, fi) => {
            if (!er) {
                console.log(ro.insertId);
                var ref = dd + "" + ro.insertId;
                mycon.execute("UPDATE `refaral` SET `ref`='" + ref + "' WHERE `id`=" + ro.insertId, (e, r, n) => {
                    if (!e) {
                        var textMg = "Your System Ref Code is : SR " + ref + " Product Cord SWE-" + req.body.product + " PV- 01 Pay LKR. " + req.body.price + " Sampath Bank Kurunegala Super Branch Smart Win Enterpreneur (Privet) Limited current Acc. No. 000610016871 T and C Apply. Far inquiry call 0372234777'";
                        mg.smsSend({ mob: req.body.mobile, message: textMg });
                        res.send({ SR: ref, id: ro.insertId });

                    } else { res.send(e) }
                });
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getMyref = (req, res, next) => {
    try {
        mycon.execute("SELECT refaral.id,refaral.ref,refaral.iSWno,refaral.namewith,refaral.nic,refaral.address,refaral.mobile,refaral.payType,refaral.`status`,refaral.userId,refaral.`day`,refaral.product,refaral.price FROM refaral WHERE refaral.userId=" + req.body.uid + " AND refaral.`status`=" + req.body.status + " AND refaral.payType = '" + req.body.type + "'  ORDER BY refaral.id DESC", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getOneRef = (req, res, next) => {
    try {
        mycon.execute("SELECT refaral.id,refaral.ref,refaral.iSWno,refaral.namewith,refaral.nic,refaral.address,refaral.mobile,refaral.payType,refaral.`status`,refaral.userId,refaral.`day`,refaral.product,refaral.price FROM refaral WHERE refaral.id=" + req.body.id, (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getAllBank = (req, res, next) => {
    try {
        mycon.execute("SELECT bank.`code`,bank.`name` FROM bank", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getBranch = (req, res, next) => {
    try {
        mycon.execute("SELECT branch.b_co,branch.br_code,branch.br_name FROM branch WHERE branch.b_co='" + req.body.bcode + "'", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.addCoreLeader = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO  `leader_main`(  `main`, `name`) VALUES (  '" + req.body.muid + "', '" + req.body.name + "')", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getCoreLeaders = (req, res, next) => {
    try {
        mycon.execute("SELECT leader_main.id,leader_main.main,leader_main.`name` FROM leader_main", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.addKeyLeader = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO `leader_key`(  `mid`, `key`, `name`) VALUES (  " + req.body.mid + ", " + req.body.kuid + ", '" + req.body.kname + "')", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getKeyLeaders = (req, res, next) => {
    try {
        mycon.execute("SELECT leader_key.id,leader_key.mid,leader_key.`key`,leader_key.`name` FROM leader_key WHERE leader_key.mid=" + req.body.mid, (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.updateRefData = (req, res, next) => {
    try {
        mycon.execute("UPDATE `refaral` SET `status`=" + req.body.status + ",`aPin`=" + req.body.aPin + ",`aPinUid`=" + req.body.aPinUid + ",`side`='" + req.body.side + "',`otherint1`='" + req.body.otherint1 + "',`otherint2`='" + req.body.otherint2 + "',`otherstring1`='" + req.body.otherstring1 + "',`otherstring2`='" + req.body.otherstring2 + "' WHERE `id`=" + req.body.ref, (er, ro, fi) => {
            if (!er) {
                req.body.vlaues.forEach(element => {
                    mycon.execute("INSERT INTO  `temp_data`(  `refaral`, `key`, `value`, `status`) VALUES (  " + req.body.ref + ", '" + element.idUserKey + "', '" + this.rss(element.val) + "', 1)", (e, r, f) => {
                        if (e) {
                            console.log(e);
                        }
                    })
                });
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.allBankRef = (req, res, next) => {
    try {
        mycon.execute("SELECT refaral.id,refaral.ref,refaral.iSWno,refaral.namewith,refaral.nic,refaral.address,refaral.mobile,refaral.payType,refaral.`status`,refaral.userId,refaral.`day`,refaral.product,refaral.price,refaral.imagePath,refaral.bankRef,refaral.aPin,refaral.aPinUid,refaral.side,refaral.otherint1,refaral.otherint2,refaral.otherstring1,refaral.otherstring2 FROM refaral WHERE refaral.`status`=" + req.body.status + " AND refaral.payType='b' ORDER BY refaral.id ASC", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.rejectBankPros = (req, res, next) => {
    try {
        mycon.execute("UPDATE `refaral` SET `status`=3 WHERE `id`=" + req.body.ref, (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.completeBankPros = (req, res, next) => {
    try {
        mycon.execute("UPDATE `refaral` SET `status`=2 WHERE `id`=" + req.body.ref, (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getBankRefarance = (req, res, next) => {
    try {
        mycon.execute("SELECT refaral.id,refaral.ref,refaral.iSWno,refaral.namewith,refaral.nic,refaral.address,refaral.mobile,refaral.payType,refaral.`status`,refaral.userId,refaral.`day`,refaral.product,refaral.price,refaral.imagePath,refaral.bankRef,refaral.aPin,refaral.aPinUid,refaral.side,refaral.otherint1,refaral.otherint2,refaral.otherstring1,refaral.otherstring2 FROM refaral WHERE refaral.id=" + req.body.ref, (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getTempData = (req, res, next) => {
    try {
        mycon.execute("SELECT temp_data.id,temp_data.refaral,temp_data.`key` as idUserKey,temp_data.`value` as val,temp_data.`status` FROM temp_data WHERE temp_data.refaral=" + req.body.ref + "", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}










// forgetPassword

// verify

// etc...