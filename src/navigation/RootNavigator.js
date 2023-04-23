import React from 'react';
import {Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import screens
import Movies from '../screens/Movies';
import Favorites from '../screens/Favorites';
const Tab = createBottomTabNavigator();
const tabBarOptions = {
  showLabel: false,
  activeTintColor: '#9381ff',
  style: {
    height: '10%',
  },
};
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name="Trending Movies"
          component={Movies}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../assets/movie-active.png')}
                  style={{width: 26, height: 26}}
                />
              ) : (
                <Image
                  source={require('../assets/movie-inactive.png')}
                  style={{width: 26, height: 26}}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Your favorite list"
          component={Favorites}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../assets/favorite-active.png')}
                  style={{width: 26, height: 26}}
                />
              ) : (
                <Image
                  source={require('../assets/favorite-inactive.png')}
                  style={{width: 26, height: 26}}
                />
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
