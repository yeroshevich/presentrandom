import CryptoJS from "crypto-js";

const key = process.env["CRYPTO_KEY "]

export default class Cryptor{
    static Encrypt (text:string) {
        const b64 = CryptoJS.AES.encrypt(JSON.stringify(text), key?key:'').toString()
        const e64 = CryptoJS.enc.Base64.parse(b64)
        return e64.toString(CryptoJS.enc.Hex)
    }
    static Decrypt (text:string) {
        const reb64 = CryptoJS.enc.Hex.parse(text)
        const bytes = reb64.toString(CryptoJS.enc.Base64)
        const decrypt = CryptoJS.AES.decrypt(bytes, key?key:'')
        return decrypt.toString(CryptoJS.enc.Utf8)
    }
}