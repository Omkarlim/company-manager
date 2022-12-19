module.exports = {


  friendlyName: 'Delete',


  description: 'Delete a User.',


  inputs: {
    id: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      outputDescription: 'User Deleted.'
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The User you`re trying to delete does not exist.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
  },


  fn: async function ({ id }) {
    // All done.
    var userRecord = await Employee.findOne({
      id,
      deleted: { '!=': true }
    });
    if (!userRecord) { throw 'invalid'; }
    await Employee.updateOne({ id }).set({
      deleted: true
    });
    return {
      message: 'User Deleted Successfully.',
      status: 200,
    };
  }


};
