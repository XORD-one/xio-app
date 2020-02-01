import React from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import routes from '../../routes'

function App() {
  return (
    <>
      <Router>
        {
          routes.map(item => {
            return(
              <Route path={item.path} component={item.component} exact={item.exact} />
            )
          })
        }
      </Router>
    </>
  );
}

export default App;
