/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import { FilledInput, Grid } from '@material-ui/core'
import ModalTitleBox from '../modal/modal-title-box';
import ModalBottomActions from '../modal/modal-bottom-actions';
import { withContext } from '../../context'
import { withSnackbar } from 'notistack'
@withSnackbar
@withContext([],['signup'])
class SignupBody extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    password2: ''
  }
  _signUp = () => {
    const { actions: { signup } } = this.props
    const { username, email, password, password2 } = this.state
    signup(username, email, password, password2).then((error) => {
      if (error === undefined) {
        this.props._closeModal()
      } else {
          this.props.enqueueSnackbar(JSON.stringify(error, null, 2), { variant: "error"})
      }
    })
  }
  _handleTextFieldChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  _handleKeyDown = (e) => {
      if (e.key === 'Enter'){
          this._signUp()
      }
  }

  render() {
    return (
        <CustomModal>
            <ModalTitleBox title='Sign up' _closeModal={this.props._closeModal}/>
            <Content onKeyDown={this._handleKeyDown}>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <p>Username</p>
                        <CustomTextField
                            placeholder="Username"
                            fullWidth={true}
                            classes={{input: 'input'}}
                            name='username'
                            onChange={this._handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <p>Mail</p>
                        <CustomTextField
                            placeholder="Mail"
                            fullWidth={true}
                            classes={{input: 'input'}}
                            type='email'
                            name='email'
                            onChange={this._handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <p>Password</p>
                        <CustomTextField
                            placeholder="Password"
                            fullWidth={true}
                            classes={{input: 'input'}}
                            type='password'
                            name='password'
                            onChange={this._handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <p>Confirm password</p>
                        <CustomTextField
                            placeholder="Confirm password"
                            fullWidth={true}
                            classes={{input: 'input'}}
                            type='password'
                            name='password2'
                            onChange={this._handleTextFieldChange}
                        />
                    </Grid>
                </Grid>
            </Content>
            <ModalBottomActions text="Sign up" action={this._signUp}/>
        </CustomModal>
    )
  }
}


SignupBody.propTypes = {
    actions: PropTypes.object.isRequired,
    _closeModal: PropTypes.func.isRequired,
    goLogin: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired
}

const CustomModal = styled.div`
    outline: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    width: 700px;
    height: 600px;
    margin: auto;
    background-color: #505050;
    display: flex;
    flex-direction: column;
    color: #D0D0D0;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 10px;
`

const CustomTextField = styled(FilledInput)`
    & .input {
        color: #D0D0D0;
    }
    margin-bottom: 10px;
    margin-right: 10px;
`

export default SignupBody
