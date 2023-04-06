function getExternalServiceLink(service: string): string {
  switch (service) {
    case 'FamilyDashboard':
      return 'https://family.eviloma.org';
    default:
      return '';
  }
}

export default getExternalServiceLink;
