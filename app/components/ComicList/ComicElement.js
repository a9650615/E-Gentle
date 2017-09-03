// @flow
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PaperRipple from 'react-paper-ripple'
import Href from '../Element/Href';
import styles from './ComicElement.css';

class ComicElement extends Component {
  props: {
    comicData: Object,
    onClick: () => void
  }
  render() {
    let props = this.props.comicData;
    return (
      <Href href="/info">
        <Paper elevation={1} key={props.href} onClick={this.props.onClick} className={styles.paperList}>
          <PaperRipple tag="div" color="#ccc">
            <div className={`${styles.listTitle} ${styles.listItem}`}>{props.title}</div>
            <div className={`${styles.listItem} ${styles.listItemInfo}`}>
              <span><i className="fa fa-filter" />{props.type}</span>
              <span><i className="fa fa-star" />{props.rank}</span>
            </div>
            <div className={`${styles.listItem}`}>{props.publish}</div>
          </PaperRipple>
        </Paper>
      </Href>
    );
  }
}

export default ComicElement;
