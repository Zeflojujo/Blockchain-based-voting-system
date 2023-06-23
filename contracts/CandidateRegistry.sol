// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CandidateStructure.sol";
import "./AccessControl.sol";
import "./TimeStructure.sol";

contract CandidateRegistry is CandidateStructure, AccessControl, TimeStructure{

    event NewPresidentRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
    event NewGovernorRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);
    event NewBlockLeaderRegistered(string firstName, string lastName, string collegeName, string programName, uint256 yearOfStudy, string regNo, string blockNumber, string gender);

    function registerPresident(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        require(keccak256(bytes(_regNo)).length > 0 && keccak256(bytes(_firstName)).length > 0 && keccak256(bytes(_collegeName)).length > 0
        && keccak256(bytes(_programName)).length > 0 && keccak256(bytes(_blockNumber)).length > 0 
        && keccak256(bytes(_gender)).length > 0, "Make sure every field cannot be empty");
        if(keccak256(bytes(_collegeName)) == keccak256(bytes("TIBA"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        }else{
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
        } 
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
        require(keccak256(bytes(_regNo)).length > 0 && keccak256(bytes(_firstName)).length > 0 && keccak256(bytes(_collegeName)).length > 0
        && keccak256(bytes(_programName)).length > 0 && keccak256(bytes(_blockNumber)).length > 0 
        && keccak256(bytes(_gender)).length > 0, "Make sure every field cannot be empty");
        // require(!candidateGovernor[_regNo].isRegistered, "You have already registered this Governor.");
        if(keccak256(bytes(_collegeName)) == keccak256(bytes("CNMS"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
            require(numberOfGovernor[6] < 2, "The registered Governor at CNMS college is enough!");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            // candidateGovernorCnms[_regNo] = newCandidate;
            governorList.push(_regNo);
            numberOfGovernor[6]++;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        }
        else if(keccak256(bytes(_collegeName)) == keccak256(bytes("CIVE"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
            require(numberOfGovernor[0] < 2, "The registered governor at CIVE college is enough!");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            governorList.push(_regNo);
            numberOfGovernor[0]++;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        }
        else if(keccak256(bytes(_collegeName)) == keccak256(bytes("TIBA"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
            require(numberOfGovernor[1] < 2, "The registered governor at TIBA college is enough!");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            // candidateGovernorTiba[_regNo] = newCandidate;
            governorList.push(_regNo);
            numberOfGovernor[1]++;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        }
        else if(keccak256(bytes(_collegeName)) == keccak256(bytes("COED"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
            require(numberOfGovernor[2] < 2, "The registered governor at COED college is enough!");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            // candidateGovernorCoed[_regNo] = newCandidate;
            governorList.push(_regNo);
            numberOfGovernor[2]++;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        }
        else if(keccak256(bytes(_collegeName)) == keccak256(bytes("COES"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
            require(numberOfGovernor[3] < 2, "The registered governor at COES college is enough!");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            // candidateGovernorCoes[_regNo] = newCandidate;
            governorList.push(_regNo);
            numberOfGovernor[3]++;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        }
        else if(keccak256(bytes(_collegeName)) == keccak256(bytes("CSBL"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
            require(numberOfGovernor[4] < 2, "The registered governor at CSBL college is enough!");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            // candidateGovernorCsbl[_regNo] = newCandidate;
            governorList.push(_regNo);
            numberOfGovernor[4]++;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        }
        else if(keccak256(bytes(_collegeName)) == keccak256(bytes("CHSS"))){
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
            require(numberOfGovernor[5] < 2, "The registered governor at CHSS college is enough!");
            Candidate memory newCandidate = Candidate({firstName: _firstName, lastName: _lastName, collegeName: _collegeName,programName: _programName, yearOfStudy: _yearOfStudy, 
            regNo: _regNo, blockNumber: _blockNumber,gender: _gender, isWinner: false, voteCount: 0
            });
            candidateGovernor[_regNo] = newCandidate;
            governorList.push(_regNo);
            numberOfGovernor[5]++;

            // emit NewGovernorRegistered(_firstName, _collegeName, _programName, _yearOfStudy, _regNo, _blockNumber, _gender);
        }

        else{
            require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
        }       
    }

    function registerBlockLeader(string memory _firstName, string memory _lastName, string memory _collegeName,string memory _programName, uint256 _yearOfStudy, string memory _regNo, string memory _blockNumber, string memory _gender) public onlyAdmin{
        require(!isInitiated, "Voting process already started");
        require(keccak256(bytes(_regNo)).length > 0 && keccak256(bytes(_firstName)).length > 0 && keccak256(bytes(_collegeName)).length > 0
        && keccak256(bytes(_programName)).length > 0 && keccak256(bytes(_blockNumber)).length > 0
        && keccak256(bytes(_gender)).length > 0, "Make sure every field cannot be empty");
        // if(keccak256(bytes(_collegeName)) == keccak256(bytes("TIBA"))){
        //     require(_yearOfStudy > 0 && _yearOfStudy < 5, "Invalid year of Study");
        // }else{
        //     require(_yearOfStudy > 0 && _yearOfStudy < 4, "Invalid year of Study");
        // }        
        // require(!candidateBlockLeader[_regNo].isRegistered, "You have already registered this blockLeader.");
        // require(numberOfPresident < 2, "The registered BlockLeader is enough!");
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

    function getGovernorRegNumber() public view returns (string[] memory){
        return governorList;
    }

    function getBlockLeaderRegNumber() public view returns (string[] memory){
        return blockLeaderList;
    }

    //Admin view candidates for a specific position of vote

    // function viewPresident(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
    //     string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
    //     Candidate memory candidatePres = candidatePresident[_regNo];
    //     firstName = candidatePres.firstName;
    //     lastName = candidatePres.lastName;
    //     collegeName = candidatePres.collegeName;
    //     programName = candidatePres.programName;
    //     yearOfStudy = candidatePres.yearOfStudy;
    //     regNo = candidatePres.regNo;
    //     blockNumber = candidatePres.blockNumber;
    //     gender = candidatePres.gender;
    //     voteCount = candidatePres.voteCount;
    // }
    

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

    function voterViewGovernors(string memory _collegeName) public view returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](governorList.length);
        string[] memory governorLst = governorList;  
        uint j=0;      
        for(uint i = 0; i < governorLst.length; i++){
            if(keccak256(bytes(candidateGovernor[governorLst[i]].collegeName)) == keccak256(bytes(_collegeName))){
                result[j+1] = candidateGovernor[governorLst[i]];  
            }            
        }
        return result;
    }

     // function viewGovernors(string memory _collegeName) public view onlyDuringVotingPeriod returns(Candidate[] memory){
    //     Candidate[] memory result = new Candidate[](governorList.length);
    //     string[] memory governorLst = governorList;        
    //     for(uint i = 0; i < governorLst.length; i++){
    //         if(keccak256(bytes(candidateGovernor[governorLst[i]].collegeName)) == keccak256(bytes(_collegeName))){
    //             result[i] = candidateGovernor[governorLst[i]];  
    //         }            
    //     }
    //     return result;
    // }

    // function adminViewBlockLeaders(string memory _regNo) public view returns(string memory firstName,string memory lastName, 
    //     string memory collegeName, string memory programName, uint256 yearOfStudy, string memory regNo, string memory blockNumber, string memory gender,uint256 voteCount){
    //     Candidate memory candidateBL = candidateBlockLeader[_regNo];
    //     firstName = candidateBL.firstName;
    //     lastName = candidateBL.lastName;
    //     collegeName = candidateBL.collegeName;
    //     programName = candidateBL.programName;
    //     yearOfStudy = candidateBL.yearOfStudy;
    //     regNo = candidateBL.regNo;
    //     blockNumber = candidateBL.blockNumber;
    //     gender = candidateBL.gender;
    //     voteCount = candidateBL.voteCount;
    // }

}