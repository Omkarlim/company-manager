module.exports = {
  friendlyName: 'Update',

  description: 'Update company.',

  inputs: {
    id: {
      description: 'ID of the company to update',
      type: 'string',
      required: true,
    },
    name: {
      description: 'Company Name',
      type: 'string',
    },
    address: {
      description: 'Company Address',
      type: 'string',
    }
  },

  exits: {
    success: {
      success: {
        description: 'New Company was created successfully.'
      },
      invalid: {
        responseType: 'badRequest',
        description: 'The provided fullName, password and/or email address are invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
          'parameters should have been validated/coerced _before_ they were sent.'
      },
    }
  },


  fn: async function ({ id, name, address }) {

    var companyRecord = await Company.findOne({
      id,
      deleted: { '!=': true }
    });
    if (!companyRecord) { throw 'invalid'; }

    let coordinates = '';

    if (sails.config.globals.GEOCATCH_API_KEY) {
      let { latitude, longitude } = await sails.helpers.getGeocatchLocation(address);
      coordinates = `${latitude}, ${longitude}`;
    }

    await Company.updateOne({ id }).set({
      name,
      address,
      coordinates
    });
    return {
      message: 'Company Updated Successfully.',
      status: 200,
    };
  }


};
