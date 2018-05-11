module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'graphql'
  ],
  extends: [
    'eslint:recommended',
  ],
  env: {
    node: true,
    browser: false
  },
  rules: {
		"no-console": 0,
    // "graphql/template-strings": ['error', {
    //   // Import default settings for your GraphQL client. Supported values:
    //   // 'apollo', 'relay', 'lokka', 'literal'
    //   env: 'apollo',
		//
    //   // Import your schema JSON here
    //   schemaJson: require('./schema/index'),
		//
    //   // OR provide absolute path to your schema JSON
    //   // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
		//
    //   // OR provide the schema in the Schema Language format
    //   // schemaString: printSchema(schema),
		//
    //   // tagName is gql by default
    // }]
  },
  overrides: []
};
