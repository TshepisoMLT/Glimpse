# Glimpse - React Native App

A powerful React Native application built with Expo, TypeScript, and Tailwind CSS using NativeWind.

## 🚀 Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Styling**: Tailwind CSS with NativeWind v4
- **State Management**: React Hooks
- **Storage**: AsyncStorage, SecureStore
- **UI Components**: Custom components with Tailwind classes

## 📱 Features

### Core Functionality
- Image picking and manipulation
- Document selection
- Content sharing
- Local data storage
- Camera integration
- Audio recording and playback
- Video playback with thumbnails
- Push notifications
- Biometric authentication
- Background tasks
- Network monitoring
- Contact management
- File system operations

### UI/UX
- Modern design with Tailwind CSS
- Responsive layout
- Smooth animations
- Gesture handling
- High-performance lists (FlashList)
- Lottie animations support

## 🏗️ Project Structure

```
Glimpse/
├── app.json                 # Expo configuration
├── App.tsx                  # Main application component
├── global.css              # Tailwind CSS imports
├── tailwind.config.js      # Tailwind configuration
├── babel.config.js         # Babel configuration
├── tsconfig.json           # TypeScript configuration
├── components/             # Reusable components
│   └── ExampleComponent.tsx
├── types/                  # TypeScript type definitions
│   └── nativewind.d.ts
├── assets/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run android
npm run ios
npm run web
```

## 📦 Installed Packages

### Expo SDK Packages
- `expo-application` - App information and utilities
- `expo-asset` - Asset management
- `expo-audio` - Audio playback and recording
- `expo-background-task` - Background task execution
- `expo-blur` - Blur effects
- `expo-camera` - Camera functionality
- `expo-cellular` - Cellular network information
- `expo-contacts` - Contact management
- `expo-document-picker` - Document selection
- `expo-file-system` - File system operations
- `expo-image` - Image optimization
- `expo-image-manipulator` - Image editing
- `expo-image-picker` - Image selection
- `expo-local-authentication` - Biometric authentication
- `expo-navigation-bar` - Navigation bar control
- `expo-network` - Network information
- `expo-notifications` - Push notifications
- `expo-secure-store` - Secure data storage
- `expo-sharing` - Content sharing
- `expo-video` - Video playback
- `expo-video-thumbnails` - Video thumbnail generation

### React Native Community Packages
- `@react-native-async-storage/async-storage` - Local storage
- `@react-native-community/datetimepicker` - Date/time picker
- `@react-native-community/slider` - Slider component
- `@shopify/flash-list` - High-performance list
- `lottie-react-native` - Lottie animations
- `react-native-gesture-handler` - Gesture handling

### Styling
- `nativewind` - Tailwind CSS for React Native
- `tailwindcss` - CSS framework

## 🎨 Styling Guidelines

### Tailwind CSS Classes
The app uses NativeWind v4 with Tailwind CSS. All styling should be done using Tailwind classes:

```tsx
// ✅ Good - Using Tailwind classes
<View className="flex-1 bg-white p-4">
  <Text className="text-xl font-bold text-blue-600">
    Hello World
  </Text>
</View>

// ❌ Avoid - Using StyleSheet
<View style={styles.container}>
  <Text style={styles.text}>Hello World</Text>
</View>
```

### Common Patterns
- Use `flex-1` for full-screen containers
- Use `p-4`, `m-2` for spacing
- Use `bg-{color}-{shade}` for backgrounds
- Use `text-{color}-{shade}` for text colors
- Use `rounded-lg` for rounded corners

## 🔧 Configuration Files

### app.json
Contains Expo configuration including:
- App metadata (name, slug, version)
- Platform-specific settings
- Permissions for installed packages
- Plugin configurations

### tailwind.config.js
Tailwind CSS configuration with content paths for:
- App.tsx
- Components directory
- Screens directory

### babel.config.js
Babel configuration with NativeWind plugin for Tailwind CSS support.

### tsconfig.json
TypeScript configuration with:
- Strict mode enabled
- NativeWind types included
- Expo base configuration

## 🚀 Building and Deployment

### Development
```bash
npm start
```

### Building for Production
```bash
# Android
eas build --platform android

# iOS
eas build --platform ios

# Both platforms
eas build --platform all
```

## 📱 Permissions

The app requires the following permissions (configured in app.json):
- Camera access
- Microphone access
- Photo library access
- Contact access
- Face ID (iOS)
- Background playback (video)

## 🔍 Troubleshooting

### Common Issues
1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **TypeScript errors**: Check `tsconfig.json` and type definitions
3. **Tailwind not working**: Ensure `global.css` is imported in App.tsx
4. **Permission errors**: Check app.json plugin configurations

### Development Tips
- Use Expo Go app for quick testing
- Use Android Studio emulator for detailed debugging
- Use EAS Build for production builds
- Check Expo documentation for package-specific issues

## 🤖 AI Development Context

This project is designed for AI-assisted development. Key considerations:

### Code Style
- Use TypeScript for all new files
- Use Tailwind classes for styling
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling

### File Organization
- Keep components in the `components/` directory
- Use descriptive file and component names
- Group related functionality together
- Maintain clean separation of concerns

### Package Usage
- All installed packages are ready to use
- Check Expo documentation for specific APIs
- Use TypeScript for better type safety
- Implement proper error boundaries

### Testing
- Test on both Android and iOS
- Use Expo Go for quick iterations
- Use physical devices for final testing
- Test all installed package functionalities

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/) 