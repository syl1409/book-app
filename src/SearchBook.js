import React, { Component } from 'react';

// import link for routing
import { Link } from 'react-router-dom';

// import the API
import * as BooksAPI from './BooksAPI';

import BookItem from './BookItem'

class SearchBook extends Component {
  
  state={
  	query:'',
    allbooks:[],
    stateOfSearch:'not searching'
  }

findShelf(id){
	BooksAPI.get(id).then((book)=>{
      console.log(book);
      return book.shelf;
    })
}

updateQuery=(query)=>{
    this.setState((oldState)=>({
     	query:query.trim(),
     }))
  if(query !== ''){	
    BooksAPI.search(query,8)
  	.then((books)=>{
      let state;
      console.log('result books',books);
      if(books.constructor === Array){
      	state = 'search found';
      }
      else{
        state = 'not match';
      }
       this.setState((oldState)=>({
   		allbooks:books,
         stateOfSearch: state
     }))

     })}
  else{
  this.setState((oldState)=>({
   		allbooks:[],
    	stateOfSearch:'not searching'
     }))
  }

 }

  render(){
     
    const {query, allbooks, stateOfSearch} = this.state;
	const {update} = this.props;
	console.log(allbooks);
  	return(
    <div className="seachBooks">
         <div className="search-books">
         <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"value={query} 
					onChange={(event)=>this.updateQuery(event.target.value)} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
</div>
{ stateOfSearch === 'search found' && <ol className="books-grid">
      
      	{allbooks.map((book)=>(  
                <BookItem book={book} key={book.id} shelf={this.findShelf(book.id)} update={update}/>
                     
        ))}

                    </ol>
}
     
{stateOfSearch ==='not searching' && <p>Type a criteria</p>}
{stateOfSearch ==='not match' && <p>No match</p>}
     
     </div>

    )
  }
}

export default SearchBook