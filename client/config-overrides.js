const rewireAliases = require('react-app-rewire-aliases');
//const { paths } = require('react-app-rewired');
//const path = require('path');

module.exports = function override(config, env) {
	config = rewireAliases.aliasesOptions({
		'react-native-svg': 'react-native-svg-web',
	})(config, env);
  return config;
}
