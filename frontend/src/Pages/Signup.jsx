import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = ()=>{
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [profilePic , setProfile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(); //formdata is inbuilt function desgined to upload files
        formData.append('username', username); // normal object cannot upload files , just text ,password,etc
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePic', profilePic);

        try{
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                body: formData,
              });

              const token = await response.json();
              console.log(token.token)
              if (response.ok) {
                alert('Signup successful');

                localStorage.setItem('Blogtoken',token.token);
                console.log('token set')
                if(token){
                    navigate('/home');
                }  
              } else {
                alert("error during signin");
              }
        }catch(error){
            console.log(error);
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
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
                    </span>
                
                    <span className="flex gap-5">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    </span>

                    <span className="flex gap-5">
                        <label for="profilepic">Password</label>
                        <input type="file" id="profilepic" placeholder="Image" onChange={(e)=>setProfile(e.target.files[0])} />
                    </span>

                    <button className="w-20 h-8 bg-slate-900 text-white">Submit</button>
                </form>
                <button onClick={()=>navigate('/login')}>Already have an account?</button>
            </div>
        </div>
    )
}

export default Signup;