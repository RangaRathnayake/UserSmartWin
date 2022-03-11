const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');

exports.realEscapeString = (str) => {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case '\0':
        return '\\0';
      case '\x08':
        return '\\b';
      case '\x09':
        return '\\t';
      case '\x1a':
        return '\\z';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '"':
      case "'":
      case '\\':
      case '%':
        return '\\' + char; // prepends a backslash to backslash, percent,
      // and double/single quotes
    }
  });
};

//getProduct
exports.getAllProduct = (req, res, next) => {
  try {
    mycon.execute(
      "SELECT sw_prod.idProd,sw_prod.prodName,sw_prod.prodImage,sw_prod.prodPrice,sw_prod.prodPoint,sw_prod.prodOther,sw_prod.prodStatus,sw_prod.description FROM sw_prod WHERE sw_prod.prodStatus<>'2'",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.update = (req, res, next) => {
  try {
    mycon.execute(
      "UPDATE `sw_prod` SET `prodName`='" +
        req.body.pname +
        "',`prodPrice`=" +
        req.body.pprice +
        ",`description`='" +
        req.body.pdescription +
        "' WHERE `idProd`=" +
        req.body.pid +
        '',
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getprobyid = (req, res, next) => {
  try {
    mycon.execute(
      "SELECT sw_prod.idProd, sw_prod.prodName, sw_prod.prodImage, sw_prod.prodPrice, sw_prod.prodPoint, sw_prod.prodOther, sw_prod.prodStatus FROM sw_prod WHERE sw_prod.idProd = '" +
        req.body.prodid +
        "'",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getAllProduct_in_online = (req, res, next) => {
  try {
    mycon.execute('', (error, rows, fildData) => {
      if (!error) {
        res.send(rows);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//getProduct by id
exports.getproductbyid = (req, res, next) => {
  try {
    mycon.execute(
      "SELECT sw_prod.idProd, sw_prod.prodName, sw_prod.prodImage, sw_prod.prodPrice, sw_prod.prodPoint, sw_prod.prodOther, sw_prod.prodStatus, sw_prod.description FROM sw_prod WHERE sw_prod.idProd = '" +
        req.body.prodid +
        "'",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//moreimgbyproid
exports.moreimgbyproid = (req, res, next) => {
  try {
    mycon.execute(
      "SELECT images.url1 FROM `images` WHERE images.pro_id = '" +
        req.body.prodid +
        "' AND images.`status` = '1'",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getProductByPin = (req, res, next) => {
  try {
    mycon.execute(
      "SELECT sw_tree.swTreeId,sw_invoice.idInvoice,sw_invoice.productId,sw_prod.idProd,sw_prod.prodName,sw_prod.prodImage,sw_prod.prodPrice,sw_prod.prodPoint,sw_prod.prodOther,sw_prod.prodStatus, sw_tree.other2, sw_tree.other1 FROM sw_tree INNER JOIN sw_invoice ON sw_invoice.pin=sw_tree.swTreeId INNER JOIN sw_prod ON sw_prod.idProd=sw_invoice.productId WHERE sw_tree.swTreeId='" +
        req.body.tid +
        "' LIMIT 1",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.setProductIssuStatus = (req, res, next) => {
  try {
    mycon.execute(
      "UPDATE `sw_tree` SET `other2`='" +
        req.body.status +
        "' WHERE `swTreeId`=" +
        req.body.tid,
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getMassagesForSend = (req, res, next) => {
  try {
    mycon.execute(
      'SELECT system_massage.id,system_massage.message_sinhala,system_massage.message_english,system_massage.`status`,system_massage.status_text FROM system_massage',
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.firstMessageBulk = (req, res, next) => {
  console.log('Start');
  try {
    let query =
      'SELECT sw_tree.swTreeId,sw_tree.userId,sw_tree.other2,sw_invoice.pin,sw_invoice.productId FROM sw_tree INNER JOIN sw_invoice ON sw_invoice.pin=sw_tree.swTreeId WHERE sw_tree.other2=0 AND sw_tree.`status`=1 AND sw_tree.userId> 637 ORDER BY sw_tree.userId ASC';
    mycon.execute(query, (e, r, f) => {
      if (!e) {
        this.bulsSendingMethod(JSON.stringify(r));
        res.send({ ok: 'ok' });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.getcount = (req, res, next) => {
//     console.log("Start")
//     try {
//         let query =
//             "SELECT IFNULL(COUNT(sw_prod.prodImage), 0) AS count FROM `sw_prod` WHERE sw_prod.idProd = '"+req.body.prodid+"'";
//         mycon.execute(query, (e, r, f) => {
//             if (!e) {
//                 this.bulsSendingMethod(JSON.stringify(r));
//                 res.send({ ok: "ok" });
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

exports.getcount = (req, res, next) => {
  try {
    mycon.execute(
      "SELECT IFNULL(COUNT(sw_prod.prodImage), 0) AS count FROM `sw_prod` WHERE sw_prod.idProd = '" +
        req.body.prodid +
        "'",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.bulsSendingMethod = (data) => {
  let list = JSON.parse(data);
  let lenth = list.length;
  let x = 0;

  let userid;

  function recall() {
    x++;
    let row = list[x];

    var day = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss');

    let msg =
      'Oba wisin aththikaram mudal gewa anawum kala bandaye ithiri mudal gewa nidahaskaraganna dinayak danumdenna. From : Smart Win Entrepreneur (Pvt) Ltd 0372234777';

    mycon.execute(
      'INSERT INTO `sw_prod_issuing` (`user_id`,`tid_id`,`prod_id`,`date`,`comment`,`status`,`status_text`) ' +
        " VALUES ('" +
        row.userId +
        "','" +
        row.swTreeId +
        "','" +
        row.productId +
        "','" +
        day +
        "','" +
        msg +
        "','1','first')",
      (error, rows, fildData) => {
        if (userid != row.userId) {
          mycon.execute(
            "SELECT uservalue.`value`,userkey.`key` FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId= '" +
              row.userId +
              "' AND (uservalue.keyId=22 OR uservalue.keyId=9) ORDER BY userkey.keyOder ASC",
            (e, r, f) => {
              if (!e) {
                console.log(r[0].value + '   ' + r[1].value);
                // mg.emailSend({
                //     to: r[1].value,
                //     subject: "Smart Win Entrepreneur",
                //     message: msg,
                // });
                mg.smsSend({ mob: r[0].value, message: msg });
              } else {
                console.log(e);
              }
            }
          );
          userid = row.userId;
          console.log(lenth + '   ' + x + '     ' + userid);
        }
      }
    );

    console.log();

    if (x < lenth) {
      setTimeout(() => {
        recall();
      }, 2000);
    }
  }

  recall();
};

exports.sendMassage = (req, res, next) => {
  try {
    var day = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss');
    // mycon.execute(
    //     "INSERT INTO `sw_prod_issuing` (`user_id`,`tid_id`,`prod_id`,`date`,`comment`,`status`,`status_text`) " +
    //     " VALUES ('" +
    //     req.body.uid +
    //     "','" +
    //     req.body.tid +
    //     "','" +
    //     req.body.prodid +
    //     "','" +
    //     day +
    //     "','" +
    //     req.body.msg +
    //     "','" +
    //     req.body.status +
    //     "','" +
    //     req.body.sttext +
    //     "')",
    //     (error, rows, fildData) => {
    //         if (!error) {
    //             res.send(rows);

    // if (userid != req.body.uid) {

    mycon.execute(
      "SELECT uservalue.`value`,userkey.`key` FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId= '" +
        req.body.uid +
        "' AND (uservalue.keyId=22 OR uservalue.keyId=9) ORDER BY userkey.keyOder ASC",
      (e, r, f) => {
        if (!e) {
          userid = req.body.uid;

          mg.emailSend({
            to: r[1].value,
            subject: 'Smart Win Entrepreneur',
            message: req.body.msg,
          });

          mg.smsSend({ mob: r[0].value, message: req.body.msg });

          mycon.execute(
            'INSERT INTO `sms_histry`( `uid`, `pin`, `date`, `sms`, `status`) VALUES ( ' +
              userid +
              ', ' +
              req.body.tid +
              ", '" +
              day +
              "', '" +
              this.realEscapeString(req.body.msg) +
              "', 1)",
            (ee, rr, ff) => {
              if (!ee) {
                res.send(rr);
              }
            }
          );
        } else {
          console.log(e);
        }
      }
    );
    // }
    //     } else {
    //         console.log(error);
    //     }
    // }
    //     );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getSMShistry = (req, res, next) => {
  try {
    mycon.execute(
      'SELECT sms_histry.id,sms_histry.uid,sms_histry.pin,sms_histry.date,sms_histry.sms,sms_histry.`status` FROM sms_histry WHERE  sms_histry.pin=' +
        req.body.tid,
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getAllSent = (req, res, next) => {
  try {
    mycon.execute(
      'SELECT sw_prod_issuing.idProd,sw_prod_issuing.user_id,sw_prod_issuing.tid_id,sw_prod_issuing.prod_id,sw_prod_issuing.date,sw_prod_issuing.`comment`,sw_prod_issuing.`status`,sw_prod_issuing.status_text FROM sw_prod_issuing WHERE sw_prod_issuing.tid_id=' +
        req.body.tid,
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getAllNotificationsByUserID = (req, res, next) => {
  try {
    mycon.execute(
      "SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.userId='" +
        req.body.uid +
        "' AND sw_tree.`status`=1",
      (error, rows, fildData) => {
        if (!error) {
          rows.forEach((row) => {
            row.A = null;
            row.B = null;
            mycon.execute(
              'SELECT sw_prod_issuing.idProd,sw_prod_issuing.user_id,sw_prod_issuing.tid_id,sw_prod_issuing.prod_id,sw_prod_issuing.date,sw_prod_issuing.`comment`,sw_prod_issuing.`status`,sw_prod_issuing.status_text FROM sw_prod_issuing WHERE sw_prod_issuing.tid_id=' +
                row.swTreeId,
              (error, rrs, fildData) => {
                if (!error) {
                  row.layar = rrs;
                } else {
                  console.log(error);
                }
              }
            );
          });
          setTimeout(() => {
            res.send(rows);
          }, 500);
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.sendMassagePending = (req, res, next) => {
  try {
    mycon.execute(
      'INSERT INTO `sw_prod_issuing` (`user_id`,`tid_id`,`prod_id`,`date`,`comment`,`status`,`status_text`) ' +
        " VALUES ('" +
        req.body.uid +
        "','" +
        req.body.tid +
        "','" +
        req.body.prodid +
        "','" +
        req.body.date +
        "','" +
        req.body.msg +
        "','" +
        req.body.status +
        "','" +
        req.body.sttext +
        "')",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
          if (req.body.status == 2) {
            this.unBlockUser(req, res, next, { uid: req.body.uid });
          } else {
            this.blockUser(req, res, next, { uid: req.body.uid });
          }
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.changeProductOnInvoice = (req, res, next) => {
  try {
    mycon.execute(
      "UPDATE `sw_invoice` SET `productId`='" +
        req.body.pid +
        "',`comment`='" +
        req.body.comment +
        "' WHERE `pin`= '" +
        req.body.tid +
        "'",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.unBlockUser = (req, res, next, data) => {
  try {
    mycon.execute(
      "SELECT sw_tree.swTreeId,sw_tree.userId,sw_tree.`status`,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.userId='" +
        data.uid +
        "' AND sw_tree.other2<> 1",
      (error, rows, fildData) => {
        if (!error) {
          if (rows.length == 0) {
            if (req.body.uid != 1) {
              mycon.execute(
                'UPDATE `user` SET `utypeId`=3 WHERE `idUser`=' + data.uid,
                (error, rows, fildData) => {
                  if (!error) {
                    console.log(rows);
                  } else {
                    console.log(error);
                  }
                }
              );
            }
          } else {
            let length = rows.length;
            let x = 0;

            let canUnblock = false;

            function recall() {
              console.log(x);
              let tid = rows[x].swTreeId;
              //  console.log(tid);
              mycon.execute(
                "SELECT sw_prod_issuing.idProd,sw_prod_issuing.user_id,sw_prod_issuing.tid_id,sw_prod_issuing.prod_id,sw_prod_issuing.date,sw_prod_issuing.`comment`,sw_prod_issuing.`status`,sw_prod_issuing.status_text FROM sw_prod_issuing WHERE sw_prod_issuing.tid_id='" +
                  tid +
                  "' ORDER BY sw_prod_issuing.idProd DESC LIMIT 1",
                (er, ro, fi) => {
                  if (!er) {
                    //  console.log(ro[0].status);
                    if (ro[0]) {
                      if (ro[0].status == 2) {
                        day = new Date();
                        console.log(day + '                  ' + ro[0].date);
                        if (new Date() < ro[0].date) {
                          console.log('OK');
                          canUnblock = true;
                        } else {
                          console.log('Block Again and send message');
                        }
                      } else {
                        canUnblock = false;
                      }
                    }
                  }
                }
              );
              x++;
              if (x < length) {
                setTimeout(() => {
                  recall();
                }, 20);
              } else {
                console.log('finish ---------------- ');
                if (canUnblock) {
                  mycon.execute(
                    'UPDATE `user` SET `utypeId`=3 WHERE `idUser`=' + data.uid,
                    (error, rows, fildData) => {
                      if (!error) {
                        console.log(rows);
                      } else {
                        console.log(error);
                      }
                    }
                  );
                }
              }
            }
            recall();
          }
          // res.send(rows);
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    // res.status(500).send(error);
  }
};

exports.block = (req, res, next) => {
  try {
    mycon.execute(
      'SELECT sw_tree.swTreeId,sw_tree.userId,sw_tree.`status`,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.other2<> 1 AND sw_tree.`status`=1',
      (er, ro, fe) => {
        if (!er) {
          res.send(ro);
          var le = ro.length;
          var x = 0;

          function recall() {
            console.log(x);
            mycon.execute(
              'UPDATE `user` SET `utypeId`=5 WHERE `idUser`=' + ro[x].userId,
              (error, rows, fildData) => {
                if (!error) {
                } else {
                  console.log(error);
                }
              }
            );
            setTimeout(() => {
              x++;
              if (x < le) {
                recall();
              }
            }, 20);
          }

          recall();
        }
      }
    );
  } catch (error) {}
};

exports.blockUser = (req, res, next, data) => {
  try {
    mycon.execute(
      "SELECT sw_tree.swTreeId,sw_tree.userId,sw_tree.`status`,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.userId='" +
        data.uid +
        "' AND sw_tree.other2<> 1",
      (error, rows, fildData) => {
        if (!error) {
          let isBlocked = false;
          rows.forEach((ro) => {
            console.log(ro.swTreeId);
            mycon.execute(
              "SELECT sw_prod_issuing.idProd,sw_prod_issuing.user_id,sw_prod_issuing.tid_id,sw_prod_issuing.prod_id,sw_prod_issuing.date,sw_prod_issuing.`comment`,sw_prod_issuing.`status`,sw_prod_issuing.status_text FROM sw_prod_issuing WHERE sw_prod_issuing.tid_id='" +
                ro.swTreeId +
                "' ORDER BY sw_prod_issuing.idProd DESC LIMIT 1",
              (e, r, f) => {
                if (!e) {
                  console.log(r[0].status);
                  if (
                    r[0].status == 1 ||
                    r[0].status == 3 ||
                    r[0].status == 5
                  ) {
                    if (!isBlocked) {
                      this.blockKnow(req, res, next, { uid: data.uid });
                      mycon.execute(
                        'UPDATE `user` SET `utypeId`=5 WHERE `idUser`=' +
                          data.uid,
                        (error, rows, fildData) => {
                          if (!error) {
                          } else {
                            console.log(error);
                          }
                        }
                      );
                    } else {
                    }
                  }
                }
              }
            );
          });
          // res.send(rows);
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// ==========================================================================

exports.addProduct = (req, res, next) => {
  try {
    mycon.execute(
      "INSERT INTO  `sw_prod`(  `prodName`,  `prodPrice`, `prodPoint`, `prodOther`, `prodStatus`, `description`, `link`, `cat`) VALUES (  '" +
        this.realEscapeString(req.body.pname) +
        "',  " +
        req.body.pprice +
        ", 1, NULL, 1, '" +
        this.realEscapeString(req.body.pdescription) +
        "', '" +
        req.body.plink +
        "', '" +
        req.body.pcat +
        "')",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateProduct = (req, res, next) => {
  try {
    mycon.execute(
      "UPDATE  `sw_prod` SET `prodName`='" +
        this.realEscapeString(req.body.pname) +
        "', `prodPrice`=" +
        req.body.pprice +
        ", `prodOther`=NULL, `description`='" +
        this.realEscapeString(req.body.pdescription) +
        "', `link`='" +
        req.body.plink +
        "', `cat`='" +
        req.body.pcat +
        "' WHERE `idProd`=" +
        req.body.pid,
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addProdCat = (req, res, next) => {
  try {
    mycon.execute(
      "INSERT INTO  `sw_prod_cat`(  `cat_name`, `description`, `status`) VALUES (  '" +
        this.realEscapeString(req.body.cat_name) +
        "', '" +
        req.body.cdescription +
        "', 1)",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateProdCat = (req, res, next) => {
  try {
    mycon.execute(
      "UPDATE  `sw_prod_cat` SET `cat_name` = '" +
        this.realEscapeString(req.body.cat_name) +
        "', `description` = '" +
        req.body.cdescription +
        "'  WHERE `idCat` = '" +
        req.body.idCat +
        "'",
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getProdCat = (req, res, next) => {
  try {
    mycon.execute(
      'SELECT sw_prod_cat.idCat,sw_prod_cat.cat_name,sw_prod_cat.description,sw_prod_cat.`status` FROM sw_prod_cat',
      (error, rows, fildData) => {
        if (!error) {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
