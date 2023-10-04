import { OnlineTalents } from "@/bundle/features/dto/online-talents"

import Image from "next/image"
import { redirect } from "next/navigation"

type Inputs = { 
  access_token: string
  users_to_search: string 
}
const getStream = async ({ access_token, users_to_search }: Inputs) => {
  const response = await fetch(`https://api.twitch.tv/helix/streams?${users_to_search}`,{
      headers: {
          authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.CLIENT_ID!,
      },
      cache: 'no-store'
  })
  const { data } = await response.json()
  return data
}

type RefreshInput = {
  refresh_token: string
}

const getGames = async ({ access_token, page = '' }: { access_token: string, page: string }) => { 
  const query = new URLSearchParams({ after: page }).toString()
  console.log({ query })
  const response = await fetch(`${process.env.TWITCH_API_URL}/games/top${page !== '' ? '?'.concat(query) : ''}`,
  {
      headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.CLIENT_ID!
      }
  })
  return response.json()
}

const refreshToken = async ({ refresh_token }: RefreshInput) => {
  const response = await fetch('https://id.twitch.tv/oauth2/token',{
      method: 'POST',
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token
    })
  })

  const { data } = await response.json()
  return data
}

const talentsSearchParams = new URLSearchParams([
  ['user_login', 'olesyaliberman'],
  ['user_login', 'ratofelizfps'],
  ['user_login', 'Vansessy'],
  ['user_login', 'gaules'],
  ['user_login', 'amouranth'],
  ['user_login', 'victoria'],
  ['user_login', 'strawberrytabby'],
  ['user_login', 'Nomadi_'],
  ['user_login', 'yulia_bb'],
  ['user_login', 'aphreel'],
  ['user_login', 'Caxyhh'],
  ['user_login', 'leynainu'],
  ['user_login', 'sharonqueen'],
]).toString()

export default async function Home() {  
  const { access_token } = await import('../credentials.json')
  if (access_token === '') {
    redirect('/twitch')
  }
  const onlineTalents = await getStream({ access_token, users_to_search: talentsSearchParams })
  const talents: Array<OnlineTalents.Output> = onlineTalents.map((t: any) => OnlineTalents.create(t) )
  const divs = talents.map(v =>
    <div className="avatar"  key={v.talent_name}>
      <div className="w-48 rounded-xl">
        <a href={v.streaming.link} target="blank">
          <Image src={v.streaming.thumb} width="600" height="300" alt={v.talent_name} />
        </a>
      </div>
    </div> 
  )
  console.log(await getGames({ access_token, page: '' }))
  
  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-4 gap-4 gap-x-8 gap-y-4">
        {divs}
      </div>
    </main>
  )
}
