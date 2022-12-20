var moment = require('moment');

module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    firstName: {
      description: 'First Name',
      type: 'string',
      required: true
    },
    lastName: {
      description: 'Last Name',
      type: 'string',
    },
    email: {
      description: 'Email',
      type: 'string',
      required: true,
      isEmail: true,
    },
    designation: {
      description: 'Designation',
      type: 'string',
    },
    dob: {
      description: 'Date of Birth',
      type: 'string',
      required: true
    },
    company: {
      description: 'Company to link',
      type: 'string'
    }
  },


  exits: {
    success: {
      description: 'New User was created successfully.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
    // invalid: {
    //   responseType: 'badRequest',
    //   description: 'The provided name, address, email, designation and/or dob are invalid.',
    //   extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
    //     'parameters should have been validated/coerced _before_ they were sent.'
    // },
    error: {
      responseType: 'serverError',
      description: 'Could\'nt Create the User',
    },
  },


  fn: async function ({ firstName, lastName, email, designation, dob, company }) {
    var toCreate = {
      firstName,
      lastName,
      email,
      designation,
      dob: moment(dob, 'DD-MM-YYYY').toDate(),
      isActive: true,
    };
    if (company) {
      var query = {
        id: company,
        deleted: { '!=': true }
      };
      var companyRecord = await Company.findOne(query);
      if (!companyRecord) { throw 'invalid'; }
      toCreate.company = company;
    }
    await Employee.create(toCreate).intercept('E_UNIQUE', () => {
      return 'emailAlreadyInUse';
    });
    return {
      message: 'User Created Successfully.',
      status: 200,
    };

  }


};
