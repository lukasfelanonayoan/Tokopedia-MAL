import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

import Header from "./components/Header";

// pages
import AnimeList from "./pages/Anime-List";
import AnimeDetail from "./pages/Anime-Detail";

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<AnimeList />}></Route>
            <Route path="/anime/:id" element={<AnimeDetail /> } id={useParams()}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
