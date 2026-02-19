/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

const sortInteger = (a, b) => a - b;
const isLink = (element) => Object.prototype.hasOwnProperty.call(element, 'key');

const convertStylesIntoNumbers = (styles) => {
  const numbers = [];
  styles.forEach((style) => {
    numbers.push(style.offset);
    numbers.push(style.offset + style.length);
  });
  return numbers;
};

const createArrayWithSegments = (numbersList) => {
  const segmentList = [];
  const numbersListLength = numbersList.length;
  for (let i = 0; i < numbersListLength - 1; i += 1) {
    segmentList.push([numbersList[i], numbersList[i + 1] - numbersList[i]]);
  }
  return segmentList;
};

const addTypeToSegments = (segments, originalStyles) => {
  const objectList = [];
  segments.forEach((segment) => {
    const types = [];
    originalStyles.forEach((style) => {
      const length = segment[0] + segment[1];
      if (length > style.offset && length <= style.offset + style.length) {
        if (isLink(style)) {
          types.push('link');
          segment.push(style.key);
        } else {
          types.push(style.style);
        }
      }
    });
    if (types.length) {
      const attr = Object.assign({}, { offset: segment[0], length: segment[1] });
      const t = types.length === 1 ? types[0] : types;
      Object.assign(attr, { style: t });
      if (segment.length === 3) Object.assign(attr, { key: segment[2] });
      objectList.push(attr);
    }
  });
  return objectList;
};

const isOverlap = (styles) => {
  let found;
  for (let i = 0; i < styles.length - 1; i += 1) {
    found = styles
      .find((item) => (
        item.offset >= styles[i].offset && item.offset <= styles[i].offset + styles[i].length));
    if (found) break;
  }
  return found;
};

const checkSingleLinkElement = (item) => {
  if (isLink(item)) {
    Object.assign(item, { style: 'link' });
  }
};

const flatAttributesList = (attrsList) => {
  if (attrsList.length === 1 || !isOverlap(attrsList)) {
    checkSingleLinkElement(attrsList[0]);
    return attrsList;
  }
  const numbersList = convertStylesIntoNumbers(attrsList);
  const sortedNumbersList = numbersList.sort(sortInteger);
  const uniqueSortedNumbersList = Array.from(new Set(sortedNumbersList));
  const segments = createArrayWithSegments(uniqueSortedNumbersList);
  const finalObject = addTypeToSegments(segments, attrsList);
  return finalObject;
};

export default flatAttributesList;
