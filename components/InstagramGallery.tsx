import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const images = [
  "/images/events/instagram-01.jpg",
  "/images/events/instagram-02.jpg",
  "/images/events/instagram-03.jpg",
  "/images/events/instagram-04.jpg",
  "/images/events/instagram-05.jpg",
  "/images/events/instagram-06.jpg",
];

export default function InstagramGallery() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-375">

        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#8a806f]">
              Follow the journey
            </p>

            <h2 className="font-display text-6xl leading-none md:text-8xl">
              @lynnluxeeventstudio
            </h2>
          </div>

          <Link
            href="https://www.instagram.com/lynnluxeeventstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]"
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image}
              className={`relative overflow-hidden ${
                index === 1
                  ? "aspect-4/5"
                  : index === 4
                  ? "aspect-4/5"
                  : "aspect-square"
              }`}
            >
              <Image
                src={image}
                alt={`Lynn Luxe event ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}