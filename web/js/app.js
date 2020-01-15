"use strict";

const productGridModule = (() => {
  // data
  const API_URL = "http://localhost:3000/products/";
  let selectedColorsArray = [];
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
   * Get particular value from property of given array items
   * @param {array} arr - An array with data objects
   * @param {string} prop - A particular property value to get in the resulted array
   * @return {array}
   */
  const getPropertyArray = (arr, prop) => {
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

  /**
   * Get sorted array by particular property from existing data
   * @param {array} arr  - An array with data objects
   * @param {string} sortBy  - A particular property to sort from
   * @param {string} sortHow  - A particular keyword to sort how
   * @return {array}
   */
  const getSortedArray = (arr, sortBy, sortHow) => {
    const sortedArr = Array.from(arr);
    //console.log(sortedArr);
    return sortedArr.sort((a, b) => {
      switch (sortHow) {
        case "ASC":
          return a[sortBy] - b[sortBy];
          break;
        case "DESC":
          return b[sortBy] - a[sortBy];
          break;
        // don't like this implement, should be easier
        default:
          console.error("Sorted as NONE");
      }
    });
  };

  /**
   * Modify array from checked color inputs
   * @param {array} arr  - An array with colors
   */
  const modifyArrayFromElements = arr => {
    const target = event.target;

    if (target.checked) {
      arr.push(target.value);
    } else {
      const idx = arr.indexOf(target.value);
      arr.splice(idx, 1);
    }
  };

  /**
   * Get data from API and render it into the DOM on initialization
   */
  const init = async () => {
    const productsData = await API_DATA(API_URL);
    const colorsArray = getPropertyArray(productsData, "color");
    const colorsUniqueArray = getUniqueArray(colorsArray).sort();

    // copy data to the temporary array
    temporaryArray = [...productsData];

    render(temporaryArray, productsTemplate, productsContainer);
    render(colorsUniqueArray, colorsTemplate, colorsContainer);

    const filterByColor = () => {
      modifyArrayFromElements(selectedColorsArray);
      const productsByColorArray = getFilteredArray(
        productsData,
        "color",
        selectedColorsArray
      );

      productsByColorArray.length
        ? (temporaryArray = [...productsByColorArray])
        : (temporaryArray = [...productsData]);

      filterByPrice();
      render(temporaryArray, productsTemplate, productsContainer);
    };

    const filterByPrice = () => {
      const NONE = "NONE";
      const ASC = "ASC";
      const DESC = "DESC";
      const selectedOptionValue =
        priceSelect.options[priceSelect.selectedIndex].value;
      console.log("before:", temporaryArray);

      switch (selectedOptionValue) {
        case NONE:
          temporaryArray = [...getSortedArray(temporaryArray, "id", ASC)];
          render(
            getSortedArray(temporaryArray, "id", ASC),
            productsTemplate,
            productsContainer
          );
          break;
        case ASC:
          temporaryArray = [...getSortedArray(temporaryArray, "price", ASC)];
          render(
            getSortedArray(temporaryArray, "price", ASC),
            productsTemplate,
            productsContainer
          );
          break;
        case DESC:
          temporaryArray = [...getSortedArray(temporaryArray, "price", DESC)];
          render(
            getSortedArray(temporaryArray, "price", DESC),
            productsTemplate,
            productsContainer
          );
          break;
        default:
          console.error("Check option values for the correct result");
      }
      console.log(temporaryArray);
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
