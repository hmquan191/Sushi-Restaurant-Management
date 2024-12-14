'use client';

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Button } from "@/components/ui/button"
import useScroll from '../hooks/use-scroll';
import { cn } from '../lib/utils';

export function AdminHeader() {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div className="sticky inset-x-0 top-0 z-30 h-12 w-full bg-black">
      <div className="flex h-12 items-center">
        <div className = "static w-1/4">
          <Link
            href="/a"
          >
            <div className="text-white px-7 py-2.5 text-xl">Sushi-Branch Admin</div>
          </Link>
        </div>
        <div className="relative h-full w-full">
          <div className="absolute right-20 top-1">
            <Button className="bg-black hover:bg-gray-800 text-white">Log out</Button>
          </div>
        </div>
      </div>
    </div>
  );
};