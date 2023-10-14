"use client";

import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const title = "あなたの想いを匿名でぶつけてください";
  const [sentences, setSenteces] = useState([]);
  const [index, setIndex] = useState(0);
  const apiURL =
    "https://sheets.googleapis.com/v4/spreadsheets/19E8hPZHzUMz9ZHJKZCBGwi8MnA7RtT3x61PYCZLDwWo/values/B:B?key=AIzaSyCkVyXfFU428eO1anzmS7NByoT8ftL3mtg";

  const fetchData = useCallback(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => setSenteces(data.values.slice(1)));
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => {
        const newIndex = Number.isInteger(prevIndex) ? prevIndex + 1 : 0;
        return newIndex % sentences.length;
      });
    }, 10000);

    return () => clearTimeout(timeout);
  }, [index, sentences]);

  console.log(sentences);
  console.log(index);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed text-xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 font-mono font-bold pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {title}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex text-lg place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By ニューヤンキーノタムロバ
          </a>
        </div>
      </div>

      <div className="font-mincho relative text-4xl flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        {sentences[index]}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
