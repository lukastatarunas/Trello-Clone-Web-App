import React from 'react'
import Icon from '@material-ui/core/icon'
import Card from '@material-ui/core/Card';
import FormButton from '@material-ui/core/Button';
import Textarea from 'react-textarea-autosize'
import { connect } from 'react-redux'
import { addList, addCard } from '../actions'

class Button extends React.Component {

    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({
            formOpen: true
        })
    }

    closeForm = e => {
        this.setState({
            formOpen: false
        })
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props
        const { text } = this.state

        if (text) {
            this.setState({
                text: ""
            })
            dispatch(addCard(listID, text))
        }

        return
    }

    handleAddList = () => {
        const { dispatch } = this.props
        const { text } = this.state

        if (text) {
            this.setState({
                text: ""
            })
            dispatch(addList(text))
        }

        return
    }

    renderButton = () => {
        const { list } = this.props

        const buttonText = list ? "Add another list" : "Add another card"
        const buttonTextOpacity = list ? 1 : 0.5
        const buttonTextColor = list ? "#fff" : "inherit"
        const buttonTextBackground = list ? "rgba(0, 0, 0, .15)" : "inherit"

        return (
            <div 
                onClick={this.openForm} 
                style={{ ...styles.openFormButtonGroup, opacity: buttonTextOpacity, color: buttonTextColor, background: buttonTextBackground }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }

    renderForm = () => {
        const { list } = this.props

        const buttonPlaceholder = list ? "Enter list title..." : "Enter card title..."
        const buttonTitle = list ? "Add List" : "Add Card"

        return (
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}>
                    <Textarea 
                        placeholder={buttonPlaceholder} 
                        autoFocus onBlur={this.closeForm} 
                        value={this.state.text} 
                        onChange={this.handleInputChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={styles.formButtonGroup}>
                    <FormButton 
                        onMouseDown={list ? this.handleAddList : this.handleAddCard} 
                        variant="contained" 
                        style={{color: "#fff", backgroundColor: "#5aac44"}}>
                        {buttonTitle}{" "}
                    </FormButton>
                    <Icon style={{marginLeft: 8, cursor: "pointer"}}>close</Icon>
                </div>
            </div>
        )
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderButton()
    }
}

const styles = {
    openFormButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"

    }
}

export default connect()(Button)