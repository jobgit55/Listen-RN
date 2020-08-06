import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {CategoryProps} from '@/models/category';
import _ from 'lodash';
import {DragSortableView} from 'react-native-drag-sort';
import CategoryItem, {
  parentWidth,
  itemWidth,
  itemHeight,
  margin,
} from './CategoryItem';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategories: category.myCategories,
    categories: category.categories,
    isEdit: category.isEdit,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface CategoryComponentProps extends ModelState {
  navigation: RootStackNavigation;
}
interface CategoryComponentState {
  myCategories: CategoryProps[];
  scrollEnabled: boolean;
}

const fixedItems = [0, 1];

class Category extends React.Component<
  CategoryComponentProps,
  CategoryComponentState
> {
  state = {
    myCategories: this.props.myCategories,
    scrollEnabled: true,
  };

  constructor(props: CategoryComponentProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />,
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false,
      },
    });
  }

  onSubmit = () => {
    const {dispatch, navigation, isEdit} = this.props;
    const {myCategories} = this.state;
    dispatch({
      type: 'category/toggle',
      payload: {
        myCategories,
      },
    });
    if (isEdit) {
      navigation.goBack();
    }
  };

  onLongPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };

  onPress = (item: CategoryProps, index: number, selected: boolean) => {
    const {isEdit} = this.props;
    const {myCategories} = this.state;
    const disabled = fixedItems.indexOf(index) > -1;
    if (disabled) return;
    if (isEdit) {
      if (selected) {
        this.setState({
          myCategories: myCategories.filter(
            (selectedItem) => selectedItem.id !== item.id,
          ),
        });
      } else {
        this.setState({
          myCategories: myCategories.concat([item]),
        });
      }
    }
  };

  onClickItem = (data: CategoryProps[], item: CategoryProps) => {
    this.onPress(item, data.indexOf(item), true);
  };
  onDataChange = (data: CategoryProps[]) => {
    this.setState({
      myCategories: data,
    });
  };

  renderItem = (item: CategoryProps, index: number) => {
    const {isEdit} = this.props;
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <CategoryItem
        key={item.id}
        data={item}
        disabled={disabled}
        isEdit={isEdit}
        selected
      />
    );
  };
  renderUnSelectedItem = (item: CategoryProps, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.onLongPress}>
        <CategoryItem data={item} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  };

  render() {
    const {categories, isEdit} = this.props;
    const {myCategories, scrollEnabled} = this.state;
    const clasifyGroup = _.groupBy(categories, (item) => item.classify);
    return (
      <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          <DragSortableView
            dataSource={myCategories}
            fixedItems={fixedItems}
            renderItem={this.renderItem}
            sortable={isEdit}
            keyExtractor={(item) => item.id}
            onDataChange={this.onDataChange}
            parentWidth={parentWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
            marginChildrenTop={margin}
            onClickItem={this.onClickItem}
            onDragStart={() => {
              this.setState({
                scrollEnabled: false,
              });
            }}
            onDragEnd={() => {
              this.setState({
                scrollEnabled: true,
              });
            }}
          />
        </View>
        <View>
          {Object.keys(clasifyGroup).map((classify) => {
            return (
              <View key={classify}>
                <Text style={styles.classifyName}>{classify}</Text>
                <View style={styles.classifyView}>
                  {clasifyGroup[classify].map((item, index) => {
                    if (
                      myCategories.find(
                        (selectedItem) => selectedItem.id === item.id,
                      )
                    ) {
                      return null;
                    }
                    return this.renderUnSelectedItem(item, index);
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default connector(Category);
