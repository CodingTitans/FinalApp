import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../styles/Profile';
import AuthContext from '../contexts/AuthContext';
import { AuthService } from '../services/AuthService';
import { ThemeContext } from '../themes/ThemeContext';


interface ProfileScreenProps {
  navigation: any;
}

// Get the user information from the AuthContext
const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { username, email, setUsername, setEmail } = useContext(AuthContext);
  const authService = new AuthService();
  const [editedUsername, setEditedUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);


  // Logout function that will remove the user information from the AuthContext and navigate back to the Auth stack
  const handleLogout = async () => {
    try {
      await authService.logout();
      setUsername('');
      setEmail('');
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  const handleSaveUsername = () => {
    setUsername(editedUsername);
    setIsEditing(false);
  };

  const handleEditUsername = () => {
    setIsEditing(true);
  };

  

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.mainContent}>
        <Text style={[styles.title, { color: theme.textColor }]}>User Profile</Text>
        <Text style={[styles.userInfo, { color: theme.textColor }]}>Email: {email}</Text>

        {isEditing ? (
          <>
            <TextInput
  style={[styles.input, { color: theme.textColor }]}
  value={editedUsername}
  onChangeText={setEditedUsername}
  placeholder="Username"
  autoCapitalize="none"
/>


            <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={handleSaveUsername}>
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.userInfo, { color: theme.textColor }]}>Username: {username}</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={handleEditUsername}>
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>Edit Username</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

            <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.buttonColor }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutButtonText, { color: theme.buttonText }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

