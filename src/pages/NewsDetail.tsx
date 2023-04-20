import React, { useContext, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from '../themes/ThemeContext';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/NewsDetail';

// Define the types for the RootStackParamList
type RootStackParamList = {
  Home: undefined;
  NewsDetail: { articleUrl: string };
};

// Define the types for the props of the NewsDetail component
type NewsDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'NewsDetail'>;
  route: RouteProp<RootStackParamList, 'NewsDetail'>;
};

const NewsDetail = ({ navigation, route }: NewsDetailScreenProps) => {
  const { articleUrl } = route.params;
  const { theme } = useContext(ThemeContext);
  const [htmlContent, setHtmlContent] = useState('');

  // Function to close the WebView and go back to the previous screen
  const handleWebViewClose = () => {
    navigation.goBack();
  };

  // Function to fetch the HTML content of the article
  const fetchHtmlContent = async () => {
    try {
      const response = await fetch(articleUrl);
      const html = await response.text();
      setHtmlContent(html);
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  };

  useEffect(() => {
    fetchHtmlContent();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {htmlContent && <WebView source={{ html: htmlContent }} />}
      <TouchableOpacity
        style={[styles.closeButton, { backgroundColor: theme.cardColor }]}
        onPress={handleWebViewClose}
      >
        <Text style={[styles.closeButtonText, { color: theme.textColor }]}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewsDetail;
