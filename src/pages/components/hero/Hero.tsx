import React, { useEffect, useState } from "react";
import Globe3D from "../globe3D";
import styles from "./index.module.scss";
import { Button, Flex } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.Wrapper}>
      <Globe3D>
        {showOverlay && (
          <Flex
            className={styles.Overlay}
            direction={"column"}
            justify={"flex-start"}
            align={"center"}
            p={"sm"}
          >
            <Image
              className={styles.Logo}
              src={"/hero-logo.png"}
              alt={"hero-logo"}
              width={800}
              height={800}
            />
            <h1>A Web App for Travellers</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum
              accusantium molestiae!
            </p>
            <Link href="/itineraryBuilder">
              <Button>START EXPLORING</Button>
            </Link>
          </Flex>
        )}
      </Globe3D>
    </div>
  );
};

export default Hero;
