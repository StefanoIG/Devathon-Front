import { useParams } from 'react-router-dom';
import { useState } from 'react';

function ResetPassword() {
    const { uid, token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword === confirmPassword) {
            const response = await fetch(`http://127.0.0.1:8000/api/password_reset_confirm/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                    token: token,
                    new_password: newPassword,
                }),
            });

            if (response.ok) {
                // Manejar éxito
                alert("Contraseña restablecida con éxito.");
            } else {
                // Manejar error
                alert("Error restableciendo la contraseña.");
            }
        } else {
            alert("Las contraseñas no coinciden.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nueva contraseña:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <label>
                Confirmar contraseña:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <button type="submit">Restablecer Contraseña</button>
        </form>
    );
}

export default ResetPassword;
