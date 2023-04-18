import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, UIManager } from 'react-native';

import BottomTabsNavigator from './screens/BottomTabs.navigator';
import { AppProvider } from './App.provider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App: React.FC = () => (
  <AppProvider>
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  </AppProvider>
);

export default App;
