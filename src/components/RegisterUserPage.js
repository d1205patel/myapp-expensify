import React,{useState} from 'react';
import { connect } from 'react-redux'; 
import { startRegisterUser,startLogOut } from '../actions/auth';
import {firebase} from '../firebase/firebase';
import { Link } from 'react-router-dom';


const RegisterUser = ({ startRegisterUser,startLogOut }) => {

    const [{error,message},setError] = useState({error:'',message:''});

    const onSubmit = (e) => {
        e.preventDefault();
        startRegisterUser(email,password)
            .then(()=> {
               
                const user = firebase.auth().currentUser;

                user.sendEmailVerification()
                .then(() => {
                            setError({error:'',message:'Email verification sent !'}); 
                            startLogOut();
                        })
                .catch(() => {
                        setError({error:'Could not send a verification mail!',message:''});
                        startLogOut();
                });
               
            })
            .catch((err)=> {
                console.log(err);
                if(err.code==='auth/email-already-in-use'){
                    setError({error:'Email already in use !',message:''})
                } else {
                setError({error:'Could not Register!',message:''});
                }
            })
    }

    return(
        <div>
            <div className="box-layout">
                <div className="box-layout__box">
                    <form className="form" onSubmit={onSubmit}>
                        <h1>Expensify</h1>
                        <h2>Register</h2>
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
                                required minLength="6" 
                                autoComplete="true" 
                                placeholder="Password"
                            />
                            <div>
                                <button className="button" type="submit"> Register </button>
                            </div>
                            <div>
                                { error.length > 0 ? <div className="form__error">{error}</div>:<div></div> }
                                { message.length > 0 ? <div className="form__message">{message}</div>:<div></div> }
                            </div>
                    </form>
                    <Link className="box-link" to="/">Already Member ? Login</Link>
                </div>
            </div>
        </div>
)};

const mapDispatchToProps = (dispatch) => ({
    startRegisterUser: () => dispatch(startRegisterUser(email,password)),
    startLogOut: () => dispatch(startLogOut())
});

export default connect(undefined,mapDispatchToProps)(RegisterUser);