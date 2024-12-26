import "@public/global.css"

export default function CreateVote() {
  return (
    <div className='main'>
      <div className="container">
        <h2>New Vote</h2>
        <form
          id="new-vote-form"
          action="/vote"
          method="POST"
          encType="multipart/form-data"
        >
          {/* Title Field */}
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />

          {/* Start Date Field */}
          <label htmlFor="start_date">Start Date</label>
          <input type="date" name="start_date" id="start_date" required />

          {/* End Date Field */}
          <label htmlFor="end_date">End Date</label>
          <input type="date" name="end_date" id="end_date" required />

          {/* Description Field */}
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            required
          ></textarea>

          {/* Candidates Field */}
          <label htmlFor="candidates">Candidates (Comma-separated)</label>
          <input
            type="text"
            name="candidates"
            id="candidates"
            placeholder="Enter candidates separated by commas"
            required
          />

          {/* File Upload Field */}
          <label htmlFor="file-upload">
            Upload Addresses File (JSON or Text)
          </label>
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            accept=".txt, .json"
            required
          />

          {/* Placeholder for Address Container */}
          <div id="address-container"></div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}