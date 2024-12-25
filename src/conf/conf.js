const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteReferralCodeCollectionId:String(import.meta.env.VITE_APPWRITE_REFERRAL_CODE_COLLECTION_ID),
    appwriteTransactionCollection:String(import.meta.env.VITE_APPWRITE_TRANSACTION_COLLECTION_ID),
    appwriteFeedbackCollectionId:String(import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf