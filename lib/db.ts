import mysql from 'serverless-mysql';
interface QueryParams{
    query:string,
    values:Array<string>
}


const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,

    }
})

export default async function executeQuery(params:QueryParams){
    try{
        const results = await db.query(params.query,params.values)
        await db.end()
        return results;
    }catch (e)
    {
        return {e}
    }
}