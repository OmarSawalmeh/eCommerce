import { useAuth } from '../customHools'
import { withR } from 'react-dom';

const WithAuth = (props) => useAuth(props) && props.children

export default WithAuth
