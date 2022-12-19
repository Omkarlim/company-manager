module.exports = {


  friendlyName: 'Find one',


  description: 'Fetch Details for Specific Company',


  inputs: {
    id: {
      description: 'The id of company from the database',
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      outputFriendlyName: 'Company Details',
      outputDescription: 'Company Details Object',
    },
    notFound: {
      description: 'No Company with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    var query = {
      id: inputs.id,
      deleted: { '!=': true }
    };
    var companyRecord = await Company.findOne(query);
    if (!companyRecord) { throw 'notFound'; }
    return {
      data: companyRecord,
      googleAPIKey: process.env.GOOGLE_API_KEY
    };

  }


};
