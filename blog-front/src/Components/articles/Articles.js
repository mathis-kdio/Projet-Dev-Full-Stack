export default function Articles(props) {
    
    const articlesElements = props.data.map(i => <div 
        key={i.id} 
        className={i.cost === 500 ? 
            'articles__item articles__item--500' 
            : 
            'articles__item'}
    >
        <h3 className='articles__subtitle'>Categorie: {i.category}</h3>
        <p className='articles__subtitle'>Auteur: {i.author}</p>
        <p style={{fontSize: "14px"}} >Description : {i.content} </p> {/* inline style example, style is assigned a JS object */}
        <p>Date: {i.date} </p>
        
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