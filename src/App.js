import React, { Component } from 'react'
// import './App.css';

import SearchBar from './components/SearchBar'
import ListUser from './components/ListUser'
const Function = require('./function')

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      listUsers: [],
      searchKeyWord: "",
      page: 1,
      numOfPages: 0,
      sort: "name"
    }
  }
  componentDidMount(){
    this.getListUsers(this.state.searchKeyWord,this.state.page, this.state.sort)
  }
  getListUsers = async (key,page, sort, filter) => {
    if(!page)
      page = this.state.page
    if(!sort)
      sort = this.state.sort
    if(!key)
      key = this.state.searchKeyWord
    let result = await Function.getListUser(key, page, sort, filter)
    this.setState({listUsers: result.listUsers, numOfPages: result.numOfPages, page: page, searchKeyWord: key, sort: sort})
  }
  removeUser = async user => {
    let result = await Function.removeUser(user.id, this.state.searchKeyWord, this.state.page)
    if(result.success){
      alert("remove user success")
      this.setState({listUsers: result.listUsers, numOfPages: result.numOfPages })
    } else {
      alert("remove user failed")
    }
  }
  createNewUser = async user => {
    let result = await Function.createNewUser(user, this.state.searchKeyWord, this.state.page)
    if(result.success){
      alert("add user success")
      this.setState({
        listUsers: result.listUsers,
        numOfPages: result.numOfPages
      })
    }
    else {
      alert("Add user failed, " + result.mess)
    }
  }
  render() {
    return (
      <div>
        <SearchBar onChoose={this.getListUsers} searchKeyWord={this.state.searchKeyWord}/>
        <ListUser 
          onPageChange={this.getListUsers} 
          onSortChange={this.getListUsers}
          onRemoveUser={this.removeUser}
          onCreateUser={this.createNewUser}
          listUsers={this.state.listUsers} 
          page={this.state.page}
          numOfPages={this.state.numOfPages}
          searchKeyWord={this.state.searchKeyWord}  
          sort={this.state.sort}
        />
      </div>
    );
  } 
}

export default App;
