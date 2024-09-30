import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Location permission not granted!');
        return;
      }

      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapLongPress = (e) => {
    const { coordinate } = e.nativeEvent;
    // Add a new marker at the pressed location
    setMarkers([...markers, coordinate]);
  };

  return (
    <View style={{ flex: 1 }}>
      {region && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          showsUserLocation={true}
          onLongPress={handleMapLongPress} // Calls handleMapLongPress on long press
        >
          {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} />
          ))}
        </MapView>
      )}
    </View>
  );
}
