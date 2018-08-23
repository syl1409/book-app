import React, {Component} from 'react';
// import the API
import * as BooksAPI from './BooksAPI';

class BookItem extends Component{
  state={
  	shelf:'',
    book:'',
    update: false
  }

	handleChange=(value, book)=>{
    this.setState((oldState)=>({
    	shelf:value,
      	book:book,
      	update:true
    }))
      
    }
componentDidMount(){

BooksAPI.get(this.props.book.id).then((book)=>{

     this.setState(()=>({
     shelf:book.shelf
     }))
    })

}
	componentDidUpdate(){
	if(this.state.update){
    this.updateBook(this.state.book, this.state.shelf)
	}
	
    }

	updateBook=()=>{
      this.props.update(this.state.book, this.state.shelf);
		this.setState((oldState)=>({
      	update:false
    }))
    }

  render(){
  const {book} = this.props;
	const {shelf} = this.state;
	
	return(
    	<li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" 
          							style={{ 
          								width: 128, 
          								height: 193, 
          								backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}> 
							</div>
                            <div className="book-shelf-changer">
                              <select value={shelf} onChange={(e)=>{this.handleChange(e.target.value, book)}} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>

{book.authors !==undefined && <div className="book-authors">{book.authors.map(author=>{
									return (
										<span key={author}>{author}</span>
											)
							})}</div> }

						
                        </div>
                      </li>
    )
}
}

export default BookItem