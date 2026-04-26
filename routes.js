'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import drink from './controllers/drink.js';
import stats from './controllers/stats.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/drink/:id', drink.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);

router.post('/drink/:id', drink.addDrink);
router.post('/dashboard/adddrinkcollection', dashboard.addDrinkCollection)
router.post('/drink/:id/updatedrink/:drinkid', drink.updateDrink);
router.get('/drink/:id/deletedrink/:drinkid', drink.deleteDrink);
router.get('/dashboard/delete/:id', dashboard.deleteDrinkCollection);
router.get('/stats', stats.createView);
export default router;
