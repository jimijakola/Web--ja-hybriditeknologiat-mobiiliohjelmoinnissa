import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Pressable-komponentti modaalin näyttämiseen */}
      <Pressable onPress={() => setModalVisible(true)} style={styles.pressable}>
        <Text style={styles.pressableText}>Näytä modal</Text>
      </Pressable>

      {/* Modal-komponentti */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          if (Platform.OS === 'android') {
            setModalVisible(false); // Sulkee modaalin Androidin taaksepäin-painikkeella
          }
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tämä on modaalin sisältö!</Text>
            <Button title="Sulje" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Komponenttien tyylit
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  pressableText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
