import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { AppDispatch, RootState } from '@/store/store';
import { postRequest } from '@/constants/api'; // Import postRequest from your API utilities

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isStaff: boolean;
    role: string;
  };
}

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.user?.access);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false); // Track mount state
  const navigation = useNavigation()

  // Set mounted to true once the component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle navigation only after the component is mounted
  useEffect(() => {
    if (mounted) {
      if (token) {
        router.push('/(tabs)/home'); // Redirect to menu if logged in
      } else {
        setLoading(false); // Stop loading if not logged in
      }
    }
  }, [token, mounted, router]);

  // Function to handle login API request
  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Username and password are required!',
      });
      return;
    }

    setLoading(true); // Show loading spinner

    try {
      const response: LoginResponse = await postRequest('/token/', { username, password }, null);

      // Handle successful login
      const user = { access: response.access, refresh: response.refresh, user: response.user };

      // Store user data and token in Redux
      dispatch(setUser(user));

      // Navigate to the menu screen
      navigation.navigate('Home');

    } catch (error : any) {
      console.error('Login failed', error);

      let errorMessage = 'An error occurred, please try again.';

      // Handle different types of errors
      if (error.response) {
        // Backend error, check for specific error details
        if (error.response.status === 400) {
          errorMessage = 'Invalid username or password';
        } else if (error.response.status === 401) {
          errorMessage = 'Unauthorized access';
        } else {
          errorMessage = error.response.data.detail || 'Server error occurred';
        }
      } else if (error.request) {
        // Network error (no response from server)
        errorMessage = 'Network error, please check your internet connection';
      } else {
        // Other errors (e.g., wrong configuration)
        errorMessage = 'An unexpected error occurred';
      }

      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: errorMessage,
          position: 'top',
        });
      }, 1000);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

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
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Toast />
      </Animated.View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74C369',
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
    elevation: 5,
    shadowColor: '#000',
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
});
