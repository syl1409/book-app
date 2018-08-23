import React from 'react';

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
                <BookItem book={book} key={book.id} shelf={book.shelf} update={update}/>
                     
        ))}

                    </ol>
                  </div>
                </div>
    	)
	
}

export default Shelf