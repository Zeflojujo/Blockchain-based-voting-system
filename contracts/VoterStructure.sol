// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoterStructure {
    // Data structure for a voter
    struct Voter {   
        address voterAddress; 
        string firstName; 
        string lastName;
        string collegeName;
        string programName;
        uint256 yearOfStudy;
        string regNo;
        string blockNumber;
        string password;
        string gender;
        bool isRegistered;
        bool voted;
    }

    mapping(address => Voter) public voters;
    mapping(address => bool) public hasLogedin;
    mapping(address => string) public voterSession;
    address[] public voterAddressArray;
}