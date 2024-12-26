import BackButton from "@components/backButton";

export default function CreateVote() {
  return (
    <div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col pt-16 gap-10">
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-2xl overflow-hidden mt-5 hover:scale-105 transition-transform">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-6 text-center">
          New Vote
        </h2>
        <form
          id="new-vote-form"
          action="/vote"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Start Date and End Date Fields */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label
                htmlFor="start_date"
                className="block text-lg font-bold text-blue-600 mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                required
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="end_date"
                className="block text-lg font-bold text-blue-600 mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                required
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            ></textarea>
          </div>

          {/* Candidates Field */}
          <div>
            <label
              htmlFor="candidates"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
              Candidates (Comma-separated)
            </label>
            <input
              type="text"
              name="candidates"
              id="candidates"
              placeholder="Enter candidates separated by commas"
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* File Upload Field */}
          <div>
            <label
              htmlFor="file-upload"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
              Upload Addresses File (JSON or Text)
            </label>
            <input
              type="file"
              id="file-upload"
              name="file-upload"
              accept=".txt, .json"
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full max-w-sm px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
        <BackButton />
      </div>
    </div>
  );
}