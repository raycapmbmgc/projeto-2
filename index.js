const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

class Server {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.users = []; 
    this.configureApp();
    this.setRoutes();
  }

  configureApp() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));
  }

  setRoutes() {
    this.app.get('/', (req, res) => {
      res.render('index', { error: null });
    });

    this.app.get('/login', (req, res) => {
      res.render('login', { error: null });
    });

    this.app.get('/register', (req, res) => {
      res.render('register', { error: null });
    });

    this.app.post('/register', (req, res) => {
      const { name, email, password } = req.body;
      if (name && email && password) {
        this.users.push({ name, email, password });
        res.redirect('/login'); // Redireciona para a página de login
      } else {
        res.render('register', { error: 'Todos os campos são obrigatórios.' });
      }
    });

    this.app.post('/login', (req, res) => {
      const { email, password } = req.body;
      const user = this.users.find((user) => user.email === email && user.password === password);
      if (user) {
        req.session.user = user; // store user in session
        res.redirect('/profile'); // redirect to profile page
      } else {
        res.render('login', { error: 'Email ou senha inválidos.' });
      }
    });

    this.app.get('/users', authenticate, (req, res) => {
      res.render('users', { users: this.users });
    });

    this.app.get('/profile', authenticate, (req, res) => {
      res.render('profile', { user: req.session.user });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando em http://localhost:${this.port}`);
    });
  }
}

const authenticate = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login'); // redirect to login page if not authenticated
  }
  next(); // allow access if authenticated
};

app.post('/login', (req, res) => {
  res.send('Login successful!');
});

const server = new Server(8080);
server.start();