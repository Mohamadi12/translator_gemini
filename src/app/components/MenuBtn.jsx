"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const MenuBtn = () =>{
    const pathname = usePathname();

    if (pathname === "/translations") {
      return (
        <Link
          className="mr-2 border rounded-md p-2"
          href="/"
        >
          Translate New
        </Link>
      );
    }
    return (
      <Link
        className="mr-2 border rounded-md p-2"
        href="/translations"
      >
        My Translations
      </Link>
    );
  };