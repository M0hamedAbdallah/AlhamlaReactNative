import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useSelector } from 'react-redux';
import { selectMyToken } from '@/store/auth/authSlice';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const token = useSelector(selectMyToken);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          headerShown: false,
          // tabBarIcon: ({ color }) => (token)? (<Image source={{ uri: './assets/images/strong.jpg' }} style={{ width: 50, height: 50 }} />):(<TabBarIcon name="user" color={color} />),
          tabBarIcon: ({ color }) => <Image source={require('../../assets/images/strong.jpg')} style={{ width: 30, height: 30 }} />,
        }}
      />
    </Tabs>
  );
}
