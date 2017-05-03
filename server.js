const express = require('express'),
socketIO      = require("socket.io"),
http          = require("http"),
path          = require('path'),
logger        = require('morgan'),
bodyParser    = require('body-parser'),
index         = require('./routes/index'),
port          = process.env.PORT || '3000',
qa            = require("./lib/qa"),
app           = express();

let server        = http.createServer(app);
let io            = socketIO(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', index);

io.on("connection", (socket) => {

  io.emit("serverResponse", {
    from: "Servern, har aktiverat en session för en användare",
    leftside: false,
    msg: `<p class='extra'>Besök hos även på: <a href='https://www.bviking.se/lernia/webbappdev/'>Know your beer</a></p>`
  });


  socket.on("clientRequest", (msg, cb) => {

    cb({
      from: "Servern, har mottagit följande fråga",
      leftside: false,
      msg: `${msg.text} <p class='extra'>Besök hos även på: <a href='https://www.bviking.se/lernia/webbappdev/'>Know your beer</a></p>`
    });

    qa.giveAnswerBasedOnQuestion(msg.text).then((ans) => {
      io.emit("serverResponse", {
        from: "Servern svarar:",
        leftside: true,
        msg: ans
      });
    }).catch((e) => {
      console.log(e);
    });

  });


  socket.on("disconnect", () => {
    io.emit("serverResponse", {
      from: "Servern, har avslutat en session för en användare",
      leftside: false,
      msg: `<p class='extra'>Besök hos även på: <a href='https://www.bviking.se/lernia/webbappdev/'>Know your beer</a></p>`
    });
    console.log("Disconnect ");
  });


});



app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

module.exports = app;
