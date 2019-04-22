import React,{useState} from 'react';
import { connect } from 'react-redux'; 
import { startLogin, startLoginWithEmail } from '../actions/auth';
import {Link} from 'react-router-dom';
import { firebase } from '../firebase/firebase';

const LoginPage = ({ startLogin, startLoginWithEmail}) => {

    const [error,setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        startLoginWithEmail(email,password)
            .then(()=> {
                const user = firebase.auth().currentUser;
                if(user.emailVerified){
                    setError('');
                } else {
                    setError('Please verify your email to get started!')
                }
            })
            .catch((err)=> {
                // console.log(err.code)
                setError('Wrong email or password !')
            })
    }

    return(
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layoyt__title">Expensify</h1>
                <h2>Login</h2>
                <form className="form" onSubmit={onSubmit}>
                    <input 
                        className="text-input" 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email" 
                        required
                    />
                    <input 
                        className="text-input" 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        required 
                        minLength="6" 
                        autoComplete="true"
                    />
                    <div className="form__error">
                        { error.length > 0 ? <span>{error}</span>:<div></div> }
                    </div>
                     <div>
                        <button 
                            className="button" 
                            type="submit" 
                            className="button"
                        > Login </button>
                    </div>
                    <img className="logo" src="/images/google_logo.png" alt="Login with Google" onClick={startLogin}/>
                    
                </form>
                <Link className="box-link" to="/register"> Register </Link>
            </div>
        </div>
)};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    startLoginWithEmail: () => dispatch(startLoginWithEmail(email,password))
});

export default connect(undefined,mapDispatchToProps)(LoginPage);