import React from 'react'
import { TextInput } from 'react-native'

const styles = {
  input: {
    height: 45,
    marginBottom: 15,
    borderWidth: 1,
    paddingLeft:5,
    fontSize: 16,
    borderColor: 'black',
    color:'black',
  }
}

export default ({ placeholder, onChangeText, type, ...props }) => (
  <TextInput
    autoCapitalize='none'
    autoCorrect={false}
    style={[styles.input]}
    placeholder={placeholder}
    placeholderTextColor="#666"
    onChangeText={value => onChangeText(type, value)}
    underlineColorAndroid='transparent'
    {...props}
  />
)
