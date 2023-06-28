// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./VoterContract.sol";
import "./AccessControl.sol";
import "./TimeControl.sol";
import "./CandidateStructure.sol";

contract CandidatePresident is AccessControl, CandidateStructure {

    //President Registration
    mapping(string => Candidate) public candidatePresident;

    mapping(address => bool) public presidentVoted;

    string[] public presidentList;

    uint256 public numberOfPresident;

    // function getPresidentList() public view returns (string memory)
    // {
    //     return presidentList;
    // }

    event NewPresidentRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
    
    function registerPresident(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, address _timeControlContractAddress) public onlyAdmin{
        TimeControl tC = TimeControl(_timeControlContractAddress);
        require(!tC.isInitiate(), "Voting process already started");
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
            position: "PRESIDENT", 
            isWinner: false, 
            
            voteCount: 0
        });
        isRegistered[_regNo]= true;
        candidatePresident[_regNo] = newCandidate;
        presidentList.push(_regNo);
        numberOfPresident++;

        // emit NewPresidentRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }
    

    //return the registration number for the candidates for each position
    function getPresidentRegNumber() public view returns (string[] memory){
        return presidentList;
    }


    //Admin view candidates for a specific position of vote

    function viewPresident(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory position,uint256 voteCount){
        Candidate memory candidatePres = candidatePresident[_regNo];
        firstName = candidatePres.firstName;
        lastName = candidatePres.lastName;
        collegeName = candidatePres.collegeName;
        programName = candidatePres.programName;
        yearOfStudy = candidatePres.yearOfStudy;
        regNo = candidatePres.regNo;
        blockNumber = candidatePres.blockNumber;
        position = candidatePres.position;
        voteCount = candidatePres.voteCount;
    }

    function castVotePresident( string memory _presidentRegNo, address _voterContractAddress, address _timeControlContractAddress) public {
        VoterContract vc = VoterContract(_voterContractAddress);
        TimeControl tC = TimeControl(_timeControlContractAddress);
        require(tC.isInitiate(), "Voting process doesn't started yet!");
        require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");
        // require(!voters[msg.sender].voted, "You have already voted for President!!!");
        require(isRegistered[_presidentRegNo], "Invalid candidate");
        require(!presidentVoted[msg.sender], "Already voted for President position");
        presidentVoted[msg.sender] = true;

        Candidate storage candidate = candidatePresident[_presidentRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function getWinnerPresident() public view returns ( string memory, string memory, string memory, string memory, uint256 ){
        uint256 winningPresidentVoteCount = 0;
        uint256 winningPresidentIndex = 0;
        for (uint256 i = 0; i < presidentList.length; i++) {
            if (candidatePresident[presidentList[i]].voteCount > winningPresidentVoteCount) {
                winningPresidentVoteCount = candidatePresident[presidentList[i]].voteCount;
                winningPresidentIndex = i;
            }
        }
        Candidate memory winner = candidatePresident[presidentList[winningPresidentIndex]];
        // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
        return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
    }

}