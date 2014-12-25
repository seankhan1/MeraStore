import jsCookie from 'js-cookie'
import { useSelector } from 'react-redux'

export default function Logout() {
    const { isLogedIn } = useSelector((state) => state.users);

    const cookieRemove = () => {
        jsCookie.remove("accessToken");
        jsCookie.remove("refreshToken");

        // Reload the window after removing cookies
        window.location.reload();
    };

    return (
        <>
            {isLogedIn && (
                <div
                    className="fixed z-40 -right-9 top-1/3 bg-white p-2 w-[80px] h-[80px] grid place-content-center rounded-full group cursor-pointer hover:bg-blue-500 scale-75 hover:right-2 hover:scale-100 active:scale-75"
                    onClick={cookieRemove}
                >
                    <i className="fa-solid fa-right-from-bracket fa-2xl text-pink-500 group-hover:text-white"></i>
                </div>
            )}
        </>
    );
}
