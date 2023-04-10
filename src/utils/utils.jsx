export function preInput({ label, id, description }) {
  return (
    <>
      <label htmlFor={id} className="text-2xl mt-4">
        {label}
      </label>
      <p className="text-gray-500 text-sm">{description}</p>
    </>
  );
}
