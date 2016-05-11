//old comment

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = requirew('passport');
var expressSession = require('express-session');

var app = express();
var port = process.env.PORT || 5000;

var nav = [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressSession({secret:'library'}));
require('./src/config/passport')(app);

// app.use(express.static('src/views'));
app.set('views', './src/views');



// The following line was to allow JADE templating engine. 
//app.set('view engine', 'jade');

// The following line was to allow handlebars templating engine. 
/*var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname:'.hbs'}));

app.set('view engine', '.hbs');

app.get('/', function(req, res){
    res.render('index', {title: 'Hello There',list: ['a','b']});
});*/

// The following line was to allow EJS templating engine. 

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello There',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log('running on port    ' + port);
});

