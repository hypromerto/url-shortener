import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import DashboardScreen from "../screens/DashboardScreen";
import PostGenScreen from "../screens/PostGenScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";

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
  Analytics: {
    screen: AnalyticsScreen
  }
};

const options = {
};

const AppNavigator = createStackNavigator(routes, options);
export default createAppContainer(AppNavigator);
