// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateRegistry.sol";
import "./CandidateStructure.sol";
import "./TimeControl.sol";

contract ViewCandidates is CandidateStructure, TimeControl {
        //voter can view candidate of the corresponding area of vote
    function viewPresident() public view returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](presidentList.length);        
        for(uint i=0; i < presidentList.length; i++){
                result[i] = candidatePresident[presidentList[i]];       
        }
        return result;
    }

    function viewGovernors(string memory _collegeName) public view onlyDuringVotingPeriod returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](governorList.length);
        string[] memory governorLst = governorList;        
        for(uint i = 0; i < governorLst.length; i++){
            if(keccak256(bytes(candidateGovernor[governorLst[i]].collegeName)) == keccak256(bytes(_collegeName))){
                result[i] = candidateGovernor[governorLst[i]];  
            }            
        }
        return result;
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


    //Admin view candidates for a specific position of vote
    function adminViewPresident() public view onlyAdmin returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](presidentList.length);        
        for(uint i=0; i < presidentList.length; i++){
                result[i] = candidatePresident[presidentList[i]];       
        }
        return result;
    }

    function adminViewGovernors() public view onlyAdmin returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](governorList.length);        
        for(uint i = 0; i < governorList.length; i++){
            result[i] = candidateGovernor[governorList[i]];         
        }
        return result;
    }

    function adminViewBlockLeader() public view onlyAdmin returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](blockLeaderList.length);        
        for(uint i = 0; i < blockLeaderList.length; i++){
            result[i] = candidateGovernor[blockLeaderList[i]];           
        }
        return result;
    }
}