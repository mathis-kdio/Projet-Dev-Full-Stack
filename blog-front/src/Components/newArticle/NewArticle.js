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
                    type="number" 
                    name="cost" 
                    value={props.newArticle.cost}
                    onChange={props.handleChange} 
                /> 
            </div>
            
            <div className="newArticle__container">
                <label>Auteur : {" "} </label>
                <input
                    className="newArticle__input" 
                    type="text"
                    placeholder="Give me your name..." 
                    name="name"
                    value={props.newArticle.name}
                    onChange={props.handleChange} 
                />
            </div>

            <div className="newArticle__container">
                <label>Catégorie : {" "} </label>
                <input
                    className="newArticle__input" 
                    type="text"
                    placeholder="Give me the category..." 
                    name="name"
                    value={props.newArticle.name}
                    onChange={props.handleChange} 
                />
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

