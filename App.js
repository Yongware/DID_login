import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AgeQRScreen from './src/screens/AgeQRScreen';
import SKKUQRScreen from './src/screens/SKKUQRScreen';
import LibraryQRScreen from './src/screens/LibraryQRScreen';
import PinScreen from './src/screens/PinScreen';
import PinSetScreen from './src/screens/PinSetScreen';
import CurrentPinCheck from './src/screens/CurrentPinCheck';
import NewPinCheck from './src/screens/NewPinCheckScr';

const AppNavigator = createStackNavigator(
  {//Navigator에 연결된 화면 및 각각을 지칭하는 이름 리스트
    //Navigator에선 이곳에서 지정된 이름으로 각 화면 호출
    'PIN':PinScreen,
    'Login':LoginScreen,
    'Main':MainScreen,
    'Register':RegisterScreen,
    'AgeCheck':AgeQRScreen,
    'SKKUCheck':SKKUQRScreen,
    'LibraryCheck': LibraryQRScreen,
    'CurrentPinCheck':CurrentPinCheck,
    'PinSetting':PinSetScreen,
    'NewPinCheck':NewPinCheck,
  },
  {//초기화면(PinScreen으로 시작)
    initialRouteName: 'PIN',
  }
);

export default createAppContainer(AppNavigator);