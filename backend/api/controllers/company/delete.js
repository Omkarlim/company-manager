module.exports = {


  friendlyName: 'Delete',


  description: 'Delete a Company.',


  inputs: {
    id: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      outputDescription: 'Company Deleted.'
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The Company you`re trying to delete does not exist.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
  },


  fn: async function ({ id }) {
    // All done.
    var companyRecord = await Company.findOne({
      id,
      deleted: { '!=': true }
    });
    if (!companyRecord) { throw 'invalid'; }
    await Company.updateOne({ id }).set({
      deleted: true
    });
    return {
      message: 'Company Deleted Successfully.',
      status: 200,
    };
  }


};
