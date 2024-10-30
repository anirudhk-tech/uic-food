import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tertiary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          borderTopColor: theme.colors.tertiary,
          borderTopWidth: 1,
          backgroundColor: theme.colors.primary,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="create_auth"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="login_auth"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="about_you"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarLabelStyle: [styles.labelStyle, { color: theme.colors.tertiary }],
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={'home'} color={focused ? theme.colors.tertiary : theme.colors.secondary}/>
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: 'Montserrat',
  }  
})
