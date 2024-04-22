import config from "../config_env/config";
import { Client, ID , Databases , Storage , Query} from "appwrite";

export class DatabaseService{
    client = new Client();
    databases ;
    storage ;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    // Post Related Services
    
    async createPost({title , slug , content , featuredImage , status , userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId ,
                config.appwriteCollectionId ,
                slug ,
                {
                    title,
                    content,
                    featuredImage ,
                    status ,
                    userId ,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error " , error)
        }
    }
    async updatePost( slug ,{title , content , featuredImage , status }){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId ,
                config.appwriteCollectionId ,
                slug ,
                {
                    title ,
                    content ,
                    featuredImage ,
                    status ,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug ,
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: createPost :: error " , error)
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug ,                
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error " , error)
            return false
        }
    }
    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId ,
                config.appwriteCollectionId,
                queries ,
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error " , error)
            return false
        }
    }

    // File Upload Services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file ,
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error " , error)
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId ,
                fileId ,
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: createPost :: error " , error)
            return false
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketId ,
            fileId
        )
    }
}


const databaseService = new DatabaseService()

export default databaseService