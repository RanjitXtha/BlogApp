import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const userData = {
            email , password
        }

        const data = JSON.stringify(userData);

        const response = await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json', 
            },
            body: data
        })

        const token = await response.json();

        if(response.ok){
            localStorage.setItem('Blogtoken',token.token);

            if(token){
                navigate('/home');
            }
            
        }else{
            alert(`Error`);
        }

    }

    return(
        <div>
            <div className="grid justify-center items-center ">
                <h1 className=" font-bold text-center text-blue-800 ">Login page</h1>
                <form className=" flex flex-col gap-y-4 my-8 " onSubmit={handleSubmit}>
                    <span className="flex gap-5">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    </span>
                
                    <span className="flex gap-5">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    </span>

                    <button className="w-20 h-8 bg-slate-900 text-white">Submit</button>
                </form>
                <button onClick={()=>navigate('/signup')}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login;