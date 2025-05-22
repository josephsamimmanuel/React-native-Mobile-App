import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { Image, ImageBackground, Text, StyleSheet } from 'react-native'

const TabIcon = ({ icon, title, focused }: { icon: any, title: string, focused: boolean }) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={styles.focusedTab}
        imageStyle={styles.focusedTabImage}
      >
        <Image source={icon} style={styles.icon} />
        <Text style={styles.focusedText}>{title}</Text>
      </ImageBackground>
    )
  } else {
    return (
      <Image source={icon} style={styles.icon} />
    )
  }
}

const styles = StyleSheet.create({
  focusedTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  focusedTabImage: {
    borderRadius: 24,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
  focusedText: {
    fontSize: 12,
    color: '#151312',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  tabBar: {
    backgroundColor: '#0f0D23',
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 40,
    position: 'absolute',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#221f3d',
  },
  tabBarItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} title="Search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.save} title="Saved" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} title="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}

export default _Layout