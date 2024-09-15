import { useNavigate } from 'react-router-dom';
import RouteConstants from '../constants/RouteConstants';

export default function useNavigation() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goLanding = () => navigate(RouteConstants.LANDING)
    const goHome = () => navigate(RouteConstants.HOME);
    const goLogin = () => navigate(RouteConstants.LOGIN);
    const goRegister = () => navigate(RouteConstants.REGISTER);

    return { 
      goBack, 
      goLanding, 
      goHome, 
      goLogin,
      goRegister
    };
}