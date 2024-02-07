export interface PageShellProps {
  children: React.ReactNode;
  h?: boolean;
  n?: boolean;
  f?: boolean;
}

export interface NavbarElProps {
  link: string;
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface Stop {
  location: string;
  stopover: boolean;
}

export interface ItineraryData {
  name: string;
  time: number;
  start: string;
  stops: Stop[];
  arrival: string;
}
