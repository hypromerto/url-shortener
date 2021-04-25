import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import DashboardScreen from "../screens/DashboardScreen";
import PostGenScreen from "../screens/PostGenScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import KeysScreen from "../screens/KeysScreen";

const routes = {
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      headerLeft: () => {null}
    }
  },
  PostGen: {
    screen: PostGenScreen
  },
  Keys: {
    screen: KeysScreen
  },
  Analytics: {
    screen: AnalyticsScreen,
    navigationOptions: {
      headerLeft: () => {null}
    }
  }
};

const options = {
};

const AppNavigator = createStackNavigator(routes, options);
export default createAppContainer(AppNavigator);
