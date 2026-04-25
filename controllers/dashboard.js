'use strict';
import logger from "../utils/logger.js";

const drinks = [
  {
    id: 1,
    name: "Latte",
    description: "A shot of espresso with steamed milk"
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and foam"
  },
  {
    id: 3,
    name: "Americano",
    description: "Espresso diluted with hot water"
  }
];

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!")
    logger.debug("Loading the drinks list", drinks);
    response.json(drinks);   
  },
};

export default dashboard;
