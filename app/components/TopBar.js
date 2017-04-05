import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Col } from 'react-bootstrap';
import { menuDrawer } from '../constant/appConstant';
import Href from './Element/Href';
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

  _renderMenuItem() {
    return menuDrawer.map((val) => {
      return <Href key={val.id} href={val.path}><MenuItem>{val.name}</MenuItem></Href>
    })
  }
  
  render() {
    return (
      <Grid className={styles.topBar} fluid>
        <Col md={10} mdOffset={1}>
          <AppBar 
            title="E-紳士" 
            iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
            onLeftIconButtonTouchTap={this._handleLeftIconTap}
            zDepth={0}
          />
          <Drawer 
            open={this.state.open}
            docked={false}
            onRequestChange={open => this.setState({open: open})}
          >
            {this._renderMenuItem()}
          </Drawer>
        </Col>
      </Grid>
    );
  }
}

export default TopBar;
