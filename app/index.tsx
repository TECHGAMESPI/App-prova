import React, { useRef } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const initialUrl = 'https://puzzlee.vercel.app/';

export default function App() {
  const webViewRef = useRef(null);

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
    if (!navState.canGoBack && navState.url === initialUrl) {
      // Do nothing if we're at the initial URL
      return;
    }
    if (!navState.canGoBack) {
      // If there's no page to go back to, exit the app
      BackHandler.exitApp();
    }
  };

  return (
    <WebView
      ref={webViewRef}
      style={styles.container}
      source={{ uri: initialUrl }}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
