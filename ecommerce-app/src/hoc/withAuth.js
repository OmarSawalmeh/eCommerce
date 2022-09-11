import { useAuth } from '../customHools'

const WithAuth = (props) => useAuth(props) && props.children

export default WithAuth
