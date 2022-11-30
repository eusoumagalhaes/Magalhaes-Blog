import styles from "./Register.module.css"

import { useState, useEffect } from "react"
import { useAuthentication } from "../../Hooks/useAuthentication"

const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user ={
      displayName,
      email,
      password,
      confirmPassword
    }

    if(password !== confirmPassword) {
      setError("Passwords must match!")
      return;
    }
    
   const res = await createUser(user)

    console.log(user);
  };

  useEffect((authError)=>{
    if(authError){
    setError(authError);
    }
  }, [authError])

  return (
    <div className={styles.register}>
        <h2>Comece a postar agora !</h2> 
        <h1>Register</h1>
        <p>Create your user and start writing</p>

        <form onSubmit={handleSubmit}>
            <label >
                <span>Name:</span>
                <input 
                 type="text"
                 name="displayName"
                 required
                 placeholder="Username"
                 value={displayName}
                 onChange={(e)=> setDisplayName(e.target.value)}
                 />
            </label>
            <label >
                <span>E-Mail:</span>
                <input 
                 type="email"
                 name="displayEmail"
                 required
                 placeholder="E-mail"
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
                 />
            </label>
            <label >
                <span>Password:</span>
                <input 
                 type="password"
                 name="displayPassword"
                 required
                 placeholder="Insert your password"
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                 />
            </label>
            <label >
                <span> Repeat your password:</span>
                <input 
                 type="password"
                 name="confirmPassword"
                 required
                 placeholder="Confirm your password"
                 value={confirmPassword}
                 onChange={(e)=> setConfirmPassword(e.target.value)}
                 />
            </label>
            {!loading && <button className="btn">Register</button>}
            {loading &&
             (<button className="btn" disabled>
              Loading...
              </button>)}
            {error && <p className="error">{error}</p>}
        </form>

    </div>
  )
}

export default Register