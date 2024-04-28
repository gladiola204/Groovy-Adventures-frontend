import { Link } from "react-router-dom";
import useAdminAccessGuard from "../../hooks/useAdminAccessGuard";

type MenuItem = {
    path: string,
    label: string,
}

const menu: MenuItem[] = [
    {
        path: '/admin/create-tour',
        label: 'Create a new tour'
    },
    {
        path: '/admin/create-category',
        label: 'Create a new category'
    },
    {
        path: '/admin/update-category',
        label: 'Update a category'
    },
    {
        path: '/admin/delete-category',
        label: 'Delete a category'
    },
]

const AdminPanel: React.FC = () => {
    useAdminAccessGuard('/login');

    const renderMenuItems = menu.map(({ path, label }) => (
        <li key={path}>
            <Link to={path}>
                {label}
            </Link>
        </li>
    ))
    return(
        <>
            <ul>
                {renderMenuItems}
            </ul>
        </>
    )
};

export default AdminPanel;