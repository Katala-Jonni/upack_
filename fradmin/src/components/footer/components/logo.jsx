import { Fragment } from "react";
import Link from "next/link";
import AppStore from "./app-store";
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";
export default function LogoSection() {
  return <Fragment>
      <Link href="/">
        {/*<Image mb={2.5} src="/assets/images/logo.svg" alt="logo" />*/}
        {/*<Image mb={2.5} src="/assets/images/logo.svg" alt="logo" />*/}
      </Link>

      <Paragraph mb={2.5} color="grey.500">
        ЮПАК - оптовые продажи для направлений медицина, бьюти сфера, общепит.
        Низкие цены, ассортимент более 2000 наименований. Свои склады более 2000м2, прямые поставки с заводов производителей, доставка по городу Петрозаводск день в день. Самовывоз. Бесплатная доставка в другой регион России. Участие в тендерах. Надежный поставщик без срывов поставки товара.
      </Paragraph>

      {/*<AppStore />*/}
    </Fragment>;
}
