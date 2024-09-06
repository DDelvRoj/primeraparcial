import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageParcial04 = () => {
  const [codigo, setCodigo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [facultad, setFacultad] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [editarAlumno, setEditarAlumno] = useState(null); 

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const saveOrUpdateAlumno = async () => {
    if (codigo && carrera) {
      if (editarAlumno !== null) {
        // Modo edición
        const nuevoAlumnos = alumnos.map(alumno => 
          alumno.carrera === editarAlumno ? { codigo, carrera, facultad } : alumno
        );
        await AsyncStorage.setItem('alumnos', JSON.stringify(nuevoAlumnos));
        setAlumnos(nuevoAlumnos);
        setEditarAlumno(null); // Salir del modo edición
      } else {
        // Modo agregar nuevo alumno
        const newAlumno = { codigo, carrera };
        const nuevoAlumnos = [...alumnos, newAlumno];
        await AsyncStorage.setItem('alumnos', JSON.stringify(nuevoAlumnos));
        setAlumnos(nuevoAlumnos);
      }

      setFacultad('');
      setCodigo('');
      setCarrera('');
    }
  };

  const cargarAlumnos = async () => {
    const storedAlumnos = await AsyncStorage.getItem('alumnos');
    if (storedAlumnos) {
      setAlumnos(JSON.parse(storedAlumnos));
    }
  };

  const borrarAlumnos = async (carreraToDelete) => {
    const nuevoAlumnos = alumnos.filter(alumno => alumno.carrera !== carreraToDelete);
    await AsyncStorage.setItem('alumnos', JSON.stringify(nuevoAlumnos));
    setAlumnos(nuevoAlumnos);
  };

  const editarAlumnos = (alumno) => {
    setCodigo(alumno.codigo);
    setCarrera(alumno.carrera);
    setEditarAlumno(alumno.carrera);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Código"
        keyboardType='number-pad'
        placeholderTextColor="gray"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Carrera"
        placeholderTextColor="gray"
        value={carrera}
        onChangeText={setCarrera}
      />
      <TextInput
        style={styles.input}
        placeholder="Facultad"
        placeholderTextColor="gray"
        value={facultad}
        onChangeText={setFacultad}
      />
      <TouchableOpacity style={styles.button} onPress={saveOrUpdateAlumno}>
        <Text style={styles.buttonText}>
          {editarAlumno !== null ? "Actualizar Alumno" : "Agregar Alumno"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Lista de Alumnos:</Text>
      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.carrera}
        renderItem={({ item }) => (
          <View style={styles.alumnoContainer}>
            <Text style={styles.alumnoContainerText}>{item.codigo} - {item.carrera}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => editarAlumnos(item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => borrarAlumnos(item.carrera)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color:'black',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black'
  },
  alumnoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  alumnoContainerText : {
    color:'black'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AsyncStorageParcial04;
