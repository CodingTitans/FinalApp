import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, Linking, TextInput, ScrollView } from 'react-native';

import { styles } from '../styles/About';
import { ThemeContext } from '../themes/ThemeContext';

const About = () => {
   // State variables to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emailRef = useRef<TextInput>(null);
  const messageRef = useRef<TextInput>(null);

  // Accessing the current theme from the theme context
  const { theme } = useContext(ThemeContext);

  const handlePhonePress = () => {
    Linking.openURL('tel:+17057777777');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:codingtitans0@gmail.com');
  };

   // Function to handle form submission
  const handleSendPress = () => {
    setName('');
    setEmail('');
    setMessage('');
    // Reset input focus
    emailRef.current?.blur();
    messageRef.current?.blur();
  };

  // Function to handle name input submit
  const handleNameSubmitEditing = () => {
    emailRef.current?.focus();
  };

    // Function to handle email input submit
  const handleEmailSubmitEditing = () => {
    messageRef.current?.focus();
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.heading, { color: theme.textColor }]}>About UptoDate News</Text>
      <Text style={[styles.description, { color: theme.textColor }]}>
        Stay notified... get breaking news FIRST from UptoDate News. With a new updated design, the UptoDate News app lets you
        watch all the top news stories from our newsroom including your preference news, sports, Technology and latest headlines.
        There are special features on main stories and key categories to explore to go further in depth.
      </Text>

      <Text style={[styles.subheading, { color: theme.textColor }]}>Reach Us</Text>
      <TouchableOpacity onPress={handlePhonePress}>
        <Text style={[styles.contact, { color: theme.textColor }]}>+1 705 777-7777</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={[styles.contact, { color: theme.textColor }]}>codingtitans0@gmail.com</Text>
      </TouchableOpacity>

      <Text style={[styles.subheading, { color: theme.textColor }]}>Drop Us A Line</Text>
      <Text style={[styles.label, { color: theme.textColor }]}>Your Name</Text>
      <TextInput
        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
        placeholder="Enter your name"
        onChangeText={setName}
        value={name}
        returnKeyType="next"
        onSubmitEditing={handleNameSubmitEditing}
        blurOnSubmit={false}
        placeholderTextColor={theme.textColor}
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Email Address</Text>
      <TextInput
        ref={emailRef}
        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
        placeholder="Enter your email address"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={handleEmailSubmitEditing}
        blurOnSubmit={false}
        placeholderTextColor={theme.textColor}
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Your Message</Text>
      <TextInput
        ref={messageRef}
        style={[styles.input, { height: 100, color: theme.textColor, borderColor: theme.borderColor }]}
        placeholder="Enter your message"
        onChangeText={setMessage}
        value={message}
        multiline
        placeholderTextColor={theme.textColor}
      />
      <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.buttonColor }]} onPress={handleSendPress}>
  <Text style={[styles.sendButtonText, { color: 'white' }]}>Send</Text>
</TouchableOpacity>

    </ScrollView>
  );
};

export default About;