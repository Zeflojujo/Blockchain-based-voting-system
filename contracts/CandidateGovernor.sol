// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./VoterContract.sol";
import "./AccessControl.sol";
import "./TimeControl.sol";
import "./CandidateStructure.sol";

contract CandidateGovernor is AccessControl, CandidateStructure {

    //Governor Registration
    mapping(string => Candidate) public candidateGovernor;

    mapping(address => bool) public governorVoted;

    string[] public governorList;

    //Number of candidate in a particular position
    uint256 public numberOfGovernor;

    // function getGovernorList() public view returns (string memory)
    // {
    //     return governorList;
    // }

    // event NewGovernorRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber);

    function registerGovernor(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, address _timeControlContractAddress) public onlyAdmin{
        TimeControl tC = TimeControl(_timeControlContractAddress);
        require(!tC.isInitiate(), "Voting process already started");
        require(!isRegistered[_regNo], "Candidate is already registered!");
        require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
        regNo: _regNo, blockNumber: _blockNumber, position: "GOVERNOR", isWinner: false, voteCount: 0
        });
        isRegistered[_regNo]= true;
        candidateGovernor[_regNo] = newCandidate;
        // candidateGovernorCnms[_regNo] = newCandidate;
        governorList.push(_regNo);
        numberOfGovernor++;

        // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);      
    }

    //return the registration number for the candidates for each position

    function getGovernorRegNumber() public view returns (string[] memory){
        return governorList;
    }
    
    function adminViewGovernors(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory position,uint256 voteCount){
        Candidate memory candidateGov = candidateGovernor[_regNo];
        firstName = candidateGov.firstName;
        lastName = candidateGov.lastName;
        collegeName = candidateGov.collegeName;
        programName = candidateGov.programName;
        yearOfStudy = candidateGov.yearOfStudy;
        regNo = candidateGov.regNo;
        blockNumber = candidateGov.blockNumber;
        position = candidateGov.position;
        voteCount = candidateGov.voteCount;
    }

    function castVoteGovernor( string memory _governorRegNo, address _voterContractAddress, address _timeControlContractAddress ) public {
        VoterContract vc = VoterContract(_voterContractAddress);
        TimeControl tC = TimeControl(_timeControlContractAddress);
        require(tC.isInitiate(), "Voting process doesn't started yet!");
        require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");
        require(isRegistered[_governorRegNo], "Invalid candidate");
        require(keccak256(bytes(vc.getVoter(msg.sender).collegeName)) == keccak256(bytes(candidateGovernor[_governorRegNo].collegeName)), "Your Not valid voter");    
        require(!governorVoted[msg.sender], "You have already voted for Governor!!!");
        governorVoted[msg.sender] = true; 
        
        Candidate storage candidate = candidateGovernor[_governorRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function getWinnerGovernor() public view returns (string memory, string memory, string memory, string memory, uint256){  
        uint256 winningGovernorVoteCount = 0;
        uint256 winningGovernorIndex = 0;    
        for (uint256 i = 0; i < governorList.length; i++) {
            if (candidateGovernor[governorList[i]].voteCount > winningGovernorVoteCount) {
                winningGovernorVoteCount = candidateGovernor[governorList[i]].voteCount;
                winningGovernorIndex = i;
            }
        }
        Candidate memory winner = candidateGovernor[governorList[winningGovernorIndex]];
        // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
        return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
    }

    function voterViewGovernors(address addressVoter, address _voterContractAddress) public view returns (Candidate[] memory) {
        VoterContract vC = VoterContract(_voterContractAddress);
        VoterContract.Voter memory newVoter = vC.getVoter(addressVoter);
        string memory voterCollege = newVoter.collegeName;

        Candidate[] memory result = new Candidate[](governorList.length);
        string[] memory governorLst = governorList;
        uint256 count = 0; // Index for adding candidates to the result array

        for (uint256 i = 0; i < governorLst.length; i++) {
            if (keccak256(bytes(candidateGovernor[governorLst[i]].collegeName)) == keccak256(bytes(voterCollege))) {
                result[count] = candidateGovernor[governorLst[i]];
                count++;
            }
        }
        // Resize the result array to remove any empty elements
        assembly {
            mstore(result, count)
        }
        return result;
    }

}