export interface NavbarElProps {
  link: string;
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
