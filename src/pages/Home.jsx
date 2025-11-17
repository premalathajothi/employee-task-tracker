export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white shadow p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-3xl mt-3">Loading...</p>
        </div>

        <div className="bg-white shadow p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-3xl mt-3">Loading...</p>
        </div>

        <div className="bg-white shadow p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Completed Tasks</h3>
          <p className="text-3xl mt-3">Loading...</p>
        </div>
      </div>
    </div>
  );
}
