import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter,{history} from './routers/AppRouter';
import configStore from './store/configStore';
import {login,logout} from './actions/auth';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {startSetExpenses,removeAllExpensesFromStore} from './actions/expenses';

const store = configStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
    }
}

ReactDOM.render(<LoadingPage />,document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user && user.emailVerified){

            store.dispatch(login(user.uid));
            
            store.dispatch(startSetExpenses()).then(() => {
                renderApp();
                if(history.location.pathname === '/') {
                    history.push('/dashboard');
                }
            });

            // console.log(user.emailVerified);
            
    } else {

        store.dispatch(logout());
        store.dispatch(removeAllExpensesFromStore());
        renderApp();
        if(history.location.pathname !== '/register')
            history.push('/');
    }
})