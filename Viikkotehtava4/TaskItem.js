import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, toggleTaskStatus }) {
  return (
    <TouchableOpacity onPress={() => toggleTaskStatus(task.id)}>
      <Text style={[styles.task, task.done && styles.done]}>{task.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  task: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
