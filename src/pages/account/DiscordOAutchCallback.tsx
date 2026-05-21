import { useLoginCookie } from "../../js/hooks/useLoginCookie.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
    const { accept } = useLoginCookie();
    const navigate = useNavigate();

    useEffect(() => {
        accept();
        navigate("/groups");
    }, []);

    return <p>Logging you in...</p>;
}