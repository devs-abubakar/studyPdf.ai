import {updateSession} from '@/app/utils/supabase/middleware'
export async function proxy(request){
    return await updateSession(request)
}
export const config = {
  matcher: ["/dashboard/:path*"],
};