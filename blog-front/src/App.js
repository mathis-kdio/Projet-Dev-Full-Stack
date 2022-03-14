import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Articles from './Components/articles/Articles';
import NewArticle from './Components/newArticle/NewArticle';

import './App.css';
import './Components/articles/articles.css';
import "./Components/newArticle/newArticle.css";
import Header from './Components/Header';

import Tabs from "./Components/Tabs";

function App() {
  const [allArticles, setAllArticles] = useState([]);
  // const [allCategories, setAllCategories] = useState([]);

  const [newArticle, setNewArticle] = useState({
    id: 0,
    name: "",
    description: "",
    cost: 0,
    categories: []
  });

  const [toDelete, setToDelete] = useState({deleting: false});
  const [posting, setPosting] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);

  
  
  // fetch articles and categories data from API
  useEffect(() => {
    fetch('http://localhost:8080/api/private/article')
    .then(res => res.json())
    .then(data => {
      setAllArticles(data);
    })
    .catch(e => console.log(e.toString()));
    
    // fetch('http://localhost:8080/api/private/category')
    // .then(res => res.json())
    // .then(data => {
      //   // const d = JSON.parse(JSON.stringify(data).replace(/</g, '\\u003c'));
      //   setAllCategories(data);
      // })
      // .catch(e => console.log(e.toString()));
  }, [posting, toDelete]);
    
    
  // check if url uses a secured protocol
  const sampleUrl = "https://via.placeholder.com/200/e9fff4";

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
  }, [posting]);


  // triggers deletion and send DELETE request
  function deleteArticle(event, id) {
    event.stopPropagation();

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
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

  // console.log(newArticle);
  // console.log("infinite loop here");
  // console.log(allCategories);
  // console.log(toDelete);
  
  return (
    <div className="App">
      
      <Header />
      <Tabs>
        <div title="categorie 1">
            <Articles 
              data={allArticles}
              deleteArticle={deleteArticle}
              validateUrl={validateUrl}
              url={sampleUrl}
            />
        </div>
        <div title="categorie 2">
            <Articles 
              data={allArticles}
              deleteArticle={deleteArticle}
              validateUrl={validateUrl}
              url={sampleUrl}
            />
        </div>
        <div title="categorie 3">
            <Articles 
              data={allArticles}
              deleteArticle={deleteArticle}
              validateUrl={validateUrl}
              url={sampleUrl}
            />
        </div>
      </Tabs>

        <NewArticle 
          newArticle={newArticle}
          handleChange={handleChange}
          submitArticle={submitArticle}
          inputInvalid={inputInvalid} 
        />
    </div>
  );
}

export default App;
