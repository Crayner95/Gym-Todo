import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import * as React from 'react'
import TodoList from './components/TodoList';
import axios from 'axios';
import Dashboard from './components/Dashboard';


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
              <Dashboard>
                <TodoList />
              </Dashboard>
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
