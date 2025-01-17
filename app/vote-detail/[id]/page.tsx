import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import VotingForm from '@components/vote-form';
import BackButton from '@/components/backButton';

const Results = dynamic(() => import('@components/results'), { ssr: true });


export default async function VoteDetails({ params }: { params: { id: string } }) {
  const id = (await params).id;
  //const vote = await getVoteData(id);
  console.log('vote data : ',vote)
  if (!vote) {
    notFound();
  } 
  return (
<div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center flex-row pt-16 gap-10">
      {/* Details Container */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6 shadow-md border-b pb-3">
          Vote Details
        </h1>
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            <strong className="text-blue-600">Voting Subject:</strong> {vote.title}
          </p>
          <p>
            <strong className="text-blue-600">Description:</strong> {vote.description}
          </p>
          <p>
            <strong className="text-blue-600">Status:</strong> {vote.status}
          </p>
          <p>
            <strong className="text-blue-600">Start Date:</strong> {new Date(vote.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong className="text-blue-600">End Date:</strong> {new Date(vote.endDate).toLocaleDateString()}
          </p>
        </div>

        {/* Voting Form */}
        <VotingForm candidates={vote.candidates} />
        <BackButton />
      </div>

      {/* Results Container */}
      <div>
        <Results candidates={vote.candidates} />
      </div>
    </div>
  );

}
