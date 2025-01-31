import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type Polycord = {
  latitude: number;
  longitude: number;
};

const fakeDatabaseData = [
  //example database data for polygons (surabaya)
  {
    id: 1,
    coordinates: [
      { latitude: -7.295242, longitude: 112.727165 },
      { latitude: -7.296500, longitude: 112.728500 },
      { latitude: -7.298000, longitude: 112.727000 },
      { latitude: -7.295242, longitude: 112.727165 }, // Closing the polygon
    ],
  },
  {
    id: 2,
    coordinates: [
      { latitude: -7.292500, longitude: 112.730000 },
      { latitude: -7.294000, longitude: 112.731500 },
      { latitude: -7.295500, longitude: 112.730000 },
      { latitude: -7.292500, longitude: 112.730000 }, // Closing the polygon
    ],
  },
];

type Pcord = {
  id: number;
  coordinates: Polycord[];
};

const Maps = () => {
  const [region, setRegion] = useState<Region>({
    latitude: -7.257500275852784,
    longitude: 112.75240322919704,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [polycords, setPolycords] = useState<Polycord[]>([]); // Store multiple coordinates
  const [isPolygonSet, setIsPolygonSet] = useState(false);
  const [p, setP] = useState<Pcord[]>([]);

  useEffect(() => {
    setP(fakeDatabaseData);
  }, []);

  const handlePress = (e: any) => {
    if (isPolygonSet) return;

    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPolycords([...polycords, { latitude, longitude }]); // Append new coordinate
  };

  const completePolygon = () => {
    setIsPolygonSet(true);
  };

  const clearPolygon = () => {
    setPolycords([]); // Clear all coordinates
    setIsPolygonSet(false);
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setPermissionGranted(false);
        return;
      }
      setPermissionGranted(true);
      updateLocation();
    };

    const updateLocation = async () => {
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10, timeInterval: 5000 },
        (position) => {
          const { latitude, longitude } = position.coords;
          setRegion((prevRegion) => ({
            ...prevRegion,
            latitude,
            longitude,
          }));
        }
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        zoomControlEnabled={false}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        mapPadding={{ top: 30, right: 0, bottom: 0, left: 0 }} // Moves button
        onPress={handlePress}
      >
        {/* Display markers at each point */}
        {polycords.map((coord, index) => (
          <Marker key={index} coordinate={coord} />
        ))}

        {/* Draw Polygon if there are at least 3 points */}
        {isPolygonSet && (
          <Polygon
            coordinates={polycords}
            strokeColor="rgba(255,0,0,1)" // Blue border
            fillColor="rgba(255,0,0,0.3)" // Semi-transparent blue
            strokeWidth={2}
          />
        )}

        {p.map((p) => (
          <Polygon
            key={p.id}
            coordinates={p.coordinates}
            strokeColor="rgba(0,0,255,1)" // Blue border
            fillColor="rgba(0,0,255,0.3)" // Semi-transparent blue
            strokeWidth={2}
          />
        ))}

        <Circle
          center={region}
          radius={1000}
          fillColor="rgba(255, 255, 0, 0.3)"
          strokeColor="rgba(255, 255, 0, 1)"
          strokeWidth={2}
        />
      </MapView>
      <TouchableOpacity style={styles.button} onPress={completePolygon}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={clearPolygon}>
        <FontAwesome name="times" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect
  },
  button2: {
    position: 'absolute',
    bottom: 75,
    right: 20,
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect
  },
  button3: {
    position: 'absolute',
    bottom: 130,
    right: 20,
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Maps;
