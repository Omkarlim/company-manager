const axios = require('axios');
const GEOCATCH_API_KEY = process.env.GEOCATCH_API_KEY || false;

module.exports = {

  friendlyName: 'GEOCATCH Address',
  description: 'Function to GEOCATCH address',

  inputs: {

    address: {
      type: 'string',
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({ address }) {
    const params = {
      access_key: GEOCATCH_API_KEY,
      query: address
    };
    var response = await axios.get('http://api.positionstack.com/v1/forward', { params });
    return response.data.data[0];

  }


};


