/*global artifacts contract assert*/
/*eslint no-undef: "error"*/ 
const VoterRegistry = artifacts.require("VoterRegistry");

contract("VoterRegistry", async accounts => {

    let instance;
    let voterAddress = "0x82fBdEc77aB784ab4b87EcBB60402a59001cdb18";
    let name= "josephat";
    let collegename= "cive";
    let programName= "cnise";
    let yearOfStudy= 4;
    let regNo= "T/UDOM/2019/08243";
    let blockNumber= "5";
    let password= "12345678";

    beforeEach(async () => {
        instance = await VoterRegistry.new(); 
    });

    it("should register the voter properly", async () => {
        await instance.registerVoter(voterAddress, name, collegename, programName, yearOfStudy, regNo, blockNumber, password);
        let result = await instance.viewVoter(regNo);
        assert.equal(result.voterAddress, voterAddress);      
        assert.equal(result.name, name);  
        assert.equal(result.collegeName, collegename);
        assert.equal(result.programName, programName);
        assert.equal(result.blockNumber, blockNumber);  
        assert.equal(result.yearOfStudy, yearOfStudy);
        assert.equal(result.regNo, regNo);
        
    });
});
