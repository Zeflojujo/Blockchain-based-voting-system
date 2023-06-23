

// const VoterStructure = artifacts.require('VoterStructure');
// const CandidateStructure = artifacts.require('CandidateStructure');
// const AccessControl = artifacts.require('AccessControl');
// const TimeControl = artifacts.require('TimeControl');
// const TimeStructure = artifacts.require('TimeStructure');
// const VoterRegistry = artifacts.require('VoterRegistry');
// const CastVote = artifacts.require('CastVote');
// const CandidateViews = artifacts.require('CandidateViews');
// const AdminAuthentication = artifacts.require('AdminAuthentication');
// const CandidatePresident = artifacts.require('CandidatePresident');
// const CandidateGovernor = artifacts.require('CandidateGovernor');
// const CandidateBlockLeader = artifacts.require('CandidateBlockLeader');

// module.exports = function(deployer) {
//     deployer.deploy(AccessControl).then(function(){
//         return deployer.deploy(TimeControl)
//     }).then(function(){
//         return deployer.deploy(TimeStructure);
//     }).then(function(){
//         return deployer.deploy(VoterStructure);
//     }).then(function(){
//         return deployer.deploy(CandidateStructure);
//     }).then(function(){
//         return deployer.deploy(AdminAuthentication);
//     }).then(function() {
//         return deployer.deploy(VoterRegistry, AccessControl.address, TimeControl.address, VoterStructure.address);
//     }).then(function() {
//         return deployer.deploy(CastVote, AccessControl.address,TimeControl.address,VoterStructure.address,CandidateStructure.address);
//     }).then(function(){
//         return deployer.deploy(CandidateViews, AccessControl.address, TimeControl.address, CandidateStructure.address);
//     }).then(function() {
//         return deployer.deploy(CandidatePresident, AccessControl.address, TimeControl.address, CandidateStructure.address, VoterStructure.address);
//     }).then(function() {
//         return deployer.deploy(CandidateGovernor, AccessControl.address, TimeControl.address, CandidateStructure.address, VoterStructure.address);
//     }).then(function() {
//         return deployer.deploy(CandidateBlockLeader, AccessControl.address, TimeControl.address, CandidateStructure.address, VoterStructure.address);
//     })
// }



// const VoterStructure = artifacts.require('VoterStructure');
// const CandidateStructure = artifacts.require('CandidateStructure');
// const AccessControl = artifacts.require('AccessControl');
// const TimeControl = artifacts.require('TimeControl');
// const TimeStructure = artifacts.require('TimeStructure');
// const VoterRegistry = artifacts.require('VoterRegistry');
// const CastVote = artifacts.require('CastVote');
// const CandidateViews = artifacts.require('CandidateViews');
// const AdminAuthentication = artifacts.require('AdminAuthentication');
// const CandidatePresident = artifacts.require('CandidatePresident');
// const CandidateGovernor = artifacts.require('CandidateGovernor');
// const CandidateBlockLeader = artifacts.require('CandidateBlockLeader');

// module.exports = function(deployer) {
//     let accessControlInstance;
//     let timeControlInstance;

//     deployer.deploy(AccessControl)
//         .then(function(instance) {
//             accessControlInstance = instance;
//             return deployer.deploy(TimeControl);
//         })
//         .then(function(instance) {
//             timeControlInstance = instance;
//             return deployer.deploy(TimeStructure);
//         })
//         .then(function() {
//             return deployer.deploy(VoterStructure, VoterRegistry.address);
//         })
//         .then(function() {
//             return deployer.deploy(CandidateStructure);
//         })
//         .then(function() {
//             return deployer.deploy(AdminAuthentication);
//         })
//         .then(function() {
//             return deployer.deploy(VoterRegistry, accessControlInstance.address, timeControlInstance.address, VoterStructure.address);
//         })
//         .then(function() {
//             return deployer.deploy(CastVote, accessControlInstance.address, timeControlInstance.address, VoterStructure.address, CandidateStructure.address);
//         })
//         .then(function() {
//             return deployer.deploy(CandidateViews, accessControlInstance.address, timeControlInstance.address, CandidateStructure.address);
//         })
//         .then(function() {
//             return deployer.deploy(CandidatePresident, accessControlInstance.address, timeControlInstance.address, CandidateStructure.address, VoterStructure.address);
//         })
//         .then(function() {
//             return deployer.deploy(CandidateGovernor, accessControlInstance.address, timeControlInstance.address, CandidateStructure.address, VoterStructure.address);
//         })
//         .then(function() {
//             return deployer.deploy(CandidateBlockLeader, accessControlInstance.address, timeControlInstance.address, CandidateStructure.address, VoterStructure.address);
//         });
// };

/*global artifacts*/
/*eslint no-undef: "error"*/

const VoterStructure = artifacts.require('VoterStructure');
const CandidateStructure = artifacts.require('CandidateStructure');
const AccessControl = artifacts.require('AccessControl');
const TimeControl = artifacts.require('TimeControl');
const TimeStructure = artifacts.require('TimeStructure');
const AdminAuthentication = artifacts.require('AdminAuthentication');
const VoterContract = artifacts.require('VoterContract');
const CandidateContract = artifacts.require('CandidateContract');

module.exports = function(deployer) {
    deployer.deploy(AccessControl).then(function() {
        return deployer.deploy(TimeControl);
    }).then(function() {
        return deployer.deploy(TimeStructure);
    }).then(function() {
        return deployer.deploy(VoterStructure);
    }).then(function() {
        return deployer.deploy(CandidateStructure);
    }).then(function() {
        return deployer.deploy(AdminAuthentication);
    }).then(function() {
        return deployer.deploy(VoterContract, VoterContract.address, AccessControl.address, TimeControl.address);
    }).then(function() {
        return deployer.deploy(CandidateContract, VoterContract.address, AccessControl.address, TimeControl.address);
    })
};

