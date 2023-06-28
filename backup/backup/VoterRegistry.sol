// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./AccessControl.sol";
import "./VoterStructure.sol";
import "./CandidateStructure.sol";
import "./TimeControl.sol";

contract VoterRegistry is VoterStructure, CandidateStructure, TimeControl {
    
    // event NewVoterRegistered( string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerVoter( string memory _firstName, string memory _lastName, string memory _collegeName, string memory _programName, uint256 _yearOfStudy, 
    string memory _regNo,string memory _blockNumber, string memory _password, string memory _gender) public
    {
        require(keccak256(bytes(_firstName)).length > 0, "VoterFirstName field shoud not be empty");
        require(keccak256(bytes(_lastName)).length > 0, "VoterLastName field shoud not be empty");
        require(keccak256(bytes(_collegeName)).length > 0, "CollageName field shoud not be empty");
        require(keccak256(bytes(_programName)).length > 0 , "ProgramName field shoud not be empty");
        require(keccak256(bytes(_blockNumber)).length > 0 , "BlockNumber field shoud not be empty");
        require(keccak256(bytes(_regNo)).length > 0 , "RegNo field shoud not be empty");
        require(keccak256(bytes(_password)).length > 0 , "Password field shoud not be empty");
        require(keccak256(bytes(_gender)).length > 0 , "Gender field shoud not be empty");

        if(keccak256(bytes(_collegeName)) == keccak256(bytes("TIBA"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        }else{
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
        } 
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

    function viewRegisteredVoters() public view returns(Voter[] memory){
        Voter[] memory result = new Voter[](voterAddressArray.length);
        address[] memory voterRegNos = voterAddressArray;        
        for(uint i=0; i<voterRegNos.length; i++){
            result[i] = voters[voterAddressArray[i]];     
        }
        return result;
    }
        
    // function viewVoter(address vtAddress) public view returns(address voterAddress, string memory firstName, string memory lastName,
    // string memory collegeName, string memory programName,string memory regNo, uint256 yearOfStudy, string memory blockNumber, string memory gender){
    //     Voter memory voter = voters[vtAddress];
    //     voterAddress = voter.voterAddress;
    //     firstName = voter.firstName;
    //     lastName = voter.lastName;
    //     collegeName = voter.collegeName;
    //     programName = voter.programName;
    //     yearOfStudy = voter.yearOfStudy;
    //     regNo = voter.regNo;
    //     blockNumber = voter.blockNumber;
    //     // password = voter.password;
    //     gender = voter.gender;
    // }
    function viewVoter(address vtAddress) public view returns (
    address voterAddress,
    string memory firstName,
    string memory lastName,
    string memory collegeName,
    string memory programName,
    string memory regNo,
    uint256 yearOfStudy,
    string memory blockNumber,
    string memory gender
) {
    // require(voters[vtAddress].exists, "Voter does not exist");
    
    Voter storage voter = voters[vtAddress];
    
    return (
        voter.voterAddress,
        voter.firstName,
        voter.lastName,
        voter.collegeName,
        voter.programName,
        voter.regNo,
        voter.yearOfStudy,
        voter.blockNumber,
        voter.gender
    );
}


    // voter can view candidate of the corresponding area of vote

    // function voterViewGovernors(address addressVoter) public view returns(Candidate[] memory){

    //     Voter memory newVoter = voters[addressVoter];
    //     string memory voterCollege = newVoter.collegeName;

    //     Candidate[] memory result = new Candidate[](governorList.length);
    //     string[] memory governorLst = governorList;        
    //     for(uint i = 0; i < governorLst.length; i++){
    //         if(keccak256(bytes(candidateGovernor[governorLst[i]].collegeName)) == keccak256(bytes(voterCollege))){
    //             result[i] = candidateGovernor[governorLst[i]];  
    //         }            
    //     }
    //     return result;
    // }

    // function voterViewBlockLeader(address addressVoter) public view returns(Candidate[] memory){

    //     Voter memory newVoter = voters[addressVoter];
    //     string memory voterCollegeName = newVoter.collegeName;
    //     string memory voterBlockNumber = newVoter.blockNumber;

    //     Candidate[] memory result = new Candidate[](blockLeaderList.length);        
    //     for(uint i = 0; i < blockLeaderList.length; i++){
    //         if(keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].collegeName)) == keccak256(bytes(voterCollegeName)) && keccak256(bytes(candidateBlockLeader[blockLeaderList[i]].blockNumber)) == keccak256(bytes(voterBlockNumber))){
    //             result[i] = candidateGovernor[blockLeaderList[i]];  
    //         }            
    //     }
    //     return result;
    // }
    function castVotePresident( string memory _presidentRegNo) public {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        // require(!voters[msg.sender].voted, "You have already voted for President!!!");
        require(!presidentVoted[msg.sender], "Already voted for President position");
        Candidate storage candidate = candidatePresident[_presidentRegNo];
        candidate.voteCount++;
        presidentVoted[msg.sender] = true;

        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    // function deleteVoter(address _voterAddress) public {
    //     delete voters[_voterAddress];
    //     for (uint256 i = 0; i < voterAddressArray.length; i++) {
    //         if (voterAddressArray[i] == _voterAddress) {
    //             for (uint256 j = i; j < voterAddressArray.length - 1; j++) {
    //                 voterAddressArray[j] = voterAddressArray[j + 1];
    //             }
    //             voterAddressArray.pop();
    //             break;
    //         }
    //     }
    // }
    
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
