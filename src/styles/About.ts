import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: '100%',
  },
  
  heading: {
    color: 'blue',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheading: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginBottom: 16,
  },
  contact: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
    width: '50%',
    alignSelf: 'center'
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
