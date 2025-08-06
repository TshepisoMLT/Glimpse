import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: 'John Doe',
      action: 'liked your post',
      time: '2 minutes ago',
      avatar: 'bg-blue-500',
    },
    {
      id: 2,
      type: 'comment',
      user: 'Jane Smith',
      action: 'commented on your post',
      time: '5 minutes ago',
      avatar: 'bg-green-500',
    },
    {
      id: 3,
      type: 'follow',
      user: 'Mike Johnson',
      action: 'started following you',
      time: '1 hour ago',
      avatar: 'bg-purple-500',
    },
    {
      id: 4,
      type: 'mention',
      user: 'Sarah Wilson',
      action: 'mentioned you in a post',
      time: '2 hours ago',
      avatar: 'bg-pink-500',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return 'heart';
      case 'comment':
        return 'chatbubble';
      case 'follow':
        return 'person-add';
      case 'mention':
        return 'at';
      default:
        return 'notifications';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
        <Text className="text-gray-600">Stay updated with your activity</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            className="bg-white rounded-lg p-4 mb-3 flex-row items-center"
          >
            <View className={`w-12 h-12 ${notification.avatar} rounded-full mr-3 items-center justify-center`}>
              <Ionicons name={getIcon(notification.type) as any} size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900">
                <Text className="font-semibold">{notification.user}</Text>
                {' '}{notification.action}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">{notification.time}</Text>
            </View>
            <TouchableOpacity className="ml-2">
              <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {notifications.length === 0 && (
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="notifications-off" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4">No notifications yet</Text>
            <Text className="text-gray-400 text-center mt-2">
              When you get notifications, they'll appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 