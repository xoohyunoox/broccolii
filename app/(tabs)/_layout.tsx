import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { ColorValue } from 'react-native';
import { colors } from '../../theme/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

type TabIconProps = {
  color: ColorValue;
  size: number;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarInactiveTintColor: colors.tabBar.inactive,
        tabBarStyle: {
          backgroundColor: colors.tabBar.background,
          borderTopColor: colors.tabBar.border,
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
