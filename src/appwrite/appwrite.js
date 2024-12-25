import { Client, Account } from 'appwrite';
import conf from '../conf/conf.js';
export const API_ENDPOINT = conf.appwriteUrl
export const PROJECT_ID = conf.appwriteProjectId

const client = new Client()
    .setEndpoint(API_ENDPOINT) 
    .setProject(PROJECT_ID);    

export const account = new Account(client);

export default client;