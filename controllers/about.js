'use strict';
import logger from "../utils/logger.js";


const about = {
  createView(request, response) {
    logger.info("About page loading!");
   
      const viewData = {
      title: "Drink Collection App About",
      
    };
    logger.info(viewData)
    response.render('about', viewData); 
  },
};

export default about;
