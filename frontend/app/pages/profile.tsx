export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="space-y-6 max-w-3xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Profilinformasjon
          </h2>
          <p className="text-gray-600 mb-4">
            Oppdater kontonens profilinformasjon og e-postadresse.
          </p>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Navn
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
                placeholder="Skriv inn ditt navn"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="profileImage"
                className="block text-sm font-semibold text-gray-700"
              >
                Profilbilde
              </label>
              <input
                id="profileImage"
                type="file"
                className="block w-full text-sm text-gray-500 mt-1 border border-gray-300 rounded-md cursor-pointer focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                E-post
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
                placeholder="Skriv inn din e-post"
                defaultValue="figma6766@gmail.com"
                disabled
              />
            </div>

            <button className="bg-purple-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-purple-700 transition">
              Save
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Oppdater passord
          </h2>
          <p className="text-gray-600 mb-4">
            Sørg for at kontoen din bruker et langt, tilfeldig passord for å
            være sikker.
          </p>
          <form>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Gjeldende passord
              </label>
              <input
                id="currentPassword"
                type="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
                placeholder="Skriv inn gjeldende passord"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Nytt passord
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
                placeholder="Skriv inn nytt passord"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Bekreft passord
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
                placeholder="Bekreft ditt passord"
              />
            </div>

            <button className="bg-purple-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-purple-700 transition">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
