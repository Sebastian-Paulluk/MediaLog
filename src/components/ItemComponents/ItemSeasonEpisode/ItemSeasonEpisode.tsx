import './ItemSeasonEpisode.scss'

interface ItemSeasonEpisodeTypes {
    season: number;
    episode: number;
}

export const ItemSeasonEpisode: React.FC<ItemSeasonEpisodeTypes> = ({season, episode}) => {

    return (
        <div className='item-season-episode'>
            <div className='season-container'>
                <p>Season</p>
                <p className='season'>{season}</p>
            </div>
            <div className='episode-container'>
                <p>Episode</p>
                <p className='episode'>{episode}</p>
            </div>
        </div>
    )
}