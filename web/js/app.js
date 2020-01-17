"use strict";

const productGridModule = (() => {
  // data
  const API_URL = "http://localhost:3000/products/";
  let temporaryArray = [];

  // cached DOM
  const productsContainer = document.querySelector(".js-products");
  const productsTemplate = document.querySelector("#products-template")
    .innerHTML;
  const colorsContainer = document.querySelector(".js-filters__colors");
  const colorsTemplate = document.querySelector("#colors-template").innerHTML;
  const priceSelect = document.querySelector(".js-filters__select");

  // functions
  /**
   * Get data from API
   * @param {string} url - An URL to get data
   * @return {object} - JSON with data
   */
  const API_DATA = async url => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    return responseJSON;
  };

  /**
   * Render HTML with Handlebars
   * @param {object} dataToRender - An object with data to render from
   * @param {Element} templateToRender - A handlebars template from HTML
   * @param {string} containerToAppend - A DOMElement to render into
   */
  const render = (dataToRender, templateToRender, containerToAppend) => {
    const template = Handlebars.compile(templateToRender);
    const data = {
      items: dataToRender
    };
    const result = template(data);
    containerToAppend.innerHTML = "";
    containerToAppend.innerHTML = result;
  };

  /**
   * Get filtered array by particular property
   * @param {array} arr - An array with data objects
   * @param {string} prop - A particular property to filter from
   * @return {array}
   */
  const getFilteredByPropertyArray = (arr, prop) => {
    return arr.filter(item => {
      return item[prop];
    });
  };

  /**
   * Get particular value from property of given array items
   * @param {array} arr - An array with data objects
   * @param {string} prop - A particular property value to get in the resulted array
   * @return {array}
   */
  const getPropertyValueArray = (arr, prop) => {
    return arr.map(item => {
      return item[prop];
    });
  };

  /**
   * Get unique values from given array
   * @param {array} arr - An array with data objects
   * @return {array}
   */
  const getUniqueArray = arr => {
    return arr.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
  };

  /**
   * Get filtered values of particular property from given array by another searching array
   * @param {array} dataArr - An array with data objects
   * @param {string} prop - A particular property value to get in the resulted array
   * @param {array} valArr - An arrays of values to search from
   * @return {array}
   */
  const getFilteredArray = (dataArr, prop, valArr) => {
    return dataArr.filter(item => {
      return valArr.includes(item[prop]);
    });
  };

  // don't like this implementation, should be easier
  /**
   * Get sorted array by particular property from existing data
   * @param {array} arr  - An array with data objects
   * @param {string} sortBy  - A particular property to sort from
   * @param {string} sortHow  - A particular keyword to sort how
   * @return {array}
   */
  const getSortedArray = (arr, sortBy, sortHow) => {
    const sortedArr = Array.from(arr);
    return sortedArr.sort((a, b) => {
      switch (sortHow) {
        case "ASC":
          return a[sortBy] - b[sortBy];
        case "DESC":
          return b[sortBy] - a[sortBy];
        default:
          console.error("Sorting method isn't correct");
      }
    });
  };

  /**
   * Get data from API and render it into the DOM on initialization
   */
  const init = async () => {
    const productsData = await API_DATA(API_URL);
    const colorsArray = getPropertyValueArray(productsData, "color");
    const colorsUniqueArray = getUniqueArray(colorsArray).sort();

    // copy data to the temporary array
    temporaryArray = [...productsData];

    render(temporaryArray, productsTemplate, productsContainer);
    render(colorsUniqueArray, colorsTemplate, colorsContainer);

    const colorsElements = colorsContainer.querySelectorAll(
      "input[type=checkbox]"
    );
    const colorsElementsArray = Array.prototype.slice.call(colorsElements);

    const filterByColor = () => {
      const colorsElementsChecked = getFilteredByPropertyArray(
        colorsElementsArray,
        "checked"
      );
      const colorsValuesChecked = getPropertyValueArray(
        colorsElementsChecked,
        "value"
      );

      const productsByColorArray = getFilteredArray(
        productsData,
        "color",
        colorsValuesChecked
      );

      productsByColorArray.length
        ? (temporaryArray = [...productsByColorArray])
        : (temporaryArray = [...productsData]);

      //refactor this
      filterByPrice();
      render(temporaryArray, productsTemplate, productsContainer);
    };

    const filterByPrice = () => {
      const NONE = "NONE";
      const ASC = "ASC";
      const DESC = "DESC";
      const selectedOptionValue =
        priceSelect.options[priceSelect.selectedIndex].value;

      switch (selectedOptionValue) {
        case NONE:
          const sortedByIDAndASC = getSortedArray(temporaryArray, "id", ASC);
          temporaryArray = [...sortedByIDAndASC];
          render(sortedByIDAndASC, productsTemplate, productsContainer);
          break;
        case ASC:
          const sortedByPriceAndASC = getSortedArray(
            temporaryArray,
            "price",
            ASC
          );
          temporaryArray = [...sortedByPriceAndASC];
          render(sortedByPriceAndASC, productsTemplate, productsContainer);
          break;
        case DESC:
          const sortedByPriceAndDESC = getSortedArray(
            temporaryArray,
            "price",
            DESC
          );
          temporaryArray = [...sortedByPriceAndDESC];
          render(sortedByPriceAndDESC, productsTemplate, productsContainer);
          break;
        default:
          console.error("Check option values for the correct result");
      }
    };

    // events
    colorsContainer.addEventListener("change", filterByColor);
    priceSelect.addEventListener("change", filterByPrice);
  };

  return {
    init
  };
})();

productGridModule.init();
