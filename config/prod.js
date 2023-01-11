module.exports = {
    googleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionID: process.env.DIALOGFLOW_SESSION_ID,
    dialogFlowSessionLanguageCode: process.env.DIALOGFLOW_SESSION_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
    googleType: process.env.GOOGLE_TYPE,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY_ID,
    firebasePrivateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    firebaseClientID: process.env.FIREBASE_CLIENT_ID,
    firebaseAuthURI: process.env.FIREBASE_AUTH_URI,
    firebaseTokenURI: process.env.FIREBASE_TOKEN_URI,
    firebaseAuthProvider: process.env.FIREBASE_AUTH_PROVIDER,
    firebaseClientCertURL: process.env.FIREBASE_CLIENT
 };