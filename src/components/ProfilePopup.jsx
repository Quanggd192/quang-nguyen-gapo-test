import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Button, outerStyle, modalStyle } from './style'

const Cover = styled.img`
    width: 100%;
    height: 150px;
`
const Avatar = styled.img`
    width: 110px;
    height: 110px;
    margin-top: -60px;
    border-radius: 55px;
    margin-bottom: 40px;
`
const InfoRow = styled.div`
    height: 35px;
    text-align: center;
    font-family: "Inconsolata","Source Code Pro","Consolas","Monaco","Courier",monospace;
`
const Label = styled.label`
    display: inline-block;
    width: 40%;
    text-align: right;
`
export default class ProfilePopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newUser:{
                display_name: "",
                id: "",
                friend_count: "",
                relation: "",
                avatar: "",
                cover: ""
            }
        }
        //style
		this.outerStyle = outerStyle
        this.style = modalStyle
	}
	static propTypes = {
		isModalOpen: PropTypes.bool.isRequired,
		closeModal: PropTypes.func.isRequired,
		style: PropTypes.shape({
			modal: PropTypes.object,
			overlay: PropTypes.object
		})
	};
    handleChange = event => {
        let newUser = this.state.newUser
        newUser[event.target.name] = event.target.value
        this.setState({
            newUser
        })
    }
    handleSubmit = (event) => {
        this.props.onSubmitNewUser(this.state.newUser)
        event.preventDefault()
    }
	
	// render modal
	render() {
        
        let user = this.props.userProfile
        let viewProfileContent = <div style={{textAlign: "center", marginTop: 30}}>
            <div style={{width: '100%', height: 150}}>
                <Cover alt="cover" src={user.cover} />
            </div>
            <Avatar alt="avatar" src={user.avatar}/>
            <InfoRow>Name: {user.display_name}</InfoRow>
            <InfoRow>id: {user.id}</InfoRow>
            <InfoRow>number of friends: {user.friend_count}</InfoRow>
            <InfoRow>relationship: {user.relation}</InfoRow>
        </div>
        let createNewUserContent = <div>
            <Row>

            <form onSubmit={(this.handleSubmit.bind(this))}>
                <Label>Name: </Label>
                <input value={this.state.newUser.display_name} name="display_name" onChange={this.handleChange.bind(this)} required/>
                <Label>id:</Label>
                <input type="number" value={this.state.newUser.id} name="id" onChange={this.handleChange.bind(this)} required/>
                <Label>Number of friends: </Label>
                <input type="number" value={this.state.newUser.friend_count} name="friend_count" onChange={this.handleChange.bind(this)} required/>
                <Label>Relationship: </Label>
                <input value={this.state.newUser.relation} name="relation" onChange={this.handleChange.bind(this)} required/>
                <Label>Avatar link: </Label>
                <input value={this.state.newUser.avatar} name="avatar" onChange={this.handleChange.bind(this)}/>
                <Label>Cover link: </Label>
                <input value={this.state.newUser.cover} name="cover" onChange={this.handleChange.bind(this)}/><br/>
                <div style={{textAlign: "center"}}><Button type="submit">Submit</Button></div>
            </form>
            </Row>
        </div>
		return (
			<div
				style={{
					...this.outerStyle,
					display: this.props.isModalOpen ? "block" : "none"
				}}
			>
				<div style={this.style.overlay} onClick={this.props.closeModal} />
				<div onClick={this.props.closeModal}></div>
				<div style={this.style.modal}>
                    {this.props.modalType === "view-profile" ? viewProfileContent : createNewUserContent}
                </div>
			</div>
		);
	}
}

