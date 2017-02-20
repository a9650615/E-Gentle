import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }
  }

  componentWillMount() {
    this.props.ehList(0);
  }
  
  componentWillReceiveProps(nextProps) {
    let lists = this.state.lists;
    if (nextProps.ehDataReducer.status === 'loaded') {
      lists.push(nextProps.ehDataReducer.data);
      this.setState({lists});
    }
  }

  _renderChild() {
    return this.state.lists.map((val) => {
      return val.map((data) => {
        return (<div key={data.href}>{data.title}</div>);
      })
    });
  }

  render() {
    return (
      <div className={styles.body}>
        {this._renderChild()}
      </div>
    );
  }
}

Home.propTypes = {
  ehList: React.PropTypes.func
};
