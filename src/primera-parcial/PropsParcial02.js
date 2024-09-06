import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropsParcial02 = ({ route }) => {
  const { nombre, edad } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text} >Nombre es: {nombre}, actualmente tengo {edad} años.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: {color:'black'}
});

export default PropsParcial02;