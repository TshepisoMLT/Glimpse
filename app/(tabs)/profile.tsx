import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../stores/useAuthStore';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const stats = [
    { label: 'Posts', value: '24' },
    { label: 'Followers', value: '1.2K' },
    { label: 'Following', value: '856' },
  ];

  const menuItems = [
    { icon: 'settings', title: 'Settings', action: () => {} },
    { icon: 'bookmark', title: 'Saved Posts', action: () => {} },
    { icon: 'heart', title: 'Liked Posts', action: () => {} },
    { icon: 'share', title: 'Share Profile', action: () => {} },
    { icon: 'help-circle', title: 'Help & Support', action: () => {} },
    { icon: 'information-circle', title: 'About', action: () => {} },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-white p-4 border-b border-gray-200">
          <View className="flex-row items-center mb-4">
            <View className="w-20 h-20 bg-blue-500 rounded-full mr-4" />
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">{user?.name || 'User'}</Text>
              <Text className="text-gray-500">@{user?.email?.split('@')[0] || 'user'}</Text>
              <Text className="text-gray-600 mt-1">Photography enthusiast | Travel lover</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around py-4 border-t border-gray-200">
            {stats.map((stat, index) => (
              <View key={index} className="items-center">
                <Text className="text-xl font-bold text-gray-900">{stat.value}</Text>
                <Text className="text-gray-500 text-sm">{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity className="bg-blue-500 py-2 rounded-lg mt-2">
            <Text className="text-white text-center font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View className="bg-white mt-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.action}
              className={`flex-row items-center p-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <Ionicons name={item.icon as any} size={20} color="#6B7280" />
              <Text className="text-gray-900 ml-3 flex-1">{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Posts Grid */}
        <View className="bg-white mt-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Recent Posts</Text>
          
          <View className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} className="aspect-square bg-gray-200 rounded-lg" />
            ))}
          </View>
        </View>

        {/* Account Actions */}
        <View className="bg-white mt-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Account</Text>
          
          <TouchableOpacity className="flex-row items-center p-3 border border-gray-200 rounded-lg mb-2">
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            <Text className="text-gray-900 ml-3 flex-1">Privacy Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-3 border border-gray-200 rounded-lg mb-2">
            <Ionicons name="notifications" size={20} color="#F59E0B" />
            <Text className="text-gray-900 ml-3 flex-1">Notification Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-3 border border-red-200 rounded-lg">
            <Ionicons name="trash" size={20} color="#EF4444" />
            <Text className="text-red-600 ml-3 flex-1">Delete Account</Text>
            <Ionicons name="chevron-forward" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="bg-white mt-4 p-4">
          <Text className="text-center text-gray-500 text-sm">
            Glimpse v1.0.0
          </Text>
          <Text className="text-center text-gray-400 text-xs mt-1">
            © 2024 Glimpse. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 