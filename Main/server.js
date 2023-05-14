const express = require('express');
const sesh = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const session = {
  secret: 'secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false, 
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true, 
  store: new SequelizeStore({
    db: sequelize,
  })
};

app.use(routes);
app.use(session(sesh));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force:false}).then(()=>{
  app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))
});
