'use strict';

import logger from "../utils/logger.js";
import drinkStore from "../models/drink-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {
   createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const drinks = searchTerm
        ? drinkStore.searchUserDrinks(searchTerm, loggedInUser.id)
        : drinkStore.getUserDrinks(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = drinks;

      if (sortField) {
        sorted = drinks.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "numberOfDrinks") {
            return (a.drinks.length - b.drinks.length) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Drinks Collection App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        drinks: sortField ? sorted : drinks,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        numberOfDrinksSelected: request.query.sort === "numberOfDrinks",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };
      
      logger.info('about to render' + viewData.drinks);
      
      response.render('dashboard', viewData);
    }
    else response.redirect('/');

  },


    addDrinkCollection(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const timestamp = new Date();
	
    const newDrinkCollection = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      
      drinks: [],
      date: timestamp
    };

    drinkStore.addDrinkCollection(newDrinkCollection, request.files?.picture, function() {
        response.redirect("/dashboard");
    });
  },


  //addDrinkCollection(request, response) {
    //const newDrinkCollection = {
      //id: uuidv4(),
      //title: request.body.title,
      //drinks: [],
    //};
    //drinkStore.addDrinkCollection(newDrinkCollection);
   // response.redirect('/dashboard');
//},

async deleteDrinkCollection(request, response) { 
    const drinkCollectionId = request.params.id;
    logger.debug(`Deleting Drink Collection ${drinkCollectionId}`);
    drinkStore.removeDrinkCollection(drinkCollectionId);
    
    response.redirect("/dashboard");
},

};

export default dashboard;
