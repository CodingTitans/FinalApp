import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';

// Ignore logs that match the given strings
LogBox.ignoreLogs([
  'Found screens with the same name nested inside one another. Check:',
  'ReactImageView: Image source "null" doesn\'t exist',
  'ReactImageView: Image source "//stsci-opo.org/STScI-01GXS06496A8EC83J0S012K3PT.png" doesn\'t exist',
]);

// Register the root component of the app
AppRegistry.registerComponent('Uptodate', () => App);
