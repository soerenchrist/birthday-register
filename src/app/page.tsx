import Image from "next/image";
import { readStoredCookie } from "./lib/actions";
import CountdownTimer from "./ui/countdown-timer";
import PartyDetails from "./ui/party-details";
import RegisterForm from "./ui/register-form";
import { poppins } from "./lib/fonts";

export default async function Home() {
  const registeredData = await readStoredCookie()
  const date = new Date("2025-05-28T19:00:00+01:00")

  return (
    <>
      <h1 className={`${poppins.className} text-2xl md:text-4xl md:text-5xl font-bold text-center flex flex-row justify-center items-center text-[#282E47] mb-8`}>
        <Image src="/icon.png" alt="icon" className="hidden md:block" width={100} height={100} />
        <Image src="/icon.png" alt="icon" className="md:hidden block" width={70} height={70} />
        Sörens 30er
      </h1>

      <CountdownTimer targetDate={date} />
      {//      <GuestCount registered={registeredData !== undefined} attending={registeredData?.attending} count={registeredData?.count} />
      }
      <RegisterForm registeredInfo={registeredData} />
      <PartyDetails address="Sportgelände SV Krumbach, Fabrikstr., 74838 Limbach-Krumbach" wishlist="Getränke statt Geschenke" />
    </>
  );
}
