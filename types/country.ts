export interface Country {
    name: {
      common: string;
      official: string;
    };
    capital: string[];
    population: number;
    region: string;
    flags: {
      png: string;
      svg: string;
    };
    currencies: {
      [key: string]: {
        name: string;
      };
    };
    languages: {
      [key: string]: string;
    };
    timezones: string[];
  }
  