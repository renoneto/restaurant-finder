import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home'
import RestaurantDetail from './routes/RestaurantDetail'
import Update from './routes/Update'

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/restaurants/:id/update" component={Update}/>
                        <Route exact path="/restaurants/:id" component={RestaurantDetail}/>
                    </Switch>
                </Router>
            </div>
        </RestaurantsContextProvider>
    );
}

export default App;
