module.exports = {
  friendlyName: 'Find all Companies',


  description: 'Api to fetch companies list',

  inputs: {

  },


  exits: {
    success: {
      outputFriendlyName: 'List of Companies',
      outputDescription: 'An array of companies.',
    },
  },


  fn: async function (inputs) {

    var skip = inputs.skip || 0;
    var limit = inputs.limit || 10;
    // TODO: Add filtered output
    // var filters = inputs.filters || {};
    var query = {
      deleted: { '!=': true }
    };


    var companyRecords = await Company.find(query).skip(skip).limit(limit);
    var companyRecordsCount = await Company.count(query);

    return {
      result: companyRecords,
      count: companyRecordsCount,
      googleAPIKey: process.env.GOOGLE_API_KEY
    };

  }


};
