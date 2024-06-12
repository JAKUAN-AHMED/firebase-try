import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import auth from "../Firebase/firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState("");
    const [warning,setWarning]=useState('');
    useEffect(()=>{
        if(success)
            {
                alert(success)
            }
    },[success]);
    useEffect(()=>{
        if(warning)
            {
                alert(warning)
            }
    },[warning]);
    const handleLogin=(e)=>{
        e.preventDefault();
        // console.log("form submitted")
        const email=e.target.email.value
        const password=e.target.password.value
        setSuccess("")
        setWarning("")
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            if(result.user.emailVerified){

                setSuccess('User Logged Succcessfully')
                return;
            }
            else{
                setWarning('Please verify Your Email')
                return;
                
            }
        })
        .catch(error=>setWarning(error.message))
    }
    const emailRef=useRef(null);
    const handleReset=(e)=>{
        e.preventDefault();
        const email=emailRef.current.value;
        if (!email) {
          alert("Provide an Email");
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
          console.log("please provide an valid email");
          return;
        } else {
          // console.log(email)
          sendPasswordResetEmail(auth, email)
            .then(() => {
                
                alert("Please check your email")
                return;
            })
            .catch((error) => console.log(error.message));
        }

    }
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="border rounded shadow-lg p-4">
          <h2 className="text-3xl font-medium mb-4">Login form</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="">
              <input
                type="email"
                ref={emailRef}
                placeholder="Email"
                name="email"
                className="w-1/4 mb-2"
                required
              />
            </label>
            <br />
            <label htmlFor="">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-1/4 mb-2"
                required
              />
            </label>
            <br />
            <span onClick={handleReset}>Forgot password?</span>
            <br />
            <br />
            <div>
              <button type="submit" className="btn btn-secondary w-1/4">
                Login
              </button>
            </div>
           <p>Not Registered yet? <Link to={'/register'}>Register</Link></p>
          </form>
        </div>
      </div>
    );
};

export default Login;