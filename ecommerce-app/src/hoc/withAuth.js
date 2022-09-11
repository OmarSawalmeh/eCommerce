import { useAuth } from '../customHools'
//import { withRouter } from 'react-dom';

const WithAuth = (props) => useAuth(props) && props.children

export default WithAuth
