//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./AccessControl.sol";
import "./TimeControl.sol";

contract DeleteCandidate is CandidateStructure, AccessControl, TimeControl {

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
}