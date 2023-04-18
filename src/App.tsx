import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StyleSheet, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomTabsNavigator from './screens/BottomTabs.navigator';
import { AppProvider } from './App.provider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App: React.FC = () => (
  <GestureHandlerRootView style={styles.gestureView}>
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  gestureView: {
    flex: 1,
  },
});

export default App;
