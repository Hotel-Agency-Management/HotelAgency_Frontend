export interface HotelBasicInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
  currency: string;
  coverImage: string | null
}

export interface HotelBranding {
  logo: string | null;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export interface HotelFormValues {
  basicInfo: HotelBasicInfo;
  branding: HotelBranding;
  managerId: string;
}
