pragma solidity ^0.6.6;

    
contract Bet {
    struct Team {
        string teamName;
    }
    
    enum GameOutcome {PENDING, HOME, AWAY, DRAW}
    
    struct Game {
        uint gameStart; //unix time
        Team home;
        Team away;
        GameOutcome outcome;
    }
    
    struct Participant {
        address payable walletId;
        uint amount;
    }
    
    Game game;
    Participant[] homers;
    Participant[] awayers;
    uint pool;

    
    constructor(uint timestamp, string memory _homeTeam, string memory _awayTeam) public {
        game = Game(timestamp, Team(_homeTeam), Team(_awayTeam), GameOutcome.PENDING);
    }
    
    function setOutcome(uint8 _outcome) public {
        require(game.outcome == GameOutcome.PENDING);
        require(game.gameStart < now);
        
        game.outcome = GameOutcome(_outcome);
        payWinners();
        selfdestruct(msg.sender);
    }
    
    function payWinners() public {
        if (game.outcome == GameOutcome.HOME){
            uint splitAmount = pool / homers.length;
            for (uint i =0; i<homers.length; i++){
                pay(homers[i].walletId, splitAmount);
            }
        } else if (game.outcome == GameOutcome.AWAY){
            uint splitAmount = pool / awayers.length;
            for (uint i =0; i<awayers.length; i++){
                pay(awayers[i].walletId, splitAmount);
            }
        } else {
            for (uint i =0; i<homers.length; i++){
                pay(homers[i].walletId, homers[i].amount);
            }
            for (uint i =0; i<awayers.length; i++){
                pay(awayers[i].walletId, awayers[i].amount);
            }
        }

    }
    
    function pay(address payable winner, uint amt) public payable returns(bool) {
        require(address(this).balance >= amt);
        winner.transfer(amt);
    }
    
    event Received(address, uint);
    
    function betOnHome() external payable {
        homers.push(Participant(msg.sender, msg.value));
        pool += msg.value;
        emit Received(msg.sender, msg.value);
    }
    
    function betOnAway() external payable {
        awayers.push(Participant(msg.sender, msg.value));
        pool += msg.value;
        emit Received(msg.sender, msg.value);
    }
}