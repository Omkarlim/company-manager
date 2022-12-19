module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    id: {
      type: 'string',
      required: true
    },
    firstName: {
      description: 'First Name',
      type: 'string',
    },
    lastName: {
      description: 'Last Name',
      type: 'string',
    },
    email: {
      description: 'Email',
      type: 'string',
    },
    designation: {
      description: 'Designation',
      type: 'string',
    },
    dob:{
      description: 'Date of Birth',
      type: 'string',
    },
    company: {
      description: 'Company to link',
      type: 'string'
    },
    isActive: {
      description: 'Action to perform',
      type: 'string'
    }
  },


  exits: {
    success: {
      description: 'User was updated successfully.'
    },
  },


  fn: async function ({id, firstName, lastName, email, designation, dob, isActive}) {
    var employeeRecord = await Employee.findOne({
      id,
      deleted: { '!=': true }
    });
    if(!employeeRecord){ throw 'badRequest';}

    await Employee.updateOne({ id }).set({
      firstName,
      lastName,
      email,
      designation,
      dob,
      isActive
    });
    return {
      message: 'User Updated Successfully.',
      status: 200,
    };
  }


};
