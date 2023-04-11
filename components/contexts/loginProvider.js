import { useState, React, Children, useEffect } from "react";
import { createContext } from 'react';

export const LoginContext = createContext("");

function LoginProvider({children}) {
  const [text, setText] = useState({user: null, route: '/'});

  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
      console.log({accessToken})
      const existingData = JSON.parse(accessToken)
      console.log({existingData})

      if(existingData?.accessToken)
      setText({ user: existingData , route: '/user'})
    }
  },[]);

  return (
    <div>
      <LoginContext.Provider value={{ text, setText }}>
        <h1>{JSON.stringify(text)}</h1>
        {children}
      </LoginContext.Provider>
    </div>
  );
}

export default LoginProvider;