import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm.jsx';

class StreamEdit extends React.Component {
    state = {
        loading: null
    };

    static getDerivedStateFromProps(props, state) {
        if (!props.stream) {
            return { loading: true };
        } 
        return { loading: false };
    }

    componentDidMount() {
        if (!this.props.stream) {
            const streamId = this.props.match.params.id;
            this.props.fetchStream(streamId)
            .then(() => console.log(`Stream ${streamId} fetched`));
        }
    }

    onSubmit = (formValues) => {
        const streamId = this.props.stream.id;
        this.props.editStream(streamId, formValues)
        .then(() => console.log(`Edited stream ${streamId}`));
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        const { stream } = this.props;
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                initialValues={_.pick(stream, ['title', 'description'])}
                // initialValues={stream}
                onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}
 
export default connect(mapStateToProps, {
    fetchStream,
    editStream
})(StreamEdit);