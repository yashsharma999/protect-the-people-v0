export interface Donor {
  name: string;
  logo?: string; // path in /public/images/donors/
}

const donors: Donor[] = [
  { name: 'Bhagwati' },
  { name: 'TDI' },
  { name: 'Mohindra' },
  { name: 'Organic Medical' },
  { name: 'Ayur Herbal' },
];

export default donors;
