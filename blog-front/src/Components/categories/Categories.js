import Tabs from "../Tabs";

export default function Categories(props) {
  const categoriesElements = props.data.map(i =>
    <div
      key={i.categoryId}
      title={i.name}
      onClick={event => props.showCategorie(event, i.categoryId)}
    >
      <h3>{i.name}</h3>
    </div>
  )
  categoriesElements.unshift(
    <div
      key="0"
      title="Tous les articles"
      onClick={event => props.showCategorie(event, 0)}
    >
      <h3>Tous les articles</h3>
    </div>
  )
  
  if (categoriesElements.length > 0) {
    return (
      <Tabs>
        {categoriesElements}
      </Tabs>
    )
  }
  else {
    return(
      <h3>Pas de catégories à afficher</h3>
    )
  }
}