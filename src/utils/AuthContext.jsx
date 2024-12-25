import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwrite/appwrite.js";
import { useNavigate } from "react-router-dom";
import { ID} from 'appwrite';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
        const navigate = useNavigate()

        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)
        const [showcreatbutton , SetShowcreatebutton]=useState(false)
        const [referral_code , SetReferral_code] = useState('')
        useEffect(() => {
            //setLoading(false)
            checkUserStatus()
         }, [])

         const loginUser = async (userInfo) => {
            setLoading(true)

            try{
                let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password)
               
                let accountDetails = await account.get();
                setUser(accountDetails)
            }catch(error){
                alert(error)
                console.error(error)
            }
            setLoading(false)
            
         }

         const referralInfo = async (referralCode) => {
            setLoading(true)
            console.log(referralCode);
            if(referralCode){
                
                SetShowcreatebutton(true);
                SetReferral_code(referralCode)
            }
            setLoading(false)
            
         }

         const logoutUser = async () => {
            await account.deleteSession('current');
            setUser(null)
         }

         const registerUser = async (userInfo) => {
            setLoading(true)

            try{
                
                let response = await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);
                
                await account.createEmailPasswordSession(userInfo.email, userInfo.password1)
                let accountDetails = await account.get();
                setUser(accountDetails)
                navigate('/')
            }catch(error){
                console.error(error)
            }
        
            setLoading(false)
         }

         const checkUserStatus = async () => {
            try{
                let accountDetails = await account.get();
                setUser(accountDetails)
            }catch(error){
                
            }
            setLoading(false)
         }

        const contextData = {
            user,
            showcreatbutton,
            referral_code,
            loginUser,
            logoutUser,
            registerUser,
            referralInfo
        }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;