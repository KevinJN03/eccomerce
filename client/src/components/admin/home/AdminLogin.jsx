import LoginSignUp from "../../Login-SignUp/Index"
import Login from "../../Login-SignUp/Login"

function AdminLogin({}){
  return (
    <section id='AdminLogin' className="h-screen">
        <LoginSignUp loginorSignup={'login'} admin={true}/>
    </section>
  )
};

export default AdminLogin
