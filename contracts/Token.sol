// SPDX-License-Identifier: MIT 
pragma solidity 0.8.0;

contract Token{
    string public name;
    string public symbol;
    uint public totalSupply;
    mapping(address => uint) public balances;

    constructor(string memory _name, string memory _symbol, address[] memory _address) {
        name = _name;
        symbol = _symbol;
        totalSupply = _address.length;
        for(uint i = 0; i < totalSupply; i++){
            balances[_address[0]] = 1;
        }
    }

    function transfer(address to) public {
        require(balances[msg.sender] == 1,"you do not have a token");
        balances[msg.sender] -=1;
        balances[to] += 1;
    }

    function balanceOf(address _address)public view returns(uint){
        return balances[_address];
    }


}

