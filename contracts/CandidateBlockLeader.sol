// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./VoterContract.sol";
import "./AccessControl.sol";
import "./TimeControl.sol";
import "./CandidateStructure.sol";

contract CandidateBlockLeader is AccessControl, CandidateStructure {

    //BlockLeader Registration
    mapping(string => Candidate) public candidateBlockLeader;

    mapping(address => bool) public blockLeaderVoted;

    string[] public blockLeaderList;

    //Number of candidate in a particular position
    uint256 public numberOfBlockLeader;

    // function getBlockLeaderList() public view returns (string memory)
    // {
    //     return blockLeaderList;
    // }

    event NewBlockLeaderRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerBlockLeader(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, address _timeControlContractAddress) public onlyAdmin{
        TimeControl tC = TimeControl(_timeControlContractAddress);
        require(!tC.isInitiate(), "Voting process already started");    
        // require(numberOfBlock < 2, "The registered BlockLeader is enough!");
        require(!isRegistered[_regNo], "candidate is already registered!");
        Candidate memory newCandidate = Candidate({
            firstName: _firstName,
            lastName: _lastName,       
            collegeName: _collegeName,
            programName: _programName,
            yearOfStudy: _yearOfStudy, 
            regNo: _regNo, 
            blockNumber: _blockNumber,
            position: "BLOCK LEADER", 
            isWinner: false, 
            voteCount: 0
        });
        isRegistered[_regNo] = true;
        candidateBlockLeader[_regNo] = newCandidate;
        blockLeaderList.push(_regNo);

        // emit NewBlockLeaderRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }

    function getBlockLeaderRegNumber() public view returns (string[] memory){
        return blockLeaderList;
    }

    //Admin view candidates for a specific position of vote

    function adminViewBlockLeaders(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory position,uint256 voteCount){
        Candidate memory candidateBL = candidateBlockLeader[_regNo];
        firstName = candidateBL.firstName;
        lastName = candidateBL.lastName;
        collegeName = candidateBL.collegeName;
        programName = candidateBL.programName;
        yearOfStudy = candidateBL.yearOfStudy;
        regNo = candidateBL.regNo;
        blockNumber = candidateBL.blockNumber;
        position = candidateBL.position;
        voteCount = candidateBL.voteCount;
    }

    function castVoteBlockLeader( string memory _blockLeaderRegNo, address _voterContractAddress, address _timeControlContractAddress ) public {
        VoterContract vc = VoterContract(_voterContractAddress);
        TimeControl tC = TimeControl(_timeControlContractAddress);
        require(tC.isInitiate(), "Voting process doesn't started yet!");
        require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");    
        require(isRegistered[_blockLeaderRegNo], "Invalid candidate");
        require(keccak256(bytes(vc.getVoter(msg.sender).collegeName)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].collegeName)), "Your Not member of a this candidate college");    
        require(keccak256(bytes(vc.getVoter(msg.sender).blockNumber)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].blockNumber)), "Your Not member of a this candidate block");  
        require(!blockLeaderVoted[msg.sender], "Already cast vote for BlockLeader position");
        blockLeaderVoted[msg.sender] = true;
        
        Candidate storage candidate = candidateBlockLeader[_blockLeaderRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function getWinnerBlockLeader() public view returns (string memory, string memory, string memory, string memory, uint256){  
        uint256 winningBlockLeaderVoteCount = 0;
        uint256 winningBlockLeaderIndex = 0;    
        for (uint256 i = 0; i < blockLeaderList.length; i++) {
            if (candidateBlockLeader[blockLeaderList[i]].voteCount > winningBlockLeaderVoteCount) {
                winningBlockLeaderVoteCount = candidateBlockLeader[blockLeaderList[i]].voteCount;
                winningBlockLeaderIndex = i;
            }
        }
        Candidate memory winner = candidateBlockLeader[blockLeaderList[winningBlockLeaderIndex]];
        // emit getTheWinner(winner.firstName, winner.lastName, winner.collegeName, winner.programName, winner.voteCount);
        return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
    }

    function voterViewBlockLeaders(address addressVoter, address _voterContractAddress) public view returns (Candidate[] memory) {
        VoterContract vC = VoterContract(_voterContractAddress);
        VoterContract.Voter memory newVoter = vC.getVoter(addressVoter);
        string memory voterCollege = newVoter.collegeName;
        string memory voterBlockNumber = newVoter.blockNumber;

        Candidate[] memory result = new Candidate[](blockLeaderList.length);
        string[] memory blockLeaderLst = blockLeaderList;
        uint256 count = 0; // Index for adding candidates to the result array

        for (uint256 i = 0; i < blockLeaderLst.length; i++) {
            if (keccak256(bytes(candidateBlockLeader[blockLeaderLst[i]].collegeName)) == keccak256(bytes(voterCollege)) && keccak256(bytes(candidateBlockLeader[blockLeaderLst[i]].blockNumber)) == keccak256(bytes(voterBlockNumber))) {
                result[count] = candidateBlockLeader[blockLeaderLst[i]];
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