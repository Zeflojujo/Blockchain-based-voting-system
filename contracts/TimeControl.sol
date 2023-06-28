//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./AccessControl.sol";

contract TimeControl is AccessControl {
    uint256 startTime;
    uint256 endTime;
    uint256 remainingTime;
    uint256[] public oTime;
    bool public isInitiated;

    function isInitiate() public view returns(bool){
        return isInitiated;
    }

    function getStartTime() external view returns(uint256) {
        return startTime;
    }

    function getEndTime() external view returns(uint256) {
        return endTime;
    }

    modifier onlyDuringVotingPeriod(){
        // require(!isInitiated, "The voting time is already initiated");
        require(block.timestamp >= startTime, "Voting is not currently open");
        require(block.timestamp <= endTime, "Voting session expired");
        _;
    }

    function setVotingPeriod(uint256 _startTime, uint256 _endTime) public {
        require(_endTime > _startTime, "Invalid voting period");
        require(!isInitiated, "The voting time is already initiated");
        uint256 _remainingTime = _endTime - _startTime;
        oTime.push(_startTime);
        oTime.push(_endTime);
        oTime.push(_remainingTime);
        isInitiated = true;
        startTime = block.timestamp + (_startTime  * 1 seconds );
        endTime = block.timestamp + (_endTime * 1 seconds );
        remainingTime = _remainingTime;  
        isInitiated = true;    
    }

    function getTime() public view returns(uint256[] memory){
        return oTime;
    }

        // f`````````````````````````````````````````````````````````````````````````````````

     function getVotingStatus() public view returns(bool) {
        return (block.timestamp >= startTime && block.timestamp <= endTime);
    }

    function getRemainingTime() public view returns(uint256)  {
        if(block.timestamp >= endTime){
            return 0;
        }else{
            return endTime - block.timestamp;
        }
    }
}