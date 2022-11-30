import styles from "./Login.module.css"

import { useState } from "react";
import { useAuthentication } from "../../Hooks/useAuthentication"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user ={
      email,
      password,
    }

    const res = await login(user);

    console.log(res);
  }


  return (
    <div className={styles.login}>
        <h1>Already have an account? Log in below!</h1>
        <p>Log in and start speaking up your mind now</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>E-Mail:</span>
            <input 
               type="email" 
               name="email" 
               required 
               placeholder="E-Mail" 
               value={email} 
               onChange={(e)=> setEmail(e.target.value)} 
            />
          </label>
          <label>
            <span>Password:</span>
            <input 
               type="password" 
               name="password" 
               required 
               placeholder="Password" 
               value={password} 
               onChange={(e)=> setPassword(e.target.value)} 
            />
          </label>
          {!loading && <button className="btn">Log-In</button>}
            {loading &&
             (<button className="btn" disabled>
              Loading...
              </button>)}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login