import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const [limits, setLimits] = useState('');

  const calculateHeartRateLimits = () => {
    const ageNum = parseInt(age);
    if (!isNaN(ageNum) && ageNum > 0) {
      const lower = (220 - ageNum) * 0.65;
      const upper = (220 - ageNum) * 0.85;
      setLimits(`${lower.toFixed(0)} - ${upper.toFixed(0)}`); // näyttää tuloksen muodossa "ala-arvo - yläarvo"
    } else {
      alert('Error!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={text => setAge(text)}
        placeholder="Enter age"
      />
      <Text style={styles.label}>Limits</Text>
      <Text style={styles.limitsText}>{limits}</Text>
      <Button title="CALCULATE" onPress={calculateHeartRateLimits} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  limitsText: {
    fontSize: 24,
    marginBottom: 16,
  },
});
