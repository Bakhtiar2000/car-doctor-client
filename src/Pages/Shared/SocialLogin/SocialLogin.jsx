import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn }= useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/'

    const handleGoogleSignIn= () => {
        googleSignIn()
        .then(result => {
            console.log(result.user)
            navigate(from, { replace: true })

        })
        .catch(err=> console.log(err))
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;