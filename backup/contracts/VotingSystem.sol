// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./VoterStructure.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract VotingSystem is CandidateStructure, VoterStructure, AccessControl, TimeStructure{

    // event NewPresidentRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
    // event NewGovernorRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
    // event NewBlockLeaderRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerPresident(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        // require(!candidatePresident[_regNo].isRegistered, "You have already registered this President.");
        require(numberOfPresident < 2, "The registered president is enough!");
        Candidate memory newCandidate = Candidate({
            firstName: _firstName,
            lastName: _lastName,       
            collegeName: _collegeName,
            programName: _programName,
            yearOfStudy: _yearOfStudy, 
            regNo: _regNo, 
            blockNumber: _blockNumber,
            gender: _gender, 
            isWinner: false, 
            
            voteCount: 0
        });
        candidatePresident[_regNo] = newCandidate;
        presidentList.push(_regNo);
        numberOfPresident++;

        // emit NewPresidentRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }

    function registerGovernor(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        // require(!candidateGovernor[_regNo].isRegistered, "You have already registered this Governor.");
            require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            // candidateGovernorCnms[_regNo] = newCandidate;
            governorList.push(_regNo);

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);      
    }

    function registerBlockLeader(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");     
        // require(!candidateBlockLeader[_regNo].isRegistered, "You have already registered this blockLeader.");
        Candidate memory newCandidate = Candidate({
            firstName: _firstName,
            lastName: _lastName,       
            collegeName: _collegeName,
            programName: _programName,
            yearOfStudy: _yearOfStudy, 
            regNo: _regNo, 
            blockNumber: _blockNumber,
            gender: _gender, 
            isWinner: false, 
            voteCount: 0
        });
        candidateBlockLeader[_regNo] = newCandidate;
        blockLeaderList.push(_regNo);

        // emit NewBlockLeaderRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }

    

    //return the registration number for the candidates for each position
    function getPresidentRegNumber() public view returns (string[] memory){
        return presidentList;
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

    function getBlockLeaderRegNumber() public view returns (string[] memory){
        return blockLeaderList;
    }

    //Admin view candidates for a specific position of vote

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




//Voter Process




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

    // function voterViewBlockLeader(address addressVoter) public onlyDuringVotingPeriod view returns(Candidate[] memory){

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
        presidentVoted[msg.sender] = true;

        Candidate memory candidate = candidatePresident[_presidentRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }
    function castVoteGovernor( string memory _governorRegNo ) public {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(isRegistered[_governorRegNo], "Invalid candidate");
        // require(keccak256(bytes(voters[msg.sender].collegeName)) == keccak256(bytes(candidateGovernor[_governorRegNo].collegeName)), "Your Not valid voter");    
        require(!governorVoted[msg.sender], "You have already voted for Governor!!!");
        governorVoted[msg.sender] = true; 
        
        Candidate memory candidate = candidateGovernor[_governorRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function castVoteBlockLeader( string memory _blockLeaderRegNo ) public {
        require(voters[msg.sender].isRegistered, "Voter is not registered");    
        require(isRegistered[_blockLeaderRegNo], "Invalid candidate");
        // require(keccak256(bytes(voters[msg.sender].collegeName)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].collegeName)), "Your Not member of a valid college");    
        // require(keccak256(bytes(voters[msg.sender].blockNumber)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].blockNumber)), "Your Not member of a valid block");  
        require(!blockLeaderVoted[msg.sender], "Already cast vote for BlockLeader position");
        blockLeaderVoted[msg.sender] = true;
        
        Candidate memory candidate = candidateBlockLeader[_blockLeaderRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function getVotingStatus() public view returns(bool) {
        return (block.timestamp >= startTime && block.timestamp <= endTime);
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