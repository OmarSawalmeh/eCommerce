import { useAdminAuth } from './../customHools'

const WithAdminAuth = (props) => useAdminAuth(props) && props.children

export default WithAdminAuth;