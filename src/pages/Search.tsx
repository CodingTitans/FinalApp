import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { SearchStyles } from '../styles/Search';
import { ThemeContext } from '../themes/ThemeContext';

const API_KEY = 'ef02bdbabf04467f832048ae51ed243b';

type NewsArticle = {
  id: string;
  title: string;
  author: string;
  description: string;
  url: string;
  published: string;
  image: string;
};

type SearchPageProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};


const SearchPage = ({ navigation }: SearchPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  // Handles the search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    setIsLoading(true);
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`
      )
      .then((response) => {
        setSearchResults(response.data.articles.map((article: any, index: number) => ({
          id: `${article.title}-${index}`,
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
  };
  
  // Renders each news item in the search results
  const renderNewsItem = ({ item }: { item: NewsArticle }) => {
    return (
      <TouchableOpacity
        style={[SearchStyles.newsItemContainer, { backgroundColor: theme.backgroundColor }]}
        onPress={() => navigation.navigate('NewsDetail', { articleUrl: item.url })}
      >
        <Text style={[SearchStyles.newsTitle, { color: theme.textColor }]}>{item.title}</Text>
        <Text style={[SearchStyles.newsAuthor, { color: theme.textColor }]}>{item.author}</Text>
        <Text style={[SearchStyles.newsDescription, { color: theme.textColor }]}>{item.description}</Text>
        <View style={SearchStyles.horizontalLine} />
      </TouchableOpacity>
    );
  };

  return (
  <View style={[SearchStyles.container, { backgroundColor: theme.backgroundColor }]}>
    <Text style={[SearchStyles.heading, { color: theme.textColor }]}>Search News Here</Text>
    <View style={SearchStyles.searchContainer}>
      <TextInput
        style={[SearchStyles.searchInput, { color: theme.textColor }]}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Enter search query"
        placeholderTextColor={theme.textColor}
      />
      <TouchableOpacity
  style={[SearchStyles.searchButton, { backgroundColor: theme.buttonColor }]}
  onPress={handleSearch}
>
  <Text style={[SearchStyles.searchButtonText, { color: theme.buttonColor === '#FFFFFF' ? '#000000' : '#FFFFFF' }]}>SEARCH</Text>
</TouchableOpacity>

    </View>
    {isLoading ? (
      <Text style={{ color: theme.textColor }}>Loading...</Text>
    ) : (
      <FlatList
        data={searchResults}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={SearchStyles.newsList}
      />
    )}
  </View>
);
};

export default SearchPage;