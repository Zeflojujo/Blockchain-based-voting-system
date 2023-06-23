//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract TimeControl is AccessControl, TimeStructure{

    function setVotingPeriod(uint256 _startTime, uint256 _endTime) public onlyAdmin {
        require(_endTime > _startTime, "Invalid voting period");
        // require(isInitiated == false, "The voting time is already initiated");
        uint256 _remainingTime = _endTime - _startTime;
        // oTime.push(_startTime);
        // oTime.push(_endTime);
        isInitiated = true;
        startTime = block.timestamp + (_startTime  * 1 seconds );
        endTime = block.timestamp + (_endTime * 1 seconds );
        remainingTime = _remainingTime;      
    }

    function getTime() public view onlyAdmin returns(uint256 startTime, uint256 endTime) {
        // Time memory time = times[msg.sender];
        startTime = startTime;
        endTime = endTime;
        // remainingTime = time.remainingTime;
    }

    // function getTime() public view returns(uint256[] memory){
    //     return oTime;
    // }

    function getRemainingTime() public view returns(uint256)  {
        require(block.timestamp >= startTime, "voting has not started yet!!!, Please wait");
        if(block.timestamp < endTime){
            return(endTime - block.timestamp);
        }else{
            return 0;
        }
    }
}