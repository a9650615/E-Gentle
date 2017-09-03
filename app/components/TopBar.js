import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'
import { MenuItem } from 'material-ui/Menu'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import { Grid, Col } from 'react-bootstrap'
import { menuDrawer } from '../constant/appConstant'
import Href from './Element/Href'
import styles from './TopBar.css'

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
    return (
      <List style={{width: 250, flex: 'initial'}}>
        {
          menuDrawer.map((val) => {
            return <Href key={val.id} href={val.path}><MenuItem>{val.name}</MenuItem></Href>
          })
        }
      </List>
    )
  }
  
  render() {
    return (
      <div>
        <Grid className={styles.topBar} fluid>
          <Col md={10} mdOffset={1}>
            <AppBar
              position="static"
            >
              <Toolbar disableGutters>
                <IconButton color="contrast" onClick={this._handleLeftIconTap}>
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit">
                  E-紳士
                </Typography>
              </Toolbar>
            </AppBar>
          </Col>
        </Grid>
        <Drawer 
          open={this.state.open}
          onRequestClose={open => this.setState({open: false})}
          onClick={open => this.setState({open: false})}
        >
          {this._renderMenuItem()}
        </Drawer>
      </div>
    );
  }
}

export default TopBar;
