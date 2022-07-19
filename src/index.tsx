import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;

// Apollo client
// const client = new ApolloClient({
//   uri: YOUR_GRAPHCMS_API_ENDPOINT_GOES_HERE,
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUri,
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
 <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
