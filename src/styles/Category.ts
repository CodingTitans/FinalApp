import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fff',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    justifyContent: 'center',
  },
  pickerWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 100
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
    
  },
  picker: {
    height: 30,
    width: '80%',
    marginBottom:30
  },
  articleContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleAuthor: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 8,
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },

  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    zIndex: 1001,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  loadingText: {
    textAlign: 'center',
    marginTop: 16,
  },

});

export default styles;
