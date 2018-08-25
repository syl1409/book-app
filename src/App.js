import React from 'react'
import './App.css';

// import the API
import * as BooksAPI from './BooksAPI';

// import the components
import Shelf from './Shelf';
import SearchBook from './SearchBook';

// import Route and link for routing
import { Route, Link } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    books:[], 
    notification: false,
    notificationMessage:''
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=>({
        books
      }))
    })

  }

  updateBook=(book, shelf)=>{
      book.shelf = shelf;
      let newState = this.state.books.filter(x=>x.id !== book.id);
      newState = [...newState, book];
      BooksAPI.update(book,shelf)
      .then((books)=>{
        this.setState((oldState)=>({
          books: newState,
          notification:true,
          notificationMessage: 'The category of your book has been updated'
        }))

      })
      setTimeout(() => {
          this.setState(()=>({
          notification: false
          }))
      }, 2000) 
  }
     
  render() {
	const {books, notification, notificationMessage} = this.state;
    return (
      <div className="app">
      	{/*Route for home or shelfs*/}
		{notification &&<div className="notifications">{notificationMessage}</div>}
      	<Route exact path='/' render={()=>( 
     		<div className="list-books">
            	<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
            	<div className="list-books-content">
            		<div>
          				<Shelf title={'Currently Reading'} 
							shelf={'currentlyReading'} 
							books={books} 
							update={this.updateBook}/>
						<Shelf title={'Read'} 
							shelf={'read'} 
							books={books} 
							update={this.updateBook}/>
						<Shelf title={'Want to Read'} 
							shelf={'wantToRead'} 
							books={books} 
							update={this.updateBook}/>
           			</div>
            	</div>
            <div className="open-search">
             	<Link to='/search'>Add a book</Link>
            </div>
          </div>
    	)}/>
		{/*Route for Search*/}
		<Route exact path='/search' render={()=>( 
        <SearchBook update={this.updateBook}/>
        
        )}/>

      </div>
    )
  }
}

export default BooksApp
