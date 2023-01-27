import Books from "./Books"
import PropTypes from "prop-types"
const Shelf = ({books,title,updatingShelves})=>{


    return(
        <div>
            <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((b)=>
                            <li key={b.id}>
                            <Books book={b} updatingShelves={updatingShelves}/>
                          </li>)
                        }
                      
                    </ol>
                  </div>
                </div>
                </div>
        </div>
      
    )
}

Shelf.propTypes ={
  books: PropTypes.array.isRequired,
  updatingShelves: PropTypes.func.isRequired
}


export default Shelf