"use client"; // 이 줄을 꼭 포함해주세요.

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function FloatingButton() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-1/3 lg:w-1/4">
      <Link href="/payment" className="w-full">
        <Button
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full py-3 flex justify-center items-center text-base"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          2주 체험 시작하기
        </Button>
      </Link>
    </div>
  );
}
