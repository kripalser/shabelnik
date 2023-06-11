import type { Links } from '@types';

const links: Links = {
    nav: {
        index: {
            label: 'На главную',
            url: '/',
        },
        books: {
            label: 'Книги',
            url: '/books',
        },
        magazines: {
            label: 'Журналы',
            url: '/magazines',
        },
        filmstrips: {
            label: 'Диафильмы',
            url: '/filmstrips',
        },
    },
    shop: {
        account: {
            label: 'Account',
            url: '/shop/account',
        },
    },
    social: {
        facebook: {
            label: 'Facebook',
            labelShort: 'Fb',
            url: 'https://facebook.com',
        },
        twitter: {
            label: 'Twitter',
            labelShort: 'Tw',
            url: 'https://twitter.com',
        },
    },
};

links.nav.pages = {
    label: 'Pages',
    children: [links.nav.about, links.nav.contact],
};

export { links };
