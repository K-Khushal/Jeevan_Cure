import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      category: "Enterprise",
      links: [
        { name: "About", href: "#" },
        { name: "Contact Us", href: "#" },
      ],
    },
    {
      category: "Product",
      links: [{ name: "Dashboard", href: "#" }],
    },
    {
      category: "Docs",
      links: [{ name: "Introduction", href: "#" }],
    },
    {
      category: "Community",
      links: [
        { name: "GitHub", href: "#" },
        { name: "Discord", href: "#" },
        { name: "X / Twitter", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    {
      href: "https://github.com/K-Khushal",
      ariaLabel: "github",
      icon: (
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      ),
    },
    {
      href: "https://x.com/KhushalK_dev",
      ariaLabel: "twitter",
      icon: (
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"
          />
        </svg>
      ),
    },
    {
      href: "https://www.youtube.com/@codieguys",
      ariaLabel: "youtube",
      icon: (
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="card variant-outlined !bg-transparent">
      <div className="max-w-6xl mx-auto space-y-12 px-6 py-16 ">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-8">
          <Link
            href="/public"
            aria-label="Logo"
            className="flex items-center justify-center space-x-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-50"
            >
              <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
            </svg>
            <span className="self-center text-2xl font-semibold">
              Jeevan Cure
            </span>
          </Link>
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.ariaLabel}
                href={link.href}
                target="blank"
                aria-label={link.ariaLabel}
                className="size-8 flex *:m-auto text-body hover:text-primary-600 dark:hover:text-primary-500"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {footerLinks.map((category) => (
            <div key={category.category}>
              <span className="font-medium text-gray-950 dark:text-white">
                {category.category}
              </span>
              <ul className="mt-4 list-inside space-y-4">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-md px-6 py-3 card variant-soft">
          <span className="text-title">&copy; Jeevan Cure 2024 - Present</span>
          <p className="text-sm text-body hover:text-primary-600 dark:hover:text-primary-500">
            Made with ❤️ by{" "}
            <Link
              href="https://khushalkhandelwal.com/"
              target="_blank"
              className="underline underline-offset-2"
            >
              Khushal Khandelwal
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
