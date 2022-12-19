/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const _ = require('lodash');

const API_VERSION = 'api/v2';

var routeMap = {

  'POST  /<V>/login': { action: 'entrance/login' },

  // APIs for Companies
  'GET /<V>/company': { action: 'company/find-all' },
  'GET /<V>/company/:id': { action: 'company/find-one' },
  'POST /<V>/company': { action: 'company/create' },
  'PUT /<V>/company/:id': { action: 'company/update' },
  'DELETE /<V>/company/:id': { action: 'company/delete' },
  'PUT /<V>/company/link/:id': {action: 'company/link-users' },

  // APIs for Users
  // 'GET /<V>/user/:id': 'UserController.find',
  'GET /<V>/user' : { action: 'user/find-all' },
  'POST /<V>/user': { action: 'user/create' },
  'PUT /<V>/user/:id': { action: 'user/update' },
  'PUT /<V>/user/unlink/:id': {action: 'user/unlink-users' },
  'DELETE /<V>/user/:id': { action: 'user/delete' },

};

routeMap = _.mapKeys(routeMap, (v, k) => {
  return k.replace('<V>', API_VERSION);
});
module.exports.routes = routeMap;
