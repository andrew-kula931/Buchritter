"use server"

import { PiBookOpenText } from "react-icons/pi";
import { DocFiles } from '@/app/home_controller';

export default async function Home() {
  return (
    <>
      <TitleBar />
      <DocFiles />
    </>
  );
}

async function TitleBar() {
  return (
    <nav className="navBar flex flex-row">
      <div style={{ fontSize: 40 }}>Buch Ritter</div>
      <div className="flex flex-row hover:text-gray-400">
        <div className="pt-1">
          <PiBookOpenText />
        </div>
        <a href="/review_list" className="pl-2 text-xl">Reviews</a>
      </div>
    </nav>
  );
}