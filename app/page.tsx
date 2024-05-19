'use client';

import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/utils/assets';
import { type Framework, frameworks } from '@/utils/data';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/tailwind';

export default function Home() {
  const [currentFramework, setCurrentFramework] = useState<Framework>(
    frameworks[0]
  );

  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const rotateFrameworks = () => {
      setCurrentFramework(frameworks[currentIndex]);
      currentIndex = (currentIndex + 1) % frameworks.length;
    };
    const intervalId = setInterval(rotateFrameworks, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setShowBackground(true);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div
        className={cn(
          'fixed inset-0 transition-color delay-100 duration-700 opacity-25',
          {
            'bg-purple-300': currentFramework === 'nostr',
            'bg-teal-300': currentFramework === 'json',
            'bg-blue-300': currentFramework === 'atom',
            'bg-green-300': currentFramework === 'php',
            'bg-orange-400': currentFramework === 'rss',
          }
        )}
      />
      <Image
        width={1200}
        height={1200}
        role="presentation"
        src={assets.gradient}
        alt="gradient-bg"
        className="fixed inset-0 w-screen h-screen object-cover"
      />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url(${assets.square})`,
          backgroundSize: '30px',
        }}
      />
      <div
        className={cn(
          'bg-black fixed inset-0 transition-opacity duration-1000',
          !showBackground ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div className="max-w-7xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <h1
            className={`font-bold tracking-tighter text-7xl max-w-3xl text-center leading-snug mb-12`}
          >
            Share your{' '}
            <span
              className={cn('transition-colors duration-200', {
                'text-purple-300': currentFramework === 'nostr',
                'text-teal-300': currentFramework === 'json',
                'text-blue-300': currentFramework === 'atom',
                'text-green-300': currentFramework === 'php',
                'text-orange-400': currentFramework === 'rss',
              })}
            >
              feeds
            </span>
            <br /> to Nostr{' '}
            <div className="mx-2 -mt-2 align-middle inline-flex relative h-[150px] w-[100px]">
              <Image
                src="/nostr_logo.png"
                className="w-full h-full object-contain object-center absolute top-0 left-0"
                alt="nostr logo"
                width="100"
                height="100"
              />
            </div>
          </h1>

          <p className="mb-8">
            <span className="text-gray-300">by </span>
            <span
              className={cn('transition-colors duration-200 font-semibold', {
                'text-purple-300': currentFramework === 'nostr',
                'text-teal-300': currentFramework === 'json',
                'text-blue-300': currentFramework === 'atom',
                'text-green-300': currentFramework === 'php',
                'text-orange-400': currentFramework === 'rss',
              })}
            >
              <Link
                href="https://njump.me/npub15ar6d325rd06dx887yt6xzpyaqwg7u4gn7sun7eukv6ehw7xxqps3kygwm"
                target="__blank"
              >
                @nandan
              </Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
