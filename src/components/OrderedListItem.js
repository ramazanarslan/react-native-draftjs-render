/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import DraftJsText from './DraftJsText';

const styles = StyleSheet.create({
  orderedListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderedListItemNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

const OrderedListItem = (props) => {
  const {
    counter,
    separator,
    customStyles,
    depth,
    defaultMarginLeft,
  } = props;

  const orderedListItemCustomStyleContainer = customStyles && customStyles.orderedListItemContainer;
  const orderedListItemCustomStyleNumber = customStyles && customStyles.orderedListItemNumber;

  const marginLeft = (
    orderedListItemCustomStyleNumber && orderedListItemCustomStyleNumber.marginLeft)
    ? (depth + 1) * orderedListItemCustomStyleNumber.marginLeft : (depth + 1) * defaultMarginLeft;

  return (
    <View style={[styles.orderedListItemContainer, orderedListItemCustomStyleContainer]}>
      <Text
        style={[styles.orderedListItemNumber, orderedListItemCustomStyleNumber, { marginLeft }]}
      >
        {counter}
        {separator}
      </Text>
      <DraftJsText
        {...props}
      />
    </View>
  );
};

OrderedListItem.defaultProps = {
  counter: 1,
  depth: 0,
  separator: '.',
  defaultMarginLeft: 8,
};

export default OrderedListItem;
