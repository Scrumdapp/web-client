export const handleLogout = (event) => {
    event.preventDefault();
    location.href='/api/logout'
}

export function LogoutButton() {
    return (
        <button className="btn btn-red border" onClick={handleLogout}>
            Logout
        </button>
    )
}