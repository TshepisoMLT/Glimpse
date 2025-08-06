import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useAuthStore } from '../../stores/useAuthStore';

export default function CreatePostScreen() {
  const { user } = useAuthStore();
  const [content, setContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<any[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedMedia(prev => [...prev, ...result.assets]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedMedia(prev => [...prev, ...result.assets]);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      multiple: true,
    });

    if (!result.canceled) {
      setSelectedMedia(prev => [...prev, ...result.assets]);
    }
  };

  const removeMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!content.trim() && selectedMedia.length === 0) {
      Alert.alert('Empty Post', 'Please add some content or media to your post.');
      return;
    }

    setIsPosting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Your post has been published!');
      setContent('');
      setSelectedMedia([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to publish post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200 flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-900">Create Post</Text>
        <TouchableOpacity 
          onPress={handlePost}
          disabled={isPosting}
          className={`px-4 py-2 rounded-full ${isPosting ? 'bg-gray-300' : 'bg-blue-500'}`}
        >
          <Text className={`font-semibold ${isPosting ? 'text-gray-500' : 'text-white'}`}>
            {isPosting ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* User Info */}
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 bg-blue-500 rounded-full mr-3" />
          <View>
            <Text className="font-semibold text-gray-900">{user?.name || 'User'}</Text>
            <Text className="text-gray-500 text-sm">Share your moment...</Text>
          </View>
        </View>

        {/* Content Input */}
        <TextInput
          className="bg-white rounded-lg p-4 mb-4 text-gray-800"
          placeholder="What's on your mind?"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Media Preview */}
        {selectedMedia.length > 0 && (
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Selected Media:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedMedia.map((media, index) => (
                <View key={index} className="relative mr-2">
                  <View className="w-20 h-20 bg-gray-200 rounded-lg" />
                  <TouchableOpacity
                    onPress={() => removeMedia(index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <Ionicons name="close" size={12} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Media Options */}
        <View className="bg-white rounded-lg p-4">
          <Text className="text-gray-700 font-semibold mb-3">Add Media:</Text>
          
          <View className="flex-row justify-around">
            <TouchableOpacity 
              onPress={pickImage}
              className="items-center"
            >
              <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center mb-2">
                <Ionicons name="images" size={24} color="#3B82F6" />
              </View>
              <Text className="text-gray-600 text-sm">Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={takePhoto}
              className="items-center"
            >
              <View className="w-12 h-12 bg-green-100 rounded-lg items-center justify-center mb-2">
                <Ionicons name="camera" size={24} color="#10B981" />
              </View>
              <Text className="text-gray-600 text-sm">Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={pickDocument}
              className="items-center"
            >
              <View className="w-12 h-12 bg-purple-100 rounded-lg items-center justify-center mb-2">
                <Ionicons name="document" size={24} color="#8B5CF6" />
              </View>
              <Text className="text-gray-600 text-sm">Document</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Post Options */}
        <View className="bg-white rounded-lg p-4 mt-4">
          <Text className="text-gray-700 font-semibold mb-3">Post Options:</Text>
          
          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="globe" size={20} color="#6B7280" />
                <Text className="text-gray-700 ml-3">Public</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="location" size={20} color="#6B7280" />
                <Text className="text-gray-700 ml-3">Add Location</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="pricetag" size={20} color="#6B7280" />
                <Text className="text-gray-700 ml-3">Add Tags</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 