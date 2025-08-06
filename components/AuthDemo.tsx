import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useAuthStore } from '../stores/useAuthStore';
import { ApiService } from '../services/api';

export default function AuthDemo() {
  const { user, isAuthenticated, isLoading, login, logout, register } = useAuthStore();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('John Doe');

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password, name);
      Alert.alert('Success', 'Registration successful!');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    Alert.alert('Success', 'Logged out successfully!');
  };

  const testApiCall = async () => {
    try {
      // This would make a real API call if you have a backend
      // const response = await ApiService.getProfile();
      Alert.alert('API Test', 'API call would be made here with authentication token');
    } catch (error) {
      Alert.alert('Error', 'API call failed');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-center mb-6 text-blue-600">
        Zustand & Axios Demo
      </Text>

      {/* Authentication Status */}
      <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Authentication Status
        </Text>
        <Text className="text-gray-600">
          Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
        </Text>
        {user && (
          <Text className="text-gray-600">
            User: {user.name} ({user.email})
          </Text>
        )}
        <Text className="text-gray-600">
          Loading: {isLoading ? 'Yes' : 'No'}
        </Text>
      </View>

      {/* Login Form */}
      {!isAuthenticated && (
        <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Login / Register
          </Text>
          
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-3"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-3"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-4"
            placeholder="Name (for registration)"
            value={name}
            onChangeText={setName}
          />
          
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="flex-1 bg-blue-500 p-3 rounded-lg"
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-white text-center font-semibold">
                {isLoading ? 'Loading...' : 'Login'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 bg-green-500 p-3 rounded-lg"
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text className="text-white text-center font-semibold">
                {isLoading ? 'Loading...' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Authenticated Actions */}
      {isAuthenticated && (
        <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Authenticated Actions
          </Text>
          
          <TouchableOpacity
            className="bg-purple-500 p-3 rounded-lg mb-3"
            onPress={testApiCall}
          >
            <Text className="text-white text-center font-semibold">
              Test API Call
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-red-500 p-3 rounded-lg"
            onPress={handleLogout}
          >
            <Text className="text-white text-center font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* State Information */}
      <View className="bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          State Information
        </Text>
        
        <Text className="text-gray-600 mb-2">
          • Zustand provides global state management
        </Text>
        <Text className="text-gray-600 mb-2">
          • State persists across app restarts
        </Text>
        <Text className="text-gray-600 mb-2">
          • Axios handles HTTP requests with interceptors
        </Text>
        <Text className="text-gray-600 mb-2">
          • Automatic token management
        </Text>
        <Text className="text-gray-600">
          • Error handling and retry logic
        </Text>
      </View>
    </ScrollView>
  );
} 