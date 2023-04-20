import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Alert, ToastAndroid } from 'react-native';
import { LoginStyles as styles } from '../styles/LoginStyles';
import { AuthService } from '../services/AuthService';

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const authService = new AuthService();

  // Validates the form and creates a new account
  const handleSignUp = async () => {
    let hasError = false;

    if (!email) {
      setErrorText('Email is required');
      hasError = true;
    }

    if (!password) {
      setErrorText('Password is required');
      hasError = true;
    }

    if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
      hasError = true;
    }
    
    // If there are no errors, attempt to sign up the user
    if (!hasError) {
      try {
        await authService.signUp(email, password);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Account created successfully. Please log in.', ToastAndroid.SHORT);
        } else {
          Alert.alert('Account created successfully', 'Please log in.');
        }
        navigation.goBack();
      } catch (error) {
        setErrorText('Failed to create account. Please try again.');
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Page</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        autoCapitalize="none"
      />

      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'gray' }}>Already have an account? <Text style={{ color: '#007AFF', textDecorationLine: 'underline' }}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
