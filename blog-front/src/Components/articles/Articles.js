export default function Articles(props) {
    
    const articlesElements = props.data.map(i => 
        
    <div 
        key={i.id} 
        className={i.cost === 500 ? 
            'articles__item articles__item--500' 
            : 
            'articles__item'}
    >
        <h3 className='articles__subtitle'>Categorie: {i.category}</h3>
        <h className='articles__title'><b><u><center>{i.title}</center></u></b></h>
        <p className='articles__date'><center>{i.date}</center></p>
        <p className='articles__description'>{i.content} </p> {/* inline style example, style is assigned a JS object */}
        <p className='articles__subtitle'>Auteur: <i>{i.author}</i></p>
        
        
        <button 
            className={i.cost === 500 ? 
                "articles__deleteButton articles__deleteButton--500" 
                : 
                "articles__deleteButton"} 
            onClick={event => props.deleteArticle(event, i.id)} /* we need a callback to pass a parameter to our event handler */
        >Supprimer</button>
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