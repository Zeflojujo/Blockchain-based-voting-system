// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract VoterContract is CandidateStructure, AccessControl, TimeStructure{

     // Data structure for a voter
    struct Voter {   
        address voterAddress; 
        string firstName; 
        string lastName;
        string collegeName;
        string programName;
        uint256 yearOfStudy;
        string regNo;
        string blockNumber;
        string password;
        string gender;
        bool isRegistered;
        bool voted;
    }

    mapping(address => Voter) public voters;
    mapping(address => bool) public hasLogedin;
    mapping(address => string) public voterSession;
    address[] public voterAddressArray;

    function getVoter( address _voterAddress) public view returns (Voter memory)
    {
        return voters[_voterAddress];
    }

    // function getHasLoggedIn( address _voterAddress) public view returns (bool)
    // {
    //     return hasLoggedIn[_voterAddress];
    // }

    // function getVoterSession( address _voterAddress) public view returns (string storage)
    // {
    //     return voterSession[_voterAddress];
    // }

    function getVoterAddressArray() public view returns (address[] memory)
    {
        return voterAddressArray;
    }

    // event NewVoterRegistered( string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerVoter( string memory _firstName, string memory _lastName, string memory _collegeName, string memory _programName, uint256 _yearOfStudy, 
    string memory _regNo,string memory _blockNumber, string memory _password, string memory _gender) public
    {
        require(!voters[msg.sender].isRegistered, "Voter is already registered");
        Voter memory newVoter = Voter({
            voterAddress: msg.sender,
            firstName: _firstName,
            lastName: _lastName,
            collegeName: _collegeName, 
            programName: _programName, 
            yearOfStudy: _yearOfStudy, 
            regNo: _regNo, 
            blockNumber: _blockNumber, 
            password: _password, 
            gender: _gender,
            isRegistered: true, 
            voted: false
        });
        voters[msg.sender] = newVoter;
        voterAddressArray.push(msg.sender);
        // emit NewVoterRegistered( _firstName, _lastName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }

    function getVoterRegNumbers() public view returns (address[] memory){
        return voterAddressArray;
    }


    function viewVoter(address vtAddress) public view returns (address voterAddress,string memory firstName,string memory lastName,string memory collegeName,string memory programName,string memory regNo,uint256 yearOfStudy,string memory blockNumber,string memory gender) {
    // require(voters[vtAddress].exists, "Voter does not exist");
        Voter storage voter = voters[vtAddress]; 
        return (voter.voterAddress,voter.firstName,voter.lastName,voter.collegeName,voter.programName,voter.regNo,voter.yearOfStudy,voter.blockNumber,voter.gender);
    }


    // voter can view candidate of the corresponding area of vote
    function voterViewBlockLeader(address addressVoter) public view returns(Candidate[] memory){

        Voter memory newVoter = voters[addressVoter];
        string memory voterCollegeName = newVoter.collegeName;
        string memory voterBlockNumber = newVoter.blockNumber;

        Candidate[] memory result = new Candidate[](blockLeaderList.length);        
        for(uint i = 0; i < blockLeaderList.length; i++){
            if(keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].collegeName)) == keccak256(bytes(voterCollegeName)) && keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].blockNumber)) == keccak256(bytes(voterBlockNumber))){
                result[i] = candidateGovernor[blockLeaderList[i]];  
            }            
        }
        return result;
    }

    

    function getVotingStatus() public view returns(bool) {
        return (block.timestamp >= startTime && block.timestamp <= endTime);
    }

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
    
    function voterLogin(string memory _regNo, string memory _password) public {
        require(voters[msg.sender].isRegistered, "Your account is not registered!");
        require(keccak256(bytes(_regNo)).length > 0 && keccak256(bytes(_password)).length > 0, "Username and password cannot be empty");
        require(keccak256(bytes(voters[msg.sender].regNo)) == keccak256(bytes(_regNo)), "Invalid registration number");
        require(keccak256(bytes(voters[msg.sender].password)) == keccak256(bytes(_password)), "Invalid password");
        hasLogedin[msg.sender] = true;
        voterSession[msg.sender] = _regNo;

    }

    function logout() public {
        hasLogedin[msg.sender] = false;
        delete voterSession[msg.sender];
    }

 
}