import { useEffect } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"


const RequiredAuth = ({ user, children }) => {
    const navigator = useNavigate()
    useEffect(() => {
        if (!user) {
            navigator("/", { replace: true })
        }
        return;

    }, [user])
    return children
}
const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}
export default connect(mapStateToProps)(RequiredAuth)
