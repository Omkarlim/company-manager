/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },
    designation: {
      type: 'string'
    },
    dob: {
      type: 'string',
      columnType: 'date'
    },
    isActive: {
      type: 'boolean'
    },
    company: {
      model: 'company'
    }
  },

};

