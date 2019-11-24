import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from './style'

const Function = require('../function')

const Navbar = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  height: 70px; 
  background: #333;
`
const SuggestContainer = styled.div`
    width: 300px;
    text-align: center;
    float: right;
    margin-right: 50px;
    `
const Input = styled.input`
    border: solid 1px #777;
    border-radius: 6px;
    width: 85%;
    height: 30px;
    
`
const SearchForm = styled.form`
    width: 100%;
    height: 70px;
    display: flex;
    padding: 20px 0 0 0;
    margin-bottom: -35px;
    ${Input}.middle:focus & {
        outline: none;
    }
`
const SuggestingList = styled.div`
    width: 300px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    position: absolute;
    background: #555;
    border-radius: 5px;
`
const SuggestingItem = styled.div`
    height: 40px;
    line-height: 40px;
    color: #666;
    text-align: left;
    padding-left: 10px;
    background: #555;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`

export default class SearchBar extends Component {

    constructor() {
        super()
        this.state = {
            listKeys: [],
            searchKey: '',
            showSugest: true
        }
    }
    
    callSuggestion = async event => {
        this.setState({
            searchKey: event.target.value,
            showSugest: true
        })
        // call function
        let listKeys = await Function.suggest(event.target.value)
        this.setState({listKeys})
    }
    hideSuggestingList = () => {
        this.setState({
            showSugest: false
        })
    }
    render() {
        let listKeys = Array.from(this.state.listKeys)
        let suggestKeys = listKeys.map(e => {
            return(<SuggestingItem onClick={() => {
                this.props.onChoose(e, 1, null)
                this.setState({listKeys: [], searchKey: e })
            }}>{e}</SuggestingItem>)
        })
        return (
            <Navbar>
                <SuggestContainer>
                    <SearchForm>
                        <Input placeholder=" Type a name..." 
                            value={this.state.searchKey} name="search" 
                            onChange={this.callSuggestion.bind(this)}
                            />
                        <Button type="button" onClick={() => this.props.onChoose(this.state.searchKey, 1, null)}>Search</Button>
                    </SearchForm>
                    <SuggestingList style={this.state.showSugest ? {} : {display: "none"}} onOutsideClick={() => this.hideSuggestingList()}>
                        {suggestKeys}
                    </SuggestingList>
                </SuggestContainer>
            </Navbar>
        )
    }
}
