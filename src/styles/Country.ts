import { StyleSheet } from 'react-native';
import { Theme } from '../themes/ThemeContext';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,

  },
  picker: {
    flex: 1,
  },
  articleContainer: {
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
    elevation: 2,
    marginHorizontal: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleAuthor: {
    fontSize: 14,
    marginBottom: 8,
  },
  articleContent: {
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  webViewCloseButton: {
    padding: 10,
    backgroundColor: '#ccc',
  },
  webViewCloseButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default styles;
