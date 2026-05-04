'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import drink from './controllers/drink.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/drink/:id', drink.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/drinks/:id', drink.createView);
router.post('/dashboard/adddrinkcollection', dashboard.addDrinkCollection)
router.post('/addDrink/:id', drink.addDrink);
router.post('/drink/:id/updatedrink/:drinkid', drink.updateDrink);
router.get('/drink/:id/deletedrink/:drinkid', drink.deleteDrink);
router.get('/dashboard/deleteDrinkCollection/:id', dashboard.deleteDrinkCollection);
router.get('/stats', stats.createView);
export default router;
