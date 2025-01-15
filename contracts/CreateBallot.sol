// SPDX-License-Identifier: MIT 
pragma solidity 0.8.0;

import {Ballot} from './Ballot.sol';

contract CreateBallot {

    Ballot[] public ballots;

    function createBallot(uint256 _id,
                          string memory _title,
                          string memory _description,
                          uint256 _start_date,
                          uint256 _end_data,
                          string[] memory _candidateList,
                          address[] memory _voters) public {
                            
      Ballot ballot = new Ballot(_id, _title, _description, _start_date, _end_data, _candidateList,_voters);
      ballots.push(ballot);
    } 



}