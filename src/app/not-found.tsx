import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-8">🦞🌕</div>
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-4">
        Houston, we have a <span className="text-gradient-teal">problem</span>.
      </h1>
      <p className="text-xl text-gray-400 max-w-lg mb-8">
        This page doesn&apos;t exist. But the Moon does. Go claim some.
      </p>
      <Link
        href="/"
        className="btn-primary text-lg"
      >
        Back to the Moon
      </Link>
      <p className="text-xs text-gray-600 mt-8">
        Error 404 &middot; Page Not Found &middot; But at least you found a lobster
      </p>
    </div>
  );
}
