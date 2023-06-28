// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./VoterContract.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract CandidateContract is AccessControl, TimeStructure{

    struct Candidate {
        string firstName;
        string lastName;
        string collegeName;
        string programName;
        uint256 yearOfStudy;
        string regNo;
        string blockNumber;
        string position;
        bool isWinner;
        uint256 voteCount;
    }
    uint public totalVotes;

    mapping(string => bool) public isRegistered;

    bool isPublished;

    //President Registration
    mapping(string => Candidate) public candidatePresident;

    //Governor Registration
    mapping(string => Candidate) public candidateGovernor;

    //BlockLeader Registration
    mapping(string => Candidate) public candidateBlockLeader;

    mapping(address => bool) public presidentVoted;
    mapping(address => bool) public governorVoted;
    mapping(address => bool) public blockLeaderVoted;

    string[] public presidentList;
    string[] public governorList;
    string[] public blockLeaderList;

    //Number of candidate in a particular position
    uint256 public numberOfPresident;
    uint256 public numberOfGovernor;
    uint256 public numberOfBlockLeader;

    // function getGovernorList() public view returns (string memory)
    // {
    //     return governorList;
    // }

    function setPublished() public onlyAdmin{
        isPublished = true;
    }

    function getPublished() public view returns(bool){
        return isPublished;
    }


    event NewPresidentRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
    event NewGovernorRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
    event NewBlockLeaderRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerPresident(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        require(!isRegistered[_regNo], "candidate is already registered!");
        require(numberOfPresident < 2, "The registered president is enough!");
        Candidate memory newCandidate = Candidate({
            firstName: _firstName,
            lastName: _lastName,       
            collegeName: _collegeName,
            programName: _programName,
            yearOfStudy: _yearOfStudy, 
            regNo: _regNo, 
            blockNumber: _blockNumber,
            position: "PRESIDENT", 
            isWinner: false, 
            
            voteCount: 0
        });
        isRegistered[_regNo]= true;
        candidatePresident[_regNo] = newCandidate;
        presidentList.push(_regNo);
        numberOfPresident++;

        // emit NewPresidentRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
    }

    function registerGovernor(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        // require(!candidateGovernor[_regNo].isRegistered, "You have already registered this Governor.");
        require(!isRegistered[_regNo], "candidate is already registered!");
        require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
        regNo: _regNo, blockNumber: _blockNumber, position: "GOVERNOR", isWinner: false, voteCount: 0
        });
        isRegistered[_regNo]= true;
        candidateGovernor[_regNo] = newCandidate;
        // candidateGovernorCnms[_regNo] = newCandidate;
        governorList.push(_regNo);
        numberOfGovernor++;
        

        // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);      
    }

    function registerBlockLeader(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber) public onlyAdmin{
        require(!isInitiated, "Voting process already started");     
        // require(!candidateBlockLeader[_regNo].isRegistered, "You have already registered this blockLeader.");
        // require(numberOfPresident < 2, "The registered BlockLeader is enough!");
        require(!isRegistered[_regNo], "candidate is already registered!");
        Candidate memory newCandidate = Candidate({
            firstName: _firstName,
            lastName: _lastName,       
            collegeName: _collegeName,
            programName: _programName,
            yearOfStudy: _yearOfStudy, 
            regNo: _regNo, 
            blockNumber: _blockNumber,
            position: "BLOCK LEADER", 
            isWinner: false, 
            voteCount: 0
        });
        isRegistered[_regNo] = true;
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
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory position,uint256 voteCount){
        Candidate memory candidatePres = candidatePresident[_regNo];
        firstName = candidatePres.firstName;
        lastName = candidatePres.lastName;
        collegeName = candidatePres.collegeName;
        programName = candidatePres.programName;
        yearOfStudy = candidatePres.yearOfStudy;
        regNo = candidatePres.regNo;
        blockNumber = candidatePres.blockNumber;
        position = candidatePres.position;
        voteCount = candidatePres.voteCount;
    }

    //return the registration number for the candidates for each position

    function getGovernorRegNumber() public view returns (string[] memory){
        return governorList;
    }
    
    function adminViewGovernors(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory position,uint256 voteCount){
        Candidate memory candidateGov = candidateGovernor[_regNo];
        firstName = candidateGov.firstName;
        lastName = candidateGov.lastName;
        collegeName = candidateGov.collegeName;
        programName = candidateGov.programName;
        yearOfStudy = candidateGov.yearOfStudy;
        regNo = candidateGov.regNo;
        blockNumber = candidateGov.blockNumber;
        position = candidateGov.position;
        voteCount = candidateGov.voteCount;
    }

    function getBlockLeaderRegNumber() public view returns (string[] memory){
        return blockLeaderList;
    }

    //Admin view candidates for a specific position of vote

    function adminViewBlockLeaders(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
        string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory position,uint256 voteCount){
        Candidate memory candidateBL = candidateBlockLeader[_regNo];
        firstName = candidateBL.firstName;
        lastName = candidateBL.lastName;
        collegeName = candidateBL.collegeName;
        programName = candidateBL.programName;
        yearOfStudy = candidateBL.yearOfStudy;
        regNo = candidateBL.regNo;
        blockNumber = candidateBL.blockNumber;
        position = candidateBL.position;
        voteCount = candidateBL.voteCount;
    }

    function castVotePresident( string memory _presidentRegNo, address _candidateContractAddress) public {
        VoterContract vc = VoterContract(_candidateContractAddress);
        require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");
        // require(!voters[msg.sender].voted, "You have already voted for President!!!");
        require(isRegistered[_presidentRegNo], "Invalid candidate");
        require(!presidentVoted[msg.sender], "Already voted for President position");
        presidentVoted[msg.sender] = true;

        Candidate storage candidate = candidatePresident[_presidentRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }
    function castVoteGovernor( string memory _governorRegNo, address _candidateContractAddress ) public {
        VoterContract vc = VoterContract(_candidateContractAddress);
        require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");
        require(isRegistered[_governorRegNo], "Invalid candidate");
        // require(keccak256(bytes(vc.getVoter(msg.sender).collegeName)) == keccak256(bytes(candidateGovernor[_governorRegNo].collegeName)), "Your Not valid voter");    
        require(!governorVoted[msg.sender], "You have already voted for Governor!!!");
        governorVoted[msg.sender] = true; 
        
        Candidate storage candidate = candidateGovernor[_governorRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function castVoteBlockLeader( string memory _blockLeaderRegNo, address _candidateContractAddress ) public {
        VoterContract vc = VoterContract(_candidateContractAddress);
        require(vc.getVoter(msg.sender).isRegistered, "Voter is not registered");    
        require(isRegistered[_blockLeaderRegNo], "Invalid candidate");
        // require(keccak256(bytes(vc.getVoter(msg.sender).collegeName)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].collegeName)), "Your Not member of a valid college");    
        // require(keccak256(bytes(vc.getVoter(msg.sender).blockNumber)) == keccak256(bytes(candidateBlockLeader[_blockLeaderRegNo].blockNumber)), "Your Not member of a valid block");  
        require(!blockLeaderVoted[msg.sender], "Already cast vote for BlockLeader position");
        blockLeaderVoted[msg.sender] = true;
        
        Candidate storage candidate = candidateBlockLeader[_blockLeaderRegNo];
        candidate.voteCount++;
        totalVotes++;

        // emit VoteCast(candidate.voteCount, candidate.regNo);
    }

    function getWinnerPresident() public view returns ( string memory, string memory, string memory, string memory, uint256 ){
        uint256 winningPresidentVoteCount = 0;
        uint256 winningPresidentIndex = 0;
        for (uint256 i = 0; i < presidentList.length; i++) {
            if (candidatePresident[presidentList[i]].voteCount > winningPresidentVoteCount) {
                winningPresidentVoteCount = candidatePresident[presidentList[i]].voteCount;
                winningPresidentIndex = i;
            }
        }
        Candidate memory winner = candidatePresident[presidentList[winningPresidentIndex]];
        // emit getTheWinner(winner.firstName, winner.regNo, winner.collegeName, winner.programName, winner.voteCount);
        return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
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
        return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
    }

    function getWinnerBlockLeader() public view returns (string memory, string memory, string memory, string memory, uint256){  
        uint256 winningBlockLeaderVoteCount = 0;
        uint256 winningBlockLeaderIndex = 0;    
        for (uint256 i = 0; i < blockLeaderList.length; i++) {
            if (candidateBlockLeader[blockLeaderList[i]].voteCount > winningBlockLeaderVoteCount) {
                winningBlockLeaderVoteCount = candidateBlockLeader[blockLeaderList[i]].voteCount;
                winningBlockLeaderIndex = i;
            }
        }
        Candidate memory winner = candidateBlockLeader[blockLeaderList[winningBlockLeaderIndex]];
        // emit getTheWinner(winner.firstName, winner.lastName, winner.collegeName, winner.programName, winner.voteCount);
        return (winner.firstName, winner.lastName, winner.collegeName, winner.position, winner.voteCount);
    }
}