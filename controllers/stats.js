"use strict";

import logger from "../utils/logger.js";
import drinkStore from "../models/drink-store.js"; // Ensure this model exists

const stats = {
  createView(request, response) {
    logger.info("Drink Stats page loading!");

    
    const collections = drinkStore.getAllDrinks();


    let numCollections = collections.length;
    
   
    let numTotalDrinks = collections.reduce((total, category) => total + category.drinks.length, 0);

    let average = numCollections > 0 ? (numTotalDrinks / numCollections).toFixed(2) : 0;

  
    const statistics = {
      displayNumCollections: numCollections,
      displayNumDrinks: numTotalDrinks,
      displayAverage: average
    };

    const viewData = {
      title: "Drink Collection Statistics",
      stats: statistics
    };

  
    response.render("stats", viewData);
  },
};

export default stats;