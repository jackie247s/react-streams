import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    state = {
        loading: null
    }

    static getDerivedStateFromProps(props) {
        if (!props.stream) {
            return { loading: true };
        }

        return { loading: false };
    }

    componentDidMount() {
        if (!this.props.stream) {
            const id = this.props.match.params.id;
            this.props.fetchStream(id);
        }
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
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
        fetchStream
    }
)(StreamShow);