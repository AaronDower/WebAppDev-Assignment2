'use strict';

import logger from "../utils/logger.js";
import drinkStore from "../models/drink-store.js";
import { v4 as uuidv4 } from 'uuid';

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Drink Collection App Dashboard",
      drinks: drinkStore.getAllDrinks()
    };
    
    logger.debug(viewData.drinks);
    
    response.render('dashboard', viewData);
  },

  addDrinkCollection(request, response) {
    const newDrinkCollection = {
      id: uuidv4(),
      title: request.body.title,
      drinks: [],
    };
    drinkStore.addDrinkCollection(newDrinkCollection);
    response.redirect('/dashboard');
},

async deleteDrinkCollection(request, response) { // Add async here
    const drinkCollectionId = request.params.id;
    logger.debug(`Deleting Drink Collection ${drinkCollectionId}`);
    drinkStore.removeDrinkCollection(drinkCollectionId);
    
    response.redirect("/dashboard");
},

};

export default dashboard;
