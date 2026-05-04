'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const drinkStore = {

  store: new JsonStore('./models/drink-store.json', { drinkCollection: [] }),
  collection: 'drinkCollection',
  array: 'drinks',

  getAllDrinks() {
    return this.store.findAll(this.collection);
  },

  getDrink(id) {
    return this.store.findOneBy(this.collection, (drink => drink.id === id));
},

getDrinkCollection(id) {
    return this.store.findOneBy(this.collection, (drinkCollection => drinkCollection.id === id));
},

addDrink(id, drink) {
    this.store.addItem(this.collection, id, this.array, drink);
},

  async addDrinkCollection(drinkCollection, file, response) {
    try {
      drinkCollection.picture = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, drinkCollection);
      response();
    } catch (error) {
      logger.error("Error processing drink collection:", error);
      response(error);
    }
  },


removeDrink(id, drinkId) {
    this.store.removeItem(this.collection, id, this.array, drinkId);
},

removeDrinkCollection(id) { 
   this.store.removeCollection(this.collection, id); 
},

updateDrink(id, drinkId, updatedDrink) {
    this.store.editItem(this.collection, id, drinkId, this.array, updatedDrink);
},

searchDrinkCollections(search) {
    return this.store.findBy(
      this.collection,
      (drinkCollection => drinkCollection.title.toLowerCase().includes(search.toLowerCase())))
},

getUserDrinks(userid) {
  return this.store.findBy(this.collection, (drinkCollection => drinkCollection.userid === userid));
},

searchUserDrinks(search, userid) {
  return this.store.findBy(
    this.collection,
    (drinkCollection => drinkCollection.userid === userid && drinkCollection.title.toLowerCase().includes(search.toLowerCase())))
}, 



};

export default drinkStore;
