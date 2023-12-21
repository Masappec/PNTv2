

const menu = [
    {
        name: 'Usuarios',
        path: '/usuarios',
        permission_required: 'app.view_user',
        icon: 'user',

    },
    {
        name: 'Roles',
        path: '/roles',
        permission_required: 'app.view_role',
        icon: 'team',
    }

]

export default menu;