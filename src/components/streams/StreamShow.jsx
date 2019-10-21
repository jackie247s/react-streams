import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: null
        }

        this.videoRef = React.createRef();
    }

    static getDerivedStateFromProps(props) {
        if (!props.stream) {
            return { loading: true };
        }

        return { loading: false };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (!this.props.stream) {
            this.props.fetchStream(id);
        } else {
            this.buildPlayer();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }
        const id = this.props.match.params.id;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
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