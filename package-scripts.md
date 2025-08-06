# Package Scripts Reference

This file documents all available npm scripts in the Glimpse project and their purposes.

## Available Scripts

### Development Scripts
```bash
npm start
# Starts the Expo development server
# Opens Metro bundler and shows QR code for Expo Go
# Equivalent to: expo start

npm run android
# Starts the app on Android device/emulator
# Opens Android emulator if available
# Equivalent to: expo start --android

npm run ios
# Starts the app on iOS device/simulator
# Requires macOS and Xcode
# Equivalent to: expo start --ios

npm run web
# Starts the app in web browser
# Opens development server in browser
# Equivalent to: expo start --web
```

### Build Scripts (EAS)
```bash
# Development Build
eas build --platform android --profile development
eas build --platform ios --profile development

# Preview Build
eas build --platform android --profile preview
eas build --platform ios --profile preview

# Production Build
eas build --platform android --profile production
eas build --platform ios --profile production

# Build for all platforms
eas build --platform all
```

### Utility Scripts
```bash
# Clear Metro cache
npx expo start --clear

# Install Expo CLI globally
npm install -g @expo/cli

# Check project health
npx expo-doctor

# Update Expo SDK
npx expo install --fix

# Generate TypeScript types
npx tsc --noEmit
```

### Testing Scripts
```bash
# Run tests (if configured)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting
```bash
# Run ESLint
npx eslint .

# Run ESLint with auto-fix
npx eslint . --fix

# Run Prettier (if installed)
npx prettier --write .

# Check Prettier formatting
npx prettier --check .
```

### Package Management
```bash
# Install dependencies
npm install

# Install specific package
npm install package-name

# Install Expo package
npx expo install package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Audit packages for security
npm audit

# Fix security issues
npm audit fix
```

### Development Workflow

#### Starting Development
1. `npm install` - Install dependencies
2. `npm start` - Start development server
3. Scan QR code with Expo Go app

#### Building for Testing
1. `eas build --platform android --profile development`
2. Install APK on device or emulator
3. Test functionality

#### Building for Production
1. `eas build --platform all --profile production`
2. Submit to app stores

#### Troubleshooting
1. `npx expo start --clear` - Clear cache
2. `npx expo-doctor` - Check project health
3. `npm install --force` - Force reinstall dependencies

### Environment Variables
```bash
# Set environment variables
export EXPO_PUBLIC_API_URL=https://api.example.com

# Load from .env file
npx expo start --env-file .env
```

### Debugging
```bash
# Enable remote debugging
# Shake device or press Cmd+D (iOS) / Cmd+M (Android)

# Open React Native Debugger
# Install and run React Native Debugger separately

# Use Flipper for advanced debugging
# Install Flipper and connect to device
```

### Performance Monitoring
```bash
# Enable performance monitoring
npx expo start --dev-client

# Use Flipper for performance profiling
# Install Flipper and use performance tools
```

### Platform-Specific Commands

#### Android
```bash
# Open Android Studio
open -a "Android Studio"

# Start Android emulator
emulator -avd Pixel_4_API_30

# Install APK directly
adb install app-release.apk
```

#### iOS (macOS only)
```bash
# Open Xcode
open -a Xcode

# Start iOS simulator
xcrun simctl boot "iPhone 14"

# Install app on simulator
xcrun simctl install booted /path/to/app.app
```

### EAS Build Commands
```bash
# Configure EAS
eas build:configure

# View build status
eas build:list

# Download build
eas build:download

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Development Tips

#### Quick Development Cycle
1. Make code changes
2. Save file (auto-reloads)
3. Test on device/emulator
4. Repeat

#### Debugging Workflow
1. Add console.log statements
2. Use React Native Debugger
3. Check Metro bundler logs
4. Use device developer tools

#### Performance Optimization
1. Use FlashList for large lists
2. Optimize images with expo-image
3. Implement proper memory management
4. Use React DevTools for profiling

#### Testing Checklist
- [ ] Test on physical Android device
- [ ] Test on physical iOS device
- [ ] Test all installed package features
- [ ] Test error scenarios
- [ ] Test performance with large data
- [ ] Test accessibility features
- [ ] Test different screen sizes
- [ ] Test network connectivity issues

### Common Issues and Solutions

#### Metro Bundler Issues
```bash
# Clear cache
npx expo start --clear

# Reset Metro cache
npx react-native start --reset-cache
```

#### TypeScript Errors
```bash
# Check TypeScript
npx tsc --noEmit

# Update types
npm install @types/react-native
```

#### Package Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

#### Build Issues
```bash
# Check EAS configuration
eas build:configure

# Update EAS CLI
npm install -g @expo/eas-cli

# Check build logs
eas build:list
```

This reference should help with all common development tasks and troubleshooting scenarios. 