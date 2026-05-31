import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { ColorValue } from 'react-native';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

type TabIconProps = {
  color: ColorValue;
  size: number;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F7942',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <Ionicons name={'home-outline' as IoniconsName} size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: '기록',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <Ionicons name={'add-circle-outline' as IoniconsName} size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: '가족',
          tabBarIcon: ({ color, size }: TabIconProps) => (
            <Ionicons name={'people-outline' as IoniconsName} size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
