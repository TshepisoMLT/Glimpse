import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/useAuthStore';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Fetch new posts here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Glimpse</Text>
        <Text className="text-gray-600">Welcome back, {user?.name || 'User'}!</Text>
      </View>

      {/* Feed */}
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Sample Posts */}
        <View className="p-4">
          <View className="bg-white rounded-lg shadow-sm mb-4 p-4">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-blue-500 rounded-full mr-3" />
              <View>
                <Text className="font-semibold text-gray-900">John Doe</Text>
                <Text className="text-gray-500 text-sm">2 hours ago</Text>
              </View>
            </View>
            <Text className="text-gray-800 mb-3">
              Just captured this amazing sunset! 🌅 #photography #nature
            </Text>
            <View className="w-full h-48 bg-gray-200 rounded-lg mb-3" />
            <View className="flex-row justify-between">
              <Text className="text-gray-500">❤️ 24 likes</Text>
              <Text className="text-gray-500">💬 5 comments</Text>
            </View>
          </View>

          <View className="bg-white rounded-lg shadow-sm mb-4 p-4">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-green-500 rounded-full mr-3" />
              <View>
                <Text className="font-semibold text-gray-900">Jane Smith</Text>
                <Text className="text-gray-500 text-sm">5 hours ago</Text>
              </View>
            </View>
            <Text className="text-gray-800 mb-3">
              Check out this new coffee shop I discovered! ☕️ #coffee #lifestyle
            </Text>
            <View className="w-full h-48 bg-gray-200 rounded-lg mb-3" />
            <View className="flex-row justify-between">
              <Text className="text-gray-500">❤️ 18 likes</Text>
              <Text className="text-gray-500">💬 3 comments</Text>
            </View>
          </View>

          <View className="bg-white rounded-lg shadow-sm mb-4 p-4">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-purple-500 rounded-full mr-3" />
              <View>
                <Text className="font-semibold text-gray-900">Mike Johnson</Text>
                <Text className="text-gray-500 text-sm">1 day ago</Text>
              </View>
            </View>
            <Text className="text-gray-800 mb-3">
              Amazing concert last night! 🎵 #music #live #concert
            </Text>
            <View className="w-full h-48 bg-gray-200 rounded-lg mb-3" />
            <View className="flex-row justify-between">
              <Text className="text-gray-500">❤️ 42 likes</Text>
              <Text className="text-gray-500">💬 8 comments</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 