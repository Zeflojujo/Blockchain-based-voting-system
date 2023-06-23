// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CandidateStructure {
    // Data structure for a candidate
    struct Candidate {
        string firstName;
        string lastName;
        string collegeName;
        string programName;
        uint256 yearOfStudy;
        string regNo;
        string blockNumber;
        string gender;
        bool isWinner;
        uint256 voteCount;
    }
    uint public totalVotes;

    mapping(string => bool) public isRegistered;


    // enum Position = {"President", "Governor", "BlockLeader"};
    // Position pos = Position.Governor;
    // enum College = {"CIVE", "COED", "CNMS", "CHSS", "COES", "CSBL", "MEDICINE"};
    // College coll = College.CIVE;
    // enum State = {}

    //President Registration
    mapping(string => Candidate) public candidatePresident;

    //Governor Registration
    mapping(string => Candidate) public candidateGovernor;

    //BlockLeader Registration
    mapping(string => Candidate) public candidateBlockLeader;

    mapping(address => bool) public presidentVoted;
    mapping(address => bool) public governorVoted;
    mapping(address => bool) public blockLeaderVoted;



    // mapping(string => mapping(string => mapping(string => mapping(string => Candidate)))) public candidateCR;

    string[] public presidentList;
    string[] public governorList;
    string[] public blockLeaderList;

    //Number of candidate in a particular position
    uint256 public numberOfPresident;
    uint256[7] public numberOfGovernor;

    uint256 public numberOfBlockLeader;
}
