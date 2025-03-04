import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form validation
  const handleLogin = () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Email and password are required!',
      });
      return;
    }

    // Proceed with authentication (replace with actual login logic)
    router.push('/menu')
  };

  return (
    <LinearGradient colors={["#74C369", "#2D732E"]} style={styles.container}>
   

      <Animated.View entering={FadeInDown.duration(1200)} style={styles.card}>
        
      <Animated.View entering={FadeInUp.duration(1000)}>
        <Image source={require('@/assets/images/farm-logo.png')} style={styles.logo} />
      </Animated.View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>

      <Toast />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D732E',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#2D732E',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D732E',
  },
  registerText: {
    color: '#2D732E',
    textAlign: 'center',
    marginTop: 10,
  },
});
