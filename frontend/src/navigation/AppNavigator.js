import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LiveMonitoringScreen from '../screens/LiveMonitoringScreen';
import PayoutHistoryScreen from '../screens/PayoutHistoryscreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="LiveMonitoring" component={LiveMonitoringScreen} />
                <Stack.Screen name="PayoutHistory" component={PayoutHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}