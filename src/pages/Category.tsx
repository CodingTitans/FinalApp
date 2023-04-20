import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { ThemeContext, Theme } from '../themes/ThemeContext';
import styles from '../styles/Category';

// Define types for props and news articles
type CategoryPageProps = {
  navigation: any;
};

type NewsArticle = {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string;
  published: string;
};

const API_KEY = 'ef02bdbabf04467f832048ae51ed243b';

const CategoryScreen = ({ navigation }: CategoryPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [htmlContent, setHtmlContent] = useState('');

  // Get theme from ThemeContext
  const { theme } = useContext(ThemeContext);

  // Make API call to fetch news articles based on selected category
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`
      )
      .then((response) => {
        setNewsArticles(response.data.articles.map((article: any, index: number) => ({
          id: index.toString(),
          title: article.title,
          author: article.author,
          description: article.description,
          url: article.url,
          published: article.publishedAt,
          image: article.urlToImage,
        })));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [selectedCategory]);

  const handleArticlePress = async (article: NewsArticle) => {
    setSelectedArticle(article);

    try {
      const response = await fetch(article.url);
      const html = await response.text();
      setHtmlContent(html);
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  };

  const handleWebViewClose = () => {
    setSelectedArticle(null);
    setHtmlContent('');
  };

  // Render an individual article
  const renderArticle = (article: NewsArticle) => {
    return (
      <TouchableOpacity
        key={article.id}
        style={[styles.articleContainer, { backgroundColor: theme.backgroundColor }]}
        onPress={() => handleArticlePress(article)}
      >
        <Text style={[styles.articleTitle, { color: theme.textColor }]}>{article.title}</Text>
        <Text style={[styles.articleAuthor, { color: theme.textColor }]}>{article.author}</Text>
        {article.image && (
          <Image source={{ uri: article.image }} style={styles.articleImage} />
        )}
        <Text style={[styles.articleDescription, { color: theme.textColor }]}>{article.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.pickerWrapper}>
        <Text style={[styles.pickerLabel, { color: theme.textColor }]}>Select your Category:</Text>
        <Picker
          style={[styles.picker, { color: theme.textColor }]}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="General" value="general" />
          <Picker.Item label="Business" value="business" />
          <Picker.Item label="Entertainment" value="entertainment" />
          <Picker.Item label="Health" value="health" />
          <Picker.Item label="Science" value="science" />
          <Picker.Item label="Sports" value="sports" />
          <Picker.Item label="Technology" value="technology" />
        </Picker>
      </View>
  
      {isLoading ? (
        <Text style={[styles.loadingText, { color: theme.textColor }]}>Loading...</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {newsArticles.map((article) => renderArticle(article))}
        </ScrollView>
      )}
  
      {selectedArticle && (
        <Modal visible={true} onRequestClose={handleWebViewClose} animationType="slide">
          <View style={styles.webViewContainer}>
            <TouchableOpacity onPress={handleWebViewClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, { color: theme.buttonColor }]}>Close</Text>
            </TouchableOpacity>
            <WebView source={{ html: htmlContent }} />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CategoryScreen;