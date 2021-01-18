import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from "./store/context";
import routes from "./config/routeConfig";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main>
          <Router>
            <Switch>
              {routes.map((route) => (
                <ProtectedRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
            </Switch>
          </Router>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
