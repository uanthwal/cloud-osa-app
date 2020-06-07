let protocol = location.protocol + '//' + location.host;

export var APP_CONFIG = {};

export var URL_CONFIG = {
  BASE_URL: getConfigs()['BASE_URL'],
  TRACE:'/api/trace',
  QUERY:'/api/user-query'
};

export function getConfigs() {
  if (protocol == 'http://localhost:4200') {
    return {
      BASE_URL: 'http://localhost:5000',
    };
  } else {
    return {
      BASE_URL: 'http://50.17.50.104:5000',
    };
  }
}
