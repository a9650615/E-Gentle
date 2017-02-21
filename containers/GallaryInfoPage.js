import { connect } from 'react-redux';
import GallaryInfo from '../components/GallaryInfo';

const mapStatetToProps = (state, ownProps = []) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInfo: () => {
      dispatch()
    }
  }
}

export default connect(mapStatetToProps, mapDispatchToProps)(GallaryInfo);