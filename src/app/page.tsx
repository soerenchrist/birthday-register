import { readStoredCookie } from "./lib/actions";
import CountdownTimer from "./ui/countdown-timer";
import { GuestCount } from "./ui/guest-count";
import RegisterForm from "./ui/register-form";

export default async function Home() {
  const registeredData = await readStoredCookie()

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-900 mb-12">
          Sörens 30er
        </h1>

        <CountdownTimer targetDate={new Date("2025-05-28T19:00:00")} />
        <GuestCount attending={registeredData !== undefined} count={registeredData?.count} />

        <RegisterForm registeredInfo={registeredData} />
      </div>
    </div>
  );
}
