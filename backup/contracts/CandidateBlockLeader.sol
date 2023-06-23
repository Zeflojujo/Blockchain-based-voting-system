// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./VoterStructure.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract CandidateBlockLeader is CandidateStructure,VoterStructure, AccessControl, TimeStructure{

    event NewBlockLeaderRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerBlockLeader(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        require(keccak256(bytes(_regNo)).length > 0 && keccak256(bytes(_firstName)).length > 0 && keccak256(bytes(_collegeName)).length > 0
        && keccak256(bytes(_programName)).length > 0 && keccak256(bytes(_blockNumber)).length > 0
        && keccak256(bytes(_gender)).length > 0, "Make sure every field cannot be empty");
        // if(keccak256(bytes(_collegeName)) == keccak256(bytes("TIBA"))){
        //     require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        // }else{
        //     require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
        // }        
        require(!isRegistered[_regNo], "candidate is already registered!");
        // require(numberOfPresident < 2, "The registered BlockLeader is enough!");
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
        candidateBlockLeader[_regNo] = newCandidate;
        blockLeaderList.push(_regNo);
        isRegistered[_regNo] = true;

        // emit NewBlockLeaderRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }

    function getBlockLeaderRegNumber() public view returns (string[] memory){
        return blockLeaderList;
    }

    //Admin view candidates for a specific position of vote

    function adminViewBlockLeaders(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
        Candidate memory candidateBL = candidateBlockLeader[_regNo];
        firstName = candidateBL.firstName;
        lastName = candidateBL.lastName;
        collegeName = candidateBL.collegeName;
        programName = candidateBL.programName;
        yearOfStudy = candidateBL.yearOfStudy;
        regNo = candidateBL.regNo;
        blockNumber = candidateBL.blockNumber;
        gender = candidateBL.gender;
        voteCount = candidateBL.voteCount;
    }

    function viewBlockLeader(string memory _collegeName, string memory _blockNumber) public onlyDuringVotingPeriod view returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](blockLeaderList.length);        
        for(uint i = 0; i < blockLeaderList.length; i++){
            if(keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].collegeName)) == keccak256(bytes(_collegeName)) && keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].blockNumber)) == keccak256(bytes(_blockNumber))){
                result[i] = candidateGovernor[blockLeaderList[i]];  
            }            
        }
        return result;
    }


    function voterViewBlockLeaders(address addressVoter) public view returns (Candidate[] memory) {
        Voter memory newVoter = voters[addressVoter];
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
    

    function deleteBlockLeader(string memory _presidentRegNo) public onlyAdmin{
        delete candidateBlockLeader[_presidentRegNo];
         for (uint256 i = 0; i < governorList.length; i++) {
            if (keccak256(bytes(governorList[i])) == keccak256(bytes(_presidentRegNo))) {
                for (uint256 j = i; j < governorList.length - 1; j++) {
                    governorList[j] = governorList[j + 1];
                }
                governorList.pop();
                break;
            }
        }
    }


    function castVoteBlockLeader( string memory _blockLeaderRegNo ) external {
        require(voters[msg.sender].isRegistered, "Voter is not registered");    
        require(isRegistered[_blockLeaderRegNo], "Invalid candidate");
        // require(keccak256(bytes(voters[msg.sender].collegeName)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].collegeName)), "Your Not member of a valid college");    
        // require(keccak256(bytes(voters[msg.sender].blockNumber)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].blockNumber)), "Your Not member of a valid block");  
        require(!blockLeaderVoted[msg.sender], "Already cast vote for BlockLeader position");
        blockLeaderVoted[msg.sender] = true;
        
        Candidate memory candidate = candidateBlockLeader[_blockLeaderRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function getWinnerBlockLeader() public view returns (string memory firstName, string memory regNo, string memory collegeName, string memory programName, uint256 voteCount){  
        uint256 winningBlockLeaderVoteCount = 0;
        uint256 winningBlockLeaderIndex = 0;    
        for (uint256 i = 0; i < blockLeaderList.length; i++) {
            if (candidateGovernor[blockLeaderList[i]].voteCount > winningBlockLeaderVoteCount) {
                winningBlockLeaderVoteCount = candidateGovernor[blockLeaderList[i]].voteCount;
                winningBlockLeaderIndex = i;
            }
        }
        Candidate memory winner = candidateGovernor[blockLeaderList[winningBlockLeaderIndex]];

        firstName = winner.firstName;
        regNo = winner.regNo;
        collegeName = winner.collegeName;
        programName = winner.programName;
        voteCount = winner.voteCount;
        // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
        // return (winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    }
}