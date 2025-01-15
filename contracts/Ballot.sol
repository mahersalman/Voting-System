// SPDX-License-Identifier: MIT 
pragma solidity 0.8.0;

import {Token} from "./Token.sol";

contract Ballot {
    struct Result {
        string candidate;
        uint votes;
    }

    uint256 public id;
    string public title;
    string public description;
    uint256 public start_date;  // Timestamp for the start date
    uint256 public end_date;    // Timestamp for the end date
    mapping(string => address) public candidatesAddress; // Candidates Address Dictionary
    string[] public candidateList;  
    Token public token;

    constructor(
        uint256 _id,
        string memory _title,
        string memory _description,
        uint256 _start_date,
        uint256 _end_date,
        string[] memory _candidateList,
        address[] memory _voters
    ) {
        id = _id;
        title = _title;
        description = _description;
        start_date = _start_date;
        end_date = _end_date;
        candidateList = _candidateList;
        token = new Token(_title, _title, _voters);

        for (uint i = 0; i < candidateList.length; i++) {
            // Generate a pseudo-random address
            bytes32 hash = keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, msg.sender, i)
            );
            address randomAddress = address(uint160(uint256(hash)));
            candidatesAddress[candidateList[i]] = randomAddress;
        }
    }

    function vote(string memory _candidate) public {
        token.transfer(candidatesAddress[_candidate]);
    }

    function results() public view returns (Result[] memory) {
        uint numCandidates = candidateList.length;
        Result[] memory resultArray = new Result[](numCandidates);

        for (uint i = 0; i < numCandidates; i++) {
            string memory candidateName = candidateList[i];
            address candidateAddress = candidatesAddress[candidateName];
            uint votes = token.balanceOf(candidateAddress);

            resultArray[i] = Result({
                candidate: candidateName,
                votes: votes
            });
        }

        return resultArray;
    }
}