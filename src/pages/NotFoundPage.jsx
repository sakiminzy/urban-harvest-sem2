import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-4xl font-bold text-forest">404</h1>
      <p className="text-slate-600">
        The page you are looking for could not be found.
      </p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
