import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Container from '../Element/Container';
import styles from './GalleryInfo.css';

class ComicInfo extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      info: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.GallaryInfo) {
      this.setState({
        info: nextProps.GallaryInfo[0]
      });
    }
  }

  render() {
    let info = this.state.info;
    return (
      <Container>
        <Paper className={styles.infoBlock}>
          <div>
            <h3>{info.title}</h3>
            <div>
              <div>
              </div>
              <div>
                <div>{info.rating}</div>
                <div>{info.category}</div>
                <div>{info.uploader}</div>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default ComicInfo;
