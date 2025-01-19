// SPDX-License-Identifier: MIT 
pragma solidity 0.8.0;

import {Ballot} from './Ballot.sol';

contract CreateBallot {

    address[] public ballotContractsAddresses;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of the ballot");
        _;
    }
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

    function deleteBallot(address _ballotAddress) public onlyOwner {
        for (uint256 i = 0; i < ballotContractsAddresses.length; i++) {
            if (ballotContractsAddresses[i] == _ballotAddress) {
                ballotContractsAddresses[i] = ballotContractsAddresses[ballotContractsAddresses.length - 1];
                ballotContractsAddresses.pop();
                break;
            }
        }
    }
}