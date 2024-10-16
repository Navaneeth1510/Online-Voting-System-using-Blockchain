import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

function HeaderLogout({props, user}) {
    const navigate = useNavigate();
    function logout(){
        if(user.isAdmin==undefined){
            props.setVoterData(null);
            props.setConstData(null);
        }
        else{
            props.setAdminData(null);
        }
        navigate('/login');
    }
    return (
        <>
            <div className="row align-items-center border-bottom border-dark" style={{ height: '100%' }}>
                <div className="col-4 d-flex align-items-center">
                    <img src="src/assets/e-voting-header.png" className="img-fluid ms-3 p-2" style={{width:"25%"}}/>
                </div>
                <div className="col-5"></div>
                <div className="col-3 d-flex align-items-center justify-content-end">
                    <button type="button" onClick={() => logout()} className="btn btn-danger me-2" style={{ color: "white"}}>Logout</button>
                </div>
            </div>
        </>
    );
}

export default HeaderLogout;
