import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';

// import to check types
import PropTypes from 'prop-types';

// import link for routing
import { Link } from 'react-router-dom';

// import the API
import * as BooksAPI from './BooksAPI';

// import the Component
import BookItem from './BookItem';

class SearchBook extends Component { 
  
  
  state={
  	query:'',
    allbooks:[],
    stateOfSearch:'not searching'
  }

 updateQuery=(query)=>{
    this.setState((oldState)=>({
     	query:query,
     }))
  if(query !== ''){	
    BooksAPI.search(query)
  	.then((books)=>{
      let state;
      let theBooks;
      if(books.constructor === Array){
      	state = 'search found';
        theBooks = books;
      }
      else{
        state = 'not match';
        theBooks = []
      }
      
       this.setState((oldState)=>({
   		allbooks:theBooks,
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
  static propTypes = {
      update: PropTypes.func.isRequired,
    }

  render(){  
    const {query, allbooks, stateOfSearch} = this.state;

	const {update} = this.props;
  	return(
    <div className="seachBooks"  ref="myRef">
         <div className="search-books">
         <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <DebounceInput 
      				minLength={1} 
					debounceTimeout={500} 
					placeholder="Search by title or author" 
					value={query} 
					onChange={(event)=>this.updateQuery(event.target.value)} />
			</div>
         </div>
            
		</div>
		<div>
 		{ stateOfSearch === 'search found' && query !== '' ? 
         <div>
         <p className="result">There are <b>{allbooks.length}</b> results with the word "{query}"</p>

 		<ol className="books-grid">
      
      	{allbooks.map((book)=>(  
                <BookItem  book={book} key={book.id} update={update}/>
                     
        ))}

                    </ol></div> : ''}</div>

     
		{stateOfSearch ==='not searching' && 
         <p className="search">Add some text on the search bar to find new books</p>}
		{stateOfSearch ==='not match' && 
         <p className="result">You dont have <span className="red">any</span> match with the word: {query}</p>}
     
     </div>

    )
  }
}

export default SearchBook