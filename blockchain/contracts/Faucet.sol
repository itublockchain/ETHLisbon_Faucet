// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Faucet {
    mapping(address => uint) public lastTime;

    function getToken(address payable _address) public {
        require(
            block.timestamp >= lastTime[_address] + 1 days,
            "You can't get tokens yet"
        );
        require(
            address(this).balance >= 10000000000000000,
            "Not enough tokens"
        );
        lastTime[_address] = block.timestamp;

        (bool sent, ) = _address.call{value: 10000000000000000}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}
}
