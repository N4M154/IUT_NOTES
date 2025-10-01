// 210042112
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 24 }}>🍳</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Add",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 28 }}>➕</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Favorite"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 24 }}>❤️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: 24 }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
// -_- N4M154 -_-
