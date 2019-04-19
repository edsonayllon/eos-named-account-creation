import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import KeyPairing from './components/KeyPairing';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style = {{fontSize: 20, marginBottom: 20}}>
          EOS Public Key Private Key Generation
        </Text>
        <KeyPairing />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  image: {
    width: 100,
    height: 120,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
