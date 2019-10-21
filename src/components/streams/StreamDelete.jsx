import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal.jsx';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    state = {
        loading: null
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.stream) {
            return { loading: true };
        }
        return { loading: false };
    }

    componentDidMount() {
        if (!this.props.stream) {
            const streamId = this.props.match.params.id;
            this.props.fetchStream(streamId);
        }
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (this.state.loading) {
            return 'Are you sure you want to delete this Stream?';
        }

        return `Are you sure you want to delete the Stream with title: ${this.props.stream.title}`;
    }

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const streamId = ownProps.match.params.id;
    return {
        stream: state.streams[streamId]
    };
}

export default connect(
    mapStateToProps,
    {
        fetchStream,
        deleteStream
    }
)(StreamDelete);