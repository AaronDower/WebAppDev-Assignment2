'use strict';

import logger from '../utils/logger.js';
import drinkStore from '../models/drink-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const drink = {
  createView(request, response) {
    const drinkId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Drink id = ' + drinkId);
    
    const viewData = {
      title: 'Drink',
      singleDrink: drinkStore.getDrink(drinkId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };

    response.render('drink', viewData);
},


  addDrink(request, response) {
    const drinkCollectionId = request.params.id;
    const drinkCollection = drinkStore.getDrink(drinkCollectionId);
    const newDrink = {
      id: uuidv4(),
      name: request.body.name,
      description: request.body.description,
    };
    drinkStore.addDrink(drinkCollectionId, newDrink);
    response.redirect('/drink' + '/'+drinkCollectionId);
  },

  deleteDrink(request, response) {
    const drinkCollectionId = request.params.id;
    const drinkId = request.params.drinkid;
    logger.debug(`Deleting Drink ${drinkId} from Collection ${drinkCollectionId}`);
    drinkStore.removeDrink(drinkCollectionId, drinkId);
    response.redirect('/drink/' + drinkCollectionId);
},

updateDrink(request, response) {
    const drinkCollectionId = request.params.id;
    const drinkId = request.params.drinkid;
    logger.debug("updating drink " + drinkId);
    const updatedDrink = {
      id: drinkId,
      name: request.body.name,
      description: request.body.description
    };
    drinkStore.updateDrink(drinkCollectionId, drinkId, updatedDrink);
    response.redirect('/drink/' + drinkCollectionId);
}
      
}

      




export default drink;

   




