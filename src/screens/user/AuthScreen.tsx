import React from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

interface AuthFormValues {
  email: string;
  password: string;
}

const authSchema = yup.object<AuthFormValues>({
  email: yup.string().required('Email is required!').email('Please enter a valid email address.'),
  password: yup
    .string()
    .required('Password is required!')
    .min(5, 'Password should have atleast 5 characters'),
});

const AuthScreen = () => {
  const { values, touched, errors, setFieldValue, setFieldTouched } = useFormik<AuthFormValues>({
    initialValues: { email: '', password: '' },
    validationSchema: authSchema,
    onSubmit: () => {},
  });

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              label="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={t => setFieldValue('email', t)}
              onBlur={() => setFieldTouched('email')}
              errorText={touched.email ? errors.email : undefined}
            />

            <Input
              label="Password"
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              value={values.password}
              onChangeText={t => setFieldValue('password', t)}
              onBlur={() => setFieldTouched('password')}
              errorText={touched.password ? errors.password : undefined}
            />

            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Switch to Sign Up" color={Colors.accent} onPress={() => {}} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
