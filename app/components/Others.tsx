'use client'; // クライアントコンポーネント化が必要

import MoreButton from "./MoreButton";
import SectionTitle from "./SectionTitle";
import InstagramEmbed from "./InstagramEmbed";

export const Others = () => {
  return (
    <section className="mt-8 mb-12 max-w-6xl mx-auto px-4">
     <SectionTitle enTitle={"OTHERS"} jaTitle={"その他"} />
      <p className="text-base mt-6 text-center text-gray-800">Instagramでは
      <br />より新鮮な情報を発信しているよ！</p>

      <InstagramEmbed url="https://www.instagram.com/p/DDOgPM6RiOm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" />

      <MoreButton href={"https://www.instagram.com/p/DDOgPM6RiOm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="} text={"Instagramで記事をみる"} targetBlank/>
    </section>
  )
}