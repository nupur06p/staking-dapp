// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Staking {

    struct Token{
        uint tokenid;
        address stakedAddress; 
        uint dateCreated; 
        uint dateUnlocked;
        uint Interest;
        uint stakedAmount;
        uint rewardAmount;
        bool open;
    }

    address public owner;
    address public person;
    uint public numDays_ = 1 days;
    uint totalApprovedTokens_;
    uint stakedAmount_;
    uint rewardAmount_;
    uint unstakeAmount_ = 0;
    bool approved;
    uint currentTokenId = 0;
    uint public rate;
    
    //Mapping
    mapping (address => Token) public structToken; //mapping token to addresses
    mapping(address => uint256) public stakedbalance; //token balance of each owner account

    constructor(){
        owner = msg.sender;
    }

    modifier onlyPerson(){
        require(msg.sender==person, "Staking function to be executed by the staker");
        require(approved==true, "Staked tokens not yet approved by owner");
        _;
    }

    //the address which is to be staked is given approval by the owner
    function approve(uint256 totalApprovedTokens) public {
        require(msg.sender==person, "Approval can be given by the staker");
        approved=true;
        totalApprovedTokens_ = totalApprovedTokens;
    }

    //calculate interest if the number of days is less than 30
    function interestrate() internal view returns(uint){
        // require(numDays_>0 days, "Number of days is less than 0");
        uint q = numDays_/30;
        uint r = numDays_ - 30*q;
        uint interestRate;
        if (r>0){
            interestRate = (q+1)*2;
        } else{
            interestRate = q*2; 
        }
        return interestRate;
    }

    //calculate the interest rate for the number of days staked
    //as the timeperiod keeps increasing, the rate will vary, rate dynamic with time
    function stakenumDays() internal returns(uint){
        require(numDays_>0 days, "Number of days is less than 0");
        uint numDays = (block.timestamp - structToken[person].dateCreated)/60/60/24 days;
        numDays_ = numDays;
        rate = interestrate();
        return rate;
    }

    //setting the person address, can be used as login button
    function setAddressFunction(address person_) public {
        person = person_;
    }

    //Reward Calculation
    function rewardToken() internal onlyPerson returns(uint){
        require(approved==true, "Staked tokens not yet approved by owner");
        require(msg.sender==person, "Staker person to execute the Reward function");
        rate = stakenumDays();
        rewardAmount_ = rate * stakedAmount_ ; //this will also change as time passes
        structToken[person].rewardAmount =  rewardAmount_;
        structToken[person].Interest =  rate;
        return rewardAmount_;
    }

    //Token staked and their data
    function stakeToken(uint stakedAmount) public payable onlyPerson {
        require(numDays_>0 days, "Number of days is less than 0");
        stakedAmount_ = stakedAmount;
        totalApprovedTokens_ = totalApprovedTokens_ - stakedAmount_;
        stakedbalance[person] = stakedAmount_;
        rewardAmount_ = rewardToken();

        structToken[person] = Token(
            currentTokenId,
            person,
            block.timestamp,
            0,
            stakenumDays(), //this is interest rate which will keep updating
            stakedAmount_,
            rewardAmount_, //the reward will keep updating as time passes
            true
        );
        currentTokenId +=1;
    }

    //Token unstake
    function unStakeToken(uint unstakeAmount) public payable onlyPerson {
        require(numDays_>1 days || numDays_==1 days, "We cannot withdraw tokens unless a day has passed");
        unstakeAmount_ = unstakeAmount;
        stakedbalance[person] -= unstakeAmount_;
        structToken[person].stakedAmount -= unstakeAmount_ ;
        stakedAmount_ = structToken[person].stakedAmount; //updating staked amount
        structToken[person].dateUnlocked = block.timestamp;
        structToken[person].rewardAmount = rewardToken() ;

    }

}