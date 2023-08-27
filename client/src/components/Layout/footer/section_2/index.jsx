import Footer_Link from './footer_link';

function Section_2() {
    const get_help = [
        {
            name: 'Help Center',
            url: '/pages/help-center',
        },
        {
            name: 'Track order',
            url: 'pages/track-order',
        },
        {
            name: 'Shipping Info',
            url: 'pages/shiping-info',
        },
        {
            name: 'Returns',
            url: 'pages/returns',
        },
        {
            name: 'Contact Us',
            url: 'pages/contact-us',
        },
    ];

    const company = [
        {
            name: 'Careers',
            url: '/pages/Careers',
        },
        {
            name: 'About',
            url: 'pages/about',
        },
        {
            name: 'Stores',
            url: 'pages/stores',
        },
        {
            name: 'Want to Collab?',
            url: 'pages/want-to-collab',
        },
        {
            name: 'Contact Us',
            url: 'pages/contact-us',
        },
    ];
    const quick_links = [
        {
            name: 'Size Guide',
            url: 'pages/size-guide',
        },
        {
            name: 'sitemap',
            url: 'pages/sitemap',
        },
        {
            name: 'Gift Cards',
            url: 'pages/gift-cards',
        },
        {
            name: 'Check Gift Card Balance',
            url: 'pages/gift-card-balance',
        },
    ];
    return (
        <section id="link-section" className="flex flex-row flex-nowrap gap-5">
            <Footer_Link legend={'GET HELP'} linkArr={get_help} />
            <Footer_Link legend={'COMPANY'} linkArr={company} />
            <Footer_Link legend={'QUICK LINKS'} linkArr={quick_links} />
        </section>
    );
}

export default Section_2;
