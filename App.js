import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AgeQRScreen from './src/screens/AgeQRScreen';
import SKKUQRScreen from './src/screens/SKKUQRScreen';
import LibraryQRScreen from './src/screens/LibraryQRScreen';

const AppNavigator = createStackNavigator(
  {
    'Login':LoginScreen,
    'Main':MainScreen,
    'Register':RegisterScreen,
    'AgeCheck':AgeQRScreen,
    'SKKUCheck':SKKUQRScreen,
    'LibraryCheck': LibraryQRScreen
  },
  {
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppNavigator);
