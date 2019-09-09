import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId);
  }
  onSubmit = formValues => {
    console.log(formValues);
    //this.props.onSunmit(formValues);
    this.props.editStream(this.props.stream.id, formValues);
  };
  render() {
    //console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={{
            title: `${this.props.stream.title}`,
            description: `${this.props.stream.description}`
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.streamId] };
};
export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
