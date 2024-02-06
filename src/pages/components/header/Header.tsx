import Image from "next/image";

const Header = () => {
  return (
    <div>
      <Image
        src="/header-logo.png"
        alt="header-logo"
        width={140}
        height={50}
      ></Image>
    </div>
  );
};

export default Header;
