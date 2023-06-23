//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./VoterStructure.sol";
import "./AccessControl.sol";
import "./TimeControl.sol";

contract DeleteVoter is VoterStructure, AccessControl, TimeControl {
    function deleteVoter(address _voterAddress) public {
        delete voters[_voterAddress];
        for (uint256 i = 0; i < voterAddressArray.length; i++) {
            if (voterAddressArray[i] == _voterAddress) {
                for (uint256 j = i; j < voterAddressArray.length - 1; j++) {
                    voterAddressArray[j] = voterAddressArray[j + 1];
                }
                voterAddressArray.pop();
                break;
            }
        }
    }
}
