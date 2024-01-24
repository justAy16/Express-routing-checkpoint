import express from 'express'
import path from 'path'
import pug from 'pug';

const Port = 6500

const app = express()
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.engine('pug', pug.__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.static('public'));

const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); 
    const hourOfDay = now.getHours();
  
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {

      next();
    } else {
      res.send('This web application is only available during working hours (Mon-Fri, 9 AM to 5 PM).');
    }
  };

// app.use(checkWorkingHours);

app.get('/', (req, res) => res.render('home', { pageTitle: 'Home' }));
app.get('/services', (req, res) => res.render('ourServices', { pageTitle: 'Our Services' }));
app.get('/contact', (req, res) => res.render('contactUs', { pageTitle: 'Contact Us' }));

app.listen(Port, () => console.log(`Server running at http://localhost:${Port}`));