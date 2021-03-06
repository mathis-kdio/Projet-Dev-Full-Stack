import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Articles from './Components/articles/Articles';
import NewArticle from './Components/newArticle/NewArticle';

import Categories from './Components/categories/Categories';

import './App.css';
import './Components/articles/articles.css';
import "./Components/newArticle/newArticle.css";
import './Components/categories/categories.css';

import Header from './Components/Header';

function App() {
  const [allArticles, setAllArticles] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [newArticle, setNewArticle] = useState({
    id: 0,
    title: "",
    author: "",
    date: "",
    category: "politiques",
    categories: [],
    content: ""
  });

  const [toDelete, setToDelete] = useState({deleting: false});
  const [posting, setPosting] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);

  const [categorietoShow, setArticlesOfCategoriesToShow] = useState({show: false, categorieId: 0});

  
  // fetch articles and categories data from API
  useEffect(() => {
    fetch('http://localhost:8080/api/private/article')
    .then(res => res.json())
    .then(data => {
      setAllArticles(data);
    })
    .catch(e => console.log(e.toString()));

    fetch('http://localhost:8080/api/private/category')
    .then(res => res.json())
    .then(data => {
      setAllCategories(data);
    })
    .catch(e => console.log("error"));
  }, [posting, toDelete]);

  function validateUrl(url) {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol);
  }


  // initialize invalidInput state to false to handle error messages
  function initInvalidInput() {
    setInputInvalid(false);
  }

  // validate inputs, handle errors messages and update newArticle state
  function handleChange(event) {
    const {type, name, value} = event.target;

    type === "number" ?
      value.match(/^[0-9]+$/) ?
        setNewArticle(prevState => {
          initInvalidInput(); // we use a separate function here bcz it's bad practice to set a state from inside another state

          return {...prevState,
            id: allArticles.length + 1,
            [name]: Number(value)
          }
        }) 
        :
        setInputInvalid("Cost must be a positive number")
      :
      value.match(/^.*[<>/\\].*$/) ?
        setInputInvalid("Only letters, numbers and spaces") 
        :
        value.length > 255 ?
          setInputInvalid("Max characters is 255")
          :
          setNewArticle(prevState => {
            initInvalidInput();

            return {...prevState,
              id: allArticles.length + 1,
              [name]: value
            }
          });
  }


  // triggers submit and send POST request
  function submitArticle() {
    setPosting(true);
  }

  useEffect(() =>{
    if (posting) {
      newArticle.categories.push({name: newArticle.category, categoryId: allCategories.find(el => el.name === newArticle.category).categoryId})
      console.log("newarticle useeffect")
      console.log(newArticle)
      fetch('http://localhost:8080/api/private/article', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newArticle)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosting(false);
      })
      .catch(e => console.log(e.toString()));
    }
  }, [posting, newArticle, allCategories]);


  // triggers deletion and send DELETE request
  function deleteArticle(event, id) {
    event.stopPropagation();

    Swal.fire({
      title: 'Etes vous s??r ?',
      text: "Il ne sera pas possible d'annuler la suppression !",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui je veux supprimer !',
      cancelButtonText: 'Annuler'
    })
    .then((result) => {
      if (result.isConfirmed) {
        setToDelete({deleting: true, articleId: id});

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      };
    });
    
  }

  useEffect(() => {
    if (toDelete.deleting) {
      fetch(`http://localhost:8080/api/private/article/${toDelete.articleId}`, {
        method: "DELETE"
      })
      // .then(res => {if(res) {res.json()}}) this endpoint doesn't return a body inside the response
      .then(() => {
        setToDelete({deleting: false, articleId: -1});
      })
      .catch(e => console.log(e.toString()));
    }
  }, [toDelete])
  
  function showCategorie(event, categorieId) {
    setArticlesOfCategoriesToShow({show: true, categorieId: categorieId});
  }

  useEffect(() => {
    if (categorietoShow.show) {
      fetch(`http://localhost:8080/api/private/article`)
      .then(res => res.json())
      .then(data => {
        if (categorietoShow.categorieId !== 0) {
          setAllArticles(data.filter(article => article.categories.some(category => category.categoryId === categorietoShow.categorieId)))
        }
        else {
          setAllArticles(data);
        }
        setArticlesOfCategoriesToShow({show: false})
      })
      .catch(e => console.log(e.toString()));
    }
  })

  return (
    <div>  
      <Header/>
      <Categories 
        data={allCategories}
        showCategorie={showCategorie}
      />
      <Articles 
        data={allArticles}
        deleteArticle={deleteArticle}
        validateUrl={validateUrl}
      />
      <NewArticle
        data={allCategories}
        newArticle={newArticle}
        handleChange={handleChange}
        submitArticle={submitArticle}
        inputInvalid={inputInvalid} 
      />
    </div>
  );
}

export default App;
