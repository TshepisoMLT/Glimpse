import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useAuthStore } from '../../stores/useAuthStore';

export default function LoginScreen() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome to Glimpse</Text>
          <Text className="text-gray-600">Sign in to your account</Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-2">Email</Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-gray-900"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity className="items-end">
            <Text className="text-blue-500 font-medium">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`py-4 rounded-lg ${isLoading ? 'bg-gray-300' : 'bg-blue-500'}`}
          >
            <Text className={`text-center font-semibold ${isLoading ? 'text-gray-500' : 'text-white'}`}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Social Login */}
        <View className="space-y-3">
          <TouchableOpacity className="flex-row items-center justify-center py-3 border border-gray-300 rounded-lg">
            <Text className="text-gray-700 font-medium">Continue with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-center py-3 border border-gray-300 rounded-lg">
            <Text className="text-gray-700 font-medium">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
} 