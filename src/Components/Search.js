import * as BooksAPI from "../BooksAPI"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Books from "./Books"
import PropTypes from "prop-types"

const Search = (books,updatingShelves)=>{
    const [query,SetQuery] = useState("")
    const [searchedBooks, SetSearcehedBooks] = useState([])
    const [mergedBooks, setMergedBooks] = useState([]);
    const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
    
    const useForceUpdate = () => useState([1]);


    const Hooks = () => {
      const forceUpdate = useForceUpdate();
    }

    
    const SearchingQuery = (e)=>{
      e.preventDefault();
      SetQuery(e.target.value)
    }


useEffect(() => {

  const combined = Array.isArray(searchedBooks)?
  searchedBooks.map(book => {
    if (mapOfIdToBooks.has(book.id)) {
      return mapOfIdToBooks.get(book.id);
    } else {
      return book;
    }
  }):(
    []
  )
  searchedBooks?
  (setMergedBooks(combined)):(
    setMergedBooks([])
  )
}, [searchedBooks])

const createMapOfBooks = (books) => {
  const map = new Map();
  books.map(book => map.set(book.id, book));
  return map;
}

useEffect(()=>{
BooksAPI.getAll().then((books)=>{
  setMapOfIdToBooks(createMapOfBooks(books))

})
},[])

    useEffect(()=>{
      if(query!== ""|| query.length !== 0){
        BooksAPI.search(query,64).then((books)=>{
          SetSearcehedBooks(books)
          console.log("Search",searchedBooks);

         })
     }else{
        return ([])
     }
     return ()=>{
      console.log("Books is Searched")
     }
     
    },[query]
    )
updatingShelves = (b,distenation)=>{
  BooksAPI.update(b, distenation)
}
   

    return(
        <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" onClick={useForceUpdate}>
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={query} onChange={SearchingQuery} />
                </div>
              </div>
              {
                query.length > 0?(
                  <div className="search-books-results">
                <ol className="books-grid">
                  {
                    mergedBooks.map((b)=>
                    <li key={b.id}>
                        <Books book={b} updatingShelves={updatingShelves}/>
                    </li>
                    )
                  }
                </ol>
              </div>
                ):(
                  <h2>Sorry,Not Found!</h2>
                )
              }
            </div>
    )
}
Search.propTypes = {
query: PropTypes.string,
updatingShelves: PropTypes.func.isRequired,
mergedBooks: PropTypes.array,
searchedBooks: PropTypes.array
}

export default Search