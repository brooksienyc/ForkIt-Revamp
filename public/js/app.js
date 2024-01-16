
// let allRestaurantsData = new Map();

// async function loadData(cityName) {
//   try {
//     // POST request to get location info
//     const locationResponse = await axios.post('/typeahead', { cityName });
//     console.log('locationResponse is working');
//     const locationId = locationResponse.data.locationId;
//     console.log(`Location ID: ${locationId}`);

//     // POST request to get restaurant data
//     const restaurantData = await axios.post('/search', { locationId });
//     const { cuisines, restaurantDetails } = restaurantData.data.restaurantData;

//     allRestaurantsData = new Map(Object.entries(restaurantDetails));
//     console.log(allRestaurantsData);
//     console.log(cuisines, restaurantDetails);

//     populateCuisineDropdown(cuisines);

//   } catch (error) {
//     console.log(error);
//   }
// }

// document.getElementById("search").addEventListener("submit", async function (event) {
//   event.preventDefault();
//   const cityName = document.getElementById("myInput").value;
//   console.log(`City entered: ${cityName}`);
//   loadData(cityName);
// });

// function populateCuisineDropdown(cuisines) {
//   const dropdown = document.getElementById('cuisine-dropdown');
//   dropdown.innerHTML = "";

//   const defaultOption = document.createElement('option');
//   defaultOption.value = '';
//   defaultOption.textContent = 'Select a cuisine';
//   dropdown.appendChild(defaultOption);

//   cuisines.forEach(cuisine => {
//     const option = document.createElement('option');
//     option.value = cuisine;
//     option.textContent = cuisine;
//     dropdown.appendChild(option);
//   })
// }

// document.getElementById('cuisine-dropdown').addEventListener('change', function(e) {
//   const selectedCuisine = e.target.value.trim();
//   console.log(selectedCuisine);

//   let found = false;

//   allRestaurantsData.forEach((value, key) => {
//     if (Array.isArray(value) && value.length > 0 && value[0] === selectedCuisine) {
//       found = true;
//       return;
//     }
//   })


//   if (found) {
//     console.log('Selected cuisine matches cuisines:', selectedCuisine);

//   // if (allRestaurantsData.has(selectedCuisine)) {
//     const filteredRestaurants = allRestaurantsData.get(selectedCuisine)
//     console.log(filteredRestaurants)

//     if (filteredRestaurants && filteredRestaurants.length > 0) {
//       const sortedRestaurants = filteredRestaurants.sort((a, b) => b.raw_ranking - a.raw_ranking).slice(0, 5);
//       console.log(sortedRestaurants);
//       displayTopRestaurants(sortedRestaurants, selectedCuisine);
//     } else {
//       console.log('No restaurants found for the selected cuisine');
//       console.log(selectedCuisine);
//       console.log(allRestaurantsData);
//     }
//   //  else {
//   //   console.log('Selected cuisine not found in the data');
//   // } 
// } else {
//   console.log('Selected cuisine does not match any cuisineName in the data');
// }
// });

// function displayTopRestaurants(restaurants, selectedCuisine) {
//   const topRestaurants = document.getElementById('results-table');
//   topRestaurants.innerHTML = "";

//   restaurants.forEach(restaurant => {
//     const tr = document.createElement('tr');
//     tr.innerHTML = `<td>${restaurant.name}</td><td>${restaurant.website}</td><td>${restaurant.address}</td><td>${restaurant.raw_ranking}</td><td>${selectedCuisine}</td>`;
//     topRestaurants.appendChild(tr);
//   });
// }

// function clearTopRestaurants() {
//   const topRestaurants = document.getElementById('results-table');
//   topRestaurants.innerHTML = "";
// }


let allRestaurantsData = new Map();

async function loadData(cityName) {
  try {
    // POST request to get location info
    const locationResponse = await axios.post('/typeahead', { cityName });
    console.log('locationResponse is working');
    const locationId = locationResponse.data.locationId;
    console.log(`Location ID: ${locationId}`);

    // POST request to get restaurant data
    const restaurantData = await axios.post('/search', { locationId });
    allRestaurantsData = new Map(Object.entries(restaurantData.data.restaurantData));
    console.log('allRestaurantsData', JSON.stringify(allRestaurantsData));

    populateCuisineDropdown();

  } catch (error) {
    console.log(error);
  }
}

document.getElementById("search").addEventListener("submit", async function (event) {
  event.preventDefault();
  const cityName = document.getElementById("myInput").value;
  console.log(`City entered: ${cityName}`);
  loadData(cityName);
});

function populateCuisineDropdown() {
  const dropdown = document.getElementById('cuisine-dropdown');
  dropdown.innerHTML = "";
  console.log('dropdown:', JSON.stringify(dropdown));

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a cuisine';
  dropdown.appendChild(defaultOption);
  console.log('dropdown:', JSON.stringify(dropdown));

  // Iterate through allRestaurantsData to get cuisine names
    // allRestaurantsData.get('restaurantDetails').forEach(restaurantDetail => {

    //   for (let i = 0; i < restaurantDetail.length; i++) {
    //     const cuisineName = restaurantDetail[i].value[0];
    //     console.log(cuisineName);
    //   }
    //   const option = document.createElement('option');
    //   option.value = cuisineName
    //   option.textContent = cuisineName;
    //   dropdown.appendChild(option);
    //   console.log('dropdown:', JSON.stringify(dropdown));
    // });
  

  const restaurantDetailsArray = allRestaurantsData.get('restaurantDetails');
  console.log('restaurantDetailsArray:', JSON.stringify(restaurantDetailsArray));

  restaurantDetailsArray.sort((a, b) => {
    const cuisineA = a[0];
    const cuisineB = b[0];
    return cuisineA.localeCompare(cuisineB);
  });

  for (let i = 0; i < restaurantDetailsArray.length; i++) {
    const cuisineName = restaurantDetailsArray[i][0];
    console.log(`Index: ${i}, Cuisine Name: ${cuisineName}`);

    const option = document.createElement('option');
    option.value = cuisineName
    option.textContent = cuisineName;
    dropdown.appendChild(option);
    console.log('dropdown:', JSON.stringify(dropdown));
  }

}

document.getElementById('cuisine-dropdown').addEventListener('change', function (e) {
  const selectedCuisine = e.target.value.trim();
  console.log(selectedCuisine);

  // if (allRestaurantsData.has(selectedCuisine)) {
  //   const filteredRestaurants = allRestaurantsData.get(selectedCuisine);
  //   console.log('filteredRestaurants', JSON.stringify(filteredRestaurants));

  //   if (filteredRestaurants && filteredRestaurants.length > 0) {
  //     const sortedRestaurants = filteredRestaurants.sort((a, b) => b.raw_ranking - a.raw_ranking).slice(0, 5);
  //     console.log('sortedRestaurants', JSON.stringify(sortedRestaurants));
  //     displayTopRestaurants(sortedRestaurants, selectedCuisine);
  //   } else {
  //     console.log('No restaurants found for the selected cuisine');
  //     console.log(selectedCuisine);
  //     console.log('allRestaurantsData', JSON.stringify(allRestaurantsData));
  //   }
  // } else {
  //   console.log('Selected cuisine not found in the data');
  // }

  const cuisineArray = allRestaurantsData.get('restaurantDetails').find(arr => arr[0] === selectedCuisine);

  if (cuisineArray){
    const filteredRestaurants = cuisineArray[1];
    console.log('filteredRestaurants', JSON.stringify(filteredRestaurants));

    if (filteredRestaurants && filteredRestaurants.length > 0) {
      const sortedRestaurants = filteredRestaurants.sort((a, b) => b.raw_ranking - a.raw_ranking).slice(0, 5);
      console.log('sortedRestaurants', JSON.stringify(sortedRestaurants));
      displayTopRestaurants(sortedRestaurants, selectedCuisine);
    }
  } else {
    console.log('Selected cuisine not found in the data');
  }

});

function displayTopRestaurants(restaurants, selectedCuisine) {
  const topRestaurants = document.getElementById('results-table');
  topRestaurants.innerHTML = "";

   // Create a row for the table headers
   const headerRow = document.createElement('tr');
   headerRow.innerHTML = '<th>Name</th><th>Website</th><th>Address</th><th>Ranking</th><th>Cuisine</th>';
   topRestaurants.appendChild(headerRow);

  restaurants.forEach(restaurant => {
    const tr = document.createElement('tr');
    const websiteLink = `<a href="${restaurant.website}" target="_blank">${restaurant.website}</a>`;
    tr.innerHTML = `<td>${restaurant.name}</td><td>${websiteLink}</td><td>${restaurant.address}</td><td>${restaurant.raw_ranking}</td><td>${selectedCuisine}</td>`;
    topRestaurants.appendChild(tr);
  });
}

function clearTopRestaurants() {
  const topRestaurants = document.getElementById('results-table');
  topRestaurants.innerHTML = "";
}


