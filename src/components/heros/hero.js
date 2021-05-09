
const Hero = ({ hero, activeHero, deleteHero }) => {

    const btnClass = `btn ${hero.isActive ? `btn-green` : `btn-red`}`

    const toggleHeroActive = () => {
        if (hero.isActive)
            deleteHero(hero.hero_id)
        else    
            activeHero(hero.hero_id)
    }

    return <div className="hero">
        <img src={hero.photo_url} alt="" />
        <h2>{hero.hero_name}</h2>
        <p>({hero.full_name})</p>
        <button className={btnClass} onClick={() => toggleHeroActive()}>{hero.isActive ? `Active` : `Inactive`}</button>
    </div>

}

export default Hero;