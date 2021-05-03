const express = require('express');
const port = process.env.PORT || 3000;

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mycon = require('./util/conn');
var dateFormat = require('dateformat');
const http = require('http');
const cors = require('cors');
const app = express();


const indexRouter = require('./routers/index');
const usersRout = require('./routers/userRout');
const treeRout = require('./routers/treeRout');
const prodRout = require('./routers/prodRout');
const invoiceRout = require('./routers/invoice');


const allowedOrigins = [
    '*',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'https://smartwin.lk',
    'http://smartwin.lk',
    'https://sw.smartwin.lk',
    'http://sw.smartwin.lk',
    'http://localhost:4200',
    'http://localhost:8080',
    'http://localhost:8100',
    'https://api.smartwin.lk',
    'http://api.smartwin.lk'

];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}

app.options('*', cors(corsOptions));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use('/user', usersRout);

app.use('/tree', treeRout);

app.use('/prod', prodRout);

app.use('/invoice', invoiceRout);



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    console.log(error.message);
    next(error);
});



app.get('/', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

var x = 0;

function time() {
    setTimeout(() => {
        try {
            let us = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            console.log(us);
            let current = dateFormat(us, "yyyy-mm-dd");
            console.log(current);
            mycon.execute("SELECT sw_process.idProcess,sw_process.dateTime FROM sw_process ORDER BY sw_process.idProcess DESC LIMIT 1", (e, r, f) => {
                let last = r[0].dateTime;
                last = new Date(last);
                last = dateFormat(last, "yyyy-mm-dd");
                // if (last < current) {
                http.get("https://apitesting.tradexzone.com/tree/process"
                    , function (err, res, body) {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
                console.log("RUN");
                // } else {
                //     console.log("NOT RUN");
                // }
            })
        } catch (error) {
            console.log(error);
        }
        time();
    }, 600000);
}

time();

app.listen(port);



