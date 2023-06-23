/*global artifacts*/
/*eslint no-undef: "error"*/

// const VoterStructure = artifacts.require('VoterStructure');
// const CandidateStructure = artifacts.require('CandidateStructure');
// const AccessControl = artifacts.require('AccessControl');
// const TimeControl = artifacts.require('TimeControl');
// const CandidateRegistry = artifacts.require('CandidateRegistry');
// const VoterRegistry = artifacts.require('VoterRegistry');
// const CastVote = artifacts.require('CastVote');
// const ViewCandidates = artifacts.require('ViewCandidates');

// module.exports = function(deployer) {
//     deployer.deploy(AccessControl).then(function(){
//         return deployer.deploy(TimeControl)
//     }).then(function(){
//         return deployer.deploy(VoterStructure);
//     }).then(function(){
//         return deployer.deploy(CandidateStructure);
//     }).then(function() {
//         return deployer.deploy(CandidateRegistry, AccessControl.address, TimeControl.address,CandidateStructure.address);
//     }).then(function() {
//         return deployer.deploy(VoterRegistry, AccessControl.address, TimeControl.address, VoterStructure.address);
//     }).then(function() {
//         return deployer.deploy(CastVote, AccessControl.address,TimeControl.address,VoterStructure.address,CandidateStructure.address);
//     }).then(function(){
//         return deployer.deploy(ViewCandidates,CandidateStructure.address, TimeControl.address);
//     })
// }


// const VoterStructure = artifacts.require('VoterStructure');
// const CandidateStructure = artifacts.require('CandidateStructure');
// const AccessControl = artifacts.require('AccessControl');
// const TimeControl = artifacts.require('TimeControl');
// const TimeStructure = artifacts.require('TimeStructure');
// const AdminAuthentication = artifacts.require('AdminAuthentication');
// const VoterContract = artifacts.require('VoterContract');
// const CandidateContract = artifacts.require('CandidateContract');

// module.exports = function(deployer) {
//     deployer.deploy(AccessControl).then(function() {
//         return deployer.deploy(TimeControl);
//     }).then(function() {
//         return deployer.deploy(TimeStructure);
//     }).then(function() {
//         return deployer.deploy(VoterStructure);
//     }).then(function() {
//         return deployer.deploy(CandidateStructure);
//     }).then(function() {
//         return deployer.deploy(AdminAuthentication);
//     }).then(function() {
//         return deployer.deploy(VoterContract, VoterContract.address, AccessControl.address, TimeControl.address);
//     }).then(function() {
//         return deployer.deploy(CandidateContract, VoterContract.address, AccessControl.address, TimeControl.address);
//     })
// };


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
    return deployer.deploy(VoterContract, AccessControl.address, TimeControl.address);
  }).then(function(voterContractInstance) {
    return deployer.deploy(CandidateContract, AccessControl.address, TimeControl.address, voterContractInstance.address);
  });
};
