import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./store/context";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main>
          <Router>
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/dashboard" component={Dashboard} exact />
            </Switch>
          </Router>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
