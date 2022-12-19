module.exports = {


  friendlyName: 'Find',


  description: 'Find user.',


  inputs: {
    id: {
      type: 'string',
      required: true
    },
  },

  exits: {
    success: {
      description: 'Returns User Doc.'
    },
  },

  fn: async function ({ id }) {
    var employeeRecord = await Employee.findOne({
      id,
      deleted: { '!=': true }
    });
    if(!employeeRecord){ throw 'badRequest';}
    return employeeRecord;
  }


};
