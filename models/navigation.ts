interface INavigation {
    id: number,
    access?: [],
    title: string,
    icon?: string,
    link: string
}

export const navigation = [
    {
        id: 1,
        access: ['customerstaff', 'customeradmin','specialist', 'supervisor', 'admin'],
        title: 'درخواست ها',
        icon: 'requests',
        activeIcon: 'requests_bold',
        link: '/requests'

    },

    {
        id: 10,
        access: ['admin'],
        title: 'منابع انسانی',
        icon: 'HR',
        activeIcon: 'HR-bold',
        link: '/admin/human-resources'

    },
    {
        id: 2,
        access: ['customeradmin', 'customersupport'],
        title: 'شکایات',
        icon: 'judge',
        activeIcon: 'judge_bold',
        link: '/objections'

    },

    {
        id: 3,
        access: ['customeradmin', 'specialist', 'supervisor'],
        title: 'گزارشات',
        icon: 'reports',
        activeIcon: 'reports_bold',
        link: '/statistics'
    },

    {
        id: 5,
        access: ['marketer'],
        title: 'خانه',
        icon: 'home',
        activeIcon: 'home-bold',
        link: '/marketer/home'
    },
    {
        id: 9,
        access: ['customersupport', 'admin'],
        title: 'مشتریان',
        icon: 'customers',
        activeIcon: 'customers-bold',
        link: '/customers'
    },
    {
        id: 13,
        access: [ 'admin'],
        title: 'مالی',
        icon: 'reports',
        activeIcon: 'reports_bold',
        link: '/admin/financial'
    },
    {
        id: 11,
        access: ['admin'],
        title: 'دسترسی ها',
        icon: 'element-4',
        activeIcon: 'element-4-bold',
        link: '/admin/access-list'
    },
    {
        id: 4,
        access: ['customeradmin', 'customerstaff', 'marketer', 'specialist', 'supervisor', 'customersupport'],
        title: 'پروفایل',
        icon: 'user',
        activeIcon: 'user_bold',
        link: '/my-profile'
    },

    {
        id: 6,
        access: ['humanresource'],
        title: 'متقاضیان',
        icon: 'personalcard',
        activeIcon: 'personalcard-bold',
        link: '/applicants'
    },
    {
        id: 7,
        access: ['humanresource'],
        title: 'کارشناسان',
        icon: 'glass-nav',
        activeIcon: 'glass-bold',
        link: '/specialists'
    },
    {
        id: 8,
        access: ['humanresource'],
        title: 'آزمون',
        icon: 'message-question-bar',
        activeIcon: 'message-question-bold',
        link: '/tests/manage-tests'
    },
    {
        id: 12,
        access: ['customeradmin', 'customerstaff', 'specialist', 'supervisor', 'admin', 'customersupport'],
        title: 'چت',
        icon: 'messages_2',
        activeIcon: 'messages-2-bold',
        link: '/chat'

    },


]