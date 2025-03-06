import { useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function LandingScreen() {
    const router = useRouter();

    return (
        <LinearGradient colors={["#74C369", "#2D732E"]} style={styles.container}>
            <Animated.View entering={FadeInUp.duration(1000)}>
                <Image source={require('@/assets/images/farm-logo.png')} style={styles.logo} />
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1200)} style={styles.content}>
                <Text style={styles.title}>
                    <Text style={styles.farm}>Farm</Text>
                    <Text style={styles.land}>Land</Text>
                </Text>
                <Text style={styles.subtitle}>Empowering Farmers with Smart Solutions</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1400)} style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    content: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    farm: {
        color: '#DAA520',
    },
    land: {
        color: 'gold',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 8,
    },
    buttonContainer: {
        width: '80%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D732E',
    },
});
