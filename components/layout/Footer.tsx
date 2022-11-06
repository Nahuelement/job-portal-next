import Link from 'next/link';
import React from 'react'

export const Footer = () => {
    return (
      <footer className="py-1">
        <p className="text-center mt-1">
          Nahuel Perugi - 2022 -
          <Link
            className="ml-4"
            rel="noreferrer"
            target="_blank"
            href="https://portafolio-git-main-nahuelement.vercel.app/"
          >
            Puedes ver mi portafolio en este Link
          </Link>
        </p>
      </footer>
    );
  };