import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/configuracion";

export const AuthContext = createContext()

export const useAuth = () => {
   const context = useContext(AuthContext)
   return context
}

export function AuthProvider({ children }){
 
    const [user, setUser]= useState(null);
    const [loading, setloading] = useState(true);

    const signup= (email, password) => 
        createUserWithEmailAndPassword(auth, email, password)//enviara mis datos ingresados a firebase
    
     const login = async (email, password) => 
       signInWithEmailAndPassword(auth, email, password);
       
     const logout = () => signOut(auth)


     useEffect(() => {
     onAuthStateChanged(auth, currentUser => {
     setUser(currentUser);
     setloading(false)
     });
     }, []);

     
        


    return (
    <AuthContext.Provider value={{signup, login, user, logout, loading}}>
       {children}
    </AuthContext.Provider>
    );
}

