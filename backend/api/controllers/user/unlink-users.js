module.exports = {


  friendlyName: 'Link users',


  description: 'Link Users To Company',


  inputs: {
    id: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      outputDescription: 'Moved companies successfully.'
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The Employee does not exist.',
    },
  },


  fn: async function ({ id }) {
    console.log('UNLINK');
    var employeeRecord = await Employee.findOne({
      id,
      deleted: { '!=': true }
    });
    if (!employeeRecord) { throw 'invalid'; }

    await Employee.updateOne({ id }).set({
      company: null
    });
    return {
      message: 'User Unlinked Successfully.',
      status: 200,
    };

  }


};
