import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  StartScreen,
  Homepage,
  Prisplan,
  ChooseActivity,
  DrivingLesson,
  Signs,
  SignsCategory,
  GoogleMaps,
  LocationInput,
} from "./components/importFil";

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
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Prisplan" component={Prisplan} />
        <Stack.Screen name="ChooseActivity" component={ChooseActivity} />
        <Stack.Screen name="Signs" component={Signs} />
        <Stack.Screen name="DrivingLesson" component={DrivingLesson} />
        <Stack.Screen name="SignsCategory" component={SignsCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
