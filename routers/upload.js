const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const mycon = require('../util/conn');
var filePath = require('path');
var fs = require('fs');
var dateFormat = require('dateformat');
let path = '';
const multer = require('multer');
var appRoot = require('app-root-path');

// const uppath = "./uploads/";
const uppath = "../images/";
const uppathres = "../recipt/";
// const downpath = "https://www.coopshop.lk/uploads/profile/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uppath);
    },
    filename: function (req, file, cb) {
        const date = dateFormat(new Date(), 'yyyyMMddHHmmss_', 'en-US', '+0530');
        path = date + file.originalname;
        cb(null, path);
    }
}
);





const upload = multer(
    { storage: storage }
);





router.post("/upload", upload.single('attach'), (req, res, next) => {
    console.log("call method");
    try {
        console.log(req.file.path + "  --> Path ");
        const ftype = filePath.extname(req.file.path);
        console.log(ftype + "  --> Type ");
        console.log(req.body);
        let pp = path;
        console.log(path + '          ---------- path       ')

        let qq = "UPDATE `sw_prod` SET `prodImage`='" + this.rES(path) + "' WHERE `idProd`=" + req.body.pid;
        mycon.execute(qq, (error, rows, next) => {
            if (!error) {
                res.send({ imgpath: pp });
            } else {
                console.log(error);
            }
        });

    } catch (error) {
        console.log("-----")
        console.log(error);
    }
});






// ************ updoad recipt **********//

const storageres = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uppathres);
    },
    filename: function (req, file, cb) {
        const date = dateFormat(new Date(), 'yyyyMMddHHmmss_', 'en-US', '+0530');
        path = date + file.originalname;
        cb(null, path);
    }
}
);

const uploadres = multer(
    { storage: storageres }
);

router.post("/uploadres", uploadres.single('attach'), (req, res, next) => {
    console.log("call method");
    try {
        console.log(req.file.path + "  --> Path ");
        const ftype = filePath.extname(req.file.path);
        console.log(ftype + "  --> Type ");
        console.log(req.body);
        let pp = path;
        console.log(path + '          ---------- path       ')

        //let qq = "UPDATE `sw_prod` SET `prodImage`='" + this.rES(path) + "' WHERE `idProd`=" + req.body.pid;
        let qq = "UPDATE `bank_ref` SET `img_path` = '"+this.rES(path)+"' WHERE (`id` = '"+req.body.pid+"');";
        mycon.execute(qq, (error, rows, next) => {
            if (!error) {
                res.send({ imgpath: pp });
            } else {
                console.log(error);
            }
        });

    } catch (error) {
        console.log("-----")
        console.log(error);
    }
});


// ************ updoad recipt **********//



exports.rES = (str) => {
    if (str.length > 0) {
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
        })
    } else {
        return '';
    }
}


router.get('/getUploadList/:id', (req, res, nex) => {
    console.log(req.params);
    try {
        mycon.execute("" + req.params.id, (error, rows, next) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/getItem/:id', (req, res, nex) => {
    console.log(req.params);
    try {
        mycon.execute("SELECT attach.idAttach,attach.idInstitute,attach.iduser,attach.page_number,attach.`comment`,attach.`status`,attach.type,attach.path,attach.latterID FROM attach where idAttach = " + req.params.id, (error, rows, next) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


router.get('/:path', (req, res, nex) => {
    //    console.log("hit");
    var path = req.params.path;
    //  console.log(appRoot);
    res.sendFile(appRoot + '/uploads/' + path);
});



module.exports = router;