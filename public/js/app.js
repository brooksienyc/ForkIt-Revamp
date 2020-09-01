$(function(){
  let selectedCityId
  let selectedCuisineId


  $('#cities-dropdown').change((event) => {
    //getCity()
    console.log("city_change")
    selectedCityId = $(event.currentTarget).val()
    console.log(selectedCityId)
    //fetchCuisinesByCity(selectedCityId)
    getCuisines(selectedCityId)
  })

  $('#cuisines-dropdown').change((event) => {
    //getCity()
    console.log("city_change")
    selectedCuisineId = $(event.currentTarget).val()
    console.log(selectedCuisineId)
    //fetchCuisinesByCity(selectedCityId)
    getRestaurants(selectedCityId, selectedCuisineId)
  })


  function getCuisines(cityId){
    axios.get("/cuisines", {
      params: {
        city_id: cityId,
      }
    })
    .then((response)=>{
      //console.log(response.data)
      updateCuisineDropdown(response.data.cuisines)
    })
    .catch((error)=>{
      console.log(error)
      alert('error occurred')
    })
  }

  function getRestaurants(cityId, cuisineId){
    axios.get("/restaurants", {
      params: {
        city_id: cityId,
        cuisine_id: cuisineId
      }
    })
    .then((response)=>{
      //console.log(response.data)
      updateRestaurantTable(response.data.restaurants)
    })
    .catch((error)=>{
      console.log(error)
      alert('error occurred')
    })
  }

    function updateRestaurantTable(restaurants){
      console.log(restaurants)
      restaurants.forEach((restaurant)=>{
        const restaurantName = restaurant.restaurant.name
        const restaurantLocation = restaurant.restaurant.location.address
        const restaurantRating = restaurant.restaurant.user_rating.aggregate_rating
        const restaurantUrl = restaurant.restaurant.url
        $('#results-table tbody').append(
          `<tr>
            <td>${restaurantName}</td>
            <td><${restaurantLocation}></td>
            <td>${restaurantRating}</td>
            <td><a href="${restaurantUrl}">${restaurantUrl}</a></td>
          </tr>`
        )
    })
    }

  function updateCuisineDropdown(cuisines){
    console.log(cuisines)
    cuisines.forEach((cuisine)=>{
      const cuisineId = cuisine.cuisine.cuisine_id
      const cuisineName = cuisine.cuisine.cuisine_name
      console.log(cuisineId)
      console.log(cuisineName)
      $("#cuisines-dropdown").append(`<option value="${cuisineId}">${cuisineName}</option>`)
    })
  }

})
  // function updateCuisineTable(cuisines) {
  //     console.log(cuisines)
  //     cuisines.forEach((cuisine) => {
  //       const cuisineTitle = cuisine.cuisine.cuisine_title
  //       const cuisineAddress = cuisine.cuisine.cuisine_address
  //       const cuisineRating = cuisine.cuisine.cuisine_aggregate_rating
  //       const cuisineUrl = cuisine.cuisine.cuisine_url
  //       console.log(cuisineTitle)
  //       console.log(cuisineAddress)
  //       console.log(cuisineRating)
  //       console.log(cuisineUrl)
  //       $('#results-table tbody').append(
  //         `<tr>
  //           <td>${cuisine.cuisine.cuisine_title}</td>
  //           <td><img src="${cuisine.cuisine.cuisine_address}"></td>
  //           <td>${cuisine.cuisine.cuisine_aggregate_rating}</td>
  //           <td><a href="${cuisine.cuisine.cuisine_url}"> link </a></td>
  //         </tr>`
  //       )
  //     })
  //   }
  //













// console.log('here outside of document ready')
//
// $(function() {
//   console.log('here inside of document ready')
//   $('#cities-dropdown').change((event) => {
//     //getCity()
//     console.log("city_change")
//     const selectedCityId = $(event.currentTarget).val()
//     console.log(selectedCityId)
//     fetchCuisinesByCity(selectedCityId)
//   })
//
//   function fetchCuisinesByCity (cityId) {
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
//
// })
