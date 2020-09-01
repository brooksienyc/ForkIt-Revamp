require('dotenv').config()
const express = require('express')
const axios = require('axios')
const path = require('path')
const logger = require('morgan')
const exphbs = require('express-handlebars')

// establishing the I/O port
const PORT = process.env.PORT || 3000
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views')) // specify that templates will live in the "views" directory
app.engine('.hbs', exphbs({extname: '.hbs'}))
app.set('view engine', '.hbs') // specify that we are using "handlebars" as our template engine

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))

app.get('/', (req, res, next) => {
  // "render" the template named "home.hbs" in your views folder
  res.render('home')
})

app.get('/cuisines', async (req, res, next) => {
  console.log(req.query)
  const cityId = req.query.city_id
  console.log(cityId)
  const cuisines = await zomatoCuisines(cityId)
  console.log(cuisines)
  res.json({cuisines})
})

app.get('/restaurants', async (req, res, next) => {
  console.log("******* inside /restaurants")
  console.log(req.query)
  const cityId = req.query.city_id
  const cuisineId = req.query.cuisine_id
  console.log(cityId)
  console.log(cuisineId)

  const restaurants = await zomatoRestaurants(cityId, cuisineId)
  console.log(restaurants)
  res.json({restaurants})
})

function zomatoCuisines(cityId) {
  console.log("inside zomatoCuisines")
  const url = 'https://developers.zomato.com/api/v2.1/cuisines'
  //const apiKey = '[ADD YOUR GIPHY API KEY HERE]'
  const apiKey = 'a1c6a3aa1b88fda14fbd7bf434a9e7a9'

  // don't forget the "return" keyword in front of axios
  return axios.get(url, {
    params: {
      city_id: cityId,
    },
    headers: {'user-key': `${apiKey}`}
  }).then((response) => {
    //console.log(response.data)
    return response.data.cuisines
  }).catch((error) => {
    console.log(error)
  })
}

// https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&count=5&cuisines=641&sort=rating&order=desc
function zomatoRestaurants(cityId, cuisineId) {
  console.log("inside zomatoRestaurants")
  const url = 'https://developers.zomato.com/api/v2.1/search'
  //const apiKey = '[ADD YOUR GIPHY API KEY HERE]'
  const apiKey = 'a1c6a3aa1b88fda14fbd7bf434a9e7a9'

  // don't forget the "return" keyword in front of axios
  return axios.get(url, {
    params: {
      entity_id: cityId,
      entity_type: "city",
      count: "5",
      cuisines: cuisineId,
      sort: "rating",
      order: "desc"
    },
    headers: {'user-key': `${apiKey}`}
  }).then((response) => {
    console.log(response.data.restaurants)
    return response.data.restaurants
  }).catch((error) => {
    console.log(error)
  })
}

// function fetchCuisinesByCity (cityId) {
//     console.log(cityId)
//     const url = 'xhr.open("GET", "https://cors-escape.herokuapp.com/https://developers.zomato.com/documentation#!/common/cities'
//     const apiKey = 'a1c6a3aa1b88fda14fbd7bf434a9e7a9'
//
//
//     axios.get(url, {
//       params: {
//         city_id: cityId,
//       },
//       headers: {'user-key': `${apiKey}`}
//     })
//     .then((response)=>{
//       console.log(response)
//     })
//     .catch((error)=>{
//       console.log(error)
//       alert('error occurred')
//     })
//   }
