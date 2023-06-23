// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateRegistry.sol";
import "./CandidateStructure.sol";
import "./TimeControl.sol";

contract CandidateViews is CandidateStructure, TimeControl {

    //return the registration number for the candidates for each position
    function getPresidentRegNumber() public view returns (string[] memory){
        return presidentList;
    }

    function getGovernorRegNumber() public view returns (string[] memory){
        return governorList;
    }

    function getBlockLeaderRegNumber() public view returns (string[] memory){
        return blockLeaderList;
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

    function adminViewGovernors(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
        Candidate memory candidateGov = candidateGovernor[_regNo];
        firstName = candidateGov.firstName;
        lastName = candidateGov.lastName;
        collegeName = candidateGov.collegeName;
        programName = candidateGov.programName;
        yearOfStudy = candidateGov.yearOfStudy;
        regNo = candidateGov.regNo;
        blockNumber = candidateGov.blockNumber;
        gender = candidateGov.gender;
        voteCount = candidateGov.voteCount;
    }

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




//voter can view candidate of the corresponding area of vote
    // function viewPresident() public view returns(Candidate[] memory){
    //     Candidate[] memory result = new Candidate[](presidentList.length);        
    //     for(uint i=0; i < presidentList.length; i++){
    //             result[i] = candidatePresident[presidentList[i]];       
    //     }
    //     return result;
    // }

    // function viewGovernors(string memory _collegeName) public view onlyDuringVotingPeriod returns(Candidate[] memory){
    //     Candidate[] memory result = new Candidate[](governorList.length);
    //     string[] memory governorLst = governorList;        
    //     for(uint i = 0; i < governorLst.length; i++){
    //         if(keccak256(bytes(candidateGovernor[governorLst[i]].collegeName)) == keccak256(bytes(_collegeName))){
    //             result[i] = candidateGovernor[governorLst[i]];  
    //         }            
    //     }
    //     return result;
    // }

    


    // function viewBlockLeader(string memory _collegeName, string memory _blockNumber) public onlyDuringVotingPeriod view returns(Candidate[] memory){
    //     Candidate[] memory result = new Candidate[](blockLeaderList.length);        
    //     for(uint i = 0; i < blockLeaderList.length; i++){
    //         if(keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].collegeName)) == keccak256(bytes(_collegeName)) && keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].blockNumber)) == keccak256(bytes(_blockNumber))){
    //             result[i] = candidateGovernor[blockLeaderList[i]];  
    //         }            
    //     }
    //     return result;
    // }

    // function adminViewPresident() public view onlyAdmin returns(Candidate[] memory){
    //     Candidate[] memory result = new Candidate[](presidentList.length);        
    //     for(uint i=0; i < presidentList.length; i++){
    //             result[i] = candidatePresident[presidentList[i]];       
    //     }
    //     return result;
    // }

    // function adminViewGovernors() public view onlyAdmin returns(Candidate[] memory){
    //     Candidate[] memory result = new Candidate[](governorList.length);        
    //     for(uint i = 0; i < governorList.length; i++){
    //         result[i] = candidateGovernor[governorList[i]];         
    //     }
    //     return result;
    // }

    // function adminViewBlockLeader() public view onlyAdmin returns(Candidate[] memory){
    //     Candidate[] memory result = new Candidate[](blockLeaderList.length);        
    //     for(uint i = 0; i < blockLeaderList.length; i++){
    //         result[i] = candidateGovernor[blockLeaderList[i]];           
    //     }
    //     return result;
    // }
}