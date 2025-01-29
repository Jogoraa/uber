import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import "../global.css";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { LogBox, useColorScheme } from "react-native";
import { tokenCache } from "@/lib/auth";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
}

LogBox.ignoreLogs(["Clerk:"]);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]); // ✅ Moved outside the conditional return

  // ✅ Always call Hooks at the top
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Permission Status:", status);

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required.");
      return false;
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log("User Location:", location.coords);
    return true;
  };

  useEffect(() => {
    requestLocationPermission();
  }, []); // ✅ Ensures it's only called once

  if (!fontsLoaded) {
    return <View />; // ✅ Instead of returning `null`
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
