import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { authenticate } from '../../service/service';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';

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
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const [mutate, { isLoading, reset }] = useMutation(authenticate, {
    onError: err => {
      Alert.alert('An error occured', err.message, [{ text: 'Okay', onPress: reset }]);
    },
    onSuccess: res => {
      dispatch(setAuthData({ token: res.token, userId: res.userId }));
    },
  });

  const { values, touched, errors, setFieldValue, setFieldTouched, handleSubmit } = useFormik<
    AuthFormValues
  >({
    initialValues: { email: '', password: '' },
    validationSchema: authSchema,
    onSubmit: formValues => {
      mutate({ email: formValues.email, password: formValues.password, isLogin });
    },
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
              {isLoading ? (
                <ActivityIndicator color={Colors.primary} />
              ) : (
                <Button
                  title={isLogin ? 'Login' : 'Sign Up'}
                  color={Colors.primary}
                  onPress={() => handleSubmit()}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                color={Colors.accent}
                onPress={() => setIsLogin(curr => !curr)}
              />
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
