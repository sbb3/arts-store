export default function Error({ error }) {
  if (!error) return null;
  return (
    <div className="flex items-center">
      <div className="relative bg-red-200 max-w-9xl p-2 text-red-700 rounded shadow-sm w-full">
        <span className="block text-sm">{error?.message}</span>
      </div>
    </div>
  );
}
