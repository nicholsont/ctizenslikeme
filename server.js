// Import necessary node-modules
const express = require('express'),
	    bodyParser = require('body-parser'),
	    rp = require('request-promise'),
	    path = require('path');
      models = require('./models/')

// Initialize express.js
app = express();
// Set JSON encoding
app.use(bodyParser.urlencoded({ extended: true }));
// Set app view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', true);
// Set static page directory
app.use(express.static('public'));

// Get home page
app.get('/', (req, res) => {
	res.render('partials/home.pug', {
		pageTitle: 'Citizens Like Me',
	});
});

app.get('/register', (req, res) => {
	res.render('partials/registration.pug', {
		pageTitle: 'Register',
	});
});

// TODO: consider abstracting to a register controller
app.post('/register', (req, res) => {
	let ethnicity = splicer(req.body.ethnicity)
	let ageGroup = calculateAgeGroup(req.body.year);

	models
	.User
  .create(
  	{
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			age_group: ageGroup,
			ethnicity: ethnicity,
			address: findAddress(req.body.zip, (state) => { return state })
		}
  )
  .then((user, err) => {
    if (user) {
    	res.redirect(`/users/${user.id}`);
    } else {
    	res.redirect('/register');
    }
  });	
});

// TOOD: this fails on single ethnicities passed in
function splicer (ethnicity) {
	return ethnicity.map(item => {
		// TODO: changing ['Native American/Pacific Islander'] =>
		//       ['Native American, Pacific Islander'] intended?
		// Feel like this should splat instead of replace so we get
		// ['Native American', 'Pacific Islander']
		return item.replace('/', ', ')
	})
}

function calculateAgeGroup (year) {
	let currentYear = new Date().getFullYear()
	let age = currentYear - year
	switch (true){
		case (age < 18):
			return 'Minor';
		case (age >= 18):
			return 'Adult';
		case (age >= 65):
			return 'Senior';
		default:
			break;
	}
}

function findAddress (zip, cb) {
	let state;
	let query = {
		key:'AIzaSyA6JUM5SUzEYXHo_aGdxUF49Hm8DUDKtUo',
		address: zip,
	}
	rp({
		uri: 'https://maps.googleapis.com/maps/api/geocode/json',
		method: 'GET',
		qs: query,
		json: true
	}).then(response => {
		if (response.results[0] && response.results[0].address_components[3]) {
			cb(response.results[0].address_components[3].long_name);
		} else {
			cb(null)
		}
	});
}

const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`App is listening on port ${port}`);
});
