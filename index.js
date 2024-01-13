import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import { join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
console.log(`${API_KEY}`);

// Establishing the I/O port
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Configure Handlebars as the view engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views')); // Specify the views directory


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  // "render" the template named "home.hbs" in your views folder
  res.render('home');
})

app.post('/typeahead', async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const locationId = await worldWideRestaurantsLocation(cityName);
    res.json({ locationId });
    console.log(`Location ID: ${locationId}`);
  } catch (error) {
    console.error(error)
    res.status(500).send('Error processing request');
  }
})

app.post('/search', async (req, res) => {
  try {
    const locationId = req.body.locationId;
    const restaurantData = await worldWideRestaurantsCuisines(locationId);
    res.json(restaurantData);
    console.log(`${restaurantData}`);
  } catch (error) {
    console.error('Error in /search route:', error);
    res.status(500).send('Error processing request');
  }
})

async function worldWideRestaurantsLocation(cityName) {
  console.log("inside worldWideRestaurants");
  const url = 'https://worldwide-restaurants.p.rapidapi.com/typeahead';

  try {
    const response = await axios.post(url,`q=${encodeURIComponent(cityName)}&language=en_US`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
      }
    });
    
    if (response.data.results && response.data.results.data.length > 0) {
    const locationId = response.data.results.data[0].result_object.location_id;
    return locationId;
    } else {
      throw new Error('No location data found');
    }
  } catch (error) {
    console.error('Error in worldWideRestaurantsLocation:', error);
    throw error;
  }
}


async function worldWideRestaurantsCuisines(locationId) {
  console.log(`Making API call with locationId: ${locationId}`);
  const url = 'https://worldwide-restaurants.p.rapidapi.com/search';

  try {
    const response = await axios.post(url, `language=en_US&location_id=${encodeURIComponent(locationId)}&currency=USD`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
      }
    });

    const restaurantData = response.data.results.data;
    return restaurantData;
    console.log(`${restaurantData}`);
  } catch (error) {
    console.error('Error in worldWideRestarantsCuisines:', error);
    throw error;
  }
}


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
