// pages/auth/signin.js

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      phoneNumber,
      pin,
    });
    

    
    if (!result.error) {
      console.log("res", result)
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="form-signin w-100 m-auto">
      <form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
  
        <div className="form-floating">
          <input
            type="tel"
            placeholder="Phone Number"
            id="floatingInput" 
            className="form-control" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Phone Number</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            placeholder="PIN"
            className="form-control" 
            id="floatingPassword" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Pin</label>
        </div>
  
        <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );  
}
