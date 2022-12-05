//const crypto = require('crypto-js')
//const bcrypt = require('bcrypt')

import CryptoJS from "crypto-js";

const { encrypt, decrypt } = require("ncrypt-js");
const ncrypt = require("ncrypt-js");


import crypto from "crypto-js";

const key = process.env["CRYPTO_KEY "]? process.env["CRYPTO_KEY "].toString():''

// export function Encrypt (text:string):string {
//     // const b64 = CryptoJS.AES.encrypt(text, key?key:'').toString()
//     // const e64 = CryptoJS.enc.Base64.parse(b64)
//     // return e64.toString(CryptoJS.enc.Hex)
//     return crypto.AES.encrypt(text,key?key:'').toString()
// }
// export function Decrypt (text:string) :string{
//     // const reb64 = CryptoJS.enc.Hex.parse(text)
//     // const bytes = reb64.toString(CryptoJS.enc.Base64)
//     // const decrypt = CryptoJS.AES.decrypt(bytes, key?key:'')
//     // return decrypt.toString(CryptoJS.enc.Utf8)
//     const bytes = crypto.AES.decrypt(text,key?key:'')
//     return bytes.toString(crypto.enc.Utf8)
// }

export default class Cryptor{
    static Encrypt (text:string) {
        const b64 = CryptoJS.AES.encrypt(text, key).toString()
        const e64 = CryptoJS.enc.Base64.parse(b64)
        return e64.toString(CryptoJS.enc.Hex)
        //return CryptoJS.AES.encrypt(text,key?key:'')
    }
    static Decrypt (text:string) {
        const reb64 = CryptoJS.enc.Hex.parse(text)
        const bytes = reb64.toString(CryptoJS.enc.Base64)
        const decrypt = CryptoJS.AES.decrypt(bytes, key)
        return decrypt.toString(CryptoJS.enc.Utf8)
        // const bytes = CryptoJS.AES.decrypt(text,key?key:'')
        // return bytes.toString(CryptoJS.enc.Utf8)
    }
    // static Encrypt (text:string):string {
    //     //return CryptoJS.AES.encrypt(JSON.stringify(text),key ? key:'')
    //     let encJson = CryptoJS.AES.encrypt(JSON.stringify(text), key?key:'').toString()
    //     let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    //     return encData
    // }
    // static Decrypt (text:string) :string{
    //     //return CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Base64.parse(text)},key?key:'').toString(CryptoJS.enc.Utf8)
    //     try{
    //         let decData = CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8)
    //         let bytes = CryptoJS.AES.decrypt(decData, key?key:'').toString(CryptoJS.enc.Utf8)
    //         return JSON.parse(bytes)
    //     }catch (e)
    //     {
    //         console.log(e)
    //         return ''
    //     }
    // }

}

// export function Encrypt (text:string):string {
//
//     // @ts-ignore
//     return CryptoJS.AES.encrypt("message",key ? key:'')
// }
// export function Decrypt (text:string) :string{
//    return CryptoJS.AES.decrypt(text,key?key:'').toString(CryptoJS.enc.Utf8)
// }