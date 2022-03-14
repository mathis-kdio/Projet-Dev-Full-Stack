export default function Articles(props) {
    
    const articlesElements = props.data.map(i => <div 
        key={i.id} 
        className={i.cost === 500 ? 
            'articles__item articles__item--500' 
            : 
            'articles__item'}
    >
        <img src={props.validateUrl(props.url) ? props.url : ""} alt="Aperçu du produit"/>
        <h3 className='articles__subtitle'>Produit: {i.name}</h3>
        <p style={{fontSize: "14px"}} >Description : {i.description} </p> {/* inline style example, style is assigned a JS object */}
        <p>Prix: {i.cost} </p>
        
        <button 
            className={i.cost === 500 ? 
                "articles__deleteButton articles__deleteButton--500" 
                : 
                "articles__deleteButton"} 
            onClick={event => props.deleteArticle(event, i.id)} /* we need a callback to pass a parameter to our event handler */
        >Delete</button>
    </div>)

    return (
        <div className="articles">
            <h2 className='articles__title'>Articles disponibles</h2>

            <div className='articles__container'>
                {articlesElements}
            </div>
        </div>
    )
}