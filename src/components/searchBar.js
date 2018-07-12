import React, {Component} from 'react';
import { setFilter } from '../actions/filters';
import { connect } from 'react-redux';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.dispatch(setFilter(event.target.value));
  }
  render() {
    return (
      <div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></div>
          </div>
          <input type="text" onKeyUp={event => this.props.dispatch(setFilter(event.target.value))} className="form-control" name="search" placeholder="Search.." />
        </div>
        <div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {filters : state.filters}
)

export default connect(mapStateToProps)( SearchBar);