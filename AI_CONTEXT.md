# AI Development Context for Glimpse

This file provides specific context and instructions for AI-assisted development of the Glimpse React Native app.

## 🎯 Project Overview

**Glimpse** is a React Native app built with Expo SDK 53, TypeScript, and Tailwind CSS (NativeWind v4). The app is designed to showcase various mobile capabilities including media handling, storage, authentication, and more.

## 🏗️ Architecture Guidelines

### Component Structure
```tsx
// ✅ Preferred component structure
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ComponentProps {
  // Define props interface
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState<Type>(initialValue);

  useEffect(() => {
    // Side effects
  }, []);

  const handlePress = () => {
    // Event handlers
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-semibold text-gray-800">
        Component Content
      </Text>
    </View>
  );
}
```

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Utilities: `camelCase.ts` (e.g., `apiHelpers.ts`)
- Types: `camelCase.types.ts` (e.g., `user.types.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)
- Stores: `useStoreName.ts` (e.g., `useAuthStore.ts`)
- Services: `serviceName.ts` (e.g., `api.ts`)

## 📦 Available Packages & Usage

### State Management (Zustand)
```tsx
// Store definition
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreState {
  data: any[];
  isLoading: boolean;
}

interface StoreActions {
  setData: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
  fetchData: () => Promise<void>;
}

export const useStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      data: [],
      isLoading: false,
      
      setData: (data) => set({ data }),
      setLoading: (loading) => set({ isLoading: loading }),
      
      fetchData: async () => {
        set({ isLoading: true });
        try {
          const response = await ApiService.get('/data');
          set({ data: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'store-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Using the store in components
const { data, isLoading, fetchData } = useStore();
```

### HTTP Requests (Axios)
```tsx
// API service with interceptors
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

// API service class
export class ApiService {
  static async get<T>(url: string): Promise<T> {
    const response = await api.get(url);
    return response.data;
  }
  
  static async post<T>(url: string, data: any): Promise<T> {
    const response = await api.post(url, data);
    return response.data;
  }
}
```

### Media & File Handling
```tsx
// Image Picker
import * as ImagePicker from 'expo-image-picker';
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 1,
});

// Document Picker
import * as DocumentPicker from 'expo-document-picker';
const result = await DocumentPicker.getDocumentAsync({
  type: '*/*',
});

// File System
import * as FileSystem from 'expo-file-system';
const fileInfo = await FileSystem.getInfoAsync(fileUri);

// Image Manipulation
import * as ImageManipulator from 'expo-image-manipulator';
const manipulatedImage = await ImageManipulator.manipulateAsync(
  imageUri,
  [{ resize: { width: 300 } }],
  { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
);
```

### Storage
```tsx
// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', 'value');
const value = await AsyncStorage.getItem('key');

// SecureStore
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('key', 'value');
const value = await SecureStore.getItemAsync('key');
```

### Camera & Audio
```tsx
// Camera
import { Camera, CameraType } from 'expo-camera';
const [permission, requestPermission] = Camera.useCameraPermissions();

// Audio
import { Audio } from 'expo-av';
const { sound } = await Audio.Sound.createAsync(require('./assets/audio.mp3'));
await sound.playAsync();
```

### Authentication & Security
```tsx
// Local Authentication
import * as LocalAuthentication from 'expo-local-authentication';
const result = await LocalAuthentication.authenticateAsync({
  promptMessage: 'Authenticate to continue',
});
```

### Notifications
```tsx
// Push Notifications
import * as Notifications from 'expo-notifications';
const token = await Notifications.getExpoPushTokenAsync({
  projectId: 'your-project-id',
});
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes (NativeWind v4)
```tsx
// Layout
className="flex-1"           // flex: 1
className="flex-row"         // flexDirection: 'row'
className="justify-center"   // justifyContent: 'center'
className="items-center"     // alignItems: 'center'

// Spacing
className="p-4"             // padding: 16
className="m-2"             // margin: 8
className="px-6"            // paddingHorizontal: 24
className="py-3"            // paddingVertical: 12

// Colors
className="bg-blue-500"     // backgroundColor: '#3b82f6'
className="text-white"      // color: '#ffffff'
className="border-gray-300" // borderColor: '#d1d5db'

// Typography
className="text-xl"         // fontSize: 20
className="font-bold"       // fontWeight: 'bold'
className="text-center"     // textAlign: 'center'

// Effects
className="rounded-lg"      // borderRadius: 8
className="shadow-md"       // elevation: 4 (Android), shadow (iOS)
className="opacity-50"      // opacity: 0.5
```

### Common Component Patterns
```tsx
// Button
<TouchableOpacity 
  className="bg-blue-500 p-4 rounded-lg active:bg-blue-600"
  onPress={handlePress}
>
  <Text className="text-white text-center font-semibold">
    Button Text
  </Text>
</TouchableOpacity>

// Card
<View className="bg-white p-4 rounded-lg shadow-md m-2">
  <Text className="text-lg font-semibold text-gray-800">
    Card Title
  </Text>
  <Text className="text-gray-600 mt-2">
    Card content goes here
  </Text>
</View>

// Input Container
<View className="bg-gray-100 p-4 rounded-lg">
  <TextInput 
    className="text-gray-800 text-lg"
    placeholder="Enter text..."
    placeholderTextColor="#9ca3af"
  />
</View>
```

## 🔧 Error Handling Patterns

```tsx
// Async function with error handling
const handleAsyncOperation = async () => {
  try {
    const result = await someAsyncOperation();
    // Handle success
  } catch (error) {
    console.error('Operation failed:', error);
    Alert.alert('Error', 'Operation failed. Please try again.');
  }
};

// Permission handling
const requestPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Required', 'Please grant permission to access photos.');
    return false;
  }
  return true;
};

// API error handling with Zustand
const handleApiCall = async () => {
  const { setLoading, setError } = useStore();
  setLoading(true);
  try {
    const data = await ApiService.get('/endpoint');
    // Handle success
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## 📱 Platform Considerations

### iOS Specific
- Use `expo-local-authentication` for Face ID/Touch ID
- Handle safe area with `SafeAreaView`
- Consider iOS-specific UI patterns

### Android Specific
- Handle back button with `BackHandler`
- Use `StatusBar` for status bar styling
- Consider Android-specific permissions

### Cross-Platform
- Test on both platforms
- Use platform-specific code when necessary
- Handle different screen sizes and densities

## 🚀 Performance Guidelines

### List Rendering
```tsx
// Use FlashList for large lists
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  estimatedItemSize={100}
/>
```

### Image Optimization
```tsx
// Use expo-image for optimized image loading
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  className="w-full h-48 rounded-lg"
  contentFit="cover"
  transition={200}
/>
```

### Memory Management
- Clean up resources in `useEffect` cleanup
- Cancel subscriptions and timers
- Release audio/video resources

## 🔍 Debugging Tips

### Console Logging
```tsx
console.log('Debug info:', { data, state });
console.warn('Warning message');
console.error('Error message');
```

### Development Tools
- Use React Native Debugger
- Enable remote debugging
- Use Flipper for advanced debugging

## 📋 Code Quality Standards

### TypeScript
- Use strict mode
- Define interfaces for all props
- Use proper type annotations
- Avoid `any` type

### React Native Best Practices
- Use functional components
- Implement proper error boundaries
- Handle loading states
- Implement proper navigation patterns

### Testing Considerations
- Test on physical devices
- Test all installed package functionalities
- Test error scenarios
- Test performance with large datasets

## 🎯 AI Development Instructions

When developing for this project:

1. **Always use TypeScript** for new files
2. **Use Tailwind classes** for styling (no StyleSheet)
3. **Follow the component structure** shown above
4. **Implement proper error handling** for all async operations
5. **Test on both platforms** when possible
6. **Use the installed packages** appropriately
7. **Maintain clean code organization**
8. **Add proper TypeScript types** for all functions and components
9. **Use modern React patterns** (hooks, functional components)
10. **Follow the project's file naming conventions**
11. **Use Zustand for state management** instead of Context API
12. **Use Axios for HTTP requests** with proper interceptors
13. **Implement proper loading states** in Zustand stores
14. **Handle authentication tokens** automatically with Axios interceptors

## 📚 Key Resources

- [Expo SDK 53 Documentation](https://docs.expo.dev/versions/v53.0.0/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 🔄 Update Instructions

When adding new features:
1. Update this context file if needed
2. Update README.md with new features
3. Test on both platforms
4. Ensure all TypeScript types are correct
5. Follow the established patterns 