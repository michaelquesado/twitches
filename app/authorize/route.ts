import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { createWriteStream } from 'node:fs'

export async function GET (req: NextRequest) {
    const params = req.nextUrl.searchParams
    const code = params.get('code')
   
    if (code) {
        const payload = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://localhost:3000/authorize`
        }
        const response = await fetch('https://id.twitch.tv/oauth2/token',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: 'no-store'
        })
       const session = await response.json()
       const file = createWriteStream('./credentials.json', { encoding: 'utf8' })
       file.write(JSON.stringify(session))
       return redirect('/')
    }
    return new Response('NOT_OK')

}