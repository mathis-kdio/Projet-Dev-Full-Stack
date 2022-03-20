export default function NewArticle(props) {

    // the inputs are controled by the state in App.js
    return (
        <div className="newArticle__form">
            <h3 className="newArticle__title" >Ajouter un article</h3>
            
            <div className="newArticle__container">
                <label>Titre : {" "} </label>
                <input
                    className="newArticle__input" 
                    type="text"
                    placeholder="Titre de l'article." 
                    name="title"
                    value={props.newArticle.autor}
                    onChange={props.handleChange} 
                />
            </div>

            <div className="newArticle__container">
                <label>Auteur : {" "} </label>
                <input
                    className="newArticle__input" 
                    type="text"
                    placeholder="Auteur de l'arcticle." 
                    name="author"
                    value={props.newArticle.author}
                    onChange={props.handleChange} 
                />
            </div>

            <div className="newArticle__container">
                <label>Date : {" "}</label>
                <input
                    className="newArticle__input"
                    type="date" 
                    name="date"
                    value={props.newArticle.date}
                    onChange={props.handleChange}>
                </input>
            </div>

            <div className="newArticle__container">
                <label>Catégorie : {" "} </label>
                <select                     
                    className="newArticle__input"
                    name="category"
                    value={props.newArticle.category}
                    onChange={props.handleChange}>
                    {props.data.map(i => {
                        return (
                            <option value={i.categoryId} key={i.categoryId}>{i.name}</option>
                        )
                    })}
                </select>
            </div>

            <textarea
                className="newArticle__description"
                placeholder="Contenue de l'article." 
                name="content"
                value={props.newArticle.content}
                onChange={props.handleChange} 
            />

            {props.inputInvalid && <p>{props.inputInvalid}</p>}

            <button className="newArticle__submitButton" onClick={props.submitArticle}>Nouvel article</button>
        </div>
        
    )
}