import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CategoryProps} from '@/models/category';
import {viewportWidth} from '@/utils/index';

interface CategoryItemProps {
  isEdit: boolean;
  selected: boolean;
  disabled?: boolean;
  data: CategoryProps;
}

export const parentWidth = viewportWidth - 10;
export const itemWidth = parentWidth / 4;
export const itemHeight = 50
export const margin = 5

class CategoryItem extends React.Component<CategoryItemProps> {
  render() {
    const {data, isEdit, disabled, selected} = this.props;
    return (
      <View key={data.id} style={styles.itemWrapper}>
        <View style={[styles.item, disabled && styles.disabled]}>
          <Text>{data.name}</Text>
          {isEdit && !disabled && (
            <View style={styles.icon}>
              <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    width: itemWidth,
    height: 50,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: margin,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    lineHeight: 15,
  },
});

export default CategoryItem;
