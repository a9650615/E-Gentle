import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as EhData from '../actions/EhData'
import Home from '../components/Home';

const mapStateToProps = (state, ownProps = {}) => {
  console.log(state)
  return {
    ehDataReducer: state.ehDataReducer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ehList: bindActionCreators(EhData.ehList, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
