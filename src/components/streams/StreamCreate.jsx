import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';
import StreamForm from './StreamForm.jsx';

class StreamCreate extends Component {
    state = {  }

    onSubmit(formValues) {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);