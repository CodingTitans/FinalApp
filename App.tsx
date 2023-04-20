import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/pages/Home';
import NewsDetail from './src/pages/NewsDetail';
import CategoryScreen from './src/pages/Category';
import CountryScreen from './src/pages/Country';
import AboutScreen from './src/pages/About';
import ProfileScreen from './src/pages/Profile';
import SearchScreen from './src/pages/Search';
import 'react-native-screens';
import LoginScreen from './src/pages/Login';
import SignUpScreen from './src/pages/SignUp';
import { Image } from 'react-native';
import AuthProvider from './src/contexts/AuthProvider';

import { ThemeProvider } from './src/themes/ThemeProvider'; 
import { ThemeContext } from './src/themes/ThemeContext';


// Define the types of the navigation stacks
type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type AppStackParamList = {
  Home: undefined;
  NewsDetail: { articleUrl: string };
  Search: undefined;
};

// Create the navigation stacks using the createStackNavigator function
const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator();

// Define the navigation stacks
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
    </AuthStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'UpToDate News' }}
      />
      <AppStack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ title: 'News Article' }}
      />
      <AppStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Search News' }}
      />
    </AppStack.Navigator>
  );
}

function AppTabNavigator() {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('./src/assets/home-active.png')
              : require('./src/assets/home-inactive.png');
          } else if (route.name === 'Category') {
            iconSource = focused
              ? require('./src/assets/category-active.png')
              : require('./src/assets/category-inactive.png');
          } else if (route.name === 'Country') {
            iconSource = focused
              ? require('./src/assets/country-active.png')
              : require('./src/assets/country-inactive.png');
          } else if (route.name === 'About') {
            iconSource = focused
              ? require('./src/assets/about-active.png')
              : require('./src/assets/about-inactive.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('./src/assets/profile-active.png')
              : require('./src/assets/profile-inactive.png');
          }

          return iconSource ? <Image source={iconSource} style={{ width: size, height: size }} /> : null;
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          padding: 10,
          height: 60,
        },
        // Customize the tab bar colors and label styles
        tabBarActiveTintColor: '#0275d8',
        tabBarInactiveTintColor: '#6b6b6b',
        tabBarLabelStyle: {
          marginBottom: 10,
        },
      })}
    >
       {/* Define the screens that are available in the tab navigator */}
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Country" component={CountryScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
          <RootStack.Screen name="App" component={AppTabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
