import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});







ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <div>
        Hi there!
      </div>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)