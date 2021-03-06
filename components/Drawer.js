import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, useWindowDimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { filterTodos } from '../store/actions/todo';
import MainButton from '../components/MainButton';
import CategoryModel from '../models/Category';
import i18n from 'i18n-js';
// import NothingToDisplay from '../components/EmptyCategoriesPlug';

import COLOR from '../constants/colors';

const Category = props => {
    return (
      <TouchableOpacity
        onPress={
            () => {props.onSelectedHandler(props.category.id)}
        }
        activeOpacity={.8}
        style={{
          ...styles.categoryItem,
          minHeight: 40,
          width: 250,
          borderWidth: 0,
          borderBottomWidth: 1,
          flexDirection: "row",
          backgroundColor: COLOR.whiteColor,
        }}
      >
        <View style={{width: 205}}>
          <Text style={{ fontFamily: "open-sans", fontSize: 16, letterSpacing: 0.5 }}>
            {props.category ? props.category.title : null}
          </Text>
        </View>
        <View
          style={{
            borderColor: props.category ? props.category.color : null,
            borderWidth: 1,
            height: 15,
            width: 25,
            borderRadius: 4,
            backgroundColor: props.category ? props.category.color : null,
          }}
        ></View>
      </TouchableOpacity>
    );
}

const Drawer = props => {
    const categories = useSelector(state => state.categories.categories);
    const selectedCategory = useSelector(state => state.todoItems.filterSettings);
    const dispatch = useDispatch();

    const clearFilter = () => {
        dispatch(filterTodos());
        props.navigation.navigate({routeName:'ItemsList', params: {filter: false}});
    }

    const onSelectedHandler = (id) => {
        dispatch(filterTodos(id));
        props.navigation.navigate({routeName:'ItemsList', params: {filter: true, clearFilter: clearFilter}});
        props.navigation.closeDrawer();
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            color: COLOR.whiteColor,
            padding: 10,
            paddingTop: 35,
            fontFamily: "open-sans-bold",
            fontSize: 20,
            letterSpacing: 0.15,
          }}
        >
          {i18n.t("categories")}
        </Text>
        {/* <NothingToDisplay /> */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Category onSelectedHandler={onSelectedHandler} category={item} />
          )}
        />
        {selectedCategory !== '' ? 
        <MainButton
          styles={{
            width: 250,
            borderRadius: 8,
            margin: 10,
            marginBottom: 0,
            backgroundColor: COLOR.greyColor,
          }}
          textStyle={{
            fontFamily: "open-sans",
            fontSize: 16,
            letterSpacing: 1.25,
            textTransform: "uppercase",
            color: COLOR.blackColor,
          }}
          onPressHandler={() => {
            props.navigation.closeDrawer();
            clearFilter()
          }}
        >
          {i18n.t("dropFilters")}
        </MainButton> : null
        }
        <MainButton
          styles={{
            width: 250,
            borderRadius: 8,
            margin: 10,
            backgroundColor: COLOR.whiteColor,
          }}
          textStyle={{
            fontFamily: "open-sans",
            fontSize: 16,
            letterSpacing: 1.25,
            textTransform: "uppercase",
            color: COLOR.blackColor,
          }}
          onPressHandler={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate({
              routeName: "Category",
              params: {
                category: new CategoryModel(
                  (+new Date()).toString(),
                  "",
                  "#C7C7C7"
                ),
                newCategory: true,
              },
            });
          }}
        >
          {i18n.t("addCategory")}
        </MainButton>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        borderColor: COLOR.accentColor,
        borderRadius: 8,
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 10,
    }
});

export default Drawer;