import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Fragment } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { BannersProps } from "../../types";
import Link from "next/link";

interface Props {
  images: BannersProps[];
}

export default function Panel({ images }: Props) {
  return (
    <Fragment>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        autoplay={{ delay: 5000 }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="w-full">
              {image.redirect ? (
                <div className="w-full">
                  <Link href={image.redirect || ""} passHref>
                    <a>
                      <div className="w-full">
                        <Image
                          src={image.banner}
                          alt="Braz Multimidia"
                          layout="responsive"
                          width={1400}
                          height={700}
                          objectFit="cover"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="w-full">
                    <Image
                      src={image.banner}
                      alt="Braz Multimidia"
                      layout="responsive"
                      width={1400}
                      height={700}
                      objectFit="cover"
                    />
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
}
