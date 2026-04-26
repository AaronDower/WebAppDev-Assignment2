'use strict';

import logger from "../utils/logger.js";
import drinkStore from "../models/drink-store.js";
import { v4 as uuidv4 } from 'uuid';

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const searchTerm = request.query.searchTerm || "";

    const drinkCollections = searchTerm
      ? drinkStore.searchDrinkCollections(searchTerm)
      : drinkStore.getAllDrinks();

    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;

    let sorted = drinkCollections;

    if (sortField) {
      sorted = drinkCollections.slice().sort((a, b) => {
        if (sortField === "title") {
          return a.title.localeCompare(b.title) * order;
        }

        if (sortField === "numDrinks") {
          return (a.drinks.length - b.drinks.length) * order;
        }

        return 0;
      });
    }

    const viewData = {
      title: "Drink Collection App Dashboard",
      drinks: sortField ? sorted : drinkCollections,
      search: searchTerm,
      titleSelected: request.query.sort === "title",
      numDrinksSelected: request.query.sort === "numDrinks",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    logger.debug(viewData.drinks);

    response.render("dashboard", viewData);
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
