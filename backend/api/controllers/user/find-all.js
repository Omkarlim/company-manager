module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    company: {
      description: 'Company to link',
      type: 'string'
    },
    skip: {
      description: 'Skip no of results',
      type: 'number'
    },
    limit: {
      description: 'Limit no of results',
      type: 'number'
    },
    skipCompany:{
      type:'string'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'List of Employees',
      outputDescription: 'An array of employees.',
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The provided company id is invalid.',
    },
    error: {
      responseType: 'serverError',
      description: 'Could\'nt Fetch Users',
    }
  },

  fn: async function ({ company, skip, limit, skipCompany }) {
    var findQuery = {
      isActive: true,
      deleted: { '!=': true }
    };
    skip = skip || 0;
    limit = limit || 10;
    if(skipCompany){
      findQuery.company = {'!=': skipCompany};
      let response = await Employee.find(findQuery).sort('firstName ASC');
      return { results: response };
    }
    if (company) {
      var query = {
        id: company,
        deleted: { '!=': true }
      };
      var companyRecord = await Company.findOne(query);
      if (!companyRecord) {
        throw 'badRequest';
      }
      findQuery.company = company;
    }
    try {
      let response = await Employee.find(findQuery).sort('firstName ASC').skip(skip).limit(limit).populate('company');
      let responseCount = await Employee.count(findQuery);
      return { results: response, count: responseCount };
    } catch (err) {
      console.log(err);
      throw 'error';
    }
  }


};
