// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./VoterContract.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";
import "./CandidateContract.sol";

contract CandidateWinner is AccessControl, TimeStructure{

    // function getWinnerPresident(address candidateContractAddress) public view returns ( string memory, string memory, string memory, string memory, string memory, uint256){
    //     uint256 winningPresidentVoteCount = 0;
    //     uint256 winningPresidentIndex = 0;

    //     CandidateContract cWinner = CandidateContract(candidateContractAddress);

    //     for (uint256 i = 0; i < cWinner.getGovernorList().length; i++) {
    //         if (cWinner.candidatePresident[cWinner.presidentList[i]].voteCount > winningPresidentVoteCount) {
    //             winningPresidentVoteCount = cWinner.candidatePresident[cWinner.presidentList[i]].voteCount;
    //             winningPresidentIndex = i;
    //         }
    //     }
    //     // cWinner.Candidate memory winner = candidatePresident[presidentList[winningPresidentIndex]];
    //     CandidateContract.Candidate memory winner = cWinner.candidatePresident[cWinner.presidentList[winningPresidentIndex]];

    //     // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    //     return (winner.firstName, winner.lastName, winner.regNo, winner.collegeName, winner.position, winner.voteCount);
    // }

    // function getWinnerGovernor(address candidateContractAddress) public view returns (string memory, string memory, string memory, string memory, string memory, uint256){  
    //     uint256 winningGovernorVoteCount = 0;
    //     uint256 winningGovernorIndex = 0;    

    //     CandidateContract cWinner = CandidateContract(candidateContractAddress);
    //     for (uint256 i = 0; i < cWinner.governorList.length; i++) {
    //         if (cWinner.candidateGovernor[cWinner.governorList[i]].voteCount > winningGovernorVoteCount) {
    //             winningGovernorVoteCount = cWinner.candidateGovernor[cWinner.governorList[i]].voteCount;
    //             winningGovernorIndex = i;
    //         }
    //     }
    //     CandidateContract.Candidate memory winner = cWinner.candidateGovernor[cWinner.governorList[winningGovernorIndex]];
    //     // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    //     return (winner.firstName, winner.lastName, winner.regNo, winner.collegeName, winner.position, winner.voteCount);
    // }

    // function getWinnerBlockLeader(address candidateContractAddress) public view returns (string memory, string memory, string memory, string memory, string memory, uint256){  
    //     uint256 winningBlockLeaderVoteCount = 0;
    //     uint256 winningBlockLeaderIndex = 0;

    //     CandidateContract cWinner = CandidateContract(candidateContractAddress);    
    //     for (uint256 i = 0; i < cWinner.blockLeaderList.length; i++) {
    //         if (cWinner.candidateBlockLeader[cWinner.blockLeaderList[i]].voteCount > winningBlockLeaderVoteCount) {
    //             winningBlockLeaderVoteCount = cWinner.candidateBlockLeader[cWinner.blockLeaderList[i]].voteCount;
    //             winningBlockLeaderIndex = i;
    //         }
    //     }
    //     CandidateContract.Candidate memory winner = cWinner.candidateBlockLeader[cWinner.blockLeaderList[winningBlockLeaderIndex]];
    //     // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    //    return (winner.firstName, winner.lastName, winner.regNo, winner.collegeName, winner.position, winner.voteCount);
    // }
}