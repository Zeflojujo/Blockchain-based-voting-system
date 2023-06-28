// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./VoterStructure.sol";
import "./TimeStructure.sol";

contract CastVote is VoterStructure, CandidateStructure, TimeStructure {

    // string[] public winners;
    enum State { President, Governor, BlockLeader }
    State public StateOfElection = State.President;

    // uint public totalVotes;
// 
    event VoteCast(uint256 voteCount, string candidateRegNo);
    // event getTheWinner(string name, string regNo, string collegeName, string programName, uint256 winningVoteCount);

    modifier onlyAuthenticated() {
        require(hasLogedin[msg.sender], "you are not authenticated please login first");
        _;
    }
// onlyDuringVotingPeriod
// onlyAuthenticated

    // function castVotePresident( string memory _presidentRegNo) public {
    //     // require(voters[msg.sender].isRegistered, "Voter is not registered");
    //     // require(StateOfElection == State.President, "You has already cast for President level");
    //     // require(!voters[msg.sender].voted, "You have already voted for President!!!");
    //     // require(!presidentVoted[msg.sender], "Already voted for President position");
    //     presidentVoted[msg.sender] = true;
    //     // voters[msg.sender].voted = true;
    //     Candidate memory candidate = candidatePresident[_presidentRegNo];
    //     candidate.voteCount++;
    //     // totalVotes++;
    //     // StateOfElection = State.Governor;

    //     emit VoteCast(candidate.voteCount, candidate.regNo);
    // }

    function castVoteGovernor( string memory _governorRegNo ) public onlyDuringVotingPeriod onlyAuthenticated{
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        // require(StateOfElection != State.President, "Please cast a vote for president position before to cast for Governor position");
        // require(StateOfElection == State.Governor);
        require(isRegistered[_governorRegNo], "Invalid candidate");
        require(keccak256(bytes(voters[msg.sender].collegeName)) == keccak256(bytes(candidateGovernor[_governorRegNo].collegeName)), "Your Not valid voter");    
        require(!governorVoted[msg.sender], "You have already voted for Governor!!!");
        governorVoted[msg.sender] = true; 
        
        Candidate memory candidate = candidateGovernor[_governorRegNo];
        candidate.voteCount++;
        totalVotes++;
        StateOfElection = State.BlockLeader;

        emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function castVoteBlockLeader( string memory _blockLeaderRegNo ) external onlyDuringVotingPeriod onlyAuthenticated{
        require(voters[msg.sender].isRegistered, "Voter is not registered");    
        require(isRegistered[_blockLeaderRegNo], "Invalid candidate");
        require(keccak256(bytes(voters[msg.sender].collegeName)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].collegeName)), "Your Not member of a valid college");    
        require(keccak256(bytes(voters[msg.sender].blockNumber)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].blockNumber)), "Your Not member of a valid block");  
        require(!blockLeaderVoted[msg.sender], "Already cast vote for BlockLeader position");
        blockLeaderVoted[msg.sender] = true;
        
        Candidate memory candidate = candidateBlockLeader[_blockLeaderRegNo];
        candidate.voteCount++;
        totalVotes++;

        emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function getVotingStatus() public view returns(bool) {
        return (block.timestamp >= startTime && block.timestamp <= endTime);
    }

    //Display the winner for each President, Governor and BlockLeader position

    modifier onlyAfterVotingComplete(){
        require(block.timestamp > endTime, "Voting is still ongoing");
        _;
    }



    function getWinnerPresident() public view onlyAfterVotingComplete returns ( string memory, string memory, string memory, string memory, uint256 ){
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
        return (winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    }

    function getWinnerGovernor() public view onlyAfterVotingComplete returns (string memory, string memory, string memory, string memory, uint256){  
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
        return (winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    }

    function getWinnerBlockLeader() public view onlyAfterVotingComplete returns (string memory, string memory, string memory, string memory, uint256){  
        uint256 winningBlockLeaderVoteCount = 0;
        uint256 winningBlockLeaderIndex = 0;    
        for (uint256 i = 0; i < blockLeaderList.length; i++) {
            if (candidateGovernor[blockLeaderList[i]].voteCount > winningBlockLeaderVoteCount) {
                winningBlockLeaderVoteCount = candidateGovernor[blockLeaderList[i]].voteCount;
                winningBlockLeaderIndex = i;
            }
        }
        Candidate memory winner = candidateGovernor[blockLeaderList[winningBlockLeaderIndex]];
        // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
        return (winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    }
}