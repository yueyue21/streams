import React from "react";
import { Field, reduxForm } from "redux-form";
//import { createStream } from "../../actions";

class StreamForm extends React.Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ label, input, meta }) => {
    // console.log(formProps);
    //console.log(meta);
    return (
      <div className="field ">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    //redux form handleSubmit take care of preventDefault
    //formValue.preventDefault();
    //console.log(formValue);
    this.props.onSubmit(formValues);
    //this.props.createStream(formValues);
  };
  render() {
    //console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    //only run if the user did not enter an value
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    //only run if the user did not enter an value
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({ form: "streamForm", validate: validate })(
  StreamForm
);
