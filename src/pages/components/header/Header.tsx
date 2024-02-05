import Image from "next/image";

const Header = () => {
  return (
    <div>
      <Image
        src="/header-logo.png"
        alt="header-logo"
        width={120}
        height={80}
      ></Image>
    </div>
  );
};

export default Header;
