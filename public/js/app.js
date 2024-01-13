function forkIt() {
  document.getElementById("search").addEventListener("submit", async function(event) {
    event.preventDefault();
    const cityName = document.getElementById("myInput").value;
    console.log(`City entered: ${cityName}`);

    try {
      // POST request to get location info
      const locationResponse = await axios.post('/typeahead', { cityName });
      console.log('locationResponse is working');
      const locationId = locationResponse.data.locationId;
      console.log(`Location ID: ${locationId}`);

      // POST request to get restaurant data
      const searchResponse = await axios.post('/search', { locationId });
      const searchData = searchResponse.data;
      console.log(searchData);

    } catch (error) {
      console.log(error);
    }
  });
}

forkIt();