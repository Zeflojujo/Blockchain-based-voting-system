// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./VoterStructure.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract CandidateGovernor is CandidateStructure,VoterStructure, AccessControl, TimeStructure{

    event NewGovernorRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerGovernor(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        require(keccak256(bytes(_regNo)).length > 0 && keccak256(bytes(_firstName)).length > 0 && keccak256(bytes(_collegeName)).length > 0
        && keccak256(bytes(_programName)).length > 0 && keccak256(bytes(_blockNumber)).length > 0 
        && keccak256(bytes(_gender)).length > 0, "Make sure every field cannot be empty");
        require(!isRegistered[_regNo], "candidate is already registered!");
        // if(keccak256(bytes(_collegeName)) == keccak256(bytes("CNMS"))){
        require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        // require(numberOfGovernor[6] < 2, "The registered Governor at CNMS college is enough!");
        Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
        regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
        });
        candidateGovernor[_regNo] = newCandidate;
        // candidateGovernorCnms[_regNo] = newCandidate;
        governorList.push(_regNo);
        // numberOfGovernor[6]++;
        isRegistered[_regNo]= true;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
      
        // else if(keccak256(bytes(_collegeName)) == keccak256(bytes("CSBL"))){
        //     require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
        //     require(numberOfGovernor[4] < 2, "The registered governor at CSBL college is enough!");
        //     Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
        //     regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
        //     });
        //     candidateGovernor[_regNo] = newCandidate;
        //     // candidateGovernorCsbl[_regNo] = newCandidate;
        //     governorList.push(_regNo);
        //     numberOfGovernor[4]++;
        // isRegistered[_regNo]= true;

        //     // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        // }
      
    }

    

    //return the registration number for the candidates for each position

    function getGovernorRegNumber() public view returns (string[] memory){
        return governorList;
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


 
    function voterViewGovernors(address addressVoter) public view returns (Candidate[] memory) {
        Voter memory newVoter = voters[addressVoter];
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

    function deleteGovernor(string memory _presidentRegNo) public onlyAdmin{
        delete candidateGovernor[_presidentRegNo];
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
        return (winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
    }

}