// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Ballot {
    string public title;
    string public description;
    uint256 public start_date;  // Timestamp for the start date
    uint256 public end_date;    // Timestamp for the end date
    string[] public candidateList;
    mapping(string => uint256) public results;
    mapping(address => bool) public Voters;

    constructor(
        string memory _title,
        string memory _description,
        uint256 _start_date,
        uint256 _end_date,
        string[] memory _candidateList,
        address[] memory _voters
    ) {
        title = _title;
        description = _description;
        start_date = _start_date;
        end_date = _end_date;
        candidateList = _candidateList;
        for(uint i = 0; i < _voters.length; i++) {
            Voters[_voters[i]] = true;
        }
    }

    function vote(string memory _candidate) public {
        require(Voters[msg.sender], "You have already voted or you cant vote!");
        results[_candidate] = results[_candidate] + 1;
        Voters[msg.sender] = false; 
    }

    function getResults() public view returns (string[] memory, uint256[] memory) {
        uint256[] memory votes = new uint256[](candidateList.length);
        for (uint256 i = 0; i < candidateList.length; i++) {
            votes[i] = results[candidateList[i]];
        }
        return (candidateList, votes);
    }
}