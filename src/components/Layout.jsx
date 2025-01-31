import { Link, Outlet } from 'react-router';

function Layout() {
    return (
        <div>
            <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md py-4">
                <nav className="container mx-auto flex justify-center space-x-8">
                    <li className="list-none">
                        <Link
                            to={`/holidays`}
                            className="text-white text-lg font-semibold hover:text-gray-200 transition-colors duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="list-none">
                        <Link
                            to={`/holidays/create`}
                            className="text-white text-lg font-semibold hover:text-gray-200 transition-colors duration-300"
                        >
                            Create Holiday
                        </Link>
                    </li>
                </nav>
            </header>

            <main>
                
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;