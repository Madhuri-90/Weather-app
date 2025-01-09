// Get the form, input, and output elements
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// Event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    
    const city = cityInput.value.trim(); // Get the city name from input

    if (!city) {
        showError('Please enter a city!');
        return;
    }

    // Hide the error message if input is valid
    errorMessage.classList.add('hidden');
    
    // API key (replace with your actual key)
    const apiKey = '43103576f65498ee6ebe0083daea7ba7'; // Put your OpenWeatherMap API key here
    
    // Construct the API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the API returned an error (e.g., "city not found")
        if (response.ok) {
            displayWeather(data);
        } else {
            throw new Error(data.message || 'Unknown error');
        }
    } catch (error) {
        // Display the error message if something goes wrong
        showError(error.message);
    }
});

// Function to display weather data
function displayWeather(data) {
    const { name, main, weather } = data;

    // Ensure that the data received is valid and has all necessary properties
    if (name && main && weather) {
        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
        `;
        weatherInfo.classList.remove('hidden'); // Make the weather info visible
    } else {
        showError('Weather data is incomplete.');
    }
}

// Function to show error message
function showError(message) {
    errorMessage.classList.remove('hidden');
    errorMessage.innerHTML = `<p>${message}</p>`;
}
