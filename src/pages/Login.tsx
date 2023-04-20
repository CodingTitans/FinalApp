import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Alert, ToastAndroid, Image } from 'react-native';
import { LoginStyles as styles } from '../styles/LoginStyles';
import { AuthService } from '../services/AuthService';
import AuthContext from '../contexts/AuthContext';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const authService = new AuthService();

  const { setUsername, setEmail: setGlobalEmail } = useContext(AuthContext);

  // Function to handle the login logic
  const handleLogin = async () => {
    try {
      const userData = await authService.login(email, password);
      setUsername(userData.username);
      setGlobalEmail(userData.email);
      navigation.navigate('App');

      // Display success message on Android using toast
      if (Platform.OS === 'android') {
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
      }

      // Display success message on iOS using alert
      if (Platform.OS === 'ios') {
        Alert.alert('Success', 'Login successful');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

   // Function to handle navigation to sign up screen
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError('');
  };

  // Function to validate email and password input fields
  const handleValidation = () => {
    let hasError = false;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    return !hasError;
  };

   // Function to handle login button press
  const handleLoginButtonPress = () => {
    if (handleValidation()) {
      handleLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />

      <Text style={styles.title}>Login Page</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={handleEmailChange}
        placeholder="Email"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLoginButtonPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 10 }} onPress={handleSignUp}>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'gray' }}>
          Don't have an account?{' '}
          <Text style={{ color: '#007AFF', textDecorationLine: 'underline' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
   

    </View>
  );
};

export default LoginScreen;
