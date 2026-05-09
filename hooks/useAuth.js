import {supabase} from "@/app/lib/supabase/client"
import {useEffect, useState } from "react"
export function useAuth(){
    const [user,setUser]= useState(null)
    const [loading,setLoading]= useState(true)

    useEffect(() => {
        async function getUser() {
        const { data } = await supabase.auth.getUser()

        setUser(data.user)
        setLoading(false)
    }

    getUser()
  }, [])
  return {
    user,loading
  }
}