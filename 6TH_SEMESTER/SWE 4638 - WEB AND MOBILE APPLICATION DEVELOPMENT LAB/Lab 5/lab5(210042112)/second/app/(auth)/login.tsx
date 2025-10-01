//210042112

import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      console.log('Error', 'Please fill in all fields');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        await AsyncStorage.setItem('authToken', user.email);
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        
        router.replace('/(tabs)');
      } else {
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.log('Something went wrong');
    }
  };

  const goToRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <View 
      style={styles.container} 
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#20B2AA" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email && <Feather name="check" size={16} color="#20B2AA" style={styles.checkIcon} />}
        </View>
        
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#20B2AA" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Feather name="info" size={16} color="#20B2AA" style={styles.infoIcon} />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={goToRegister}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#20B2AA',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 30,
    paddingBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  checkIcon: {
    marginLeft: 10,
  },
  infoIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#20B2AA',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#20B2AA',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: '#20B2AA',
    paddingVertical: 15,
    borderRadius: 10,
  },
  signUpButtonText: {
    color: '#20B2AA',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


// -_- N4M154 -_-