const express       = require('express')
var path            = require('path'); // модуль для парсинга пути
const app           = express()
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var methodOverride  = require('method-override');
var bodyParser      = require('body-parser');
var errorHandler    = require('errorhandler');
var log             = require('./libs/log')(module);
var url             = require('url')

const db            = require('./db/queries')
app.set('port', (process.env.PORT || 8080));

app.use(logger('combined')); // выводим все запросы со статусами в консоль
app.use(bodyParser.json()); // стандартный модуль, для парсинга JSON в запросах
app.use(methodOverride()); // поддержка put и delete
//app.use(app.router); // модуль для простого задания обработчиков путей
//app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

// Отправляем index.html, когда пользователи получают доступ к
// корневому каталог с использованием res.sendFile()
app.get('/api', function (req, res) {
  res.send('API is running');
});


/*app.use(function(req, res, next){
  res.status(404);
  log.debug(`Not found URL: ${req.url}`);
  res.send({ error: '404 Not found' });
  return;
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  log.error(`Internal error(%d): %s`,res.statusCode,err.message);
  res.send({ error: err.message });
  return;
});

app.get('/ErrorExample', function(req, res, next){
  next(new Error('Random error!'));
});*/

app.get('/', function(req, res) {
  res.send('This is not implemented now');
});

app.get('/api/v1/persons', db.getPersons)

app.get('/api/v1/persons/:personId', db.getPersonById)

app.post('/api/v1/persons', db.createPerson)

app.patch('/api/v1/persons/:personId', db.updatePerson)

app.delete('/api/v1/persons/:personId', db.deletePerson)

app.listen(app.get('port'), function(){
  console.log(`Server listening on port `, app.get('port'));
});