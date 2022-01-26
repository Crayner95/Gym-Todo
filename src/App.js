import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import * as React from 'react'
import TodoList from './components/TodoList';
import axios from 'axios';


export const UserContext = React.createContext({ user: null, setUser: () => { }, })

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const userResponse = await axios.get('/api/user');
      setUser(userResponse.data);
    })()
  }, [])


  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/todos">
              <TodoList />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
