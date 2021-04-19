import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

const routes = {
  Welcome: {
    screen: WelcomeScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
};

const options = {
  headerMode: "none",
  navigationOptions: {
    headerVisible: false,
  },
};

const AppNavigator = createStackNavigator(routes, options);
export default createAppContainer(AppNavigator);
