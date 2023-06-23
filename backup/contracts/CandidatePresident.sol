// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./VoterStructure.sol";
import "./VoterRegistry.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract CandidatePresident is CandidateStructure, VoterStructure, AccessControl, TimeStructure {
    // VoterRegistry voterObj = new VoterRegistry();

    event NewPresidentRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
   
    function registerPresident(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        require(keccak256(bytes(_regNo)).length > 0 && keccak256(bytes(_firstName)).length > 0 && keccak256(bytes(_collegeName)).length > 0
        && keccak256(bytes(_programName)).length > 0 && keccak256(bytes(_blockNumber)).length > 0 
        && keccak256(bytes(_gender)).length > 0, "Make sure every field cannot be empty");
        if(keccak256(bytes(_collegeName)) == keccak256(bytes("TIBA"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        }else{
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
        } 
        require(!isRegistered[_regNo], "candidate is already registered!");
        require(numberOfPresident < 2, "The registered president is enough!");
        Candidate memory newCandidate = Candidate({
            firstName: _firstName,
            lastName: _lastName,       
            collegeName: _collegeName,
            programName: _programName,
            yearOfStudy: _yearOfStudy, 
            regNo: _regNo, 
            blockNumber: _blockNumber,
            gender: _gender, 
            isWinner: false, 
            voteCount: 0
        });
        candidatePresident[_regNo] = newCandidate;
        presidentList.push(_regNo);
        numberOfPresident++;
        isRegistered[_regNo]= true;

        // emit NewPresidentRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }

    

    //return the registration number for the candidates for each position
    function getPresidentRegNumber() public view returns (string[] memory){
        return presidentList;
    }


    //Admin view candidates for a specific position of vote

    function viewPresident(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
        Candidate memory candidatePres = candidatePresident[_regNo];
        firstName = candidatePres.firstName;
        lastName = candidatePres.lastName;
        collegeName = candidatePres.collegeName;
        programName = candidatePres.programName;
        yearOfStudy = candidatePres.yearOfStudy;
        regNo = candidatePres.regNo;
        blockNumber = candidatePres.blockNumber;
        gender = candidatePres.gender;
        voteCount = candidatePres.voteCount;
    }

    function deletePresident(string memory _presidentRegNo) public onlyAdmin{
        delete candidatePresident[_presidentRegNo];
         for (uint256 i = 0; i < presidentList.length; i++) {
            if (keccak256(bytes(presidentList[i])) == keccak256(bytes(_presidentRegNo))) {
                for (uint256 j = i; j < presidentList.length - 1; j++) {
                    presidentList[j] = presidentList[j + 1];
                }
                presidentList.pop();
                break;
            }
        }
    }

    // function castVotePresident( string memory _presidentRegNo) public {
    //     require(voters[msg.sender].isRegistered, "Voter is not registered");
    //     require(!voters[msg.sender].voted, "You have already voted for President!!!");
    //     require(!presidentVoted[msg.sender], "Already voted for President position");
    //     Candidate memory candidate = candidatePresident[_presidentRegNo];
    //     candidate.voteCount++;
    //     presidentVoted[msg.sender] = true;

    //     totalVotes++;

    //     // emit VoteCast(candidate.voteCount, candidate.regNo);
    // }

    function getWinnerPresident() public view returns( string memory firstName, string memory regNo, string memory collegeName, string memory programName, uint256 voteCount){
        uint256 winningPresidentVoteCount = 0;
        uint256 winningPresidentIndex = 0;
        for (uint256 i = 0; i < presidentList.length; i++) {
            if (candidatePresident[presidentList[i]].voteCount > winningPresidentVoteCount) {
                winningPresidentVoteCount = candidatePresident[presidentList[i]].voteCount;
                winningPresidentIndex = i;
            }
        }
        Candidate memory winner = candidatePresident[presidentList[winningPresidentIndex]];

        firstName = winner.firstName;
        regNo = winner.regNo;
        collegeName = winner.collegeName;
        programName = winner.programName;
        voteCount = winner.voteCount;
        // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
        // return (winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    }

}