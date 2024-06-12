import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    //success and warning states
    const [success,setSuccess]=useState('');
    const [warning,setWarning]=useState('');
    //SHOW STATE
    const [show,setShow]=useState(false);

    // handler
    const handleRegister = (e) => {
      e.preventDefault();
      console.log("form submitted");
      const email=e.target.email.value
      const password=e.target.password.value
      const condition=e.target.terms.checked
      const name=e.target.name.value
      setSuccess('');
      setWarning('');
      if(password.length<6)
        {
            setWarning('Password must be 6 char or longer')
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setWarning('Put alteast one uppercase')
            return;
        }
        else if(!condition){
            setWarning("Please accept our terms and condition")
            return;
           
        }
      console.log("Email :",email,"\nPassword :",password,"\nTrue/false",condition);//print

    //   create user with email and password
      createUserWithEmailAndPassword(auth,email,password)
      //?promise
      .then(result=>{
        console.log(result.user)
        setSuccess('Registered successfully')
        //Update PROFILE
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
        .then()
        .catch()
        
        // send verification
        sendEmailVerification(result.user)
        .then(()=>{
        
            alert('Please check Your Email')
            return;

        })
        .catch()
    })
      .catch(error=>setWarning(error.message))
    };
    return (
      // component
      <div className="max-w-4xl mx-auto text-center">
        <div className="border rounded shadow-lg p-4">
          <h2 className="text-3xl font-medium mb-4">Register form</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="">
              <input
                type="name"
                placeholder="Name"
                name="name"
                className="w-1/4 mb-2"
                required
              />
            </label>
            <br />
            <label htmlFor="">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-1/4 mb-2"
                required
              />
            </label>
            <br />
            <label htmlFor="">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="w-1/4 mb-2"
                required
              />
              <br />
            </label>
            <span className="w-1/4" onClick={() => setShow(!show)}>
              show
            </span>
            <br />
            <br />
            <div className="mb-2">
              <input className="mr-2" type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">Accepts our terms and conditions!</label>
            </div>
            <div>
              <button type="submit" className="btn btn-secondary w-1/4">
                Register
              </button>
            </div>
            {warning && <p>{warning}</p>}
            {success && (
              <div>
                <p>
                  {success}! <Link to={"/login"}>Login?</Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    );
};

export default Register;