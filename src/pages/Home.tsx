import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { HomeStyles } from '../styles/HomeStyles';
import NewsDetail from '../pages/NewsDetail';
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

type HomeScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Make API request to fetch news data
    axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
      )
      .then((response) => {
        setNewsData(response.data.articles.map((article: any, index: number) => ({
          id: index.toString(),
          title: article.title,
          author: article.author,
          description: article.description,
          url: article.url,
          published: article.publishedAt,
          image: article.urlToImage,
        })));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Renders an individual news item in the FlatList
  const renderNewsItem = ({ item }: { item: NewsArticle }) => {
    return (
      <TouchableOpacity
        style={[HomeStyles.newsItemContainer, { backgroundColor: theme.backgroundColor }]}
        onPress={() => navigation.navigate('NewsDetail', { articleUrl: item.url })}
      >
        <Image
          style={HomeStyles.newsImage}
          source={{ uri: item.image }}
          defaultSource={require('../assets/default-news-image.png')}
        />
        <Text style={[HomeStyles.newsTitle, { color: theme.textColor }]}>{item.title}</Text>
        <Text style={[HomeStyles.newsAuthor, { color: theme.textColor }]}>{item.author}</Text>
        <Text style={[HomeStyles.newsDescription, { color: theme.textColor }]}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

// Handles onPress event for search icon
  const handleSearchIconPress = () => {
    navigation.navigate('Search');
  };

  const [toggle, setToggle] = useState(false);

// Sets options for the navigation header
React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={handleSearchIconPress}>
        <Image
          style={{ marginRight: 15, width: 30, height: 30, tintColor: theme.textColor }}
          source={require('../assets/search-icon.png')}
        />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ marginLeft: 15, color: theme.textColor }}>Toggle Theme</Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: theme.backgroundColor,
    },
    headerTintColor: theme.textColor,
  });
  
}, [navigation, theme, toggle, toggleTheme]);

  

  return (
    <View style={[HomeStyles.container, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={HomeStyles.newsList}
      />
    </View>
  );
};

export default HomeScreen;
