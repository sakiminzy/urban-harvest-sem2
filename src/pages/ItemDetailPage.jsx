import { useParams } from "react-router-dom";

function ItemDetailPage() {
  const { id } = useParams();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-forest">Item Detail</h1>
      <p className="text-slate-600">Selected item ID: {id}</p>
      <p className="max-w-2xl text-slate-600">
        In the next step, this page will display the full item image,
        description, availability, and pricing using internal JSON seed data.
      </p>
    </section>
  );
}

export default ItemDetailPage;
