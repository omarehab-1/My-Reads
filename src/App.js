import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI"
import { Link, Routes, Route } from "react-router-dom";
import Shelves from "./Components/Shelves";
import Search from "./Components/Search";

function App() {
  
 
  const [books, setBooks] = useState([])


  useEffect(()=>{
    const getBooks = async () =>{
      const res = await BooksAPI.getAll();
        setBooks(res);
        console.log(res)
    };
    getBooks()
    return console.log("Books Recived")
  },[])

  const updatingShelves =(book, distenation) =>{
    const updating = books.map((b)=>{
      if(b.id === book.id){
        book.shelf = distenation
        return book
      }
      return b
    })

    setBooks(updating)
    BooksAPI.update(book, distenation);
 
  }
  return (
    <div>
      <Routes>
      <Route path="/search" element={<Search books={books} updatingShelves={updatingShelves}/>}/>
      <Route exact path="" element={<Shelves books={books} updatingShelves={updatingShelves}/>}/>
      </Routes>
      <div className="open-search">
                <Link to="/search">
                  <button className="open-search button"></button>
                </Link>
      </div>
    </div>
      
  )
  }
export default App
