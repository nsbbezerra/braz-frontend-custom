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
                          height={525}
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
                      height={525}
                      objectFit="cover"
                    />
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden md:block w-full h-16 bg-gradient-to-t from-white via-zinc-200 to-white">
        <div className="container max-w-5xl mx-auto px-5 xl:px-0 h-full grid grid-cols-4 gap-5">
          <div className="flex items-center gap-2 text-marinho-500 font-semibold">
            <div className="w-[60px]">
              <Image
                src="/img/home/credit-card.svg"
                width={713}
                height={449}
                layout="responsive"
                alt="Braz Multimidia"
              />
            </div>
            <span className="text-sm lg:text-base font-serif">
              Pague no Boleto ou Cartão de Crédito
            </span>
          </div>
          <div className="flex items-center gap-2 text-marinho-500 font-semibold">
            <div className="w-[60px]">
              <Image
                src="/img/home/truck.svg"
                width={713}
                height={449}
                layout="responsive"
                alt="Braz Multimidia"
              />
            </div>
            <span className="text-sm lg:text-base font-serif">
              Entregamos para todo o Brasil
            </span>
          </div>
          <div className="flex items-center gap-2 text-marinho-500 font-semibold">
            <div className="w-[60px]">
              <Image
                src="/img/home/money.svg"
                width={713}
                height={449}
                layout="responsive"
                alt="Braz Multimidia"
              />
            </div>
            <span className="text-sm lg:text-base font-serif">
              Cobrimos 40% do valor do Frete
            </span>
          </div>
          <div className="flex items-center gap-2 text-marinho-500 font-semibold">
            <div className="w-[60px]">
              <Image
                src="/img/home/draw.svg"
                width={713}
                height={449}
                layout="responsive"
                alt="Braz Multimidia"
              />
            </div>
            <span className="text-sm lg:text-base font-serif">
              Criamos sua arte 100% grátis
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center">
        <Image
          src="/img/home/shadow.png"
          width={1350}
          height={50}
          layout="intrinsic"
          alt="Braz Multimidia"
          quality={60}
        />
      </div>
    </Fragment>
  );
}
