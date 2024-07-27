export interface Company {
    company_id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}
  
export interface CompanyLocation {
  location_id: number;
  company_id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}