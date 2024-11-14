import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div>
      <div className="max-w-7xl mx-auto relative">
        <div className="relative py-16 flex justify-center items-center px-4 sm:px-0">
          <div className="max-w-3xl text-center">
            <div className="pb-4">
              <span className="inline-flex items-center rounded-2xl bg-gray-100 px-4 py-1.5 text-xs sm:text-sm font-medium">
                Unlock the potential of community.
              </span>
            </div>
            <h1 className="mb-4 pb-4 text-4xl font-bold dark:text-white md:text-6xl sm:text-5xl xl:text-6xl !leading-tight">
              Jeevan Cure
            </h1>
            <p className="max-w-lg mx-auto mt-4 text-lg sm:text-xl leading-8 text-gray-500 dark:text-gray-400 sm:px-16">
              Here you can write a short description of your SaaS. This
              subheading is usually laid out on multiple lines.
            </p>
            <div className="mt-8 flex w-full space-x-8 justify-center">
              <a href="/exercises">
                <Button className="rounded-full px-8 py-6 text-center font-semibold text-lg">
                  <p>Join now!</p>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
