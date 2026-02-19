/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

const getItemType = (item) => {
  if (item.style) {
    if (Array.isArray(item.style)) {
      return item.style.map((i) => i.toLowerCase());
    }
    return item.style.toLowerCase();
  }
  return '';
};

export default getItemType;
