import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ComponenteParcial01 = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const items = [
    { key: 'PropsParcial02', component: 'PropsParcial02' },
    { key: 'AxiosParcial03', component: 'AxiosParcial03' },
    { key: 'AsyncStorageParcial04', component: 'AsyncStorageParcial04' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examen Primera Parcial</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Nombre"
        placeholderTextColor="gray"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Edad"
        placeholderTextColor="gray"
        keyboardType='numeric'
        value={edad}
        onChangeText={setEdad}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(item.component, { nombre, edad })}
          >
            <Text style={styles.buttonText}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bienvenido al examen</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Ir al examen :C</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color:'black',
    backgroundColor: '#fff',
  },
  button: {
    padding: 15,
    backgroundColor: 'blue', // Verde para los botones
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:'red'
  },
});

export default ComponenteParcial01;
