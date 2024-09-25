import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './TaskItem';
 

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = () => {
    if (task.trim() === '') return;
    const newTasks = [...tasks, { id: Date.now().toString(), title: task, done: false }];
    setTasks(newTasks);
    saveTasks(newTasks);
    setTask('');
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem task={item} toggleTaskStatus={toggleTaskStatus} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
