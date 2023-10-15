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
      <div className="z-10 max-w-7xl w-full justify-between font-mono text-sm lg:flex">
        <p className="fixed text-xl left-16 top-0 flex w-full justify-center border-b font-mincho font-bold pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 lg:bg-zinc-800/30">
          {title}
        </p>
      </div>

      <div className="font-mincho relative text-4xl flex place-items-center  before:to-blue-700 before:dark:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px] z-[-1]">
        {sentences[index]}
      </div>

      <div className="mb-32 flex justify-center text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex text-lg place-items-center font-semibold gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://newyankee.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By ニューヤンキーノタムロバ
          </a>
        </div>
      </div>
    </main>
  );
}
