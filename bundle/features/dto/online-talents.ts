export class OnlineTalents {
    private readonly talent_name: string
    private readonly title: string
    private readonly game: string
    private thumb!: string
    private link!: string    
    
    private constructor(inputs: OnlineTalents.Input) {
        this.talent_name = inputs.user_name
        this.title = inputs.title
        this.game = inputs.game_name
        this.setThumb(inputs.thumbnail_url)
        this.setLink() 
    }

    static create (inputs: OnlineTalents.Input): OnlineTalents.Output {
        const onlineTalent = new OnlineTalents(inputs)
        return {
            talent_name: onlineTalent.talent_name,
            streaming: {
                title: onlineTalent.title,
                game: onlineTalent.game,
                link: onlineTalent.link,
                thumb: onlineTalent.thumb,
            }
        }
    }

    private setLink(): void {
        this.link = `https://twitch.tv/${this.talent_name}`
    }

    private setThumb(thumb: string): void {
        this.thumb = thumb.replace(/\{width\}/gm,'600')
            .replace(/\{height\}/gm, '300')
    }
}

export namespace OnlineTalents {
    export type Input = {
        user_name: string
        game_name: string
        title: string
        thumbnail_url: string
    }
    export type Output = {
        talent_name: string
        streaming: {
         title: string
         game: string
         thumb: string
         link: string    
        }
    }
}
