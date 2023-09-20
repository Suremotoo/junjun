"use client";

import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

export default function CardMenuPage() {
  return (
    <div className="max-w-[1200px] gap-2 grid grid-cols-12 grid-rows-1 px-8">
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full sm:col-span-4 grid-cols-3 hover:grid-cols-4"
      >
        <Link href="/project">
          <Image
            alt="Woman listing to music"
            className="w-full h-full object-cover"
            src="/images/business-transparent.png"
          />
        </Link>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-textTitleColor/80">Manage Projects</p>
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Go Project
          </Button>
        </CardFooter>
      </Card>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full sm:col-span-4 grid-cols-3 hover:grid-cols-4"
      >
        <Link href="/apis">
          <Image
            alt="Woman listing to music"
            className="w-full h-full object-cover"
            src="/images/teamwork-transparent.png"
          />
        </Link>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-textTitleColor/80">Manage APIs</p>
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Go API
          </Button>
        </CardFooter>
      </Card>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full sm:col-span-4 grid-cols-3 hover:grid-cols-4"
      >
        <Link href="/paramter">
          <Image
            alt="Woman listing to music"
            className="w-full h-full object-cover"
            //   src="https://nextui.org/images/hero-card-complete.jpeg"
            src="/images/celebration-transparent.png"
          />
        </Link>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-textTitleColor/80">Manage Paramters</p>
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="primary"
            radius="lg"
            size="sm"
          >
            Go Paramter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
