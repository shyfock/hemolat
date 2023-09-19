import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e)=> {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <main>
            <section>
                <div>
                    <div>
                        <h1>HemolatApp</h1>
                        <form>
                            <div>
                                <label htmlFor="email">Email address</label>
                                <input 
                                    type='email' 
                                    id="email" 
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type='password'
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                    autoComplete="pass"
                                />
                            </div>
                            <button type="submit" onClick={onSubmit}>Sign up</button>
                            <p>
                                Already have an account?{' '}
                                <NavLink to="/login">
                                    Sign in
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Signup;