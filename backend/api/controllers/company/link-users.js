module.exports = {


  friendlyName: 'Link users',


  description: 'Link Users To Company',


  inputs: {
    employeeIds: {
      required: true,
      type: ['string']
    },
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


  fn: async function ({ employeeIds, id }) {

    var employeeRecord = await Employee.find({
      id: employeeIds,
      deleted: { '!=': true }
    });
    if (!employeeRecord) { throw 'invalid'; }
    console.log(employeeRecord);
    var newCompanyRecord = await Company.findOne({
      id,
      deleted: { '!=': true }
    });
    if (!newCompanyRecord) { throw 'invalid'; }

    await Employee.update({ id: employeeIds }).set({
      company: newCompanyRecord.id
    });
    return {
      message: 'User(s) Linked Successfully.',
      status: 200,
    };

  }


};
