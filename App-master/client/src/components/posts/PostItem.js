import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';

const PostItem = ({ auth, post: {_id, text, name, date }}) => (
    <div>
        <h4>{name}</h4>
        <p>{text}</p>
        <p><Moment format="YYYY/MM/DD">{date}</Moment></p>
    </div>
)

PostItem.propTypes ={
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { } )(PostItem);