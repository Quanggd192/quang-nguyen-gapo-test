import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid, Row, Col3, Button } from './style'
import ProfilePopup from './ProfilePopup'

const Ul = styled.ul`
    list-style-type: none;
    color: #555;
    width: 100%;
    font-family: "Inconsolata","Source Code Pro","Consolas","Monaco","Courier",monospace;
`
const Li = styled.li`
    display: inline-block;
    border: radius 1px #555;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
`

const BtnEdit = styled(Button)`
    background: #fff;
`
const BtnRemove = styled(Button)`
    background: #fff;
    color: #dd7171;
    border: solid 1px #dd7171;
`
const Img = styled.img`
    width: 50px;
    height: 50px;
`

const SortFilterForm = styled.form`
    width: 40%;
    height: 50px;
    display: flex;
    padding: 20px 0 0 0;
    margin-bottom: -35px;
`
const Select = styled.select`
    height: 30px;
    border-radius: 4px;
`
const Option = styled.option`

`
export default class ListUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            listUsers : [],
            isModalOpen: false,
            modalType: "view-profile",
            userProfile: {},
            sort: this.props.sort
        }
    }

    handlePaggingClicking = page => {
        if(page === this.props.page)
            return null
        this.props.onPageChange(null,page, this.props.sort)
    }
    handleOpenProfileModal = user => {
        this.setState({
            isModalOpen: true,
            userProfile: user,
            modalType: "view-profile"
        })
    }
    handleCloseModal = () => {
        this.setState({isModalOpen: false})
    }
    handleRemoveUser = user => {
        this.props.onRemoveUser(user)
    }
    handleClickCreateUser = () => {
        this.setState({
            isModalOpen: true,
            modalType: "create-new-user"
        })
    }
    handleCreateUser = user => {
        this.setState({
            isModalOpen: false
        })
        this.props.onCreateUser(user)
    }
    handleSortChange = (event) => {
        this.props.onSortChange(null, 1, event.target.value, null)
        this.setState({
            sort: event.target.value
        })
    }
    render() {
        let ListUserDom = this.props.listUsers.map(e => {
            return <Row key={e.id}>
            <Col3><Img alt="avatar" src={e.avatar}/></Col3>
            <Col3>{e.display_name}</Col3>
            <Col3>{e.id}</Col3>
            <Col3>
                <BtnEdit onClick={() => this.handleOpenProfileModal(e)}>Detail</BtnEdit>&nbsp;
                <BtnRemove onClick={() => this.handleRemoveUser(e)}>Remove</BtnRemove>
            </Col3>
        </Row>
        })
        let ListPaging = []
        for(let i=1; i <= this.props.numOfPages; i++){
            ListPaging.push(<Li key={i}
                style={this.props.page === i ? {border: "solid 1px lightblue"} : {}} 
                onClick={() => this.handlePaggingClicking(i)}
            >{i}</Li>)
        }
        return (
            <Grid>
                <br/>
                <Row>
                    <SortFilterForm>
                        <Select defaultValue={this.state.sort} onChange={this.handleSortChange.bind(this)}>
                            <Option value="name">Sort By Name</Option>
                            <Option value="id-increase">Sort By Id (increase)</Option>
                            <Option value="id-decrease">Sort By Id (decrease)</Option>
                        </Select>
                    </SortFilterForm>
                    <div style={{width: "50%"}}></div>
                    <div>
                        <Button 
                            onClick={() => this.handleClickCreateUser()}
                            style={{width: 80, height: 40, background: "#fff", color: "#46a049", border: "solid 1px #46a049" }}
                            >Create new user
                        </Button>
                    </div>
                </Row>
                <Row>
                    <Col3>Avatar</Col3>
                    <Col3>Name</Col3>
                    <Col3>Id</Col3>
                    <Col3>Action</Col3>
                </Row>
                <hr/>
                {ListUserDom.length > 0 ? ListUserDom : 
                    <Row>
                        <Col3></Col3>
                        <Col3>No party</Col3>
                        <Col3></Col3>
                    </Row>}
                <hr/>
                <Ul>
                    {ListPaging}
                </Ul>
                <ProfilePopup 
                    isModalOpen={this.state.isModalOpen}
                    userProfile={this.state.userProfile}
                    closeModal={this.handleCloseModal}
                    modalType={this.state.modalType}
                    onSubmitNewUser={this.handleCreateUser}    
                />
            </Grid>
        )
    }
}

