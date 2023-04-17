import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home.screen';
import History from './History.screen';
import Analytics from './Analytics.screen';
import Theme from '../theme';
import { HomeIcon, HistoryIcon, AnalyticsIcon } from '../components/Icons';

const BottomTabs = createBottomTabNavigator();

const renderIcon = (routeName: string, color: string, size: number) => {
  if (routeName === 'Home') {
    return <HomeIcon color={color} size={size} />;
  }
  if (routeName === 'History') {
    return <HistoryIcon color={color} size={size} />;
  }

  if (routeName === 'Analytics') {
    return <AnalyticsIcon color={color} size={size} />;
  }

  return null;
};

const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Theme.colorBlue,
        tabBarInactiveTintColor: Theme.colorGrey,
        tabBarShowLabel: false,
        headerTitleStyle: { fontFamily: Theme.fontFamilyBold },
        tabBarIcon: ({ color, size }) => renderIcon(route.name, color, size),
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Fancy Charts' }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigator;
