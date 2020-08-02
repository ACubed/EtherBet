pragma solidity ^0.7.0;

contract Bet {
    struct Team {
        string teamName;
    }

    enum GameOutcome {PENDING, HOME, AWAY, DRAW}

    struct Game {
        uint256 gameStart; //unix time
        Team home;
        Team away;
        GameOutcome outcome;
    }

    struct Participant {
        address payable walletId;
        uint256 amount;
    }

    Game game;
    Participant[] homers;
    Participant[] awayers;
    uint256 pool;

    constructor(
        uint256 timestamp,
        string memory _homeTeam,
        string memory _awayTeam
    ) public {
        game = Game(
            timestamp,
            Team(_homeTeam),
            Team(_awayTeam),
            GameOutcome.PENDING
        );
    }

    function setOutcome(uint8 _outcome) public {
        require(game.outcome == GameOutcome.PENDING, "Game already concluded");
        require(game.gameStart < block.timestamp, "Game hasn't started yet");

        game.outcome = GameOutcome(_outcome);
        payWinners();
        selfdestruct(msg.sender);
    }

    function payWinners() public {
        if (game.outcome == GameOutcome.HOME) {
            uint256 splitAmount = pool / homers.length;
            for (uint256 i = 0; i < homers.length; i++) {
                pay(homers[i].walletId, splitAmount);
            }
        } else if (game.outcome == GameOutcome.AWAY) {
            uint256 splitAmount = pool / awayers.length;
            for (uint256 i = 0; i < awayers.length; i++) {
                pay(awayers[i].walletId, splitAmount);
            }
        } else {
            for (uint256 i = 0; i < homers.length; i++) {
                pay(homers[i].walletId, homers[i].amount);
            }
            for (uint256 i = 0; i < awayers.length; i++) {
                pay(awayers[i].walletId, awayers[i].amount);
            }
        }
    }

    function pay(address payable winner, uint256 amt)
        public
        payable
        returns (bool)
    {
        require(
            address(this).balance >= amt,
            "Not enough funds to pay the winner"
        );
        winner.transfer(amt);
    }

    event Received(address, uint256);

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
