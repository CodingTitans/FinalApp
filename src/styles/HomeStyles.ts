import { StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsList: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  newsItemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 2,
  elevation: 2
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsAuthor: {
    fontSize: 14,
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 16,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
});
