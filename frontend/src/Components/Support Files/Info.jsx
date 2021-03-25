import React from 'react';
import axios from 'axios';

class Info extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            updatedInfo:'',
           
        }
    }

    handleTextArea = (e) => {
        this.setState({
            updateInfo: e.target.value
        })
        console.log(e.target.value)
    }

    handleForm = async(e) => {
        e.preventDefault()
        const id = this.props.props.id
        const data = {
            updatedInfo: this.props.props.Info
        }
        try {
            const updateUrl = `api/users/${id}`
            const editInfo = await axios.patch(updateUrl, data)
            this.setState({
                updatedInfo: editInfo
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleForm}>
                    <textarea onChange={this.handleTextArea}>enter info</textarea>
                    <input type='submit' value='save changes'/>
                </form>
            </div>
        )
    }
}

export default Info