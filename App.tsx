import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import './global.css';
import ExampleComponent from './components/ExampleComponent';
import AuthDemo from './components/AuthDemo';

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <View className="pt-12 pb-4 bg-blue-600">
        <Text className="text-xl font-bold text-white text-center">
          Welcome to Glimpse!
        </Text>
        <Text className="text-white text-center px-4 mt-2">
          Your powerful React Native app with Tailwind CSS, Zustand & Axios
        </Text>
      </View>
      
      <ScrollView className="flex-1">
        <AuthDemo />
        <ExampleComponent />
      </ScrollView>
      
      <StatusBar style="light" />
    </View>
  );
}
