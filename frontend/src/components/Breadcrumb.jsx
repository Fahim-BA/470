import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Breadcrumb = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const pathnames = location.pathname.split('/').filter(x => x);
        const breadcrumbs = pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return {
                name: name.replace(/-/g, ' '),
                routeTo,
                isLast
            };
        });

        // Add home breadcrumb if not on home page
        if (location.pathname !== '/') {
            breadcrumbs.unshift({ name: 'home', routeTo: '/', isLast: false });
        }

        setBreadcrumbs(breadcrumbs);
    }, [location]);

    return (
        <nav className="flex items-center text-sm px-4 py-2 bg-gray-100">
            {breadcrumbs.map((breadcrumb, index) => (
                <span key={index} className="flex items-center">
                    {breadcrumb.isLast ? (
                        <span className="text-gray-600 capitalize">
                            {breadcrumb.name}
                        </span>
                    ) : (
                        <Link
                            to={breadcrumb.routeTo}
                            className="text-blue-500 hover:text-blue-700 capitalize"
                        >
                            {breadcrumb.name}
                        </Link>
                    )}
                    {index < breadcrumbs.length - 1 && (
                        <span className="mx-2 text-gray-400">/</span>
                    )}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
