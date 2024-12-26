
import Navbar from "@/components/navbar";
import VoteTable from "@/components/voteTable";

export default function Home() {
  return (
    <div className="bg-image w-full h-screen bg-cover bg-center">
      <Navbar/> 
      <VoteTable/>
    </div>
  );
}
