/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  baseUrl: 'http://localhost:8080',
  platformCopyrightYear: '2021',
  passwordResetTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
  emailProofTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
  rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  fromEmailAddress: 'noreply@cmssupport.com',
  fromName: 'The Company Manger Team',
  internalEmailAddress: 'support+development@cmssupport.com',
  verifyEmailAddresses: false,


};
