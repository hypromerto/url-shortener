import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Dashboard from "../screens/DashboardScreen";
import { Platform } from "react-native";

const routes = {
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerLeft: () => {null}
    }
  }
};

const options = {
};

const AppNavigator = createStackNavigator(routes, options);
export default createAppContainer(AppNavigator);
