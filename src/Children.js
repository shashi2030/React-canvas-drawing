import ReactDOM from 'react-dom';
import React from 'react';

export const Modal = props =>{
    return (
        ReactDOM.createPortal(
          props.children,
          document.getElementById('my-portal')
        )
    )
}

export const Test = props => {
    return(<div>This is test </div>)
}
