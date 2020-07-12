import React from 'react';
import { StyleSheet, Text, View, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  errorText?: string;
}

const Input: React.FC<InputProps> = props => {
  return (
    <View style={styles.control}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} />
      {props.errorText && <Text>{props.errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  control: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default Input;
