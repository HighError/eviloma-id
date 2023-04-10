export default function getServices() {
  return [
    {
      slug: 'family-dashboard', // unique ID
      title: 'Family Dashboard', // title of the card
      description: 'Система упарвління підписками', // description of the card (allow only one language)
      image: '/services/family-dashboard.png', // image href of the card
      href: 'https://family.eviloma.org/', // href of the service
      btnText: undefined, // text of the button (allow only one language) (default: 'Go to service' on selected language)
      btnDisable: false, // whether the button should be disabled
    },
  ];
}
