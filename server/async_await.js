const axios = require('axios');

//declare as an asynchronous function 
async function fetchData() {
    try {
        const response = await axios.get('https://api.example.com/data');
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
fetchData()
