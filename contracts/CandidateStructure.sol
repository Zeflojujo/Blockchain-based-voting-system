// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CandidateStructure {

     struct Candidate {
        string firstName;
        string lastName;
        string collegeName;
        string programName;
        uint256 yearOfStudy;
        string regNo;
        string blockNumber;
        string position;
        bool isWinner;
        uint256 voteCount;
    }
    uint public totalVotes;

    mapping(string => bool) public isRegistered;   

}