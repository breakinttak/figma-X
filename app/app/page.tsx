"use client"

import { Room } from "./Room";
import { CollaborativeApp } from "./CollaborativeApp";
import Live from "@/components/Live";

export default function Page() {
  return (
      <div className="h-full w-full flex items-center justify-center h-[100vh]">
        <Live />
      </div>
  );
}