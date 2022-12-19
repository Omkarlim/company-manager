module.exports = {


  friendlyName: 'Create',


  description: 'Create company.',


  inputs: {
    name: {
      description: 'Company Name',
      type: 'string',
      required: true
    },
    address: {
      description: 'Company Address',
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      description: 'New Company was created successfully.'
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
    error: {
      responseType: 'serverError',
      description: 'Could\'nt Create new Company',
    }
  },


  fn: async function ({ name, address }) {

    let toCreate = {
      name,
      address,
      coordinates: ''
    };

    if (sails.config.globals.GEOCATCH_API_KEY) {
      try {
        let { latitude, longitude } = await sails.helpers.getGeocatchLocation(address);
        toCreate.coordinates = `${latitude}, ${longitude}`;
      } catch (err) {
        console.log(err);
      }
    }

    var companyObject = await Company.create(toCreate).fetch();
    if (!companyObject) { throw 'invalid'; }
    return {
      message: 'Company Created Successfully.',
      status: 200,
    };

  }


};
