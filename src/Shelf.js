import React from 'react';

// import to check types
import PropTypes from 'prop-types';

// import components
import BookItem from './BookItem'


const Shelf =(props)=>{
  	
  	const {title, shelf, books, update} = props;
  	const filterBooks = books.filter(x => x.shelf === shelf);
 
	return(
    	 <div className="bookshelf">
       		<h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
      
      	{filterBooks.map((book)=>(  
                <BookItem book={book} key={book.id} update={update}/>
                     
        ))}

                    </ol>
                  </div>
                </div>
    	)
	
}

  Shelf.propTypes = {
    title: PropTypes.string,
    shelf: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    books:PropTypes.array.isRequired

  }

export default Shelf