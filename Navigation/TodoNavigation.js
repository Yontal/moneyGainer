import React from 'react';
import { Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {createAppContainer, createStackNavigator, createDrawerNavigator, createBottomTabNavigator} from 'react-navigation';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import ItemListsScreen from '../screens/ItemsListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ItemScreen from '../screens/ItemScreen';
import CategoriesListScreen from '../screens/CategoriesListScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import Drawer from '../components/Drawer';
import AddButton from '../components/AddButton';

import COLORS from '../constants/colors';
import BottomTab from '../components/BottomTab';

const todosStackNavigator = createStackNavigator({
    ItemsList: {
        screen: ItemListsScreen,
        navigationOptions:{
            title: 'Task Runner',
            // headerTitleStyle: { justifyContent: 'center' },
            // headerTitleStyle: { 
            //     textAlign: 'left', 
            // },
            headerStyle: {
                backgroundColor: COLORS.primaryColor
            },
        }
    },
    AddItem: {
        screen: AddItemScreen,
        navigationOptions: {
            title: 'Add task',
            headerTitleStyle: { 
                textAlign: "left",
                flex:1,
                fontFamily: 'open-sans-bold',
            },
        }
    },
    Item: {
        screen: ItemScreen,
        navigationOptions:{
            title: 'Task details',
            headerTitleStyle: { 
                textAlign: "left",
                flex:1,
                fontFamily: 'open-sans-bold',
            },
        },
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: COLORS.primaryColor,
        },
        headerTitleStyle: { 
            textAlign:"center",
            flex:1,
            fontFamily: 'open-sans-bold',
            fontSize: 20,
            letterSpacing: .15,
        },
        headerTintColor: 'white',
    }
})

const archiveStackNavigator = createStackNavigator({
    CategoriesList: {
        screen: ArchiveScreen,
        navigationOptions:{
            title: 'Archive',
            headerStyle: {
                backgroundColor: COLORS.accentColor,
            },
            headerTintColor: 'white',
        }
    },
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: COLORS.primaryColor,
        },
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1,
            fontFamily: 'open-sans-bold',
        },
    }
})

const categoriesStackNavigator = createStackNavigator(
  {
    CategoriesList: {
      screen: CategoriesListScreen,
      navigationOptions: {
        title: "Categories",
        headerStyle: {
          backgroundColor: COLORS.accentColor,
        },
        headerTintColor: "white",
      },
    },
      Category: {
        screen: CategoryScreen,
        navigationOptions: {
          title: "Category",
          headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontFamily: "open-sans-bold",
          },
          headerTintColor: "white",
        },
      },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.primaryColor,
      },
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontFamily: "open-sans-bold",
      },
    },
  }
);

const BottomTabNavRouteConfig = {
    Todos:{
        screen: todosStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Feather name="check-circle" size={25} color={tabInfo.tintColor} />},
            tabBarColor: COLORS.primaryColor,
            tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>Tasks</Text>)
        }
    },
    Add:{
      screen:() => null,
      navigationOptions: {
        tabBarIcon: props => <AddButton {...props} />
      }
    },
    //, Archive: {
    //     screen: archiveStackNavigator,
    //     navigationOptions: {
    //         tabBarIcon: (tabInfo) => {return <Feather name="archive" size={25} color={tabInfo.tintColor}  />},
    //         tabBarColor: COLORS.accentColor,
    //         tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>Archive</Text>)
    //     }
    // },
    Categories: {
        screen: categoriesStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {return <Feather name="tag" size={25} color={tabInfo.tintColor}  />},
            tabBarColor: COLORS.accentColor,
            tabBarLabel: (<Text style={{fontFamily: 'open-sans-bold'}}>Categories</Text>)
        }
    },  
}

const BottomTabNavigator = createBottomTabNavigator(BottomTabNavRouteConfig,{
    activeColor: "white",
    shifting: true,
    sceneAnimationEnabled: false,
    tabBarOptions:{
      activeBackgroundColor: COLORS.primaryColor,
      inactiveBackgroundColor: COLORS.primaryColor,
      activeTintColor: COLORS.whiteColor,
      showLabel: false,
    },
    tabBarComponent : props => <BottomTab {...props} />
})

const DrawerNavigator = createDrawerNavigator(
  {
    MealFavs: {
      screen: BottomTabNavigator,
      navigationOptions: { drawerLabel: "All tasks" },
    },
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: "rgba(0,0,0,1)",
    overlayColor: "rgba(255,255,255,.0)",
    contentOptions: {
      activeTintColor: COLORS.whiteColor,
      activeBackgroundColor: COLORS.primaryColor,
      useNativeAnimations: false,
      labelStyle: {
        fontFamily: "open-sans",
      },
    },
    contentComponent: props => <Drawer {...props} />,
    drawerType: 'front',
    hideStatusBar: false,
  }
);

export default createAppContainer(DrawerNavigator)