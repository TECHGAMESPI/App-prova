import React, { useRef, useState } from 'react';
import { StyleSheet, BackHandler, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const initialUrl = 'https://puzzlee.vercel.app/';

export default function App() {
  const webViewRef = useRef(null);
  const [isInitialPage, setIsInitialPage] = useState(true);

  const onBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // Prevents default back button behavior
    }
    return false;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  const handleNavigationStateChange = (navState) => {
    setIsInitialPage(navState.url === initialUrl);
    if (!navState.canGoBack && navState.url === initialUrl) {
      // Do nothing if we're at the initial URL
      return;
    }
    if (!navState.canGoBack) {
      // If there's no page to go back to, exit the app
      BackHandler.exitApp();
    }
  };

  const handleExitPress = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: initialUrl }}
        onNavigationStateChange={handleNavigationStateChange}
      />
      {isInitialPage && (
        <TouchableOpacity style={styles.button} onPress={handleExitPress}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff4d4d', // Red background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.8, // Add shadow for iOS
    shadowRadius: 2, // Add shadow for iOS
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});
