"use client";
import React, { createContext, useContext, useState } from 'react';

interface Vote {
  _id: string;
  title: string;
  description: string;
  startDate: bigint;
  endDate: bigint;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[]; // Suppressed the linting rule for 'any[]'
  status: string;
}


interface VoteContextType {
  votes: Vote[];
  setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
}

const VoteContext = createContext<VoteContextType | null>(null);

export const VoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  return (
    <VoteContext.Provider value={{ votes, setVotes }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVotes = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVotes must be used within a VoteProvider');
  }
  return context;
};