import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <LinearGradient
      colors={['#EBF8FF', '#DBEAFE', '#BFDBFE']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.illustrationPlaceholder}>
            <Text style={styles.illustrationText}>📋</Text>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Simplify, Organize, and Conquer Your Day</Text>
          <Text style={styles.subtitle}>
            Transform your productivity with our intuitive task management app
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    marginBottom: 60,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  illustrationText: {
    fontSize: 80,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});