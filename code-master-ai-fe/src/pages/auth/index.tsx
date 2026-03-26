import AuthLayout from "../../layout/authLayout";
import AuthForm from "../../components/authForm";

export default function AuthPage() {
    return (
        <AuthLayout>
            <AuthForm type="login" />
        </AuthLayout>
    );
}