import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Image, TextInput, StyleSheet } from 'react-native';

import Inputs from './components/Inputs';

export default function App() {
 
  return (
    <View style={styles.container}>
      <Inputs />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 600,
    marginTop: 150,

  }
});