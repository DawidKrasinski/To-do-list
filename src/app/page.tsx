import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* page */}
      <div className="px-5 pt-20">
        {/* top */}
        <div className=" h-14 flex justify-between items-center">
          <div className="font-semibold w-60 text-2xl">
            You have got 5 tasks today to complete
            <Image
              src={"/img/Pencil.png"}
              alt=""
              width={"26"}
              height={"26"}
              className="inline-block ml-2 mb-1"
            />
          </div>
          <div className="w-11 h-11 bg-gray-500 rounded-full"></div>
        </div>
        <input className="foreground-color w-full h-12 mt-5 " />

        <div>{/* Progress */}</div>

        <div>{/* Today's Tasks*/}</div>
      </div>

      <div>{/* Tommorow Tasks */}</div>

      <div>{/* bottom menu */}</div>
    </>
  );
}
