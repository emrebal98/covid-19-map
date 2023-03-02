import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="dark flex h-screen flex-col items-center px-8 py-4 justify-center gap-16 bg-slate-300 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="text-9xl font-semibold">404</h1>
      <p className="text-xl">
        The page you are looking for does not exist. Please check the URL and
        try again.
      </p>
      <Link
        to="/"
        className="text-xl underline underline-offset-4 hover:no-underline"
      >
        Go to Home
      </Link>
    </div>
  );
}
