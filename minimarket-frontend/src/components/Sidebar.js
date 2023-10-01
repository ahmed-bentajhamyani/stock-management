import React from 'react'
import { Link } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HailIcon from '@mui/icons-material/Hail';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Sidebar() {

    const links = [
        { id: 1, label: 'Articles', path:'/articles', icon: <InventoryIcon /> },
        { id: 2, label: 'Clients', path:'/clients', icon: <PersonIcon /> },
        { id: 3, label: 'Commandes', path:'/commandes', icon: <ShoppingCartIcon /> },
        { id: 4, label: 'Societes', path:'/societes', icon: <AccountBalanceIcon /> },
        { id: 5, label: 'Fournisseurs', path:'/fournisseurs', icon: <HailIcon /> },
        { id: 6, label: 'Livraisons', path:'/livraisons', icon: <LocalShippingIcon /> }
    ];

    return (
        <div className="overflow-y-auto h-screen py-4 px-3 bg-gray-50 rounded">
            <ul className="space-y-2">
                {links.map(link => (
                    <li key={link.id}>
                        <Link to={link.path} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            {link.icon}
                            <span className="ml-3">{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar