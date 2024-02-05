import Image from "next/image";

const Header = () => {
  return (
    <div>
      <Image
        src="/header-logo.png"
        alt="header-logo"
        width={200}
        height={200}
      ></Image>
    </div>
  );
};

export default Header;
