import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthView from "../modules/Auth/AuthView";
import RegisterView from "../modules/Auth/RegisterView";
import HomeView from "../modules/Home/HomeView";
import AddReviewView from "../modules/AddReview/AddReviewView";
import ProfileView from "../modules/Profile/ProfileView";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={AuthView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterView}
        options={{ title: "Create Account" }}
      />
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="AddReview" component={AddReviewView} />
      <Stack.Screen name="Profile" component={ProfileView} />
    </Stack.Navigator>
  );
}

/* -_- N4M154 -_- */
