import './AdminPanel.css'
function AdminSide({admin}){
    const imageurl = admin.adminData.AdminPic
    console.log(imageurl);

    return (
        <>
            <div className='body d-flex overflow-hidden' style={{height: '100vh',backgroundColor:'#e4dcf8', alignItems:"center"}}>
                <div className="p-3 info" style={{alignItems:"center", marginTop:"-4rem"}}>
                    <div className="info-box h-50">
                        <div className="name border-bottom border-dark" style={{alignItems:"center" ,textAlign:"center"}}>
                            <h2 className="">{admin.adminData.Name}</h2>
                        </div>                        
                        <div className="card mt-5" style={{backgroundColor:'#e4dcf8', border:'none'}}>
                            <div className="image img-fluid center" style={{textAlign:"center",alignItems:"center"}}>
                                <img src={`src/assets/Candidates/${admin.adminData.AdminPic}`} className="img-fluid center rounded-circle" style={{width:"30%", height:"auto"}}></img>
                            </div>
                            <div className="card-body border border-dark rounded-5 fs-6 mt-5">
                                <div className="row ps-1">
                                    <div className="col-3 fw-bold">
                                        <p >Admin ID</p>
                                        <p>Email</p>
                                        <p>Date of Birth</p>
                                        <p>Address</p>
                                    </div>
                                    <div className="col-1 fw-bold">
                                        <p>:</p>
                                        <p>:</p>
                                        <p>:</p>
                                        <p>:</p>
                                    </div>
                                    <div className="col-8">
                                        <p>{admin.adminData.adminID}</p>
                                        <p>{admin.adminData.Email}</p>
                                        <p>{admin.adminData.DOB}</p>
                                        <p>{admin.adminData.Address}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        <div className="info">

                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default AdminSide;