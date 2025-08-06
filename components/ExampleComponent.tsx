import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExampleComponent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      Alert.alert('Success', 'Image selected successfully!');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (!result.canceled) {
        Alert.alert('Document Selected', `Name: ${result.assets[0].name}`);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const shareContent = async () => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync('https://expo.dev');
    }
  };

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem('example_key', 'Hello from Glimpse!');
      Alert.alert('Success', 'Data saved to AsyncStorage');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const loadFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('example_key');
      Alert.alert('Loaded Data', value || 'No data found');
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-6 text-blue-600">
        Glimpse Features Demo
      </Text>
      
      <View className="space-y-4">
        <TouchableOpacity 
          className="bg-blue-500 p-4 rounded-lg"
          onPress={pickImage}
        >
          <Text className="text-white text-center font-semibold">
            Pick Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-green-500 p-4 rounded-lg"
          onPress={pickDocument}
        >
          <Text className="text-white text-center font-semibold">
            Pick Document
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-purple-500 p-4 rounded-lg"
          onPress={shareContent}
        >
          <Text className="text-white text-center font-semibold">
            Share Content
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-orange-500 p-4 rounded-lg"
          onPress={saveToStorage}
        >
          <Text className="text-white text-center font-semibold">
            Save to Storage
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-red-500 p-4 rounded-lg"
          onPress={loadFromStorage}
        >
          <Text className="text-white text-center font-semibold">
            Load from Storage
          </Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View className="mt-4">
          <Text className="text-center text-gray-600 mb-2">
            Selected Image:
          </Text>
          <Text className="text-center text-xs text-gray-500">
            {selectedImage}
          </Text>
        </View>
      )}
    </View>
  );
} 