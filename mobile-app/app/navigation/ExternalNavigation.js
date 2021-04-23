import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import Dashboard from "../screens/DashboardScreen";
import { Platform } from "react-native";
import InternalNavigation from "./InternalNavigation";

const routes = {
  Dashboard: {
    screen: InternalNavigation,
  },
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
