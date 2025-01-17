// SPDX-License-Identifier: MIT 
pragma solidity 0.8.0;

import {Ballot} from './Ballot.sol';

contract CreateBallot {

    address[] public ballotContractsAddresses;
    function createBallot(
                          string memory _title,
                          string memory _description,
                          uint256 _start_date,
                          uint256 _end_data,
                          string[] memory _candidateList,
                          address[] memory _voters) public {
      Ballot ballot = new Ballot(_title, _description, _start_date, _end_data, _candidateList,_voters);                       
      ballotContractsAddresses.push(address(ballot));
    } 

    function getBallots() public view returns (address[] memory) {
        return ballotContractsAddresses; 
    }

}