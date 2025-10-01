//210042112
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Create Post",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// -_- N4M154 -_-