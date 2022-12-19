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
      required: true
    },
    designation: {
      description: 'Designation',
      type: 'string',
      required: true
    },
    dob:{
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
    invalid: {
      responseType: 'badRequest',
      description: 'The provided name, address, email, designation and/or dob are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
    error: {
      responseType: 'serverError',
      description: 'Could\'nt Create the User',
    }
  },


  fn: async function ({firstName, lastName, email, designation, dob, company}) {
    var toCreate = {
      firstName,
      lastName,
      email,
      designation,
      dob,
      isActive: true,
    };
    if(company){
      var query = {
        id: company,
        deleted: { '!=': true }
      };
      var companyRecord = await Company.findOne(query);
      if (!companyRecord) { throw 'invalid'; }
      toCreate.company = company;
    }
    try{
      await Employee.create(toCreate);
    } catch(err){
      console.log(err);
      throw 'error';
    }
    return {
      message: 'User Created Successfully.',
      status: 200,
    };

  }


};
