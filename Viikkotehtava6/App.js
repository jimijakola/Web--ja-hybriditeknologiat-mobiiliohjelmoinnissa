import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const API_KEY = 'LIITÄ_API_TÄHÄN';

export default function WeatherApp() {
  const [city, setCity] = useState('Helsinki');
  const [weather, setWeather] = useState(null);
 

const fetchWeather = async () => {
  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`
    );
    const data = await response.json();
    setWeather(data.data[0]);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};


  useEffect(() => {
    fetchWeather(); 
  }, []);

  return (
    <View style={{ padding: 45 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Weather App</Text>
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Search city"
        value={city}
        onChangeText={setCity}
      />
      
      <Button title="Show weather" onPress={fetchWeather} />

      {weather ? (
        <View style={{ marginTop: 10 }}>
          <Text>City: {weather.city_name}</Text>
          <Text>Temperature: {weather.temp}°C</Text>
          <Text>Weather: {weather.weather.description}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
