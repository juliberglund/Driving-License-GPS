// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./StartScreen";
import Homepage from "./homepage";
import Prisplan from "./Prisplan";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Prisplan" component={Prisplan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
