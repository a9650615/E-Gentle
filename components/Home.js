import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import ComicElement from './ComicList/ComicElement';
import styles from './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }
  }

  _loadDetail(preLoadData) {
    let data = preLoadData.data;
    this.props.ehDetail(data);
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
        return (<ComicElement onTouchTap={this._loadDetail.bind(this, data)} comicData={data} />);
      })
    });
  }

  render() {
    return (
      <Grid className={styles.body} fluid>
        <Col md={10} mdOffset={1}>{this._renderChild()}</Col>
      </Grid>
    );
  }
}

Home.propTypes = {
  ehList: React.PropTypes.func
};
