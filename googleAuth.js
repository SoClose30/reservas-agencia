const {google} = require("googleapis");
const {GoogleAuth} = require("google-auth-library");

const SCOPES = "https://www.googleapis.com/auth/spreadsheets"

const googleAuth = async () => {
    const auth = new GoogleAuth({
        keyFile: "./credentials.json",
        scopes: SCOPES,
    })
    const client = await auth.getClient();
    const sheets = google.sheets({version: "v4", auth: auth});
    return {sheets, auth};
}

module.exports = {
    googleAuth,
}