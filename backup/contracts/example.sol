// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library VoterStructureLibrary {
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

    struct VoterStorage {
        mapping(address => Voter) voters;
        mapping(address => bool) hasLoggedIn;
        mapping(address => string) voterSession;
        address[] voterAddressArray;
    }

    //     function getCandidatePresident( string memory _regNo) public view returns (Candidate memory)
    // {
    //     return candidatePresident[_regNo];
    // }
    // function getGovernorList() public view returns (string[] memory)
    // {
    //     return governorList;
    // }

    function getVoter(VoterStorage storage self, address _voterAddress) public view returns (Voter storage)
    {
        return self.voters[_voterAddress];
    }

    function getHasLoggedIn(VoterStorage storage self, address _voterAddress) public view returns (bool)
    {
        return self.hasLoggedIn[_voterAddress];
    }

    function getVoterSession(VoterStorage storage self, address _voterAddress) public view returns (string storage)
    {
        return self.voterSession[_voterAddress];
    }

    function getVoterAddressArray(VoterStorage storage self) public view returns (address[] storage)
    {
        return self.voterAddressArray;
    }
}




contract MyContract {
    using VoterStructureLibrary for VoterStructureLibrary.VoterStorage;
    VoterStructureLibrary.VoterStorage private voters;

    function registerVoter(
        address _voterAddress,
        string memory _firstName,
        string memory _lastName,
        string memory _collegeName,
        string memory _programName,
        uint256 _yearOfStudy,
        string memory _regNo,
        string memory _blockNumber,
        string memory _password,
        string memory _gender
    ) external {
        // Access the Voter data structure and storage functions
        VoterStructureLibrary.Voter storage voter = voters.getVoter(_voterAddress);
        voter.voterAddress = _voterAddress;
        voter.firstName = _firstName;
        voter.lastName = _lastName;
        voter.collegeName = _collegeName;
        voter.programName = _programName;
        voter.yearOfStudy = _yearOfStudy;
        voter.regNo = _regNo;
        voter.blockNumber = _blockNumber;
        voter.password = _password;
        voter.gender = _gender;
        voter.isRegistered = true;
        voter.voted = false;

        voters.hasLoggedIn[_voterAddress] = false;
        voters.voterAddressArray.push(_voterAddress);
    }

    function getVoterDetails(address _voterAddress)
        external
        view
        returns (VoterStructureLibrary.Voter memory)
    {
        // Access the Voter data structure
        return voters.getVoter(_voterAddress);
    }
}


// The contract you provided, VoterStructure, seems to define the necessary data structures and mappings 
// for storing voter information. However, based on the code snippet you shared, there are no functions that 
// handle the data transfer between contracts.

// To address your issue of accessing empty data when one contract sends data to VoterStructure 
// and another contract tries to access it, there are a few potential reasons for this problem:

// Incorrect data storage: Ensure that the data is being correctly stored in the VoterStructure contract.
//  When the first contract sends data, verify that the data is actually being assigned to the appropriate 
//  mappings and arrays in the VoterStructure contract.

// Synchronization of data: If multiple contracts are interacting with the VoterStructure contract, 
// you need to ensure that they are properly synchronized. For example, if one contract updates a value, 
// other contracts may need to wait until the transaction is mined and the data is updated before accessing it.

// Contract deployment and address consistency: Verify that all contracts are deployed to the correct 
// addresses and that the correct instances of the VoterStructure contract are being used. If you are 
// interacting with multiple instances of the same contract, make sure you are referencing the correct 
// contract address.

// To further diagnose the issue and provide more specific guidance, please provide more details about
//  how the contracts interact, including the code snippets for the contracts that send data to VoterStructure
//   and the contract that tries to access it






// pragma solidity ^0.8.0;
// import "./VoterContract.sol";
// import "./AccessControl.sol";
// import "./TimeStructure.sol";

// contract CandidateContract is AccessControl, TimeStructure{

//     struct Candidate {
//         string firstName;
//         string lastName;
//         string collegeName;
//         string programName;
//         uint256 yearOfStudy;
//         string regNo;
//         string blockNumber;
//         string gender;
//         bool isWinner;
//         uint256 voteCount;
//         string position;
//     }
//     uint public totalVotes;

//     mapping(string => bool) public isRegistered;

//     //President Registration
//     mapping(string => Candidate) public candidatePresident;

//     //Governor Registration
//     mapping(string => Candidate) public candidateGovernor;

//     //BlockLeader Registration
//     mapping(string => Candidate) public candidateBlockLeader;

//     mapping(address => bool) public presidentVoted;
//     mapping(address => bool) public governorVoted;
//     mapping(address => bool) public blockLeaderVoted;

//     string[] public presidentList;
//     string[] public governorList;
//     string[] public blockLeaderList;

//     //Number of candidate in a particular position
//     uint256 public numberOfPresident;
//     uint256 public numberOfGovernor;
//     uint256 public numberOfBlockLeader;

//     function getCandidatePresident( string memory _regNo) public view returns (Candidate memory)
//     {
//         return candidatePresident[_regNo];
//     }
//     function getGovernorList() public view returns (string[] memory)
//     {
//         return governorList;
//     }


//     event NewPresidentRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
//     event NewGovernorRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
//     event NewBlockLeaderRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

//     function registerPresident(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
//         require(!isInitiated, "Voting process already started");
//         require(!isRegistered[_regNo], "candidate is already registered!");
//         require(numberOfPresident < 2, "The registered president is enough!");
//         Candidate memory newCandidate = Candidate({
//             firstName: _firstName,
//             lastName: _lastName,       
//             collegeName: _collegeName,
//             programName: _programName,
//             yearOfStudy: _yearOfStudy, 
//             regNo: _regNo, 
//             blockNumber: _blockNumber,
//             gender: _gender, 
//             isWinner: false,
//             voteCount: 0,
//             position: "PRESIDENT"
//         });
//         isRegistered[_regNo]= true;
//         candidatePresident[_regNo] = newCandidate;
//         presidentList.push(_regNo);
//         numberOfPresident++;

//         // emit NewPresidentRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
//     }

//     function registerGovernor(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
//         require(!isInitiated, "Voting process already started");
//         // require(!candidateGovernor[_regNo].isRegistered, "You have already registered this Governor.");
//         require(!isRegistered[_regNo], "candidate is already registered!");
//         require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
//         Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
//         regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0,position: "GOVERNOR"
//         });
//         isRegistered[_regNo]= true;
//         candidateGovernor[_regNo] = newCandidate;
//         // candidateGovernorCnms[_regNo] = newCandidate;
//         governorList.push(_regNo);
//         numberOfGovernor++;
        

//         // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);      
//     }

//     function registerBlockLeader(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
//         require(!isInitiated, "Voting process already started");     
//         // require(!candidateBlockLeader[_regNo].isRegistered, "You have already registered this blockLeader.");
//         // require(numberOfPresident < 2, "The registered BlockLeader is enough!");
//         require(!isRegistered[_regNo], "candidate is already registered!");
//         Candidate memory newCandidate = Candidate({
//             firstName: _firstName,
//             lastName: _lastName,       
//             collegeName: _collegeName,
//             programName: _programName,
//             yearOfStudy: _yearOfStudy, 
//             regNo: _regNo, 
//             blockNumber: _blockNumber,
//             gender: _gender, 
//             isWinner: false, 
//             voteCount: 0,
//             position: "BLOCK LEADER"
//         });
//         isRegistered[_regNo] = true;
//         candidateBlockLeader[_regNo] = newCandidate;
//         blockLeaderList.push(_regNo);
        

//         // emit NewBlockLeaderRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
//     }

    

//     //return the registration number for the candidates for each position
//     function getPresidentRegNumber() public view returns (string[] memory){
//         return presidentList;
//     }


//     //Admin view candidates for a specific position of vote

//     function viewPresident(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
//         string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
//         Candidate memory candidatePres = candidatePresident[_regNo];
//         firstName = candidatePres.firstName;
//         lastName = candidatePres.lastName;
//         collegeName = candidatePres.collegeName;
//         programName = candidatePres.programName;
//         yearOfStudy = candidatePres.yearOfStudy;
//         regNo = candidatePres.regNo;
//         blockNumber = candidatePres.blockNumber;
//         gender = candidatePres.gender;
//         voteCount = candidatePres.voteCount;
//     }

//     //return the registration number for the candidates for each position

//     function getGovernorRegNumber() public view returns (string[] memory){
//         return governorList;
//     }
    
//     function adminViewGovernors(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
//         string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
//         Candidate memory candidateGov = candidateGovernor[_regNo];
//         firstName = candidateGov.firstName;
//         lastName = candidateGov.lastName;
//         collegeName = candidateGov.collegeName;
//         programName = candidateGov.programName;
//         yearOfStudy = candidateGov.yearOfStudy;
//         regNo = candidateGov.regNo;
//         blockNumber = candidateGov.blockNumber;
//         gender = candidateGov.gender;
//         voteCount = candidateGov.voteCount;
//     }

//     function getBlockLeaderRegNumber() public view returns (string[] memory){
//         return blockLeaderList;
//     }

//     //Admin view candidates for a specific position of vote

//     function adminViewBlockLeaders(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
//         string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
//         Candidate memory candidateBL = candidateBlockLeader[_regNo];
//         firstName = candidateBL.firstName;
//         lastName = candidateBL.lastName;
//         collegeName = candidateBL.collegeName;
//         programName = candidateBL.programName;
//         yearOfStudy = candidateBL.yearOfStudy;
//         regNo = candidateBL.regNo;
//         blockNumber = candidateBL.blockNumber;
//         gender = candidateBL.gender;
//         voteCount = candidateBL.voteCount;
//     }

//     function castVotePresident( string memory _presidentRegNo, address _candidateContractAddress) public {
//         VoterContract vc = VoterContract(_candidateContractAddress);
//         require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");
//         // require(!voters[msg.sender].voted, "You have already voted for President!!!");
//         require(isRegistered[_presidentRegNo], "Invalid candidate");
//         require(!presidentVoted[msg.sender], "Already voted for President position");
//         presidentVoted[msg.sender] = true;

//         Candidate storage candidate = candidatePresident[_presidentRegNo];
//         candidate.voteCount++;
//         totalVotes++;

//         // emit VoteCast(candidate.voteCount, candidate.regNo);
//     }
//     function castVoteGovernor( string memory _governorRegNo, address _candidateContractAddress ) public {
//         VoterContract vc = VoterContract(_candidateContractAddress);
//         require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");
//         require(isRegistered[_governorRegNo], "Invalid candidate");
//         // require(keccak256(bytes(voters[msg.sender].collegeName)) == keccak256(bytes(candidateGovernor[_governorRegNo].collegeName)), "Your Not valid voter");    
//         require(!governorVoted[msg.sender], "You have already voted for Governor!!!");
//         governorVoted[msg.sender] = true; 
        
//         Candidate storage candidate = candidateGovernor[_governorRegNo];
//         candidate.voteCount++;
//         totalVotes++;

//         // emit VoteCast(candidate.voteCount, candidate.regNo);
//     }

//     function castVoteBlockLeader( string memory _blockLeaderRegNo, address _candidateContractAddress ) public {
//         VoterContract vc = VoterContract(_candidateContractAddress);
//         require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");    
//         require(isRegistered[_blockLeaderRegNo], "Invalid candidate");
//         // require(keccak256(bytes(voters[msg.sender].collegeName)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].collegeName)), "Your Not member of a valid college");    
//         // require(keccak256(bytes(voters[msg.sender].blockNumber)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].blockNumber)), "Your Not member of a valid block");  
//         require(!blockLeaderVoted[msg.sender], "Already cast vote for BlockLeader position");
//         blockLeaderVoted[msg.sender] = true;
        
//         Candidate storage candidate = candidateBlockLeader[_blockLeaderRegNo];
//         candidate.voteCount++;
//         totalVotes++;

//         // emit VoteCast(candidate.voteCount, candidate.regNo);
//     }

//     function getWinnerPresident() public view returns ( string memory, string memory, string memory, string memory, uint256){
//         uint256 winningPresidentVoteCount = 0;
//         uint256 winningPresidentIndex = 0;
//         for (uint256 i = 0; i < presidentList.length; i++) {
//             if (candidatePresident[presidentList[i]].voteCount > winningPresidentVoteCount) {
//                 winningPresidentVoteCount = candidatePresident[presidentList[i]].voteCount;
//                 winningPresidentIndex = i;
//             }
//         }
//         Candidate memory winner = candidatePresident[presidentList[winningPresidentIndex]];
//         // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
//         return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
//     }

//     function getWinnerGovernor() public view returns (string memory, string memory, string memory, string memory, uint256){  
//         uint256 winningGovernorVoteCount = 0;
//         uint256 winningGovernorIndex = 0;    
//         for (uint256 i = 0; i < governorList.length; i++) {
//             if (candidateGovernor[governorList[i]].voteCount > winningGovernorVoteCount) {
//                 winningGovernorVoteCount = candidateGovernor[governorList[i]].voteCount;
//                 winningGovernorIndex = i;
//             }
//         }
//         Candidate memory winner = candidateGovernor[governorList[winningGovernorIndex]];
//         // emit getTheWinner(winner.firstName, winner.collegeName, winner.programName, winner.voteCount);
//         return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
//     }

//     function getWinnerBlockLeader() public view returns (string memory, string memory, string memory, string memory, uint256){  
//         uint256 winningBlockLeaderVoteCount = 0;
//         uint256 winningBlockLeaderIndex = 0;    
//         for (uint256 i = 0; i < blockLeaderList.length; i++) {
//             if (candidateBlockLeader[blockLeaderList[i]].voteCount > winningBlockLeaderVoteCount) {
//                 winningBlockLeaderVoteCount = candidateBlockLeader[blockLeaderList[i]].voteCount;
//                 winningBlockLeaderIndex = i;
//             }
//         }
//         Candidate memory winner = candidateBlockLeader[blockLeaderList[winningBlockLeaderIndex]];
//         // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
//        return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
//     }
// }