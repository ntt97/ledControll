import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
const App = () => {

  const [isOpen, setIsOpen] = useState('ON');


  useEffect(() => {

    database()
      .ref('/status')
      .once('value')
      .then(snapshot => {
        setIsOpen(snapshot.val())
      });

  }, [])

  const onHandle = () => {
    if (isOpen === "on") {
      setIsOpen("off")
      database()
        .ref('/')
        .update({status:'off'})
        .then(snapshot => {
         
          
        });
    } else {
      setIsOpen("on")
      database()
        .ref('/')
        .update({status:'on'})
        .then(snapshot => {
         
          
        });
    }

  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onHandle} style={{ marginHorizontal: 100,  backgroundColor: isOpen==='on'?'blue':'#000', padding: 20, alignItems: "center", }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: '#fff' }}>{isOpen.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default App;
