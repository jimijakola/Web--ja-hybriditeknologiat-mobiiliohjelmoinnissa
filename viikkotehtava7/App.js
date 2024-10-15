import React, { useReducer, useState } from 'react';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';


const initialState = [];


const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now().toString(), task: action.payload }];
    case 'REMOVE_TASK':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  
  const addTask = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TASK', payload: inputValue });
      setInputValue(''); 
    }
  };

  
  const removeTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tehtävälista</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Kirjoita uusi tehtävä"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Tallenna" onPress={addTask} />
      </View>
      
      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeTask(item.id)}>
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item.task}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  taskContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
});
