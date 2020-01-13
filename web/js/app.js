"use strict";
/*
const productGridModule = (function($) {
  //data
  const productsUrl = "http://localhost:3000/products/";
  let filterArr = [];
  let filteredByPriceData = null;
  let filteredByColorData = null;
  let productsData = null;

  //cache DOM
  const $products = $(".js-products");
  const $productsTemplate = $("#products-template").html();
  const $colors = $(".js-filters__colors");
  const $colorsTemplate = $("#colors-template").html();
  const $priceSelect = $(".js-filters__select");

  //functions
  function renderProducts(productsArr) {
    const template = Handlebars.compile($productsTemplate);
    let data = {
      products: productsArr
    };
    const result = template(data);
    $products.html("");
    $products.append(result);
  }

  function renderColors(colorsArr) {
    const template = Handlebars.compile($colorsTemplate);

    let data = {
      colors: colorsArr
    };
    const result = template(data);
    $colors.append(result);
  }

  function getColors(data) {
    let colorsArrAll = [];
    let colorsArrUnique = [];

    data.forEach(function(element) {
      colorsArrAll.push(element.color);
    });
    console.log(colorsArrAll);
    colorsArrUnique = colorsArrAll.filter(function(val, idx, arr) {
      return arr.indexOf(val) === idx;
    });

    return colorsArrUnique.sort();
  }

  function getFilterValues(event) {
    if (event.target.checked) {
      filterArr.push(event.target.value);
    } else {
      let idx = filterArr.indexOf(event.target.value);
      filterArr.splice(idx, 1);
    }

    getMatchedByColor(filterArr);
    return filterArr;
  }

  function getMatchedByColor(colorsArr) {
    let matchedArr = [];
    // if we have selected data by price use it instead of given productsData
    let data = productsData;
    // show all products when filters are unchecked
    if (colorsArr.length === 0) {
      renderProducts(data);
      return;
    }

    colorsArr.forEach(function(color) {
      data.forEach(function(element) {
        if (color === element.color) {
          matchedArr.push(element.id);
        }
      });
    });

    getFilteredProducts(matchedArr);
    return matchedArr;
  }

  function getFilteredProducts(filterIDArray) {
    let data = productsData;
    let filteredProductsArr = [];
    filterIDArray.forEach(function(id) {
      data.forEach(function(element) {
        if (id === element.id) {
          filteredProductsArr.push(element);
        }
      });
    });
    filteredByColorData = filteredProductsArr;
    let tempArr = filteredProductsArr.sort(function(a, b) {
      return a.id - b.id;
    });
    console.log(tempArr);
    renderProducts(filteredByColorData);
    return filteredByColorData;
  }

  function filterByPrice() {
    const NONE = "NONE";
    const ASC = "ASC";
    const DESC = "DESC";
    const filterSelectedOptionVal = $priceSelect
      .find("option[value]:selected")
      .val();

    filteredByPriceData = Array.from(Object.create(productsData));

    switch (filterSelectedOptionVal) {
      case NONE:
        filterNONE();
        // render(filter('ASC'))
        break;
      case ASC:
        filterASC(filteredByPriceData);
        break;
      case DESC:
        filterDESC(filteredByPriceData);
        break;
      default:
        console.error("Check option values for correct result");
    }

    function filterNONE() {
      filteredByPriceData = productsData;
      console.log(filteredByPriceData);
      renderProducts(filteredByPriceData);
    }

    function filterASC(data) {
      data.sort(function(a, b) {
        return a.price - b.price;
      });
      renderProducts(data);
    }

    function filterDESC(data) {
      data.sort(function(a, b) {
        return b.price - a.price;
      });
      renderProducts(data);
    }
  }

  function getData(url) {
    fetch(url)
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        productsData = data;

        renderProducts(productsData);
        renderColors(getColors(data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //events
  $colors.on("change", "input[type=checkbox]", getFilterValues);
  $priceSelect.on("change", filterByPrice);

  function init() {
    getData(productsUrl);
  }

  return {
    init: init
  };
})(jQuery);

productGridModule.init();
*/

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
    return sortedArr.sort((a, b) => {
      switch (sortHow) {
        case "ASC":
          return a[sortBy] - b[sortBy];
          break;
        case "DESC":
          return b[sortBy] - a[sortBy];
          break;
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

  const useTemporaryArray = (tempArr, origArr) => {
    if (tempArr.length) {
      return tempArr;
    }
    return origArr;
  };

  /**
   * Get data from API and render it into the DOM on initialization
   */
  const init = async () => {
    const productsData = await API_DATA(API_URL);
    const colorsArray = getPropertyArray(productsData, "color");
    const colorsUniqueArray = getUniqueArray(colorsArray).sort();

    render(productsData, productsTemplate, productsContainer);
    render(colorsUniqueArray, colorsTemplate, colorsContainer);

    // events
    colorsContainer.addEventListener("change", () => {
      modifyArrayFromElements(selectedColorsArray);
      const productsByColorArray = getFilteredArray(
        productsData,
        "color",
        selectedColorsArray
      );

      // copy data to the temporary array
      temporaryArray = [...productsByColorArray];

      productsByColorArray.length
        ? render(productsByColorArray, productsTemplate, productsContainer)
        : render(productsData, productsTemplate, productsContainer);
    });

    const filterByPrice = () => {
      const NONE = "NONE";
      const ASC = "ASC";
      const DESC = "DESC";
      const target = event.target;
      const selectedOptionValue = target.options[target.selectedIndex].value;

      switch (selectedOptionValue) {
        case NONE:
          render(
            useTemporaryArray(temporaryArray, productsData),
            productsTemplate,
            productsContainer
          );
          break;
        case ASC:
          render(
            getSortedArray(
              useTemporaryArray(temporaryArray, productsData),
              "price",
              ASC
            ),
            productsTemplate,
            productsContainer
          );
          break;
        case DESC:
          render(
            getSortedArray(
              useTemporaryArray(temporaryArray, productsData),
              "price",
              DESC
            ),
            productsTemplate,
            productsContainer
          );
          break;
        default:
          console.error("Check option values for the correct result");
      }
    };

    priceSelect.addEventListener("change", filterByPrice);
  };

  return {
    init
  };
})();

productGridModule.init();
