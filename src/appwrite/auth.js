import config from "../config_env/config";
import { Client, Account, ID } from "appwrite";


// Class === "Servires"
export class AuthService {
    client = new Client() ;
    account ;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email , password , name}){
        try {
            const userAccount = await this.account.create( ID.unique() , email , password , name)
            if (userAccount) {
                // return userAccount
                // Call Another Method
                return this.logIn({email , password})
            }else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async logIn({email , password}){
        try {
            return await this.account.createEmailSession(email , password)
        } catch (error) {
            throw error
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }

        return null
    }

    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
} 

const authService = new AuthService()

export default authService