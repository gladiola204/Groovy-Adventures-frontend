import { useNavigate } from "react-router-dom"


const goBack = () => {
    const navigate = useNavigate();
    return navigate(-1);
};

export default goBack;