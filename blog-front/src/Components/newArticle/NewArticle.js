export default function NewArticle(props) {

    // the inputs are controled by the state in App.js

    return (
        <div className="newArticle__form">
            <h3 className="newArticle__title" >Add a article</h3>
            <div className="newArticle__container">
                <label>Nom de l'article : {" "} </label>
                <input
                    className="newArticle__input" 
                    type="text"
                    placeholder="Give me a name..." 
                    name="name"
                    value={props.newArticle.name}
                    onChange={props.handleChange} 
                />
            </div>

            <div className="newArticle__container">
                <label>Date de l'article : {" "}</label>
                <input
                    className="newArticle__input"
                    type="date" 
                    name="date"
                    value={props.newArticle.date}
                    onChange={props.handleChange}>
                </input>
            </div>
            
            <div className="newArticle__container">
                <label>Auteur : {" "} </label>
                <input
                    className="newArticle__input" 
                    type="text"
                    placeholder="Give me your name..." 
                    name="autor"
                    value={props.newArticle.autor}
                    onChange={props.handleChange} 
                />
            </div>

            <div className="newArticle__container">
                <label>Catégorie : {" "} </label>
                <select                     
                    className="newArticle__input"
                    value={props.newArticle.categorie}
                    onChange={props.handleChange}>
                    <option value="Catégorie 1">catégorie 1</option>
                    <option value="Catégorie 2">catégorie 2</option>
                    <option value="Catégorie 3">catégorie 3</option>
                </select>
            </div>

            <textarea
                className="newArticle__description"
                placeholder="Description du produit" 
                name="description"
                value={props.newArticle.description}
                onChange={props.handleChange} 
            />

            {props.inputInvalid && <p>{props.inputInvalid}</p>}

            <button className="newArticle__submitButton" onClick={props.submitArticle}>New article</button>
        </div>
        
    )
}