function Home() {
  return (
    <main className="bg-gray-50">

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">

        <h1 className="text-5xl font-bold text-gray-900">
          Find Your  Job
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Discover the right opportunity and take the next step
          in your career.
        </p>

        {/* Search */}
        <div className="mx-auto mt-8 flex max-w-2xl gap-3">

          <input
            type="text"
            placeholder="Search jobs..."
            className="flex-1 rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
          />

          <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
            Search
          </button>

        </div>

      </section>

      {/* Simple Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <h2 className="text-3xl font-bold text-gray-900">
          Popular Jobs
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              MERN Stack Developer
            </h3>

            <p className="mt-2 text-gray-600">
              Tech Solutions
            </p>

            <p className="mt-1 text-gray-500">
              Noida • 4-6 LPA
            </p>

            <button className="mt-5 text-blue-600 hover:underline">
              View Details →
            </button>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Frontend Developer
            </h3>

            <p className="mt-2 text-gray-600">
              Digital Company
            </p>

            <p className="mt-1 text-gray-500">
              Delhi • 3-5 LPA
            </p>

            <button className="mt-5 text-blue-600 hover:underline">
              View Details →
            </button>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Node.js Developer
            </h3>

            <p className="mt-2 text-gray-600">
              Software Solutions
            </p>

            <p className="mt-1 text-gray-500">
              Gurgaon • 5-8 LPA
            </p>

            <button className="mt-5 text-blue-600 hover:underline">
              View Details →
            </button>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;