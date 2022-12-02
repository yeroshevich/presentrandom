import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {useRouter} from "next/router";

export function useRedirect() {
    const router = useRouter()
    function redirect(path:string){
        router.push(path)
    }
    return redirect
}