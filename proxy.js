import {updateSession} from '@/app/lib/supabase/middleware'
export async function proxy(request){
    return await updateSession(request)
}
export const config = {
  matcher: ["/chat/:path*", "/sign-up", "/log-in", "/dashboard/:path*"],
};