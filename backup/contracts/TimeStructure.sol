//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// import "./AccessControl.sol";

contract TimeStructure {
    // struct Time{
    //     uint256 startTime;
    //     uint256 endTime;
    //     uint256 remainingTime;
    // }
    uint256 startTime;
    uint256 endTime;
    uint256 remainingTime;
    bool public isInitiated;

    // mapping(address => Time) public times;  
    // uint256[] internal oTime;

    modifier onlyDuringVotingPeriod(){
        // require(!isInitiated, "The voting time is already initiated");
        require(block.timestamp >= startTime, "Voting is not currently open");
        require(block.timestamp <= endTime, "Voting session expired");
        _;
    }
}