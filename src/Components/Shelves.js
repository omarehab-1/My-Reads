import React from "react";
import Shelf from "./Shelf";

const Shelves = ({books, updatingShelves})=>{

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    
    return (
        <div>
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <Shelf title="Currently Reading" books={currentlyReading} updatingShelves={updatingShelves}/>
        <Shelf title="Want To Read" books={wantToRead} updatingShelves={updatingShelves}/>
        <Shelf title="Read" books={read} updatingShelves={updatingShelves}/>
        </div>
    )

}
export default Shelves