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
  const $productsTemplate = $("#product-template").html();
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

// filter ->> render
// render(filter)
*/

const API_URL = "http://localhost:3000/products/";
let APIData = null;
function getAPIData(url) {
  fetch(url)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));
}

console.log(APIData);
