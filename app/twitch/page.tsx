import { randomUUID } from 'node:crypto'

export default function Twitch () {
    const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:3000/authorize&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=${randomUUID()}`
    return (
        <a href={url}>Connect with Twitch</a>
    )
}