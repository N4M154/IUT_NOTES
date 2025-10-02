import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => await logout(),
        },
      ]);
    } catch (e) {
      console.warn("logout error", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.info}>Email: {user?.email}</Text>
        <Text style={styles.info}>Name: {user?.displayName || 'Not set'}</Text>
      </View>

      <View style={styles.logout}>
        <MaterialIcons 
          name="logout" 
          size={30} 
          color="red" 
          onPress={handleLogout}
          style={{ padding: 10 }}
        />      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop:50,
    backgroundColor:"white"
    
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: 'center'
  },
  section: {
    backgroundColor: 'lightyellow',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    
  },
 
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black'
  },
  logout:{
    alignItems:"center",
  }
});
