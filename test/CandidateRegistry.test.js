/*global artifacts contract assert*/
/*eslint no-undef: "error"*/ 
const CandidateRegistry = artifacts.require('CandidateRegistry');

contract('CandidateRegistry', async accounts => {
    let instance;;

    //Details for president
    let name = "Policarp Salvatory Mrema";
    let collegeName = "CIVE";
    let programName = "CNISE";
    let yearOfStudy = 4;
    let regNo = "T/UDOM/2019/08290";
    let blockNumber = "5";
    let gender = "MALE";

    // Details for Governor
    let gName = "OMBENI OWEN NGATA";
    let gCollegeName = "CIVE";
    let gProgramName = "CNISE";
    let gYearOfStudy = 4;
    let gRegNo = 'T/UDOM/2019/12327';
    let gBlockNumber = "4";
    let gGender = 'MALE';

    // Details for BlockLeader
    let bName = "JOSHUA EMMANUEL MOSHA";
    let bCollegeName = "CIVE";
    let bProgramName = "CNISE";
    let bYearOfStudy = 3;
    let bRegNo = "T/UDOM/2018/00630";
    let bBlockNumber = "5";
    let bGender = 'MALE';

    beforeEach(async () => {
        instance = await CandidateRegistry.new();
    });

    it ("should register candidate properly", async () => {
        await instance.registerPresident(name, collegeName, programName, yearOfStudy, regNo, blockNumber, gender);
        let result = await instance.viewPresident(regNo);
        assert.equal(result.name, name);
        assert.equal(result.collegeName, collegeName);
        assert.equal(result.programName, programName);
        assert.equal(result.yearOfStudy, yearOfStudy);
        assert.equal(result.regNo, regNo);
        assert.equal(result.blockNumber, blockNumber);
        assert.equal(result.gender, gender);
        console.log(`the voter count of the candidate is: ${result.voteCount}`);
    });

    it ("should register governor peroperly", async () => {
        await instance.registerGovernor(gName, gCollegeName, gProgramName, gYearOfStudy, gRegNo, gBlockNumber, gGender);
        let result = await instance.adminViewGovernors(gRegNo);
        assert.equal(result.name, gName);
        assert.equal(result.collegeName, gCollegeName);
        assert.equal(result.programName, gProgramName);
        assert.equal(result.yearOfStudy, gYearOfStudy);
        assert.equal(result.regNo, gRegNo);
        assert.equal(result.blockNumber, gBlockNumber);
        assert.equal(result.gender, gGender);
    })

    it ("Should register blockLeader Properly", async () => {
        await instance.registerBlockLeader(bName, bCollegeName, bProgramName, bYearOfStudy, bRegNo, bBlockNumber, bGender);
        let result = await instance.adminViewBlockLeaders(bRegNo);

        assert.equal(result.name, bName);
        assert.equal(result.collegeName, bCollegeName);
        assert.equal(result.programName, bProgramName);
        assert.equal(result.yearOfStudy, bYearOfStudy);
        assert.equal(result.regNo, bRegNo);
        assert.equal(result.blockNumber, bBlockNumber);
        assert.equal(result.gender, bGender);
    })


})