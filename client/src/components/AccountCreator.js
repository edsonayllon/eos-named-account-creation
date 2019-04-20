import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import Input from './Input';
import config from '../config';

export default class AccountCreator extends React.Component {
  state = {
    owner: '',
    active: '',
    name: '',
    loaded: false
  }

  generateKeyPairing = async () => {
    try {
      const res = await fetch(`${config.API_ADDR}/api/keygen`, {
        method: "GET"
      });

      console.log(res);

      var keys = await res.json();
      console.log(keys)
      this.setState({
        loaded: true,
        owner: {
          private: keys.privateKeys.owner,
          public: keys.publicKeys.owner
        },
        active: {
          private: keys.privateKeys.active,
          public: keys.publicKeys.active
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  createAccount = async () => {

  }

  onInputChange = (key, value) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  render() {
    return (
      <View>
        <Input
          placeholder="Account Name"
          type='name'
          name='name'
          onChangeText={this.onInputChange}
          value={this.state.name}
        />
        <Button
          title='Create New EOS Account'
          onPress={this.generateKeyPairing}
         />
        { this.state.loaded ? (
            <View>
              <Text style={{ marginTop: 12, fontWeight: '600'}}>
                Owner Keys
              </Text>
              <Text style={{ marginTop: 12}}>
                Public Key: {this.state.owner.public}
              </Text>
              <Text style={{ marginTop: 12}}>
                Private Key: {this.state.owner.private}
              </Text>
              <Text style={{ marginTop: 12, fontWeight: '600'}}>
                Active Keys
              </Text>
              <Text style={{ marginTop: 12}}>
                Public Key: {this.state.active.public}
              </Text>
              <Text style={{ marginTop: 12}}>
                Private Key: {this.state.active.private}
              </Text>
            </View>
          ) : null
        }
      </View>
    );
  }
}
