import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {NavigateFunction } from "react-router-dom";

const useLoginWithGoogle = (navigate:NavigateFunction) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  

  const handleLoginWithGoogle = async (googleToken: string) => {
    try{
        const response:AxiosResponse<unknown> = await axios.post("/auth/google_login", { token: googleToken });
        const result = response.data;
    
        if(result){
            setIsLoggedIn(true)
        }else(
            console.error('Authentication Failed')
        )
    }catch(error){
        console.error('Error during authentication:', error);
    }
   
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);


  return {handleLoginWithGoogle};
};

export default useLoginWithGoogle;
