import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import WebView from 'react-native-webview';
import { ThemeContext, Theme } from '../themes/ThemeContext';
import styles from '../styles/Country';

const API_KEY = 'ef02bdbabf04467f832048ae51ed243b';

type NewsArticle = {
  title: string;
  author: string;
  description: string;
  url: string;
  published: string;
  image: string;
};


const CountryScreen = () => {
  const [country, setCountry] = useState('au');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticleUrl, setSelectedArticleUrl] = useState<string | undefined>(undefined);

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Fetch news articles for the selected country
  useEffect(() => {
    setLoading(true);
    fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles.map((article: any, index: number) => ({
          title: article.title,
          author: article.author,
          description: article.description,
          url: article.url,
          published: article.publishedAt,
          image: article.urlToImage,
        })));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [country]);

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
  };

  const handleArticlePress = (url: string) => {
    setSelectedArticleUrl(url);
  };

  const handleWebViewClose = () => {
    setSelectedArticleUrl(undefined);
  };

  const renderArticle = ({ item }: { item: NewsArticle }) => {
    return (
      <TouchableOpacity style={[styles.articleContainer, { backgroundColor: theme.backgroundColor }]} onPress={() => handleArticlePress(item.url)}>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.articleImage}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.articleTitle, { color: theme.textColor }]}>{item.title}</Text>
        <Text style={[styles.articleAuthor, { color: theme.textColor }]}>{item.author}</Text>
        <Text style={[styles.articleContent, { color: theme.textColor }]}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  if (selectedArticleUrl) {
    return (
      <View style={styles.webViewContainer}>
        <TouchableOpacity onPress={handleWebViewClose} style={styles.webViewCloseButton}>
          <Text style={[styles.webViewCloseButtonText, { color: theme.buttonColor }]}>Close</Text>
        </TouchableOpacity>
        <WebView source={{ uri: selectedArticleUrl }} originWhitelist={['*']} />
      </View>
    );
  }
  
  

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.pickerContainer, { borderColor: theme.borderColor }]}>

        <Text style={[styles.pickerLabel, { color: theme.textColor }]}>Select a country:</Text>
        <Picker
          selectedValue={country}
          style={[styles.picker, { color: theme.pickerColor }]}
          onValueChange={handleCountryChange}
        >
          <Picker.Item label="Australia" value="au" />
          <Picker.Item label="Brazil" value="br" />
          <Picker.Item label="Canada" value="ca" />
          <Picker.Item label="China" value="cn" />
          <Picker.Item label="France" value="fr" />
          <Picker.Item label="Germany" value="de" />
          <Picker.Item label="India" value="in" />
          <Picker.Item label="Russia" value="ru" />
          <Picker.Item label="United States" value="us" />
          <Picker.Item label="United Kingdom" value="gb" />
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.textColor} style={styles.loading} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={renderArticle}
        />
      )}
    </View>
  );
};

export default CountryScreen;


