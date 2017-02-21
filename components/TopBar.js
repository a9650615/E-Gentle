import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Col } from 'react-bootstrap';
import styles from './TopBar.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this._handleLeftIconTap = this._handleLeftIconTap.bind(this);
  }

  _handleLeftIconTap() {
    this.setState({open: !this.state.open});
  }
  
  render() {
    return (
      <Grid className={styles.topBar} fluid>
        <Col md={8} mdOffset={2}>
          <AppBar 
            title="E-紳士" 
            iconElementLeft={<IconButton onClick={this._handleLeftIconTap}><NavigationMenu /></IconButton>}
            onLeftIconButtonTouchTap={this._handleLeftIconTap}
            zDepth={0}
          />
          <Drawer 
            open={this.state.open}
          >
            <MenuItem onTouchTap={()=>console.log('sad')}>1234</MenuItem>
          </Drawer>
        </Col>
      </Grid>
    );
  }
}

export default TopBar;
