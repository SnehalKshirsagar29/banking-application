import ReactDOM from 'react-dom';
import LoginForm from '../login/LoginForm';
const LogoutForm = () => {
     console.log('Inside logout page');
      localStorage.clear();
     //window.location.reload();
    // history.push("/");
     ReactDOM.render(
             <LoginForm />,
             document.getElementById('root')
      );
     return null;
}
export default LogoutForm;