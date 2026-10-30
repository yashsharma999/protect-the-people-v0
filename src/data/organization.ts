// Legal details of the foundation, printed on 80G donation receipts and the
// Registration & Tax Information page.
// Replace every XXXX placeholder with the real values before accepting live donations.

export const organization = {
  name: 'PTP Foundation',
  legalName: 'Protect The People Foundation',
  registeredAddress: 'XXXX (registered office address)',
  email: 'info@cdu.org',
  pan: 'XXXXXXXXXX',
  registrationNumber: 'XXXXXXX',
  section80G: {
    // Unique Registration Number from the 80G approval order (Form 10AC)
    registrationNumber: '80G/XXXXX/XXXXX',
    // Validity period from the same approval order, e.g. "AY 2022-23 to AY 2026-27"
    validity: 'XXXX',
    // Share of the donation deductible from the donor's taxable income
    deductiblePercent: 50,
  },
};

/**
 * True while any receipt-critical detail above is still a placeholder.
 */
export function hasPlaceholderTaxDetails(): boolean {
  return [
    organization.registeredAddress,
    organization.pan,
    organization.section80G.registrationNumber,
    organization.section80G.validity,
  ].some((value) => /XXXX/.test(value));
}
