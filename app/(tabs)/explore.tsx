import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Explore</Text>
        <Text className="text-gray-600">Discover amazing content</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Search Bar */}
        <View className="bg-white rounded-lg p-3 mb-4 flex-row items-center">
          <Ionicons name="search" size={20} color="#6B7280" />
          <Text className="text-gray-500 ml-2 flex-1">Search for posts, people, or topics...</Text>
        </View>

        {/* Trending Topics */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Trending Topics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['#photography', '#travel', '#food', '#music', '#fitness', '#art'].map((topic, index) => (
              <TouchableOpacity
                key={index}
                className="bg-blue-100 px-4 py-2 rounded-full mr-3"
              >
                <Text className="text-blue-700 font-medium">{topic}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Posts */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Featured Posts</Text>
          
          <View className="space-y-4">
            <View className="bg-white rounded-lg shadow-sm p-4">
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 bg-purple-500 rounded-full mr-3" />
                <View>
                  <Text className="font-semibold text-gray-900">Travel Explorer</Text>
                  <Text className="text-gray-500 text-sm">Featured Creator</Text>
                </View>
              </View>
              <Text className="text-gray-800 mb-3">
                Amazing sunset in Bali! 🌅 #travel #bali #sunset
              </Text>
              <View className="w-full h-32 bg-gray-200 rounded-lg mb-3" />
              <View className="flex-row justify-between">
                <Text className="text-gray-500">❤️ 156 likes</Text>
                <Text className="text-gray-500">💬 23 comments</Text>
              </View>
            </View>

            <View className="bg-white rounded-lg shadow-sm p-4">
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 bg-green-500 rounded-full mr-3" />
                <View>
                  <Text className="font-semibold text-gray-900">Food Lover</Text>
                  <Text className="text-gray-500 text-sm">Featured Creator</Text>
                </View>
              </View>
              <Text className="text-gray-800 mb-3">
                Homemade pasta recipe! 🍝 #food #cooking #recipe
              </Text>
              <View className="w-full h-32 bg-gray-200 rounded-lg mb-3" />
              <View className="flex-row justify-between">
                <Text className="text-gray-500">❤️ 89 likes</Text>
                <Text className="text-gray-500">💬 12 comments</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Categories</Text>
          
          <View className="grid grid-cols-2 gap-3">
            {[
              { name: 'Photography', icon: 'camera', color: 'bg-blue-100', textColor: 'text-blue-700' },
              { name: 'Travel', icon: 'airplane', color: 'bg-green-100', textColor: 'text-green-700' },
              { name: 'Food', icon: 'restaurant', color: 'bg-orange-100', textColor: 'text-orange-700' },
              { name: 'Music', icon: 'musical-notes', color: 'bg-purple-100', textColor: 'text-purple-700' },
              { name: 'Fitness', icon: 'fitness', color: 'bg-red-100', textColor: 'text-red-700' },
              { name: 'Art', icon: 'brush', color: 'bg-pink-100', textColor: 'text-pink-700' },
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                className={`${category.color} p-4 rounded-lg items-center`}
              >
                <Ionicons name={category.icon as any} size={32} color="#6B7280" />
                <Text className={`font-semibold mt-2 ${category.textColor}`}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Suggested Users */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Suggested Users</Text>
          
          <View className="space-y-3">
            {[
              { name: 'Sarah Wilson', handle: '@sarahw', followers: '2.5K', avatar: 'bg-pink-500' },
              { name: 'Mike Chen', handle: '@mikechen', followers: '1.8K', avatar: 'bg-blue-500' },
              { name: 'Emma Davis', handle: '@emmad', followers: '3.2K', avatar: 'bg-green-500' },
            ].map((user, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-lg p-3 flex-row items-center"
              >
                <View className={`w-12 h-12 ${user.avatar} rounded-full mr-3`} />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">{user.name}</Text>
                  <Text className="text-gray-500 text-sm">{user.handle}</Text>
                  <Text className="text-gray-500 text-sm">{user.followers} followers</Text>
                </View>
                <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full">
                  <Text className="text-white font-medium">Follow</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 