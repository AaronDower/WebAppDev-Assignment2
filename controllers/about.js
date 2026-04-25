'use strict';
import logger from "../utils/logger.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    response.send('About the Drinks Collection app!');   
  },
};

export default about;
