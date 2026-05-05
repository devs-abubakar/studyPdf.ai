'use client'; // <--- THIS MUST BE THE FIRST LINE

import signUpNewUser from '@/actions/auth/signUp-action';

const SignUp = () => {
  async function handleSubmit(event) {
    event.preventDefault(); 
    
    const formData = new FormData(event.currentTarget);
    const res = await signUpNewUser(formData); 
    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit} className='bg-stone-700 text-brand-white'>
      <label> Name </label>
      <input name="username" type="text" /> {/* Added name attribute */}
      
      <label> Email </label>
      <input name="email" type="email" /> {/* Added name attribute */}
      
      <label> Password </label>
      <input name="password" type="password" required /> 


      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
