require('dotenv').config()
const express = require ('express');
const app = express ();
const path = require('path');
const cors = require ('cors');
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('../public'));

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(PORT, () => console.log('Server running at port', PORT));