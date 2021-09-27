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
                    "  Dear " + name + " your  SW No: " + uid + " and your verification number : " + val + "" +
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
                    res.send({ mg: "Vreification Code is Wrong" });
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
        mycon.execute("SELECT `user`.idUser,uservalue.`value` FROM `user` INNER JOIN uservalue ON uservalue.userId=`user`.idUser INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.keyId=2 ORDER BY `user`.idUser ASC", (er, ro, fi) => {
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










// forgetPassword

// verify

// etc...