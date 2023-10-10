import React, { useEffect } from 'react'
import { Navigate } from 'react-router'
import { logOut } from '../../redux/ActionCreator'
import { connect } from 'react-redux'

const mapDispatchToprops = dispatch =>{
    return {
        logOut:()=>{
            dispatch(logOut());
        }
    }
}

const LogOut = (props) => {

    useEffect(()=>{
     props.logOut();
    },[])

  return <Navigate to="/" />
}

export default connect(null,mapDispatchToprops)(LogOut);