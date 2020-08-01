pragma solidity >=0.4.22 <0.7.0;

    
contract Bet {
    struct Team {
        string teamName;
    }
    
    enum GameOutcome {PENDING, HOME, AWAY, DRAW}
    
    struct Game {
        uint gameStart; //MM-DD-YY HH:MM
        Team home;
        Team away;
        GameOutcome outcome;
    }
    
    struct Participant {
        address payable walletId;
        Game game;
        Team teamSelected;
        uint amount;
    }
    
    Game game;
    Participant bettor;
    Participant taker;
    
    constructor(uint256 _timestamp, string memory _homeTeam, string memory _awayTeam, address payable _bettorWallet, address payable _takerWallet, bool _bettorHome, uint _bettorAmt, uint _takerAmt) public {
        require (_bettorWallet.balance >= _bettorAmt);
        require (_takerWallet.balance >= _takerAmt);
        
        game = Game(_timestamp, Team(_homeTeam), Team(_awayTeam), GameOutcome.PENDING);
        bettor = Participant(_bettorWallet, game, _bettorHome ? Team(_homeTeam) : Team(_awayTeam), _bettorAmt);
        taker = Participant(_takerWallet, game, _bettorHome ? Team(_awayTeam) : Team(_homeTeam), _takerAmt);
    }
    
    function setOutcome (uint _outcome) public {
        require(game.outcome == GameOutcome.PENDING);
        require(game.gameStart <= now);

        game.outcome = GameOutcome(_outcome); 
        
        bool payOutcome = payWinner();
        if (payOutcome == false) {
            pay(taker.walletId, taker.amount);    
            pay(bettor.walletId, bettor.amount);  
        }
    }
    
    function payWinner() public returns(bool){
        require(game.outcome != GameOutcome.PENDING);
        require(game.gameStart <= now);

        Team memory winningTeam; 
        if (game.outcome == GameOutcome.HOME)
            winningTeam = game.home;
        else if (game.outcome == GameOutcome.AWAY)
            winningTeam = game.away;
        else
            return false;
        
        if (compareStrings(game.home.teamName, bettor.teamSelected.teamName))
            return pay(bettor.walletId, bettor.amount + taker.amount);
        else 
            return pay(taker.walletId, bettor.amount + taker.amount);
    }
    
    function pay(address payable winner, uint amt) public payable returns(bool) {
        require(address(this).balance >= amt);
        winner.transfer(amt);
    }
    
    function compareStrings (string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    
    }
    
    event Received(address, uint);
    
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}