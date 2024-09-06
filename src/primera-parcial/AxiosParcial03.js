import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const AxiosParcial03 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        console.log(response.data[0].id);
        
        setComments(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 10, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5 },
  texto : {color:'black'}
});

export default AxiosParcial03;