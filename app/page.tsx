import Navbar from "@/components/navbar";
import VoteTable from "@/components/voteTable";

export default function Home() {
  return (
      <div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center flex-row pt-16 gap-10">
        <Navbar />
        <VoteTable />
      </div>
  );
}