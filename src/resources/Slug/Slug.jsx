const baseUrl = process.env.PUBLIC_URL;
// eslint-disable-next-line
export default {
  // Public Path

  _loginPath: baseUrl + "/",
  _otp: baseUrl + "/otp/verification/",
  _register: baseUrl + "/register/",
  _subscribe: baseUrl + "/subscribe/",
  _forgetPasswordPath: baseUrl + "/forget-password/",
  _newPassword: baseUrl + "/new-password/",

  // private Path
  _dashboardPath: baseUrl + "/",
  _pricing: baseUrl + "/pricing/",
  _tracebook_profile: baseUrl + "/target-packs/",
  _query_profile: baseUrl + "/search/",
  _account_details: baseUrl + "/account/details/",
};
