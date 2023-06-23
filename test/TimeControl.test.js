
/*global artifacts contract assert*/
/*eslint no-undef: "error"*/ 

const TimeControl = artifacts.require("TimeControl");

contract ("TimeControl", async accounts => {
    let instance;
    let startTime = parseInt(Date.now()/1000);
    let endTime = startTime + 1000000;

    beforeEach(async () => {
        instance = await TimeControl.new();
    });

    it ("Ensure the admin set the time properly", async () => {
        await instance.setVotingPeriod(startTime, endTime);
        let result = await instance.getTime();
        console.log(result.startTime);
        console.log(result.endTime)

        assert.equal(result.startTime, startTime);
        assert.equal(result.endTime, endTime);    

        console.log(`The Voting Remaining time is: ${result.remainingTime}`);
    });
})