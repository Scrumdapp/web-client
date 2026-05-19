export const handleLogout= () => {
    location.href='/oauth2/logout'
}

export function LogoutButton() {
    return (
        <button className="btn btn-red border" type="button" onClick={handleLogout}>
            Logout
        </button>
    )
}